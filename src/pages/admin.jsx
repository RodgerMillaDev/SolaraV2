import { Icon } from "@iconify/react"
import React, { useEffect } from "react";
import useStore from "../store.jsx/zustandstore";
import AdminMenu from "../components/admin/adminsidemenu";
import "../css/admin.css"
import Aitask from "../components/admin/aitask";
import AdminDashDrawer from "../components/admin/dashdrawer";

function Admin(){


    const hideScreenLoader = useStore((s)=> s.hideScreenLoader)
    const isAdminDashActive = useStore((s)=>s.isAdminDashActive)
    const isAItaskActive = useStore((s)=>s.isAItaskActive)


    useEffect(()=>{
        hideScreenLoader();

    },[hideScreenLoader])

    return(
        <div className="adminWrap">
            <div className="adminMenuWrap">
               <AdminMenu />
            </div>
            <div className="adminDash">
                <div className="adminDashTop">
                    <span>Good Morning,</span>
                    <div className="adminTopMini">
                        <div className="adnotify">
                            <div className="newAlert"></div>
                          <Icon className="faIcon" icon="solar:bell-outline"/>
                        </div>
                    </div>

                </div>
                <div className="adminDashDrawer">
                    <div className={`admin-Dash ${isAdminDashActive ? "admin-DashActive" : ""}`}>
                      <AdminDashDrawer/>
                    </div>
                    <div className={`admin-AITask ${isAItaskActive ? `admin-AITaskActive` : ""}`}>
                      <Aitask/>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default Admin;