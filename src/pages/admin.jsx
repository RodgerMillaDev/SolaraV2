import { Icon } from "@iconify/react"
import React, { useEffect, useState } from "react";
import useStore from "../store/zustandstore";
import AdminMenu from "../components/admin/adminsidemenu";
import "../css/admin.css"
import { useNavigate } from "react-router-dom";
import Aitask from "../components/admin/aitask";
import usefbStore from "../store/firebasestore";
import { doc, getDoc } from "firebase/firestore";
import {auth,db} from "../firebase/firebase"
import AdminDashDrawer from "../components/admin/dashdrawer";

function Admin(){


    const hideScreenLoader = useStore((s)=> s.hideScreenLoader)
    const isAdminDashActive = useStore((s)=>s.isAdminDashActive)
    const isAItaskActive = useStore((s)=>s.isAItaskActive)
    const navigate = useNavigate()
    const setAdminName = usefbStore((s)=>s.setAdminName)
    const setUserID = usefbStore((s)=>s.setUserID)


    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(async(user)=>{
            if(!user)
                return;
            const token = await user.getIdTokenResult();
            setUserID(user.uid)
            if(token.claims.admin){
                const userRef = doc(db, "Users", user.uid)
                const userSnap = await getDoc(userRef)
                if(userSnap.exists()){
                    var name = userSnap.data().name;
                    setAdminName(name)
                    hideScreenLoader();
                }else{
                    console.log("no such doc")

                }
          
            }else{
                // navigate("/")
            }
        })

        return ()=> unsubscribe()


    },[])

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