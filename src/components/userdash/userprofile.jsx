import curves from "../../media/layered-waves-haikei.svg";
import "../../css/userprof.css";
import { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import walletImg from "../../media/undraw_wallet_diag.svg"
import { auth } from "../../firebase/firebase";
import ApexCharts from "apexcharts";
import useStore from "../../store/zustandstore";
import axios from "axios";
import usefbStore from "../../store/firebasestore";
function Userprofile() {
  const authStatus = usefbStore((s) => s.authStatus);
  const uplGraph = useRef(null);
  const transactions = usefbStore((s)=>s.transactions);
  const leftProfActive = useStore((s) => s.leftProfActive);
  const userName = usefbStore((s)=>s.userName)
  const userID = usefbStore((s)=>s.userID)
  const [trxnArray,setTrxnArray]= useState([])
  const rightProfActive = useStore((s) => s.rightProfActive);
  const accountBalance = usefbStore((s)=>s.accountBalance)
  const [fname,setFname] = useState("")
  useEffect(() => {
    if (authStatus == "authenticated") {
      var options = {
        series: [
          {
            name: "Task done",
            data: [31, 40, 28, 51, 42, 109, 100, 50, 15, 25, 54, 80],
          },
          {
            name: "Total pa",
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
  useEffect(() => {
  if (!userName) return; // prevent errors

  const shortName = userName.trim().split(" ");
  const fname = shortName[0];
  setFname(fname);
}, [userName]);
const withdrawFunds = async () => {
  const { value: number } = await Swal.fire({
    title: "Withdraw Amount",
    input: "number",
    inputLabel: "Enter Amount",
    inputPlaceholder: "min $50",
    confirmButtonText: "Withdraw",
    reverseButtons: true,
    showCancelButton: true,
    allowOutsideClick: false,
    inputAttributes: {
      maxlength: "10",
      autocapitalize: "off",
      autocorrect: "off",
    },
  });

  if (!number) return;

  if (number < 50) {
    Swal.fire("Invalid Amount", "The minimum withdraw amount is $30", "info");
    return;
  }

  if (number > 10000) {
    Swal.fire("Invalid Amount", "The maximum withdraw amount is $10,000", "info");
    return;
  }

  try {
    // 📦 prepare form data
    const data = new FormData();
    data.append("uid", userID);
    data.append("name", userName);
    data.append("amount", number);

    // 🔐 get token
    const token = await auth.currentUser.getIdToken();

    // 🚀 send request with headers
    const resp = await axios.post(
      "http://localhost:3322/withdrawRequest",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    Swal.fire("Success", "Withdraw request sent.", "success");
    const result =  resp.data


    console.log(result);

  } catch (error) {
  const res = error.response;

  const message =
    res?.data?.msg ||
    (res?.status === 500
      ? "Server error, please try again later"
      : "Request failed");

  Swal.fire("Request Failed", message, "warning");
}
};

useEffect(()=>{
if (!transactions || !Array.isArray(transactions)) {
  return ;
}
setTrxnArray(transactions)
},[transactions])


  return (
    <div className="userProfWrap">
      <div
        className={`userProfLeft ${
          leftProfActive && rightProfActive ? "allProfActive" : ""
        } ${leftProfActive ? "leftProfActive" : "leftProfInActive"} `}
      >
        <div className="uplTop">
          <div className="uplCont">
            <span>{fname},</span>
            <p>Welcome to our community of freelancers </p>
          </div>
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
              <span>${accountBalance}</span>
              <button onClick={()=>withdrawFunds()}>Withdraw</button>
            </div>
          </div>
          <div className="recentTrx">
            <div className="rtXIntro">
              <span >Recent Withdrawals</span>
            </div>
           <div className="rtxWrapper">
  {trxnArray.length <= 0 ? (
    <div className="no-transaction">
      <img src={walletImg} alt="" />
      <span>You've not made any withdraw.</span>
    </div>
  ) : (
    trxnArray.map((trxn, index) => {
      console.log(trxn)
      const dateObj = trxn.createdAt?.toDate();

      const date = dateObj?.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "2-digit",
      });

      const time = dateObj?.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      return (
        <div className="rtxTramsaction" key={trxn.id}>
          <span>{date}</span>
          <span>{time}</span>
          <span
            style={{
              color: trxn.status === "completed" ? "green" : "red",
            }}
          >
            ${trxn.amount}
          </span>
        </div>
      );
    })
  )}
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;
