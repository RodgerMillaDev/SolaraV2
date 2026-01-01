
import Logo1 from "../../media/favIcon.png"
import { Icon } from "@iconify/react";
import "../../css/adminnav.css"
import user from "../../media/user.png"
import { use } from "react";
function AdminMenu(){
    return(
        <div className="adminSidemenu">
            <div className="asmLogo">
                <img src={Logo1} alt="" />
            </div>
            <div className="asmLinks">
                <div className="asmlLink">
                    <div className="asmIcon">
                           <Icon className="faIcon" icon="solar:armchair-2-linear"/>
                    </div>
                    <p>Dashboard</p>

                </div>
                <div className="asmlLink">
                    <div className="asmIcon">
                        <Icon className="faIcon" icon="solar:user-hand-up-linear"/>
                    </div>
                    <p>Applicants</p>

                </div>
                <div className="asmlLink">
                    <div className="asmIcon">
                        <Icon className="faIcon" icon="solar:wallet-linear"/>

                    </div>
                    <p>Wallet</p>

                </div>
                <div className="asmlLink">
                    <div className="asmIcon">
                        <Icon className="faIcon" icon="solar:library-linear"/>

                    </div>
                    <p>All Jobs</p>

                </div>
                <div className="asmlLink">
                    <div className="asmIcon">
                        <Icon className="faIcon" icon="solar:upload-linear"/>

                    </div>
                    <p>New Job</p>

                </div>
                <div className="asmlLink">
                    <div className="asmIcon">
                     <Icon className="faIcon" icon="solar:case-round-outline"/>
                    </div>
                    <p>AI Tasks</p>

                </div>
                <div className="asmlLink">
                    <div className="asmIcon">
                        <Icon className="faIcon" icon="solar:users-group-rounded-linear"/>

                    </div>
                    <p>Freelancers</p>

                </div>

            </div>
            <div className="asmAuth">
                <div className="asmAuthBox">
                    <img src={user} alt="" />
                    <div className="asmAuthCont">
                        <p>Rodger Milla</p>
                        <span>Administrator</span>
                    </div>
                </div>

            </div>





        </div>
    )
}

export default AdminMenu;