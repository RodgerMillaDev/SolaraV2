import "../../css/userdashmenu.css"
import user from "../../media/user.png"
import { Icon } from "@iconify/react"
import useStore from "../../store/zustandstore"
import { useRef,useEffect } from "react"

import usefbStore from "../../store/firebasestore"

function Userdashmenu(){
    const isUserProfileActive = useStore((s)=>s.isUserProfileActive)
    const showUserProfile = useStore((s)=>s.showUserProfile)
       const hideScreenLoader = useStore((s)=>s.hideScreenLoader)

    const hideUserProfile = useStore((s)=>s.hideUserProfile)

    const isUserDashboardActive = useStore((s)=>s.isUserDashboardActive)
    const showUserDashboard = useStore((s)=>s.showUserDashboard)
    const hideUserDashboard = useStore((s)=>s.hideUserDashboard)
 const userName = usefbStore((s)=>s.userName)
 const authStatus = usefbStore((s)=>s.authStatus)
 const accountLevel = usefbStore((s)=>s.accountLevel)

 useEffect(()=>{
    if(authStatus === 'authenticated' && userName != null){
              hideScreenLoader()

    }
    return;



 },[authStatus, userName])



    const toUserDash=()=>{
        showUserDashboard()
    }

    const toProfile=()=>{
        showUserProfile()
    }



    return(
        <div className="userDashNav">
                   <div className="userProfile">
                    <div className="userProfileImg">
                         <img src={user} alt="" />
                    </div>
                    <div className="userProfDataMini">
                     <span className="udname" >{userName}</span>
                     <span className="udacctype" >{accountLevel} </span>
                    </div>
       
                   </div>
                   <div className="userDashBtm">
                       <div className="userDashLinks" >
                           <div onClick={toUserDash} className={`udlLink ${isUserDashboardActive ? "udlLinkActive" : ""}`}>
                               <div className="udlLinkIcon">
                                       <Icon className="faIcon" icon="solar:armchair-2-outline"/>
       
                               </div>
                               <div className="udlLinkMenu">
                                   <p>Dashboard</p>
                               </div>
                           </div>
                           <div className="udlLink">
                               <div className="udlLinkIcon">
                                       <Icon className="faIcon" icon="solar:case-outline"/>
       
                               </div>
                               <div className="udlLinkMenu">
                                   <p>Contracts</p>
                               </div>
                           </div>
                           <div onClick={toProfile} className={`udlLink ${isUserProfileActive ? "udlLinkActive" : ""}`}>
                               <div className="udlLinkIcon">
                                       <Icon className="faIcon" icon="solar:user-linear"/>
                               </div>
                               <div className="udlLinkMenu">
                                   <p>My Profile</p>
                               </div>
                           </div>
                           <div className="udlLink">
                               <div className="udlLinkIcon">
                                       <Icon className="faIcon" icon="solar:square-academic-cap-linear"/>
       
                               </div>
                               <div className="udlLinkMenu">
                                   <p>AI Tasks</p>
                               </div>
                           </div>
                           <div className="udlLink">
                               <div className="udlLinkIcon">
                                       <Icon className="faIcon" icon="solar:wallet-2-outline"/>
       
                               </div>
                               <div className="udlLinkMenu">
                                   <p>Payments</p>

                               </div>
                           </div>
                           <div className="udlLink">
                               <div className="udlLinkIcon">
                                       <Icon className="faIcon" icon="solar:diagram-up-linear"/>
       
                               </div>
                               <div className="udlLinkMenu">
                                   <p>Reports</p>
                               </div>
                           </div>
                       </div>
                       <div className="userDashBbtm">
                           <div className="usdbLogout">
                               <span>Having troubles?</span>
                               <p>Talk to Us</p>
                           </div>
                       </div>
       
                   </div>
                   <div className="userBtmNavCover"
                   ></div>
       
                </div>
    )
}

export default Userdashmenu