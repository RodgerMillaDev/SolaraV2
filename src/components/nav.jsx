import { Icon } from "@iconify/react";
import logo1 from "../media/favIcon.png";
import logo2 from "../media/fullLogoTrans.png";
import "../css/navlanding.css";
import "../css/navlandingresp.css"
import { useNavigate } from "react-router-dom";
import useStore from "../store.jsx/zustandstore";

function Navbar() {

  const openFonMenu = useStore((s)=> s.openFonMenu);
  const navigate = useNavigate()


    const showFon = () =>{
      openFonMenu();
    }
    const toAuth=()=>{
      navigate("/auth")
    }
  

  return (
    <nav>
      <div className="navPlacer">
        <div className="navLogo">
          <img src={logo1} alt="" />
        </div>
        <div className="navLinks">
          <div className="navLink">
            <a href="/Jobs">Job Opportunities</a>
          </div>
          <div className="navLink">
            <a href="/Jobs">Dashboard</a>
          </div>
          <div className="navLink">
            <a href="/about">AI Tasks</a>
          </div>
          <div className="navLink">
            <a href="/">Referrals</a>
          </div>
          
         
        </div>
        <div className="fonNavIcon" onClick={showFon}>
                    <Icon className="faIcon" icon="solar:widget-linear" />

        </div>
        <div className="navBtns">
          <div className="navBtn">

            <button onClick={toAuth}>Sign In</button>
          </div>

        </div>
      </div>
    </nav>
  );
}
export default Navbar;
