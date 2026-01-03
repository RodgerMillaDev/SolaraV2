import "../../css/aitask.css";
import "ldrs/react/Jelly.css";
import { Jelly } from "ldrs/react";
import { useRef } from "react";
import Swal from "sweetalert2";
import usefbStore from "../../store/firebasestore";


function Aitask(){
    
    const userID = usefbStore((s)=>s.userID)


    const jobType = useRef(null)
    const jobPay = useRef(null)
    const contentRef = useRef(null)
    const aiBtnUploadRef = useRef(null)
    const aiBtnUploadLoadRef = useRef(null)

    const uploadAitask = async () =>{
        const jt = jobType.current.value;
        const jp = jobPay.current.value;
        const cr = contentRef.current.value;
        
        if(jt && jp && cr){
            try {
                aiBtnUploadRef.current.style.display="none"
                aiBtnUploadLoadRef.current.style.display="flex"
                const url = "http://localhost:3322/uploadAITask"
                const data = new FormData()
                data.append("taskType",jt)
                data.append("content",cr)
                data.append("jobpay",jp)
                data.append("uid", userID)
                const resp = await fetch(url,{
                    method:'POST',
                    body:data
                })
                const result = await resp.json()
                console.log(result)
                if(result.status==200){
                    Swal.fire("Uploaded",result.msg, "success")
                aiBtnUploadLoadRef.current.style.display="none"
                aiBtnUploadRef.current.style.display="block"
                   jobType.current.value='';
                   jobPay.current.value= '';
                   contentRef.current.value = '';

                }else{
                    aiBtnUploadLoadRef.current.style.display="none"
                    aiBtnUploadRef.current.style.display="block"
                    Swal.fire("Error",result.msg, "error")
                }
            } catch (error) {
                aiBtnUploadLoadRef.current.style.display="none"
                aiBtnUploadRef.current.style.display="block"
                console.error(error)
                Swal.fire("Error","Try again later", "error")
            }
        }else{
            Swal.fire("Invalid","All inputs are required", "warning")
        }        
    }


    return(
        <div className="AIjobswrap">

            <div className="aijobInputs">
                <div className="aiJobType">
                    <p>AI Task Type:</p>
                    <div className="aitaskselector">
                         <select name="" id="" ref={jobType}>
                        <option value="">Task Type</option>
                        <option value="content-review">Content Review</option>
                        <option value="data-labeling">Data Labeling</option>
                        <option value="ai--image-taging">AI Image Taging</option>
                        <option value="fact-check">Fact Check</option>
                        <option value="resume-snippet-evaluation">Resume Snippet Evaluation</option>
                        <option value="translation-review">Translation Review</option>
                        <option value="website-sability">Website Usability</option>
                    </select>
                    </div>
             
                </div>
                <div className="contentReviewAiJobWrap">
                    <div className="contentInput">
                        <p>Content Paragraph</p>
                        <div className="ciTxtArea">
                        <textarea name="" id="" ref={contentRef} placeholder="Content"></textarea>

                        </div>
                    </div>
                </div>
                <div className="taskPrice">
                    <p>Price:</p>
                    <div className="tpWrap">
                    <input ref={jobPay} type="number" placeholder="$"/>
                    </div>
                </div>

            </div>
            <div className="aiBtnUpload">
                <button onClick={uploadAitask} ref={aiBtnUploadRef}>Upload AI Task</button>
                <div className="aiBtnUploadLoad" ref={aiBtnUploadLoadRef}>
                    <Jelly
                        size="45"
                        speed="1"
                        color="#6a5acd" 
                    ></Jelly>
                </div>
            </div>

        </div>
    )
}
export default Aitask;