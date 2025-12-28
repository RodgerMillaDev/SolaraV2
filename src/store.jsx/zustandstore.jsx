import { create } from "zustand";

const useStore = create((set) =>({

    fonMenuDrawer: false,


    openFonMenu: () => set({fonMenuDrawer:true}),
    closeFonMenu: () => set({fonMenuDrawer: false})
}))


export default useStore;