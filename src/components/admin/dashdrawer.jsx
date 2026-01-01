import "../../css/admindash.css"
import bubble from "../../media/whiteFav.png"

import heartRobot from "../../media/heartRobot.png"
function AdminDashDrawer(){
    return (
        <div className="adminDashDrawerPulled">
            <div className="admin-dashLeft">
                <div className="ad-miniWallet">
                      <div className="adMiniPlacer">
                        <div className="miniCashBlc">
                            <span>$230</span>
                            <p>Wallet Balance</p>
                        </div>
                        <div className="miniBlcActions">
                            <button>Disburse</button>
                            <button>Deposit</button>
                        </div>                      
                </div>
                </div>
                <div className="ad-miniStatus">
                    <img className="adminBlob" src={bubble} alt="" />
                    <div className="adMiniPlacer">
                        <img src={heartRobot} alt="" />
                        <p className="statusTxt">We are cruising on nicely Rodger! Kudos.</p>
                    </div>

                </div>

            </div>
            <div className="admin-dashRight">
                <div className="adminGraph">

                </div>
                <div className="adminApplicants">
                    <div className="adminApplicant">
                        <div className="apName">

                            <p>Rodger Milla</p>


                        </div>
                        <div className="apProf">
                            <p>Virtual Assistant</p>

                        </div>
                        <div className="apDate">
                            <p>1st Jun 2026</p>

                        </div>
                        <div className="apAction">
                            <p>View</p>
                        </div>
                    </div>
                    <div className="adminApplicant">
                        <div className="apName">

                            <p>Rodger Milla</p>


                        </div>
                        <div className="apProf">
                            <p>Virtual Assistant</p>

                        </div>
                        <div className="apDate">
                            <p>1st Jun 2026</p>

                        </div>
                        <div className="apAction">
                            <p>View</p>
                        </div>
                    </div>
                    <div className="adminApplicant">
                        <div className="apName">

                            <p>Rodger Milla</p>


                        </div>
                        <div className="apProf">
                            <p>Virtual Assistant</p>

                        </div>
                        <div className="apDate">
                            <p>1st Jun 2026</p>

                        </div>
                        <div className="apAction">
                            <p>View</p>
                        </div>
                    </div>
                    <div className="adminApplicant">
                        <div className="apName">

                            <p>Rodger Milla</p>


                        </div>
                        <div className="apProf">
                            <p>Virtual Assistant</p>

                        </div>
                        <div className="apDate">
                            <p>1st Jun 2026</p>

                        </div>
                        <div className="apAction">
                            <p>View</p>
                        </div>
                    </div>
                    <div className="adminApplicant">
                        <div className="apName">

                            <p>Rodger Milla</p>


                        </div>
                        <div className="apProf">
                            <p>Virtual Assistant</p>

                        </div>
                        <div className="apDate">
                            <p>1st Jun 2026</p>

                        </div>
                        <div className="apAction">
                            <p>View</p>
                        </div>
                    </div>
                    <div className="adminApplicant">
                        <div className="apName">

                            <p>Rodger Milla</p>


                        </div>
                        <div className="apProf">
                            <p>Virtual Assistant</p>

                        </div>
                        <div className="apDate">
                            <p>1st Jun 2026</p>

                        </div>
                        <div className="apAction">
                            <p>View</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )


}

export default AdminDashDrawer;