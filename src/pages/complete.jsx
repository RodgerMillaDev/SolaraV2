
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import humanLaptop from "../media/undraw_sign-here_lxua.svg"
import "../css/workpagepop.css"
import Aos from "aos";
import useStore from "../store/zustandstore";

function Completetask(){

    const hideScreenLoader = useStore((s)=>s.hideScreenLoader)

    useEffect(()=>{
         hideScreenLoader()
         Aos.init({duration:400})
    },[])


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
                               <p>AI Task Score:</p>
                               <p className="trPlastP">93%</p>
                             </div>
                             <div className="taskReward">
                               <p>Reward:</p>
                               <p className="trPlast">+ $0.2</p>

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