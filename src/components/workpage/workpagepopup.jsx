import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Aos from "aos";
import usefbStore from "../../store/firebasestore";
import useStore from "../../store/zustandstore";
import { useSocketStore } from "../../store/socketstore";
import { useNavigate, useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getAuth, signOut } from "firebase/auth";
import Swal from "sweetalert2";
import humanLaptop from "../../media/undraw_dev-productivity_5wps.svg";
import "../../css/workpagepop.css";

function WorkPopUp() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const userID = usefbStore((s) => s.userID);
  const setUid = useSocketStore((s) => s.setUid);
  const taskBegan = useSocketStore((s) => s.taskBegan);
  const hideScreenLoader = useStore((s) => s.hideScreenLoader);
  const connected = useSocketStore((s) => s.connected);
  const connect = useSocketStore((s) => s.connect);
  const forceLogout = useSocketStore((s) => s.forceLogout);

  const [hasNavigated, setHasNavigated] = useState(false);

       const authStatus = usefbStore((s) => s.authStatus);

        useEffect(()=>{
        if(authStatus=="unauthenticated"){
              navigate("/auth")
        }
        
       },[authStatus])
  // Animate on mount
  useEffect(() => {
    Aos.init({ duration: 400 });
  }, []);

  // Socket connection
  useEffect(() => {
    if (!userID) return;
    setUid(userID);
    if (!connected) connect();
  }, [userID, connected, setUid, connect]);

  // Navigate if task started
  useEffect(() => {
    if (taskBegan && taskId && !hasNavigated) {
      navigate(`/workspace/${taskId}`);
      setHasNavigated(true);
    }
  }, [taskBegan, taskId, hasNavigated]);

  // Firestore listener for this task
  useEffect(() => {
    if (!userID || !taskId) return;

    hideScreenLoader();
    const docRef = doc(db, "Users", userID, "assignedTasks", taskId);

    const unsub = onSnapshot(docRef, (snap) => {
      if (!snap.exists()) return;

      const { status } = snap.data();

      if (!hasNavigated) {
        if (status === "Complete") {
          navigate("/dashboard");
          setHasNavigated(true);
        } else if (status === "active") {
          navigate(`/workspace/${taskId}`);
          setHasNavigated(true);
        }
      }
    });

    return () => unsub();
  }, [userID, taskId, hideScreenLoader, navigate, hasNavigated]);

  // Start task
const toActWork = () => {
  if (!userID || !taskId) return;

  const socket = useSocketStore.getState();

  // Reset previous task state
  socket.resetTaskState();

  socket.send({ type: "startTask", taskId, userId: userID });
};


  // Force logout handler
  useEffect(() => {
    if (!forceLogout) return;

    Swal.fire({
      title: "Session Ended",
      text: "Your account has been signed in on another device.",
      icon: "warning",
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didClose: () => {
        const auth = getAuth();
        signOut(auth).then(() => navigate("/auth"));
      },
    });
  }, [forceLogout, navigate]);

  return (
    <div className="workPopUpWrap">
      <div className="workPopUpPlacer" data-aos="zoom-in">
        <div className="workPopCont">
          <div
            className="wpcancel"
            onClick={() =>
              Swal.fire({
                title: "Still Unprepared?",
                text: "Do you still wish to go back?",
                icon: "question",
                showConfirmButton: true,
                confirmButtonText: "Go back",
                showCancelButton: true,
                cancelButtonText: "Stay",
                cancelButtonColor: "#6a5acd",
              }).then((result) => {
                if (result.isConfirmed) navigate("/dashboard");
              })
            }
          >
            <Icon className="faIcon" icon="solar:arrow-left-linear" />
          </div>

          <div className="wpcimg">
            <img src={humanLaptop} alt="" />
          </div>

          <div className="wpcInstructions">
            <div className="wpcInstructionsIntro">
              <span>Before You Begin</span>
            </div>
            <div className="wpcInstructionsIntroActInstruction">
              <ul>
                <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
                <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
                <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
                <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
                <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
                <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
                <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
              </ul>
            </div>
          </div>

          <div className="wpcBUtton">
            <button onClick={toActWork}>Proceed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkPopUp;
