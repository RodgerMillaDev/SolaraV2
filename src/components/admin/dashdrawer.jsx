import "../../css/admindash.css"
import bubble from "../../media/whiteFav.png"
import ApexCharts from "apexcharts"

import heartRobot from "../../media/heartRobot.png"
import { useEffect, useRef } from "react"
import useStore from "../../store.jsx/zustandstore"
function AdminDashDrawer(){

    const adminGraph = useRef(null)

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
          height: 400,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
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
                        <img src={heartRobot} alt="" />
                        <p className="statusTxt">We are cruising on nicely Rodger! Kudos.</p>
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

                </div>

            </div>
        </div>
    )


}

export default AdminDashDrawer;