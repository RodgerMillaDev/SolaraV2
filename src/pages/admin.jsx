import { Icon } from "@iconify/react"
import React, { useEffect } from "react";
import useStore from "../store.jsx/zustandstore";
import AdminMenu from "../components/admin/adminsidemenu";
import "../css/admin.css"
import AdminDashDrawer from "../components/admin/dashdrawer";

function Admin(){


    const hideScreenLoader = useStore((s)=> s.hideScreenLoader)


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
                    <div className="admin-Dash">
                      <AdminDashDrawer/>
                    </div>

                </div>
            </div>
        </div>
    )


}

export default Admin;