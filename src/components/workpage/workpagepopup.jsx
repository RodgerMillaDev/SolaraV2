
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import humanLaptop from "../../media/undraw_dev-productivity_5wps.svg"
import "../../css/workpagepop.css"
import Aos from "aos";
import useStore from "../../store/zustandstore";

function WorkPopUp(){

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
                    <div className="wpcInstructions">
                        <span>Before You Begin</span>
                        <ul>
                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, cupiditate!</li>
                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, cupiditate!</li>
                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, cupiditate!</li>
                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, cupiditate!</li>
                        </ul>
                    </div>
                    <div className="wpcBUttons">
                        <button>Dont Show Again</button>
                                                <button>Proceed</button>

                    </div>
             
                </div>
            </div>






        </div>
    )
}

export default WorkPopUp;