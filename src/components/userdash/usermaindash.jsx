import aitaskImg from "../../media/undraw_firmware_3fxd.svg";
import "../../css/usermaindash.css";
import lineGraphImg from "../../media/wave-haikei (2).svg";
import filesImg from "../../media/undraw_add-files_d04y.svg";
import { Icon } from "@iconify/react";
import { collection, onSnapshot} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Swal from "sweetalert2";
import usefbStore from "../../store/firebasestore";
import noApplication from "../../media/undraw_updated-resume_287i.svg"
import { useRef, useEffect, useState } from "react";
import { useSocketStore } from "../../store/socketstore";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/zustandstore";

function Maindash() {
  const userID = usefbStore((s) => s.userID);
  const taskResp = useRef(null);
  const navigate = useNavigate();
  const authStatus = usefbStore((s) => s.authStatus);
  const hasTasks = usefbStore((s) => s.hasTasks);
  const taskRespMsg = useSocketStore((s) => s.taskRespMsg);
  const setHasTasks = usefbStore((s) => s.setHasTasks);
  const screeningTest = usefbStore((s) => s.screeningTest);
  const screenCount = usefbStore((s)=>s.screenCount)
  const taskRespStatus = useSocketStore((s) => s.taskRespStatus);
  const taskRespCont = useSocketStore((s) => s.taskRespCont);
  const taskArray = usefbStore((s) => s.taskArray);
  const setTaskArray = usefbStore((s) => s.setTaskArray);
  const isDesktopLeftDashActive = useStore((s) => s.isDesktopLeftDashActive);
  const isDesktopRightDashActive = useStore((s) => s.isDesktopRightDashActive);
  const isDesktopLeftBottomActive = useStore((s) => s.isDesktopLeftBottomActive);
  const accountBalance = usefbStore((s) => s.accountBalance) || 0;
  const accountPoints = usefbStore((s) => s.accountPoints) || 0;
  
  // ✅ Cooldown state from socket store
  const inCooldown = useSocketStore((s) => s.inCooldown);
  const cooldownUntil = useSocketStore((s) => s.cooldownUntil);
  const cooldownMessage = useSocketStore((s) => s.cooldownMessage);
  
  // ✅ Cooldown state from Firebase store (fallback)
  const fbCooldownUntil = usefbStore((s) => s.taskCooldownUntil);
  const fbInCooldown = usefbStore((s) => s.inCooldown);

  // ✅ USE COMBINED COOLDOWN STATE
  const effectiveInCooldown = inCooldown || fbInCooldown;
  const effectiveCooldownUntil = cooldownUntil || fbCooldownUntil;
  
  const [remainingCooldownSecs, setRemainingCooldownSecs] = useState(0);
 


  // ✅ Format cooldown time
  const formatCooldownTime = (seconds) => {
    if (!seconds || seconds <= 0) return null;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  // ✅ Track remaining cooldown time every second
  useEffect(() => {
    if (!effectiveInCooldown || !effectiveCooldownUntil) return;
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const cooldownTime = new Date(effectiveCooldownUntil).getTime();
      const remaining = Math.max(0, Math.floor((cooldownTime - now) / 1000));
      
      setRemainingCooldownSecs(remaining);
      console.log(remaining)
      // Cooldown expired - auto refresh
      if (remaining === 0 && effectiveInCooldown) {
        useSocketStore.getState().resetCooldown();
        usefbStore.getState().resetCooldown(); // Also reset Firebase store
        Swal.fire({
          title: "New Tasks Available! 🎉",
          text: "Your cooldown period is over. You can now request new tasks.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [effectiveInCooldown, effectiveCooldownUntil]);

  // -------------------- Socket Connection --------------------
  useEffect(() => {
    if (!userID) return;

    const socket = useSocketStore.getState();
    socket.setUid(userID);
    socket.connect();
  }, [userID]);
  
  function getUserLevel(accountPoints) {
    if (accountPoints >= 3500) return "Pro";
    if (accountPoints >= 1000) return "Intermediate";
    return "Noob";
  }

  // ✅ Show cooldown message separately
  useEffect(() => {
    if (taskRespStatus === "Cooldown" && taskRespMsg) {
      Swal.fire({
        title: "Tasks on Cooldown",
        text: taskRespMsg,
        icon: "info",
        timer: 5000,
        showConfirmButton: false,
      });
    } else if (taskRespMsg && taskRespStatus && taskRespStatus !== "Cooldown") {
      Swal.fire(`${taskRespStatus}`, `${taskRespMsg}`, "warning");
    }
  }, [taskRespCont, taskRespMsg, taskRespStatus]);

  // -------------------- Accept Task --------------------
  const handleAccept = (taskId,type) => {
    navigate(`/workpopup/${taskId}/${type}`);
  };
  
  // -------------------- Request Task from Server --------------------
  const getTask = () => {
    // ✅ Check if in cooldown using effective state
    if (effectiveInCooldown) {
      Swal.fire({
        title: "Tasks on Cooldown",
        text: cooldownMessage || `New tasks available in ${formatCooldownTime(remainingCooldownSecs)}`,
        icon: "info",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
    
    console.log(screenCount)
    
    if( screenCount == null) {
        return;
    }

    if (screeningTest == "undone") {
      Swal.fire({
        title: "Screening Required",
        text: "Please complete a short screening test before accessing live tasks.",
        icon: "info",
        showConfirmButton: true,
        confirmButtonText: "Take Test",
        showCancelButton: true,
        cancelButtonText: "Maybe Later",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/prescreening");
        }
      });
    } else if (screeningTest == "pass") {
      const socket = useSocketStore.getState();
      socket.send({
        type: "requestTask",
        uid: userID,
      });
    } else if (screeningTest == "fail") {
      if( screenCount < 3){
        Swal.fire({
          title: "Try Again",
          text: "It looks like you didn’t pass the screening test. Would you like to retake it?",
          icon: "info",
          showConfirmButton: true,
          confirmButtonText: "Retake Test",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/screening");
          }
        });
      } else if(screenCount >= 3){
        Swal.fire(
          "Screening Limit Reached",
          "You've reached the maximum number of attempts. Please contact our support team to request a review or reset.",
          "info"
        );                
      }
    }
  };
  
  // Subscribe to tasks collection
  useEffect(() => {
    if (authStatus !== "authenticated" || !userID) return;

    const tasksCol = collection(db, "Users", userID, "assignedTasks");

    const unsub = onSnapshot(tasksCol, (snapshot) => {
      if (snapshot.empty) {
        setHasTasks(false);
        setTaskArray([]);
      } else {
        const tasks = snapshot.docs.map((docSnap) => ({
          taskId: docSnap.id,
          ...docSnap.data(),
        }));
        setHasTasks(true);
        setTaskArray(tasks);
      }
    });

    return () => unsub();
  }, [userID, authStatus]);

  // -------------------- Render --------------------
  return (
    <div className="mdlminiContWrapper">
      <div
        className={`mainDashLeft ${
          isDesktopLeftDashActive && isDesktopRightDashActive ? "allDashActive" : ""
        } ${isDesktopLeftDashActive ? "mainDashLeftFonActive-Desk" : "mainDashLeftFonInActive-Desk"}`}
      >
        <div className={`mdlTop ${isDesktopLeftBottomActive ? "mdlTopHide": "mdlTopNuetral"}` }>
          <div className="mdlCard1">
            <div className="mdlCard1Cont">
              <img src={lineGraphImg} alt="" />
              <span className="mdlcardTitle">Earnings</span>
              <span className="mdlCard1Income">${accountBalance}</span>
              <span className="mdlminisum">
                <span className="percentEarn">+0%</span> from last month
              </span>
            </div>
          </div>
          <div className="mdlCard2">
            <div className="mdlcard2Wrap">
              <div className="mdlminicard">
                <div className="mdlminicardCont">
                  <div className="mdlminiCardBox">
                    <Icon className="faIcon" icon="solar:medal-star-bold-duotone" />
                  </div>
                  <div className="mdlminicardContData">
                    <p>{getUserLevel(accountPoints)}</p>
                    <span>Rank</span>
                  </div>
                </div>
              </div>
              <div className="mdlminicard">
                <div className="mdlminicardCont">
                  <div className="mdlminiCardBox">
                          <Icon className="faIcon" icon="solar:clipboard-check-bold-duotone" />
                  </div>
                  <div className="mdlminicardContData">
                      <p>{taskArray.length}</p>
                      <span>Tasks completed</span>
                  </div>
                </div>
              </div>
              <div className="mdlminicard">
                <div className="mdlminicardCont">
                  <div className="mdlminiCardBox">
                    <Icon className="faIcon" icon="solar:stop-circle-bold" />
                  </div>
                  <div className="mdlminicardContData">
                    <p>0</p>
                    <span>Solara Tokens</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mdlBtm ${isDesktopLeftBottomActive ? "mdlBtmActive" : ""}`}>
          <div className="mdlBtmIntro">
            <span>Available AI Tasks</span>
          </div>
          <div className="mdlBtmAITasksAssigned">
            {hasTasks ? (
              <div className="accTaskAssignedWrapper">
                {taskArray.map((task) => (
                  <div key={task.taskId} className="aitaskassignedCard">
                    <div className="aacTaskType">
                      <p>{task.type}</p>
                    </div>
                    <div className="aacTaskPay">
                      <p>
                        Pay <span>${task.pay}</span>
                      </p>
                    </div>
                    <div
                      className={`aacTaskStatus ${
                        task.status === "Pending"
                          ? "aacTaskStatusPending"
                          : "aacTaskStatusComplete"
                      }`}
                    >
                      <p>{task.status || "Pending"}</p>
                    </div>
                    <div className="aacTaskAction">
                      {task.status === "Pending" ? (
                        <p className="acceptTaskBtn" onClick={() => handleAccept(task.taskId,task.type)}>
                          Accept
                        </p>
                      ) : (
                        <p className="nullBtn">-</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <img src={aitaskImg} alt="" />
                <span ref={taskResp}>
                  {effectiveInCooldown 
                    ? `New tasks available in ${formatCooldownTime(remainingCooldownSecs)}` 
                    : "You have not yet been assigned a task."}
                </span>
                <button 
                  onClick={() => getTask()}
                  disabled={effectiveInCooldown}
                  style={{
                    opacity: effectiveInCooldown ? 0.6 : 1,
                    cursor: effectiveInCooldown ? "not-allowed" : "pointer"
                  }}
                >
                  {effectiveInCooldown ? `Get Task (${formatCooldownTime(remainingCooldownSecs)})` : "Get Task"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className={`mainDashRight ${
          isDesktopLeftDashActive && isDesktopRightDashActive ? "allDashActive" : ""
        } ${isDesktopRightDashActive ? "mainDashRightFonActive-Desk" : "mainDashLeftFonInActive-Desk"}`}
      >
        <div className="mdrIntro">
          <p>Applied Jobs</p>
        </div>
        <div className="mdrCont">
          <img src={noApplication} alt="" />
          <span>No job applications found</span>
        </div>
      </div>
    </div>
  );
}

export default Maindash;