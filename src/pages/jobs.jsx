import Navbar from "../components/nav";
import { Icon } from "@iconify/react";
import "../css/jobs.css";
import logo1 from "../media/favIcon.png";
import logo2 from "../media/whiteFav.png";
import man from "../media/undraw_in-the-office_e7pg.svg";
import "../css/jobsresp.css";
import "../css/landing.css";
import useStore from "../store/zustandstore";
import "../css/landingresp.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import usefbStore from "../store/firebasestore";
function Jobs() {
  const navigate = useNavigate();
  const jobArray =  usefbStore((s)=>s.jobArray)
  const closeFonMenu = useStore((s) => s.closeFonMenu);
  const fonMenuDrawer = useStore((s) => s.fonMenuDrawer);
  const hideScreenLoader = useStore((s)=> s.hideScreenLoader)
  const [jobs,setJobs] = useState([])

  useEffect(() => {
  if (!jobArray?.length){
    return ;
  } 
  setJobs(jobArray);
  console.log(jobArray)
}, [jobArray]);

  const cnclFon = () => {
    closeFonMenu();
  };


  const toAuth = () => {
    navigate("/auth");
  };

  return (
    <div className="JobsPage">
      <div className={`fonMenu ${fonMenuDrawer ? "fonMenuActive" : ""}`}>
        <img src={logo2} alt="" />
        <div className="sideMenuPlacer">
          <div className="fonMenuX" onClick={cnclFon}>
            <Icon className="faIcon" icon="solar:alt-arrow-right-linear" />
          </div>
          <div className="fonMenuLinks">
            <a href="/Jobs">Job Opportunities</a>
            <a href="/">Dashbboard</a>
            <a href="/">AI Tasks</a>
            <a href="/">Referral Programme</a>
            <button onClick={toAuth}>Get Started</button>
          </div>
        </div>
      </div>
      <div className="jobsNav navContWhite">
        <Navbar />
      </div>

      <div className="jobsPlacer">
        <div className="jobLeftUi">
          <div className="jobSearch">
            <div className="jobsIcon">
              <Icon className="faIcon" icon="solar:magnifer-linear" />
            </div>
            <div className="jobsSearchInput">
              <input type="text" name="" id="" placeholder="Search Job..." />
            </div>
          </div>
        <div className="jobsActCont">
  {!jobArray?.length ? (
    <p className="ljobsLoad">Loading jobs</p>
  ) : (
    jobs.map((job, index) => (
      <div className="actJob" key={job.id || index}>
        <div className="actJobPlacer">
          <div className="actJobTop">
            <div className="jobIcon">
              <img src={logo1} alt="" />
            </div>
            <div className="jobDet">
              <div className="jobDetTit">
                <h4>{job.jobName}</h4>
              </div>
              <div className="fidiProf">
                <p>{job.jobminiTtile}</p>
              </div>
            </div>
          </div>
          <div className="actJobBtm">
            <div className="jobDetdesc">
              <p>{job.jobDesc}</p>
            </div>
            <div className="miniPriceandApplicants">
              <div className="miniPrice">
                <button>Apply</button>
              </div>
              <div className="miniApplicants">
                <p>${job.jobPay} / hour</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  )}
</div>
        </div>
        <div className="jobRightUi">
          <img src={man} alt="" />
          <p>Select a job to preview</p>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
