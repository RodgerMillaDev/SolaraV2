// screeningcomplete.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import usefbStore from "../store/firebasestore";
import userDone from "../media/undraw_project-completed_ug9i.svg"

function ScreeningComplete() {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, total, percentage, passed, timeExpired } = location.state || {};
    const userID = usefbStore((s) => s.userID);
    
    useEffect(() => {
        if (!score && !passed) {
            // If no results, redirect to dashboard
            navigate("/dashboard");
        }
    }, [score, passed, navigate]);
    
    return (
        <div className="completeScreening">
            <div className={`result-card ${passed ? "passed" : "failed"}`}>
                <img src={userDone} alt="" />
                <h3 className="resTit">{passed ? "Congratulations!" : "Keep Learning!"}</h3>
                
            
        
                <div className="message">
                    <p>
                    {passed 
                        ? "You passed the screening test! You can now access tasks." 
                        : "You didn't pass this time. Review the material and try again."}
                    </p>
                </div>
                <div className="compBtmBtns">
                      <button 
                    className="dashboard-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    Go to Dashboard
                </button>
                
            
                </div>

                
              
            </div>
        </div>
    );
}

export default ScreeningComplete;