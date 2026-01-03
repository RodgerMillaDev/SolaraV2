import aitaskImg  from "../../media/undraw_firmware_3fxd.svg"
import "../../css/usermaindash.css"
import lineGraphImg from "../../media/wave-haikei (2).svg"
import filesImg from "../../media/undraw_add-files_d04y.svg"
import { Icon } from "@iconify/react"
function Maindash(){
    return(

        <div className="mdlminiContWrapper">
            <div className="mainDashLeft">
                <div className="mdlTop">

                    <div className="mdlCard1">
                        <div className="mdlCard1Cont">
                            <img src={lineGraphImg} alt="" />
                            <span className="mdlcardTitle">
                                Earnings
                            </span>
                            <span className="mdlCard1Income">
                                $146
                            </span>
                                <span className="mdlminisum"> <span className="percentEarn">+ 10%</span>  from last month</span>
                        </div>

                    </div>

                    <div className="mdlCard2">
                        <div className="mdlcard2Wrap">
  <div className="mdlminicard">
                            <div className="mdlminicardCont">
                            <div className="mdlminiCardBox">
   <Icon className="faIcon" icon="solar:medal-star-outline"/>
                            </div>
                                <div className="mdlminicardContData">
                                    <p>Rank</p>
                                    <span>Pro level</span>
                                </div>
                            </div>
                        </div>
                        <div className="mdlminicard2">
                            <div className="mdlminicardCont2">
                                <div className="mdlcboxT">
                                <div className="mdlminiCardBox">
   {/* <Icon className="faIcon" icon="solar:file-text-outline"/> */}
   <span className="projTaken">28</span>

                                </div>
                                <div className="mdlminicardContData">
                                    <p>Projects</p>
                                    <span>Since sign up</span>
                                </div>
                                </div>
                                <div className="mdlcboxB">
                                    <button>Previous Tasks</button>
                                </div>
                          
                            </div>
                        </div>
                        </div>
                      

                    </div>


                </div>
                <div className="mdlBtm">

                    <div className="mdlBtmIntro">
                        <span>Assigned AI Tasks</span>
                    </div>
                    <div className="mdlBtmAITasksAssigned">
                         <img src={aitaskImg} alt="" />
                         <span>Oopps! You have not yet been assigned a task.</span>
                    </div>

                </div>

            </div>
            <div className="mainDashRight">
                <div className="mdrIntro">
                    <p>Applied Jobs</p>
                </div>
                <div className="mdrCont">
                                             <img src={filesImg} alt="" />

                    <span>No job applications found</span>
                </div>

            </div>

        </div>
    )
}

export default Maindash