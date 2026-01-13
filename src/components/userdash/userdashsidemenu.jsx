import "../../css/userdashmenu.css"
import user from "../../media/user.png"
import { Icon } from "@iconify/react"
import useStore from "../../store/zustandstore"
import { useRef,useEffect } from "react"

import usefbStore from "../../store/firebasestore"
import { auth } from "../../firebase/firebase"
import { Navigate } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth"
import Swal from "sweetalert2"
function Userdashmenu(){
    const isUserProfileActive = useStore((s)=>s.isUserProfileActive)
    const showUserProfile = useStore((s)=>s.showUserProfile)
    const hideScreenLoader = useStore((s)=>s.hideScreenLoader)
    const isUserDashboardActive = useStore((s)=>s.isUserDashboardActive)
    const showUserDashboard = useStore((s)=>s.showUserDashboard)
    const hideUserDashboard = useStore((s)=>s.hideUserDashboard)
 const userName = usefbStore((s)=>s.userName)
 const authStatus = usefbStore((s)=>s.authStatus)
 const accountLevel = usefbStore((s)=>s.accountLevel)
 const hideUserDashNav = useStore((s)=>s.hideUserDashNav)
 const showDesktopLeftDash = useStore((s)=>s.showDesktopLeftDash)
 const hideDesktopLeftDash = useStore((s)=>s.hideDesktopLeftDash)
 const showPayments = useStore((s)=>s.showPayments)
 const userNavLinkActive = useStore((s)=>s.userNavLinkActive)
 const showContracts = useStore((s)=>s.showContracts)

 useEffect(()=>{
    if(authStatus === 'authenticated' && userName != null){
        hideScreenLoader()
    }
    return;
 },[authStatus, userName])


 useEffect(()=>{

 },[])
    const toUserDash=()=>{
        hideUserDashNav()
        showUserDashboard()
    }

    const toStats=()=>{
        hideUserDashNav()
        showUserProfile()
    }
    const toContracts=()=>{
        showContracts()
        hideUserDashNav()
        hideDesktopLeftDash()
    }
    
    const toPayments=()=>{
        hideUserDashNav()
        showPayments()
    }
    
    const logOut =()=>{
          Swal.fire({
                    title:"Are You Sure?",
                    text:"Please confirm you are signing out!",
                    icon:"question",
                    showConfirmButton:true,
                    confirmButtonText:"Log Out",
                    showCancelButton:true,
                    cancelButtonText:"Cancel",
                    cancelButtonColor:"#6a5acd"
                
                }).then((result)=>{
                    if(result.isConfirmed){
                    const auth = getAuth()
                    signOut(auth).then(()=>{
                        Navigate("/auth")
                    }).catch(()=>{
                        Swal.fire("Error", "An error occured", "error")
                    })
                    }
                  
                })
    
      
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
                           <div onClick={toUserDash} className={`udlLink ${userNavLinkActive == "Dashboard" ? "udlLinkActive" : ""}`}>
                               <div className="udlLinkIcon">
                                       <Icon className="faIcon" icon="solar:armchair-2-outline"/>
       
                               </div>
                               <div className="udlLinkMenu">
                                   <p>Dashboard</p>
                               </div>
                           </div>
                           <div className={`udlLink ${userNavLinkActive == "Contracts" ? "udlLinkActive" : ""}`} onClick={toContracts}>
                               <div className="udlLinkIcon">
                                       <Icon className="faIcon" icon="solar:case-outline"/>
       
                               </div>
                               <div className="udlLinkMenu">
                                   <p>Contracts</p>
                               </div>
                           </div>
                           <div onClick={toStats} className={`udlLink ${userNavLinkActive == "MyStats" ? "udlLinkActive" : ""}`}>
                               <div className="udlLinkIcon">
                                       <Icon className="faIcon" icon="solar:user-linear"/>
                               </div>
                               <div className="udlLinkMenu">
                                   <p>My Stats</p>
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
                           <div onClick={toPayments} className={`udlLink ${userNavLinkActive == "Payments" ? "udlLinkActive" : ""}`}>
                               <div className="udlLinkIcon">
                                       <Icon className="faIcon" icon="solar:wallet-2-outline"/>
       
                               </div>
                               <div className="udlLinkMenu">
                                   <p>Payments</p>

                               </div>
                           </div>
                           <div className="udlLink" onClick={logOut}>
                               <div className="udlLinkIcon">
                                       <Icon className="faIcon" icon="solar:logout-outline"/>
       
                               </div>
                               <div className="udlLinkMenu">
                                   <p>Log Out</p>
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
                
       
                </div>
    )
}

export default Userdashmenu