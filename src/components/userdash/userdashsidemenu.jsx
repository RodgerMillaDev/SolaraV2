import "../../css/userdashmenu.css"
import user from "../../media/user.png"
import { Icon } from "@iconify/react"

function Userdashmenu(){
    return(
        <div className="userDashNav">
                   <div className="userProfile">
                    <div className="userProfileImg">
                         <img src={user} alt="" />
                    </div>
                    <div className="userProfDataMini">
                     <span className="udname">Rodger Milla</span>
                     <span className="udacctype">Pro </span>
                    </div>
       
                   </div>
                   <div className="userDashBtm">
                       <div className="userDashLinks">
                           <div className="udlLink udlLinkActive">
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
                           <div className="udlLink">
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