
import { use, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import humanLaptop from "../media/undraw_sign-here_lxua.svg"
import "../css/workpagepop.css"
import Aos from "aos";
import useStore from "../store/zustandstore";
import { useParams } from "react-router-dom";

function Completetask(){

    const hideScreenLoader = useStore((s)=>s.hideScreenLoader)
    const urlParam = useParams()
    const [cm,setCm] = useState("")
    const [po,setPayOut] =useState("")

    useEffect(()=>{
         hideScreenLoader()
         Aos.init({duration:400})

    },[])
    useEffect(()=>{
        if( !urlParam.taskId && !urlParam.completeMethod && !urlParam.payOut) return;
        setCm(urlParam.completeMethod)
        setPayOut(urlParam.payOut)
        
        

    },[urlParam.taskId,urlParam.completeMethod,urlParam.payOut])


    return (
        <div className="workPopUpWrap">
            <div className="workPopUpPlacer" data-aos="zoom-in">
                <div className="workPopCont">
                    <div className="wpcancel">
                        <Icon className="faIcon" icon="solar:arrow-left-linear"/>
                    </div>
                    <div className="wpcimg">
                        <img src={humanLaptop} alt="" />
                    </div>
                    <div className="wpcInstructionsComplete">
                        <span>Task Submitted</span>
                        <div className="wpcTaskSubmitResult">
                             <div className="taskScore">
                               <p>Submit Status:</p>
                               <p className="trPlastP">{cm}</p>
                             </div>
                             <div className="taskScore">
                               <p>AI Task Score:</p>
                               <p className="trPlastP">0%</p>
                             </div>
                             <div className="taskReward">
                               <p>Payout:</p>
                               <p className="trPlast">+ ${po}</p>
                             </div>
                             
                        </div>
                    </div>
                    <div className="wpcBUttons">
                        <button >Dashboard</button>
                        <button>Next Task</button>

                    </div>
             
                </div>
            </div>

        </div>
    )
}

export default Completetask;