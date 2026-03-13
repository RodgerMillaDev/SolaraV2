import "../../css/aitask.css";
import "ldrs/react/Jelly.css";
import { Jelly } from "ldrs/react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import usefbStore from "../../store/firebasestore";


function Aitask(){
    
    const userID = usefbStore((s)=>s.userID)
    const jobType = useRef(null)
    const jobPay = useRef(null)
    const contentRef = useRef('')
    const contentFactRef = useRef(null)
    const trnsCont = useRef(null)
    const trnsLang = useRef(null)
    const [selectedTask, setSelectedTask] = useState("Content Review")
    const aiBtnUploadRef = useRef(null)
    const factCheckQ = useRef(null)
    const factCheckV = useRef(null)
    const aiBtnUploadLoadRef = useRef(null)
    const uploadAitask = async () =>{
        const jt = jobType.current.value;
        const jp = Number(jobPay.current.value);

      if(jt == "Content Translation"){
         uploadContentTranslationTask()
         return;
      }
      if(jt == "Fact Check"){
         uploadFactCheckTask()
         return;
      }
       const cr = contentRef.current.value;
        if(jt == "Content Review" && jp && cr){
            try {
                aiBtnUploadRef.current.style.display="none"
                aiBtnUploadLoadRef.current.style.display="flex"
                const url = "https://solaraback-g1bm.onrender.com/uploadAITask"
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


    const uploadContentTranslationTask= async ()=>{
        const jp = Number(jobPay.current.value);
        const tl = (trnsLang.current.value);
        const tc = (trnsCont.current.value);

        if(jp && tl && tc){
            try {
                aiBtnUploadRef.current.style.display="none"
                aiBtnUploadLoadRef.current.style.display="flex"
                const url = "https://solaraback-g1bm.onrender.com/uploadTranslationTask"
                const data = new FormData()
                data.append("taskType","Content Translation")
                data.append("content",tc)
                data.append("trnsLang",tl)
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
                   trnsLang.current.value = '';
                   trnsCont.current.value = '';

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
        }
        else{
            Swal.fire("Invalid","All inputs are required", "warning")
        } 
         
    }
    const uploadFactCheckTask= async ()=>{
        const jp = Number(jobPay.current.value);
        const q = (factCheckQ.current.value);
        const v = (factCheckV.current.value);
        const e = (contentFactRef.current.value);

        if(jp && q && v && e){
            try {
                aiBtnUploadRef.current.style.display="none"
                aiBtnUploadLoadRef.current.style.display="flex"
                const url = "https://solaraback-g1bm.onrender.com/uploadFactCheckTask"
                const data = new FormData()
                data.append("taskType","Fact Check")
                data.append("statement",q)
                data.append("explanation",e)
                data.append("verdict",v)
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
                   factCheckQ.current.value = '';
                   factCheckV.current.value = '';
                   contentFactRef.current.value = '';

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
        }
        else{
            Swal.fire("Invalid","All inputs are required", "warning")
        } 
         
    }

    return(
        <div className="AIjobswrap">

            <div className="aijobInputs">
                <div className="aiJobType">
                    <p>AI Task Type:</p>
                    <div className="aitaskselector">
                         <select name="" id="" ref={jobType} onChange={(e)=> setSelectedTask(e.target.value)}>
                        <option value="">Task Type</option>
                        <option value="Content Review">Content Review</option>
                        <option value="Fact Check">Fact Check</option>
                        <option value="Content Translation">Content Translation</option>
                    </select>
                    </div>
             
                </div>
                  

                  <div className="contentReviewWrapUploader">

                    <div className="mainTaskHolderContaincer">
                                          {/* content Review  */}
                        {selectedTask == "Content Review" && ( <div className="contentInput">
                                <p>Content Paragraph</p>
                                <div className="ciTxtArea">
                                <textarea name=""  ref={contentRef} placeholder="Content"></textarea>

                                </div>
                            
                        </div>)}
                       {selectedTask == "Fact Check" && (
                        <>
                          <div className="factCheckQuiz">
                            <p>Statement:</p>
                            <div className="factCHeckQuizInput">
                                <input type="text" ref={factCheckQ} placeholder="Statement" />

                            </div>
                        </div>
                          <div className="factCheckQuiz">
                            <p>Verdict:</p>
                            <div className="factCHeckQuizInput">
                                <select name="" placeholder ref={factCheckV} id="">
                                    <option value="">Select Verdict</option>
                                    <option value="True">True</option>
                                    <option value="False">False</option>
                                </select>

                            </div>
                        </div>
                         <div className="factCheckcontentInput">
                                <p>Explanation</p>
                                <div className="ciTxtArea">
                                <textarea name="" id="" ref={contentFactRef} placeholder="Explanation"></textarea>

                                </div>
                            
                        </div>
                        </>
                      )}
                           {selectedTask == "Content Translation" && (    <>
                               <div className="translationLang">
                             <p>Translate to?</p>
                             <div className="translationLangInput">
                                 <select name="" ref={trnsLang}>
                                    <option value="">Select Language</option>
                                            <option value="DE">German</option>
                                            <option value="FR">French</option>
                                            <option value="ES">Spanish</option>
                                            <option value="IT">Italian</option>
                                            <option value="pt-BR">Portuguese</option>
                                            <option value="NL">Dutch</option>
                                            <option value="DA">Danish</option>
                                            <option value="SV">Swedish</option>
                                            <option value="PL">Polish</option>
                                            <option value="CS">Czech</option>
                                            <option value="SW">Swahili</option>
                                 </select>
                             </div>
                        </div>
                        <div className="translateParagraph">
                            <p>Transalate Content:</p>
                            <div className="translateTxt">
                                <textarea name="" ref={trnsCont} placeholder="Content"></textarea>
                            </div>
                        </div>
                        </>
                        )}

            

                    </div>
               

                <div className="taskPrice">
                    <p>Pay:</p>
                    <div className="tpWrap">
<input
ref={jobPay}
placeholder="$"
  type="number"
  step="0.1"
  onKeyDown={(e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  }}
/>
                    </div>
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