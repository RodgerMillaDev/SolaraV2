
import { Icon } from "@iconify/react";
import "../css/userdash.css"
import useStore from "../store/zustandstore";
import { useEffect, useRef } from "react";
import Maindash from "../components/userdash/usermaindash";
import Userdashmenu from "../components/userdash/userdashsidemenu";
import Userprofile from "../components/userdash/userprofile";
import usefbStore from "../store/firebasestore";
import { useSocketStore } from "../store/socketstore";
function Userdash(){

    const isUserDashboardActive= useStore((s)=>s.isUserDashboardActive)
    const isUserProfileActive= useStore((s)=>s.isUserProfileActive)
    const currentUserUid = usefbStore((s)=>s.userID)
    const authStatus = usefbStore((s)=>s.authStatus)
    const userName = usefbStore((s)=>s.userName)
       const hideScreenLoader = useStore((s)=>s.hideScreenLoader)

    
    useEffect(()=>{

        if(authStatus==="authenticated"){
        useSocketStore.getState().setUid(currentUserUid)
        useSocketStore.getState().connect()

        }else{
            console.log("waiting to authenticate user")
            
        }
 
    },[authStatus])
    




    return(
      <div className="userDashWrap">
        <div className="userDashNavWrap">
            <Userdashmenu/>

        </div>
        <div className="userWholeDash">
            <div className="userWholeDashCont">
<div className="userDashminiNav">
                <span>Good morning,</span>
                <div className="userDashminiNavIcons">
                    <div className="udnbell">
                        <Icon className="faIcon" icon="solar:bell-bing-outline"/>
                    </div>
                </div>




            </div>
            <div className="user-dashDrawerWrap">
                 <div className={`mainDashCont ${isUserDashboardActive ? "mainDashCont-Active" : ""}`}>
                    <Maindash/>
                 </div>
                 <div className={`mainDashCont ${isUserProfileActive ? "mainDashCont-Active" : ""}`}>
                    <Userprofile/>
                 </div>
            </div>
            </div>
            

        </div>
        

      </div>
    )
}

export default Userdash;