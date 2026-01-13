import aitaskImg from "../../media/undraw_firmware_3fxd.svg";
import "../../css/usermaindash.css";
import lineGraphImg from "../../media/wave-haikei (2).svg";
import filesImg from "../../media/undraw_add-files_d04y.svg";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import usefbStore from "../../store/firebasestore";
import { useRef, useEffect, useState } from "react";
import { useSocketStore } from "../../store/socketstore";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useStore from "../../store/zustandstore";
function Maindash() {
  const userID = usefbStore((s) => s.userID);
  const taskResp = useRef(null);
  const navigate = useNavigate();
  const hasTasks = usefbStore((s) => s.hasTasks);
  const taskRespMsg = useSocketStore((s) => s.taskRespMsg);
  const taskRespStatus = useSocketStore((s) => s.taskRespStatus);
  const taskRespCont = useSocketStore((s) => s.taskRespCont);
  const taskArray = usefbStore((s) => s.taskArray);

  const isDesktopLeftDashActive = useStore((s)=> s.isDesktopLeftDashActive)
  const isDesktopRightDashActive = useStore((s)=> s.isDesktopRightDashActive)



  useEffect(() => {
    if (!userID) return;
    const socket = useSocketStore.getState();
    socket.setUid(userID);
    socket.connect();
  }, [userID]);

  const handleAccept = (taskId) => {
   navigate(`/workpopup/${taskId}` );
  };


  const getTask = () => {
    const socket = useSocketStore.getState();
    socket.send({
      type: "requestTask",
      uid: userID,
    });
  };

  useEffect(()=>{
    if(!hasTasks && !taskArray) return;
    taskArray.forEach((task)=>{
      var taskSt = task.status;
      if(taskSt == "active"){
        navigate(`/workspace/${task.taskId}`)
      }
    })

    
  },[hasTasks,taskArray])


  useEffect(() => {
    if (taskRespMsg != null || taskRespStatus != null) {
      Swal.fire(`${taskRespStatus}`, `${taskRespMsg}`, "warning");
    }
  }, [taskRespCont]);


  return (
    <div className="mdlminiContWrapper">
      <div className={`mainDashLeft ${isDesktopLeftDashActive && isDesktopRightDashActive ? "allDashActive" : "" } ${isDesktopLeftDashActive ? "mainDashLeftFonActive-Desk" : "mainDashLeftFonInActive-Desk"}` }>
        <div className="mdlTop">
          <div className="mdlCard1">
            <div className="mdlCard1Cont">
              <img src={lineGraphImg} alt="" />
              <span className="mdlcardTitle">Earnings</span>
              <span className="mdlCard1Income">$146</span>
              <span className="mdlminisum">
                {" "}
                <span className="percentEarn">+ 10%</span> from last month
              </span>
            </div>
          </div>

          <div className="mdlCard2">
            <div className="mdlcard2Wrap">
              <div className="mdlminicard">
                <div className="mdlminicardCont">
                  <div className="mdlminiCardBox">
                    <Icon className="faIcon" icon="solar:medal-star-outline" />
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
            {hasTasks ? (
              <div className="accTaskAssignedWrapper">
                {taskArray.map((task) => (
                  <div key={task.taskId} className="aitaskassignedCard">
                    <div className="aacTaskType">
                      <p>{task.type}</p>
                    </div>
                    <div className="aacTaskPay">
                      <p>Pay ${task.pay}</p>
                    </div>
                    <div
                      className={`aacTaskStatus  ${
                        task.status === "Pending"
                          ? "aacTaskStatusPending"
                          : "aacTaskStatusComplete"
                      }`}
                    >
                      <p>{task.status || "Pending"}</p>
                    </div>
                    <div className="aacTaskAction">
                      {task.status === "Pending" ? (
                        <p
                          className="acceptTaskBtn"
                          onClick={() => handleAccept(task.taskId)}
                        >
                          Accept
                        </p>
                      ) : (
                        <p className="nullBtn">-</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <img src={aitaskImg} alt="" />
                <span ref={taskResp}>
                  Oopps! You have not yet been assigned a task.
                </span>
                <button onClick={getTask}>Get Task</button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={`mainDashRight ${isDesktopLeftDashActive && isDesktopRightDashActive ? "allDashActive" : "" } ${isDesktopRightDashActive ? "mainDashRightFonActive-Desk" : "mainDashLeftFonInActive-Desk"}` }>
        <div className="mdrIntro">
          <p>Applied Jobs</p>
        </div>
        <div className="mdrCont">
          <img src={filesImg} alt="" />
          <span>No job applications found</span>
        </div>
      </div>
    </div>
  );
}

export default Maindash;
