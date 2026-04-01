
import { Jelly } from "ldrs/react";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import usefbStore from "../../store/firebasestore";
function UploadJobs(){
    const jobCategory = useRef("")
    const jobName = useRef("")
    const jobDesc = useRef("")
    const jobReq = useRef("")
    const userID = usefbStore((s)=>s.userID)
    const jobPay = useRef("")
    const [submitJobLoader, setsubmitJobLoader] = useState(false)


const UploadJob = async () => {
  // 🔍 Get and trim values
  const jobCatVal = jobCategory.current.value.trim();
  const jobNameVal = jobName.current.value.trim();
  const descVal = jobDesc.current.value.trim();
  const reqVal = jobReq.current.value.trim();
  const payVal = jobPay.current.value.trim();

  // 🚫 Empty check
  if (!jobCatVal || !jobNameVal || !descVal || !reqVal || !payVal) {
    Swal.fire("Error", "Please fill in all fields", "warning");
    return;
  }
  // 🔢 Number check
  if (isNaN(payVal)) {
    Swal.fire("Error", "Job pay must be a number", "warning");
    return;
  }

  setsubmitJobLoader(true);

  try {
    const formData = new FormData();

    formData.append("jobCat", jobCatVal);
    formData.append("jobName", jobNameVal);
    formData.append("jobDesc", descVal);
    formData.append("jobReq", reqVal);
    formData.append("jobPay", payVal);
    formData.append("uid", userID);

    const res = await fetch("https://solaraback-g1bm.onrender.com/uploadJob", {
      method: "POST",
      body: formData,
    });

    // 🛑 Handle non-JSON responses safely
    const text = await res.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      console.error("Server returned non-JSON:", text);
      Swal.fire("Error", "Server error occurred", "error");
      setsubmitJobLoader(false);
      return;
    }

    console.log(data);

    if (data.status === 200) {
      Swal.fire("Success", "Job uploaded successfully", "success");

      // 🧹 Clear inputs after success
      jobCategory.current.value = "";
      jobName.current.value = "";
      jobDesc.current.value = "";
      jobReq.current.value = "";
      jobPay.current.value = "";
    } else {
      Swal.fire("Error", data.msg || "Upload failed", "error");
    }

  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Something went wrong", "error");
  }

  setsubmitJobLoader(false);
};
    return (
        <div className="AIjobswrap">
            <div className="jobuploadInputs">
                <div className="ujwSmallInput">
                    <p>Job Category</p>
                    <div className="ujwSmallInputWrap">
                        <input type="text" name="" id="" ref={jobCategory} placeholder="Job Category" />
                    </div>
                </div>
                <div className="ujwSmallInput">
                    <p>Job Name</p>
                    <div className="ujwSmallInputWrap">
                        <input type="text" name="" id=""  ref={jobName} placeholder="Job Ttile" />
                    </div>
                </div>
               
                <div className="ujwLargeInput">
                    <p>Job Description</p>
                    <div className="ujwSmallTextWrap">
                        <textarea name="" id="" ref={jobDesc} placeholder="Job Description"></textarea>
                    </div>
                </div>
                <div className="ujwLargeInput">
                    <p>Job Requirements</p>
                    <div className="ujwSmallTextWrap">
                        <textarea name="" id="" ref={jobReq} placeholder="Job Requiremnts"></textarea>
                    </div>
                </div>
                    <div className="ujwSmallInput">
                    <p>Job Pay</p>
                    <div className="ujwSmallInputWrap">
                        <input type="number" name="" id="" ref={jobPay} placeholder="Per Hour" />
                    </div>
                </div>
            </div>
            <div className="aiBtnUpload">
                {submitJobLoader ? (
                                    <Jelly size="45" speed="1" color="#6a5acd" />

                ):( <button onClick={()=>UploadJob()}>Upload Job</button>)}
            </div>

        </div>
    )
}
export default UploadJobs