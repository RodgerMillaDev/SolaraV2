
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import humanLaptop from "../../media/undraw_dev-productivity_5wps.svg"
import "../../css/workpagepop.css"
import Aos from "aos";
import usefbStore from "../../store/firebasestore";
import useStore from "../../store/zustandstore";
import { useSocketStore } from "../../store/socketstore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { doc,getDoc, onSnapshot, serverTimestamp, updateDoc, } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Swal from "sweetalert2";

function WorkPopUp(){
    const navigate = useNavigate()
    const urlParam = useParams();
    const userID = usefbStore((s)=>s.userID)
    const setUid = useSocketStore((s)=>s.setUid)
    const taskBegan = useSocketStore((s)=>s.taskBegan)
    const hideScreenLoader = useStore((s)=>s.hideScreenLoader)
    const connected  = useSocketStore((s)=>s.connected)
    const connect  = useSocketStore((s)=>s.connect)

    useEffect(()=>{
         Aos.init({duration:400})
    },[])
useEffect(() => {
  // Only connect if userID exists
  if (!userID) return;

  // Save UID to socket store
  setUid(userID);

  // Connect socket (with taskId from URL)
  if (!connected) {
    connect();
  }
}, [userID, connected, urlParam.taskId, setUid, connect]);
    useEffect(()=>{
        if(taskBegan){
         navigate(`/workspace/${urlParam.taskId}`)
        }
    },[taskBegan,urlParam.taskId])
    useEffect(()=>{
        if(!urlParam.taskId || !userID) return;
        hideScreenLoader()
        const docRef = doc(db, "Users", userID, "assignedTasks", urlParam.taskId);
        const unsub =  onSnapshot(docRef, (userSnap)=>{
        if(userSnap.exists()){
            const st = userSnap.data().status;
            if(st === "Pending"){

            }
            if(st === "Complete"){
                navigate("/dashboard")
            }
            if(st === "active"){
                navigate(`/workspace/${urlParam.taskId}`)
            }
        }
        })
       
        
        return () => unsub;
    },[urlParam.taskId,userID])

    const toActWork=  ()=>{
        if(!userID || !urlParam.taskId) return;
        const socket = useSocketStore.getState();
      
        socket.send({
            type:"startTask",
            taskId:urlParam.taskId,
            userId:userID,
        })
       
    }


    return (
        <div className="workPopUpWrap">
            <div className="workPopUpPlacer" data-aos="zoom-in">
                <div className="workPopCont">
                    <div className="wpcancel" onClick={()=>{
                         Swal.fire({
                                   title:"Still Unprepared?",
                                   text:"Do you still wish to go back!",
                                   icon:"question",
                                   showConfirmButton:true,
                                   confirmButtonText:"Go back",
                                   showCancelButton:true,
                                   cancelButtonText:"Stay",
                                   cancelButtonColor:"#6a5acd"
                               
                               }).then((result)=>{
                                   if(result.isConfirmed){
                                      navigate("/dashboard")
                                   }
                               })
                        }}>
                        <Icon className="faIcon" icon="solar:arrow-left-linear"/>
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
                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, cupiditate!</li>
                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, cupiditate!</li>
                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, cupiditate!</li>
                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, cupiditate!</li>
                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, cupiditate!</li>
                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, cupiditate!</li>
                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, cupiditate!</li>
                        </ul>
                        </div>
                       
                    </div>
                    <div className="wpcBUtton">
                        <button onClick={toActWork}>Proceed</button>

                    </div>
             
                </div>
            </div>






        </div>
    )
}

export default WorkPopUp;