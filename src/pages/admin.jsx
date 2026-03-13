import { Icon } from "@iconify/react"
import React, { useEffect, useState } from "react";
import useStore from "../store/zustandstore";
import AdminMenu from "../components/admin/adminsidemenu";
import "../css/admin.css"
import { useNavigate } from "react-router-dom";
import Aitask from "../components/admin/aitask";
import HeadlineReview from "../components/admin/headlinereview";
import usefbStore from "../store/firebasestore";
import AdminLoader from "../components/admin/adminLoader";
import { doc, getDoc } from "firebase/firestore";
import {auth,db} from "../firebase/firebase"
import AdminDashDrawer from "../components/admin/dashdrawer";

function Admin(){


    const hideScreenLoader = useStore((s)=> s.hideScreenLoader)
    const isAdminDashActive = useStore((s)=>s.isAdminDashActive)
    const isAItaskActive = useStore((s)=>s.isAItaskActive)
    const navigate = useNavigate()
    const setAdminName = usefbStore((s)=>s.setAdminName)
    const authStatus =usefbStore((s)=>s.authStatus)
    const setUserID = usefbStore((s)=>s.setUserID)
     const removeAdminLoader = useStore((s)=>s.removeAdminLoader)
    const setAdminLoader = useStore((s)=>s.setAdminLoader)
    const adminLoader = useStore((s)=>s.adminLoader)
      function getGreetings(){
    const hours = new Date().getHours()
    if(hours < 12) return "Good morning,"
    if(hours < 18) return "Good afternoon,"
    
    return "Good evening,"
  }

       useEffect(()=>{
    if(authStatus=="unauthenticated"){
          navigate("/auth")
    }
    
   },[authStatus])

    useEffect(()=>{
        console.log(adminLoader)
    },[adminLoader])

    useEffect(()=>{
        const onResize =()=>{
            if(window.innerWidth > window.innerHeight){
                removeAdminLoader()
                            console.log("i am on landscape")

            }else{
                setAdminLoader()
                console.log("im on mobile")
            }
        } 
        onResize()
        window.addEventListener("resize", onResize);
        return ()=> window.removeEventListener("resize", onResize)

    },[])


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

        <div>
            {!adminLoader ? (
        <div className="adminWrap">
            <div className="adminMenuWrap">
               <AdminMenu />
            </div>
            <div className="adminDash">
                <div className="adminDashTop">
                    <span>{getGreetings()}</span>
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
                    {/* <div className={`admin-AITask ${isAItaskActive ? `admin-AITaskActive` : ""}`}>
                      <Aitask/>
                    </div> */}
                </div>
            </div>
        </div>) : (<AdminLoader/>)}
        </div>

    )
}

export default Admin;