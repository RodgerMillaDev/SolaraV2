import "../../css/admindash.css"
import bubble from "../../media/whiteFav.png"
import ApexCharts from "apexcharts"

import heartRobot from "../../media/heartRobot.png"
import { useEffect, useRef } from "react"
import usefbStore from "../../store/firebasestore"
import useStore from "../../store/zustandstore"
function AdminDashDrawer(){

    const adminGraph = useRef(null)
    const adminNameRef = useRef(null)
    const adminName = usefbStore((s)=>s.adminName)
    

    useEffect(()=>{
       adminNameRef.current.innerText= (adminName.split(" "))[0]
    },[adminName])

    useEffect(()=>{
    var options = {
          series: [{
          name: 'Applicants',
          data: [31, 40, 28, 51, 42, 109, 100]
        }, {
          name: 'Tasked',
          data: [11, 32, 45, 32, 34, 52, 41]
        }],
        colors:[
            "#5EA7FA",
            "#2332DF"
        ],
          chart: {
          height: "100%",
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
          stroke: {
          curve: "smooth",
          width: 1,
        },
        
        grid: {
          show: false, // ❌ remove grid lines
        },

        legend: {
          show: false, // ❌ remove series legend
        },
        
      
        xaxis: {
          type: 'datetime',
          categories: ["01 Jan ","02 Jan","03 Jan", "04 Jan", "05 Jan", "06 Jan" , "07 Jan"]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
        };
var chart = new ApexCharts(adminGraph.current, options);

chart.render();
        
    },[])


    return (
        <div className="adminDashDrawerPulled">
            <div className="admin-dashLeft">
                <div className="ad-miniWallet">
                      <div className="adMiniPlacer">
                        <div className="miniCashBlc">
                            <span>$230</span>
                            <p>Wallet Balance</p>
                        </div>
                        <div className="miniBlcActions">
                            <button>Disburse</button>
                            <button>Deposit</button>
                        </div>                      
                </div>
                </div>
                <div className="ad-miniStatus">
                    <img className="adminBlob" src={bubble} alt="" />
                    <div className="adMiniPlacer">
                        <p className="statusTxt">We are cruising on nicely <span ref={adminNameRef}></span>! Kudos.</p>
                    </div>

                </div>

            </div>
            <div className="admin-dashRight">
                <div className="adminGraph">
                    <div className="adminGraphCont" ref={adminGraph}>

                    </div>

                </div>
                <div className="adminApplicants">
                    <div className="adminApplicant">
                        <div className="apName">

                            <p>Rodger Milla</p>


                        </div>
                        <div className="apProf">
                            <p>Virtual Assistant</p>

                        </div>
                        <div className="apDate">
                            <p>1st Jun '26</p>

                        </div>
                       
                    </div>
                    <div className="adminApplicant">
                        <div className="apName">

                            <p>Rodger Milla</p>


                        </div>
                        <div className="apProf">
                            <p>Virtual Assistant</p>

                        </div>
                        <div className="apDate">
                            <p>1st Jun '26</p>

                        </div>
                       
                    </div>
                    <div className="adminApplicant">
                        <div className="apName">

                            <p>Rodger Milla</p>


                        </div>
                        <div className="apProf">
                            <p>Virtual Assistant</p>

                        </div>
                        <div className="apDate">
                            <p>1st Jun '26</p>

                        </div>
                       
                    </div>
                    <div className="adminApplicant">
                        <div className="apName">

                            <p>Rodger Milla</p>


                        </div>
                        <div className="apProf">
                            <p>Virtual Assistant</p>

                        </div>
                        <div className="apDate">
                            <p>1st Jun '26</p>

                        </div>
                       
                    </div>
                    <div className="adminApplicant">
                        <div className="apName">

                            <p>Rodger Milla</p>


                        </div>
                        <div className="apProf">
                            <p>Virtual Assistant</p>

                        </div>
                        <div className="apDate">
                            <p>1st Jun '26</p>

                        </div>
                       
                    </div>
                    <div className="adminApplicant">
                        <div className="apName">

                            <p>Rodger Milla</p>


                        </div>
                        <div className="apProf">
                            <p>Virtual Assistant</p>

                        </div>
                        <div className="apDate">
                            <p>1st Jun '26</p>

                        </div>
                       
                    </div>
                    <div className="adminApplicant">
                        <div className="apName">

                            <p>Rodger Milla</p>


                        </div>
                        <div className="apProf">
                            <p>Virtual Assistant</p>

                        </div>
                        <div className="apDate">
                            <p>1st Jun '26</p>

                        </div>
                       
                    </div>
                    <div className="adminApplicant">
                        <div className="apName">

                            <p>Rodger Milla</p>


                        </div>
                        <div className="apProf">
                            <p>Virtual Assistant</p>

                        </div>
                        <div className="apDate">
                            <p>1st Jun '26</p>

                        </div>
                       
                    </div>
                    <div className="adminApplicant">
                        <div className="apName">

                            <p>Rodger Milla</p>


                        </div>
                        <div className="apProf">
                            <p>Virtual Assistant</p>

                        </div>
                        <div className="apDate">
                            <p>1st Jun '26</p>

                        </div>
                       
                    </div>

                </div>

            </div>
        </div>
    )


}

export default AdminDashDrawer;