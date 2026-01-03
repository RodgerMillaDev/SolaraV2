
import { Icon } from "@iconify/react";
import "../css/userdash.css"
import useStore from "../store/zustandstore";
import { useEffect } from "react";
import Maindash from "../components/userdash/usermaindash";
import Userdashmenu from "../components/userdash/userdashsidemenu";

function Userdash(){


    return(
      <div className="userDashWrap">
        <div className="userDashNavWrap">
            <Userdashmenu/>

        </div>
        <div className="userWholeDash">
            <div className="userWholeDashCont">
<div className="userDashminiNav">
                <span>Good morning, <span className="userDashShortName">Rodger</span> </span>
                <div className="userDashminiNavIcons">
                    <div className="udnbell">
                        <Icon className="faIcon" icon="solar:bell-bing-outline"/>
                    </div>
                </div>




            </div>
            <div className="user-dashDrawerWrap">
                 <div className="mainDashCont">
                    <Maindash/>
                 </div>
            </div>
            </div>
            

        </div>
        

      </div>
    )
}

export default Userdash;