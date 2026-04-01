import { create } from "zustand";
import adminLoader from "../components/admin/adminLoader";

const useStore = create((set) =>({

    fonMenuDrawer: false,
    signActive:false,
    logActive:true,
    screenLoader:true,
    isAdminDashActive: true,
    isAItaskActive: false,
    isUserProfileActive: false,
    isContracts: false,
    adminLoader:true,
    isUserDashboardActive: true,
    isUserDashNavActive:false,
    isDesktopLeftDashActive:true,
    isDesktopRightDashActive:true,
    isDesktopLeftBottomActive:false,
    isJobUploadActive:false,
    userNavLinkActive:"Dashboard",
    leftProfActive:true,
    rightProfActive:true,

    openFonMenu: () => set({fonMenuDrawer:true}),
    closeFonMenu: () => set({fonMenuDrawer: false}),
    showLogAuth: () => set({logActive: true, signActive: false}), // Set both
    hideLogAuth: () => set({logActive: false}),
    showSignAuth: () => set({signActive: true, logActive: false}), // Set both
    hideSignAuth: () => set({signActive: false}),
    hideScreenLoader: () => set({screenLoader: false}),
    showScrenLoader: () =>set({screenLoader:true}),
    showAdminDashboard:() => set({isAdminDashActive:true, isAItaskActive:false,isJobUploadActive:false,}),
    hideAdminDashboard: () => set({isAdminDashActive:false,}),
    showAiTask:() => set({ isAItaskActive:true, isAdminDashActive:false,isJobUploadActive:false,}),
    hideAiTask: () => set({isAItaskActive:false}),
    showJobUpload:() => set({isJobUploadActive:true, isAItaskActive:false, isAdminDashActive:false}),
    hideJobUpload: () => set({showJobUpload:false}),
    showUserProfile: () => set({userNavLinkActive:"MyStats",isUserProfileActive: true, isUserDashboardActive:false,rightProfActive:true, leftProfActive:true}),
    showUserDashboard: ()=> set({userNavLinkActive:"Dashboard",isDesktopLeftBottomActive:false,isUserDashboardActive: true, isUserProfileActive:false, isDesktopLeftDashActive:true,isDesktopRightDashActive:true}),
    showContracts: ()=> set({userNavLinkActive:"Contracts",isContracts:true,isUserDashboardActive: true, isUserProfileActive:false}),
    showAiTasks: ()=> set({userNavLinkActive:"Ai-tasks",isDesktopLeftBottomActive:true,isContracts:false,isUserDashboardActive: true, isUserProfileActive:false}),
    hideUserDashboard: ()=> set({isUserDashboardActive: false}),
    hideUserDashNav: ()=> set({isUserDashNavActive: false}),
    showUserDashNav: ()=> set({isUserDashNavActive: true}),
    showDesktopLeftDash: ()=>set({isDesktopLeftDashActive:true, isDesktopRightDashActive:false}),
    hideDesktopLeftDash: ()=>set({isDesktopLeftDashActive:false, isDesktopRightDashActive:true}),
    showPayments:()=>set({isUserProfileActive:true, userNavLinkActive:"Payments",isUserDashboardActive: false,leftProfActive:false,rightProfActive:true}),
    removeAdminLoader: ()=>set({adminLoader:false}),
    setAdminLoader: ()=>set({adminLoader:true})
}))

export default useStore;
