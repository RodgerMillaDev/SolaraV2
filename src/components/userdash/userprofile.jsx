import curves from "../../media/layered-waves-haikei.svg"
import "../../css/userprof.css"
import { useRef,useEffect } from "react";
import ApexCharts from "apexcharts";
import usefbStore from "../../store/firebasestore";
function Userprofile(){
    const authStatus = usefbStore((s)=>s.authStatus)
    const uplGraph = useRef(null)
        useEffect(()=>{
            if(authStatus=="authenticated"){
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
              height: "85%",
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },

            stroke: {
              curve: 'smooth',
              width:1,
            },
            xaxis: {
              type: 'datetime',
              categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
              labels:{
                show:false
              }
            },
             yaxis: {
     
      },

      grid: {
        show: false // ❌ remove grid lines
      },

      legend: {
        show: false // ❌ remove series legend
      },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
            };
    var chart = new ApexCharts(uplGraph.current, options);
    
    chart.render();
            }
  
            
        },[authStatus])
  return(
    <div className="userProfWrap">
        <div className="userProfLeft">
            <div className="uplTop">

                <div className="uplCont">
                    <span>Rodger,</span>
                    <p>Welcome to our community of freelancers </p>
                </div>
                <img src={curves} alt="" />



            </div>
            <div className="uplBtm">
                <p>Monthly Income</p>
                <div className="uplGRraph" ref={uplGraph}>

                </div>
             
            </div>
            
        </div>
        <div className="userProfRight">
            <div className="uprTop">
                <div className="uprAccBalance">
                    <div className="uprAccBlCont">
 <p>Wallet Balance</p>
                    <span>$0</span>
                    <button>Get Paid</button>

                    </div>
                   
                </div>
                <div className="recentTrx">
                    <div className="rtXIntro">
                        <p>Recent Withdrawals</p>
                    </div>
                    <div className="rtxWrapper">
                   <div className="rtxTramsaction">
                    <span>17th Jun '22</span>
                    <span>1:00pm</span>
                    <span>$2,324</span>

                    </div>
                   <div className="rtxTramsaction">
                    <span>17th Jun '22</span>
                    <span>1:00pm</span>
                    <span>$13</span>

                    </div>
                   <div className="rtxTramsaction">
                    <span>17th Jun '22</span>
                    <span>1:00pm</span>
                    <span>$432</span>

                    </div>
                   <div className="rtxTramsaction">
                    <span>17th Jun '22</span>
                    <span>1:00pm</span>
                    <span>$20</span>

                    </div>
                   <div className="rtxTramsaction">
                    <span>17th Jun '22</span>
                    <span>1:00pm</span>
                    <span>$20</span>

                    </div>
                    </div>
                    
                   
                </div>
             
           

            </div>
            <div className="uprBottom">
                <div className="uprBtmCont">
                    <p>Account Actions</p>
                    <div className="uprBtmBtns">
                        <button className="dltAcc">Delete Acount</button>
                        <button className="sgnOutAcc">Log Out</button>
                    </div>
                </div>
            </div>
            
           
        </div>

    </div>
  )
}

export default Userprofile;