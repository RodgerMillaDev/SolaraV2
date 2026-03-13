
import { use, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import humanLaptop from "../media/undraw_sign-here_lxua.svg"
import "../css/workpagepop.css"
import Swal from "sweetalert2";
import Aos from "aos";
import { getAuth,signOut } from "firebase/auth";

import { useSocketStore } from "../store/socketstore";
import useStore from "../store/zustandstore";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import usefbStore from "../store/firebasestore";


function Completetask(){

    const hideScreenLoader = useStore((s)=>s.hideScreenLoader)
    const urlParam = useParams()
    const aIScore = useSocketStore(S=>S.aIScore)
    const taskCompleteError = useSocketStore((s)=>s.taskCompleteError)
    const taskCompleteErrorMsg = useSocketStore((s)=>s.taskCompleteErrorMsg)
    const navigate= useNavigate()
    const { taskId, completeMethod: urlCompleteMethod, payOut: urlPayOut, aIScore:urlAiScore } = useParams();

    const forceLogout = useSocketStore((s)=>s.forceLogout)
    const socket = useSocketStore.getState();
      const authStatus = usefbStore((s) => s.authStatus);

        useEffect(()=>{
        if(authStatus=="unauthenticated"){
              navigate("/auth")
        }
        
       },[authStatus])

// Reset task state after viewing complete page
useEffect(() => {
  return () => {
    socket.resetTaskState();
  };
}, []);


    useEffect(()=>{
      if(taskCompleteError == null) return;
      Swal.fire("Server Error", `${taskCompleteErrorMsg}`, "warning").then(()=>{
        navigate("dashboard")
      })

    },[taskCompleteError])
      
    
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
      
    useEffect(()=>{
         hideScreenLoader()
         Aos.init({duration:400})

    },[])
  
    


    return (
        <div className="workPopUpWrap">
            <div className="workPopUpPlacer" data-aos="zoom-in">
                <div className="workPopCont">
           
                    <div className="wpcimg">
                        <img src={humanLaptop} alt="" />
                    </div>
                    <div className="wpcInstructionsComplete">
                        <span>Task Submitted</span>
                        <div className="wpcTaskSubmitResult">
                             <div className="taskScore">
                               <p>Submit Status:</p>
                               <p className="trPlastP">{urlCompleteMethod}</p>
                             </div>
                             <div className="taskScore">
                               <p>AI Task Score:</p>
                               <p className="trPlastP">{urlAiScore}%</p>
                             </div>
                             <div className="taskReward">
                               <p>Payout:</p>
                               <p className="trPlast">+ ${urlPayOut}</p>
                             </div>
                             
                        </div>
                    </div>
                    <div className="wpcBUttons wpcBUttonsS">
                        <button onClick={()=>navigate("/dashboard")}>Done</button>

                    </div>
             
                </div>
            </div>

        </div>
    )
}

export default Completetask;