import { Icon } from "@iconify/react";
import useStore from "../store/zustandstore";
import { useEffect, useState } from "react";
import "../css/work.css"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSocketStore } from "../store/socketstore";
import { useParams } from "react-router-dom";
import usefbStore from "../store/firebasestore";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";


function Workspace(){

    const urlParam = useParams()
    const userID = usefbStore((s)=>s.userID)
    const navigate = useNavigate()
    const setUid = useSocketStore((s)=>s.setUid)
    const connected = useSocketStore((s)=>s.connected)
    const taskComplete = useSocketStore((s)=>s.taskComplete)
    const taskTime = useSocketStore((s)=>s.taskTime)
    const connect = useSocketStore((S)=>S.connect)
    const [contentBlock, setContent] = useState("")
    const hideScreenLoader = useStore((s)=> s.hideScreenLoader)

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

    useEffect(()=>{
        if(!userID || !urlParam.taskId) return;
        hideScreenLoader()
  
        const docRef = doc(db, "Users", userID, "assignedTasks", urlParam.taskId)
        const unsub = onSnapshot(docRef, (snap)=>{
            if(!snap.exists()) return;
           var st = snap.data().status;
           var ct = snap.data().originaltext;
           var assignedAt = snap.data().assignedAt;
           setContent(ct)
            if(st === "Pending"){
            navigate(`/workpopup/${urlParam.taskId}`)
           }
           if(st === "Complete"){
            navigate("/complete")
           }
        })
        return ()=> unsub;

    },[urlParam.taskId,userID])
    const backtoDash =()=>{
        Swal.fire({
            title:"Are You Leaving?",
            text:"Your progress will be lost!",
            icon:"warning",
            showConfirmButton:true,
            confirmButtonText:"Yes, Leave",
            showCancelButton:true,
            cancelButtonText:"Continue",
            cancelButtonColor:"#6a5acd"
        
        }).then((result)=>{
            if(result.isConfirmed){
               navigate("/dashboard")
            }
        })
    }

    useEffect(()=>{
        if (!urlParam.taskId) return;
    if(taskComplete == true){
      navigate(`/complete/${urlParam.taskId}`)
    }  
     
  },[taskComplete,urlParam.taskId])

     return(
        <div className="workSpaceWrapper">
             <div className="workspacerPlacer">
                <div className="workSpaceNav">
                    <div className="wspnLeft" onClick={backtoDash}>
                    <p >Back</p>
                    </div>
                    <div className="wspnRight">
                        <Icon className="faIcon" icon="solar:clock-circle-outline"/>
                        <p>{taskTime}</p>
                        
                    </div>
                </div>
                <div className="workSpaceCont">
                    <div className="workspaceDesk">
                        {/* <div className="wsdQuestion">
                            <div className="wsdQuestionTtile">
                                <span>Instruction</span>

                            </div>
                            <div className="wsdQuestionTtile">
                                <p>Correct the below statement and make it sound correct gramartically. <b>DO NOT</b> change the meaning. </p>

                            </div>


                        </div> */}
                        <div className="wsdContent">
                            <div className="wsdContentitle">
                                <span>
                                    Content
                                </span>
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
                            <textarea name="" id="" placeholder="Type your correction here"></textarea>

                            </div>
                        </div>
                    </div>

                    <div className="workspacebtn">
                        <button>Submit</button>

                        {/* <div className="workspaceBtnloader"></div> */}
                    </div>


                </div>
             </div>
        </div>
     )
}

export default Workspace;