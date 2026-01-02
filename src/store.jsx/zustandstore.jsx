import { create } from "zustand";

const useStore = create((set) =>({

    fonMenuDrawer: false,
    signActive:false,
    logActive:true,
    screenLoader:true,
    isAdminDashActive: true,
    isAItaskActive: false,

    openFonMenu: () => set({fonMenuDrawer:true}),
    closeFonMenu: () => set({fonMenuDrawer: false}),
    showLogAuth: () => set({logActive: true, signActive: false}), // Set both
    hideLogAuth: () => set({logActive: false}),
    showSignAuth: () => set({signActive: true, logActive: false}), // Set both
    hideSignAuth: () => set({signActive: false}),
    hideScreenLoader: () => set({screenLoader: false}),
    showScrenLoader: () =>set({screenLoader:true}),
    showAdminDashboard:() => set({isAdminDashActive:true, isAItaskActive:false}),
    hideAdminDashboard: () => set({isAdminDashActive:false,}),
    showAiTask:() => set({isAItaskActive:true, isAdminDashActive:false}),
    hideAiTask: () => set({isAItaskActive:false})
}))


export default useStore;
