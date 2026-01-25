import curves from "../../media/layered-waves-haikei.svg";
import "../../css/userprof.css";
import { useRef, useEffect } from "react";
import ApexCharts from "apexcharts";
import useStore from "../../store/zustandstore";
import usefbStore from "../../store/firebasestore";
function Userprofile() {
  const authStatus = usefbStore((s) => s.authStatus);
  const uplGraph = useRef(null);
  const leftProfActive = useStore((s) => s.leftProfActive);
  const rightProfActive = useStore((s) => s.rightProfActive);
  useEffect(() => {
    if (authStatus == "authenticated") {
      var options = {
        series: [
          {
            name: "Task applied",
            data: [31, 40, 28, 51, 42, 109, 100, 50, 15, 25, 54, 80],
          },
          {
            name: "Tasked paid",
            data: [11, 32, 45, 32, 34, 52, 41, 1, 5, 40, 55, 7],
          },
        ],
        colors: ["#5EA7FA", "#2332DF"],
        chart: {
          height: "86%",
          width: "100%",
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        toolBar: {
          enabled: false,
        },

        stroke: {
          curve: "smooth",
          width: 1,
        },
        xaxis: {
          type: "Months",
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          labels: {
            show: false,
          },
        },
        yaxis: {},

        grid: {
          show: false, // ❌ remove grid lines
        },

        legend: {
          show: false, // ❌ remove series legend
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      };
      var chart = new ApexCharts(uplGraph.current, options);

      chart.render();
    }
  }, [authStatus]);
  return (
    <div className="userProfWrap">
      <div
        className={`userProfLeft ${
          leftProfActive && rightProfActive ? "allProfActive" : ""
        } ${leftProfActive ? "leftProfActive" : "leftProfInActive"} `}
      >
        <div className="uplTop">
          <div className="uplCont">
            <span>Rodger,</span>
            <p>Welcome to our community of freelancers </p>
          </div>
          <img src={curves} alt="" />
        </div>
        <div className="uplBtm">
          <p>Monthly Income</p>
          <div className="uplGRraph" ref={uplGraph}></div>
        </div>
      </div>
      <div
        className={`userProfRight ${
          leftProfActive && rightProfActive ? "allProfActive" : ""
        } ${rightProfActive ? "rightProfActive" : "rightProfInActive"} `}
      >
        <div className="uprTop">
          <div className="uprAccBalance">
            <div className="uprAccBlCont">
              <p>Wallet Balance</p>
              <span>$0</span>
              <button>Request Payment</button>
            </div>
          </div>
          <div className="recentTrx">
            <div className="rtXIntro">
              <span>Recent Withdrawals</span>
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
      </div>
    </div>
  );
}

export default Userprofile;
