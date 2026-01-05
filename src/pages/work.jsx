import { Icon } from "@iconify/react";
import useStore from "../store/zustandstore";
import { useEffect } from "react";
import "../css/work.css"

function Workspace(){

    const hideScreenLoader = useStore((s)=> s.hideScreenLoader)



    useEffect(()=>{
        hideScreenLoader()
    },[])


     return(
        <div className="workSpaceWrapper">
             <div className="workspacerPlacer">
                <div className="workSpaceNav">
                    <div className="wspnLeft">
                    <a href="/dasboard">Back</a>
                    </div>
                    <div className="wspnRight">
                        <Icon className="faIcon" icon="solar:clock-circle-outline"/>
                        <p>0 min 0 sec</p>
                        
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
                                <p>This webstie is biult to halp poeple finnd job easly and fast, it not perfact but it wirk good, meny usre enjooy use it daly witout much problm or delay.</p>
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