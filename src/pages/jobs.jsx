import Navbar from "../components/nav";
import { Icon } from "@iconify/react";
import "../css/jobs.css";
import logo1 from "../media/favIcon.png";
import logo2 from "../media/whiteFav.png";
import manTab from "../media/manTab.png";
import "../css/jobsresp.css";
import "../css/landing.css";
import useStore from "../store.jsx/zustandstore";
import "../css/landingresp.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Jobs() {
  const navigate = useNavigate();
  const closeFonMenu = useStore((s) => s.closeFonMenu);
  const fonMenuDrawer = useStore((s) => s.fonMenuDrawer);
  const hideScreenLoader = useStore((s)=> s.hideScreenLoader)

  useEffect(()=>{
    hideScreenLoader()
  }, [hideScreenLoader])

  const cnclFon = () => {
    closeFonMenu();
  };

  const toAuth = () => {
    console.log("i");

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
            <div class="actJob">
              <div class="actJobPlacer">
                <div class="actJobTop">
                  <div class="jobIcon">
                    <img src={logo1} alt="" />
                  </div>
                  <div class="jobDet">
                    <div class="jobDetTit">
                      <h4>Virtual Assistant Jobs Entry Level Jobdn</h4>
                    </div>
                    <div class="fidiProf">
                      <p>Virtual Assistant</p>
                    </div>
                  </div>
                </div>
                <div class="actJobBtm">
                  <div class="jobDetdesc">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Mollitia hic quaerat reiciendis officia facere, maxime
                      consequatur aut voluptate optio veniam.
                    </p>
                  </div>

                  <div class="miniPriceandApplicants">
                    <div class="miniPrice">
                      <button>Apply</button>
                    </div>
                    <div class="miniApplicants">
                      <p>$20 - $34 / hour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="actJob">
              <div class="actJobPlacer">
                <div class="actJobTop">
                  <div class="jobIcon">
                    <img src={logo1} alt="" />
                  </div>
                  <div class="jobDet">
                    <div class="jobDetTit">
                      <h4>Virtual Assistant Jobs Entry Level Jobdn</h4>
                    </div>
                    <div class="fidiProf">
                      <p>Virtual Assistant</p>
                    </div>
                  </div>
                </div>
                <div class="actJobBtm">
                  <div class="jobDetdesc">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Mollitia hic quaerat reiciendis officia facere, maxime
                      consequatur aut voluptate optio veniam.
                    </p>
                  </div>

                  <div class="miniPriceandApplicants">
                    <div class="miniPrice">
                      <button>Apply</button>
                    </div>
                    <div class="miniApplicants">
                      <p>$20 - $34 / hour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="actJob">
              <div class="actJobPlacer">
                <div class="actJobTop">
                  <div class="jobIcon">
                    <img src={logo1} alt="" />
                  </div>
                  <div class="jobDet">
                    <div class="jobDetTit">
                      <h4>Virtual Assistant Jobs Entry Level Jobdn</h4>
                    </div>
                    <div class="fidiProf">
                      <p>Virtual Assistant</p>
                    </div>
                  </div>
                </div>
                <div class="actJobBtm">
                  <div class="jobDetdesc">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Mollitia hic quaerat reiciendis officia facere, maxime
                      consequatur aut voluptate optio veniam.
                    </p>
                  </div>

                  <div class="miniPriceandApplicants">
                    <div class="miniPrice">
                      <button>Apply</button>
                    </div>
                    <div class="miniApplicants">
                      <p>$20 - $34 / hour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="actJob">
              <div class="actJobPlacer">
                <div class="actJobTop">
                  <div class="jobIcon">
                    <img src={logo1} alt="" />
                  </div>
                  <div class="jobDet">
                    <div class="jobDetTit">
                      <h4>Virtual Assistant Jobs Entry Level Jobdn</h4>
                    </div>
                    <div class="fidiProf">
                      <p>Virtual Assistant</p>
                    </div>
                  </div>
                </div>
                <div class="actJobBtm">
                  <div class="jobDetdesc">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Mollitia hic quaerat reiciendis officia facere, maxime
                      consequatur aut voluptate optio veniam.
                    </p>
                  </div>

                  <div class="miniPriceandApplicants">
                    <div class="miniPrice">
                      <button>Apply</button>
                    </div>
                    <div class="miniApplicants">
                      <p>$20 - $34 / hour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="actJob">
              <div class="actJobPlacer">
                <div class="actJobTop">
                  <div class="jobIcon">
                    <img src={logo1} alt="" />
                  </div>
                  <div class="jobDet">
                    <div class="jobDetTit">
                      <h4>Virtual Assistant Jobs Entry Level Jobdn</h4>
                    </div>
                    <div class="fidiProf">
                      <p>Virtual Assistant</p>
                    </div>
                  </div>
                </div>
                <div class="actJobBtm">
                  <div class="jobDetdesc">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Mollitia hic quaerat reiciendis officia facere, maxime
                      consequatur aut voluptate optio veniam.
                    </p>
                  </div>

                  <div class="miniPriceandApplicants">
                    <div class="miniPrice">
                      <button>Apply</button>
                    </div>
                    <div class="miniApplicants">
                      <p>$20 - $34 / hour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="actJob">
              <div class="actJobPlacer">
                <div class="actJobTop">
                  <div class="jobIcon">
                    <img src={logo1} alt="" />
                  </div>
                  <div class="jobDet">
                    <div class="jobDetTit">
                      <h4>Virtual Assistant Jobs Entry Level Jobdn</h4>
                    </div>
                    <div class="fidiProf">
                      <p>Virtual Assistant</p>
                    </div>
                  </div>
                </div>
                <div class="actJobBtm">
                  <div class="jobDetdesc">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Mollitia hic quaerat reiciendis officia facere, maxime
                      consequatur aut voluptate optio veniam.
                    </p>
                  </div>

                  <div class="miniPriceandApplicants">
                    <div class="miniPrice">
                      <button>Apply</button>
                    </div>
                    <div class="miniApplicants">
                      <p>$20 - $34 / hour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="actJob">
              <div class="actJobPlacer">
                <div class="actJobTop">
                  <div class="jobIcon">
                    <img src={logo1} alt="" />
                  </div>
                  <div class="jobDet">
                    <div class="jobDetTit">
                      <h4>Virtual Assistant Jobs Entry Level Jobdn</h4>
                    </div>
                    <div class="fidiProf">
                      <p>Virtual Assistant</p>
                    </div>
                  </div>
                </div>
                <div class="actJobBtm">
                  <div class="jobDetdesc">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Mollitia hic quaerat reiciendis officia facere, maxime
                      consequatur aut voluptate optio veniam.
                    </p>
                  </div>

                  <div class="miniPriceandApplicants">
                    <div class="miniPrice">
                      <button>Apply</button>
                    </div>
                    <div class="miniApplicants">
                      <p>$20 - $34 / hour </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="actJob">
              <div class="actJobPlacer">
                <div class="actJobTop">
                  <div class="jobIcon">
                    <img src={logo1} alt="" />
                  </div>
                  <div class="jobDet">
                    <div class="jobDetTit">
                      <h4>Virtual Assistant Jobs Entry Level Jobdn</h4>
                    </div>
                    <div class="fidiProf">
                      <p>Virtual Assistant</p>
                    </div>
                  </div>
                </div>
                <div class="actJobBtm">
                  <div class="jobDetdesc">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Mollitia hic quaerat reiciendis officia facere, maxime
                      consequatur aut voluptate optio veniam.
                    </p>
                  </div>

                  <div class="miniPriceandApplicants">
                    <div class="miniPrice">
                      <button>Apply</button>
                    </div>
                    <div class="miniApplicants">
                      <p>$20 - $34 / hour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="actJob">
              <div class="actJobPlacer">
                <div class="actJobTop">
                  <div class="jobIcon">
                    <img src={logo1} alt="" />
                  </div>
                  <div class="jobDet">
                    <div class="jobDetTit">
                      <h4>Virtual Assistant Jobs Entry Level Jobdn</h4>
                    </div>
                    <div class="fidiProf">
                      <p>Virtual Assistant</p>
                    </div>
                  </div>
                </div>
                <div class="actJobBtm">
                  <div class="jobDetdesc">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Mollitia hic quaerat reiciendis officia facere, maxime
                      consequatur aut voluptate optio veniam.
                    </p>
                  </div>

                  <div class="miniPriceandApplicants">
                    <div class="miniPrice">
                      <button>Apply</button>
                    </div>
                    <div class="miniApplicants">
                      <p>$20 - $34 / hour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="actJob">
              <div class="actJobPlacer">
                <div class="actJobTop">
                  <div class="jobIcon">
                    <img src={logo1} alt="" />
                  </div>
                  <div class="jobDet">
                    <div class="jobDetTit">
                      <h4>Virtual Assistant Jobs Entry Level Jobdn</h4>
                    </div>
                    <div class="fidiProf">
                      <p>Virtual Assistant</p>
                    </div>
                  </div>
                </div>
                <div class="actJobBtm">
                  <div class="jobDetdesc">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Mollitia hic quaerat reiciendis officia facere, maxime
                      consequatur aut voluptate optio veniam.
                    </p>
                  </div>

                  <div class="miniPriceandApplicants">
                    <div class="miniPrice">
                      <button>Apply</button>
                    </div>
                    <div class="miniApplicants">
                      <p>$20 - $34 / hour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="jobRightUi">
          <img src={manTab} alt="" />
          <p>Select a job to preview</p>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
