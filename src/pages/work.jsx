import { Icon } from "@iconify/react";
import useStore from "../store/zustandstore";
import { useEffect, useRef, useState } from "react";
import "../css/work.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Jelly } from "ldrs/react";
import { getAuth,signOut } from "firebase/auth";
import { useSocketStore } from "../store/socketstore";
import { useParams } from "react-router-dom";
import usefbStore from "../store/firebasestore";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Workspace() {
  const urlParam = useParams();
  const userID = usefbStore((s) => s.userID);
  const navigate = useNavigate();
  const setUid = useSocketStore((s) => s.setUid);
  const connected = useSocketStore((s) => s.connected);
  const taskComplete = useSocketStore((s) => s.taskComplete);
  const taskTime = useSocketStore((s) => s.taskTime);
  const completeMethod = useSocketStore((s)=>s.completeMethod)
  const connect = useSocketStore((S) => S.connect);
  const aIScore= useSocketStore((s)=>s.aIScore)
  const [contentBlock, setContent] = useState("");
  const [factContent, setfactContent] = useState("");
  const translatedText = useRef("")
  const userVerdict = useRef("")
  const factUserExplanation = useRef("")
  const [textotranslate,settextotranslate] = useState("")
  const [inst,setInst] = useState("")
  const payOut = useSocketStore((s)=>s.payOut);
  const hideScreenLoader = useStore((s) => s.hideScreenLoader);
  const [submitTestLoader, setsubmitTestLoader] = useState(false);
  const [originalverdict, setoriginalVerdict] = useState("");
  const [textreference, settextreference] = useState("");
  const [originalExplanation, setoriginalExplanation] = useState("");
  const taskCanceled = useSocketStore((s)=>s.taskCanceled);
  const forceLogout = useSocketStore((s)=>s.forceLogout)
  const [taskType, setTaskType] = useState("")
  const authStatus = usefbStore((s) => s.authStatus);

  useEffect(()=>{
        if(authStatus=="unauthenticated"){
              navigate("/auth")
        }
        
  },[authStatus])
   useEffect(() => {
    if (forceLogout) {
      Swal.fire({
        title: "Session Ended",
        text: "Your account has been signed in on another device. For security reasons, this session has been closed.",
        icon: "warning",
        timer: 4000,              // ⏱ auto close
        timerProgressBar: true,
        showConfirmButton: false, // no blocking
        allowOutsideClick: false,
        allowEscapeKey: false,
        didClose: () => {
   const auth = getAuth()
                      signOut(auth).then(()=>{
                          navigate("/auth")
                      }).catch(()=>{
                          Swal.fire("Error", "An error occured", "error")
                      })      }
      });
    }
  }, [forceLogout]);

  const rText= useRef(null);
  useEffect(()=>{
    if(taskCanceled==true){
      navigate("/dashboard")
    }
  },[taskCanceled])


  useEffect(()=>{
    if(urlParam.taskType){
    setTaskType(urlParam.taskType)
  

    }
     

  },[urlParam.taskType])

  useEffect(() => {
    // Only connect if userID exists
    if (!userID) return;

    // Save UID to socket store
    setUid(userID);

    // Connect socket (with taskId from URL)
    if (!connected) {
      connect(urlParam.taskId);
    }
  }, [userID, connected, urlParam.taskId, setUid, connect]);

  useEffect(() => {
    if (!userID || !urlParam.taskId) return;
    hideScreenLoader();
    const docRef = doc(db, "Users", userID, "assignedTasks", urlParam.taskId);
    const unsub = onSnapshot(docRef, (snap) => {
      if (!snap.exists()) return;
      var st = snap.data().status;
      var task = snap.data().task;
      var instructions = snap.data().instructions;
      setInst(instructions)
      if(urlParam.taskType=="Content Review"){
        setContent(task.mainTask.originaltext)
        
      }
      if(urlParam.taskType=="Content Translation"){
             settextotranslate(task.mainTask.originaltext)
             settextreference(task.mainTask.translatedText)
      }
      if(urlParam.taskType=="Fact Check"){
             setfactContent(task.mainTask.statement)
             setoriginalVerdict(task.mainTask.verdict)
             setoriginalExplanation(task.mainTask.explanation)

      }
   


     // Optional: only redirect if taskCanceled
if (st === "Pending" && taskCanceled) {
  navigate(`/workpopup/${urlParam.taskId}/${urlParam.taskType}`);
}

   
    });
    return () => unsub;
  }, [urlParam.taskId, userID]);
  const backtoDash = () => {
    Swal.fire({
      title: "Are You Leaving?",
      text: "Your progress will be lost!",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Yes, Leave",
      showCancelButton: true,
      cancelButtonText: "Continue",
      cancelButtonColor: "#6a5acd",
    }).then((result) => {
      if (result.isConfirmed) {
          const socket = useSocketStore.getState();
          socket.send({
              type:"cancelTask",
              taskId:urlParam.taskId,
              uid:userID,

          })
      }
    });
  };
const currentTaskId = urlParam.taskId;

const isReady =
  taskComplete === true &&
  currentTaskId === urlParam.taskId && // make it task-specific
  !!completeMethod &&
  payOut !== null &&
  payOut !== undefined;


useEffect(() => {
  if (!isReady) return;

  navigate(`/complete/${urlParam.taskId}/${completeMethod}/${payOut}/${aIScore}`);
}, [isReady]);


  const submmitAitask = () => {
    if(!userID || !urlParam.taskId) return;

    if(urlParam.taskType == "Content Review"){
      if(!rText.current.value){ 
        Swal.fire("Missing Content","You cant submit a blank input", "warning") 
        return;}
          setsubmitTestLoader(true);
 const socket = useSocketStore.getState();
   socket.send({
    type:"submitTask",
    taskId:urlParam.taskId,
    taskType:urlParam.taskType,
    uid:userID,
    originalText:contentBlock,
    refinedText:rText.current.value,
});

    }
    if(urlParam.taskType == "Fact Check"){
        if(!userVerdict.current.value || !factUserExplanation.current.value){ 
        Swal.fire("Missing Content","You cant submit a blank input", "warning") 
        return;}
          setsubmitTestLoader(true);
          const socket = useSocketStore.getState();
 socket.send({
    type:"submitTask",
    taskId:urlParam.taskId,
    taskType:urlParam.taskType,
    uid:userID,
    originalverdict:originalverdict,
    originalExplanation:originalExplanation,
    userVerdict:userVerdict.current.value,
    userExplanation:factUserExplanation.current.value,
});

    }
    if(urlParam.taskType == "Content Translation"){
       if(!translatedText.current.value){ 
        Swal.fire("Missing Content","You cant submit a blank input", "warning") 
        return;}
          setsubmitTestLoader(true);
          const socket = useSocketStore.getState();
  socket.send({
    type:"submitTask",
    taskId:urlParam.taskId,
    taskType:urlParam.taskType,
    uid:userID,
    textotranslate:textreference,
    translatedText:translatedText.current.value,
});


    }
   

  };



  return (
    <div className="workSpaceWrapper">
      <div className="workspacerPlacer">
        <div className="workSpaceNav">
          <div className="wspnLeft" onClick={backtoDash}>
            <p>Back</p>
          </div>
          <div className="wspnRight">
            <Icon className="faIcon" icon="solar:clock-circle-outline" />
            <p>{taskTime}</p>
          </div>
        </div>
        <div className="workSpaceCont">
          {/* content review workspace  */}
          {taskType == "Content Review" &&          <div className="workspaceDesk">
        
            <div className="wsdContent">
              <div className="wsdContentitle">
                <span>Content</span>
              </div>
              <div className="wsdContentParagraph">
                <p>{contentBlock}</p>
              </div>
            </div>
            <div className="wsdAnswer">
              <div className="wsdaAnsTextAreaTitle">
                <span>Your Correction</span>
              </div>
              <div className="wsdaAnsTextArea">
                <textarea
                  name=""
                  id=""
                  placeholder="Type your correction here"
                  ref={rText}
                ></textarea>
              </div>
            </div>
          </div>}
          {taskType == "Fact Check" && (
 <div className="workspaceDesk">
    <div className="wsdInstructions">
              <p> <span>TASK:</span> {inst} </p>
         
            </div>
        
            <div className="wsdFactStatement">
              <div className="wsdContentitle">
                <span>Statement</span>
              </div>
              <div className="wsdContentFactStatement">
                <p>{factContent}</p>
              </div>
            </div>
            <div className="wsdContentLittle">
              <div className="wsdContentitle">
                <span>Your Verdict</span>
              </div>
              <div className="wsdContentParagraphwsdContentLittle">
                <select name="" id="" ref={userVerdict}>
                  <option value="">Select verdict</option>
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
              </div>
            </div>
            <div className="wsdAnswer">
              <div className="wsdaAnsTextAreaTitle">
                <span>Your Explanation</span>
              </div>
              <div className="wsdaAnsTextArea">
                <textarea
                  name=""
                  id=""
                  placeholder="Type your correction here"
                  ref={factUserExplanation}
                ></textarea>
              </div>
            </div>
          </div>          )}
          {taskType == "Content Translation" && ( <div className="workspaceDesk">
      
            <div className="wsdInstructions">
              <p> <span>TASK:</span> {inst} </p>
         
            </div>
            <div className="wsdContent">
              <div className="wsdContentitle">
                <span>Original Content</span>
              </div>
              <div className="wsdContentParagraph">
                <textarea name="" readOnly value={textotranslate}></textarea>
              </div>
            </div>
            <div className="wsdAnswer">
              <div className="wsdaAnsTextAreaTitle">
                <span>Your Translation</span>
              </div>
              <div className="wsdaAnsTextArea">
                <textarea
                  name=""
                  id=""
                  placeholder="Type your translation here"
                  ref={translatedText}
                ></textarea>
              </div>
            </div>
          </div>)}

          {/* fact check workspace  */}

          <div className="workspacebtn">
            {submitTestLoader ? (
              <div className="workspaceBtnloader">
                     <Jelly
                                  size="45"
                                  speed="1"
                                  color="#6a5acd" 
                                ></Jelly>
              </div>
            ) : (
              <button onClick={submmitAitask}>Submit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
