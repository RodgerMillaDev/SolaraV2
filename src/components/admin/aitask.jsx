import "../../css/aitask.css"

function Aitask(){
    return(
        <div className="AIjobswrap">

            <div className="aijobInputs">
                <div className="aiJobType">
                    <p>AI Task Type:</p>
                    <div className="aitaskselector">
       <select name="" id="">
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
                        <textarea name="" id="" placeholder="Content"></textarea>

                        </div>
                    </div>
                </div>
                <div className="taskPrice">
                    <p>Price:</p>
                    <div className="tpWrap">
                    <input type="number" placeholder="$"/>
                    </div>
                </div>

            </div>
            <div className="aiBtnUpload">
                <button>Upload AI Task</button>

            </div>

        </div>
    )
}
export default Aitask;