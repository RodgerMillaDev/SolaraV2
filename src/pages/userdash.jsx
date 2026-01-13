
import { Icon } from "@iconify/react";
import "../css/userdash.css"
import useStore from "../store/zustandstore";
import { useEffect, useRef,useState } from "react";
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
    const showUserDashNav = useStore((s)=>s.showUserDashNav)
 const isUserDashNavActive = useStore((s)=>s.isUserDashNavActive)
   const [greetings, setGreetings] = useState("")

  function getGreetings(){
    const hours = new Date().getHours()
    if(hours < 12) return "Good morning,"
    if(hours < 18) return "Good afternoon,"
    
    return "Good evening,"
  }


  useEffect(()=>{
    setGreetings(getGreetings())
    const interval = setInterval(() => {
    setGreetings(getGreetings())
    }, 60 * 1000);
    return ()=> clearInterval(interval)

  },[])


  
    
    useEffect(()=>{

        if(authStatus==="authenticated"){
        useSocketStore.getState().setUid(currentUserUid)
        useSocketStore.getState().connect()

        }else{
            console.log("waiting to authenticate user")
            
        }
 
    },[authStatus,isUserDashNavActive])
    




    return(
      <div className="userDashWrap">
        <div className={`userDashNavWrap ${isUserDashNavActive ? "userDashNavWrapActive" : ""}`}  >
            <Userdashmenu/>

        </div>
        <div className="userWholeDash">
            <div className="userWholeDashCont">
      <div className="userDashminiNav">
                <span>{greetings}</span>
                <div className="userDashminiNavIcons">
                    <div className="udnbell">
                        <Icon className="faIcon" icon="solar:bell-bing-outline"/>
                    </div>
                    <div className="udnnavIcon" onClick={()=>showUserDashNav()}>
                        <Icon className="faIcon" icon="solar:menu-dots-bold"/>
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