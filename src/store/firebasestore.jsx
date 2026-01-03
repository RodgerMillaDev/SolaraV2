import { create } from "zustand";

const usefbStore = create((set)=>({

    adminName:"admin",
    userID:"",
    authStatus:"loading",

    setAdminName: (name)=> set({adminName:name}),
    setUserID: (uid)=> set({userID:uid}),
    setAuthenticated: ()=> set({authStatus:"authenticated"}),
    setUnAuthenticated: ()=> set({authStatus:"unauthenticated"})
    
}))

export default usefbStore;