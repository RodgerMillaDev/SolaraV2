import { create } from "zustand";

const useStore = create((set) =>({

    fonMenuDrawer: false,
    signActive:false,
    logActive:true,
    screenLoader:true,

    openFonMenu: () => set({fonMenuDrawer:true}),
    closeFonMenu: () => set({fonMenuDrawer: false}),
    showLogAuth: () => set({logActive: true, signActive: false}), // Set both
    hideLogAuth: () => set({logActive: false}),
    showSignAuth: () => set({signActive: true, logActive: false}), // Set both
    hideSignAuth: () => set({signActive: false}),
    hideScreenLoader: () => set({screenLoader: false}),
    showScrenLoader: () =>set({screenLoader:true})
}))


export default useStore;