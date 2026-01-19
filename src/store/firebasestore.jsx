import { create } from "zustand";

const usefbStore = create((set)=>({

    adminName:"admin",
    userID:null,
    authStatus:"loading",
    userName:null,
    accountLevel:null,
    hasTasks:false,
    taskArray:[],
    accountBalance:0,
  
    setAdminName: (name)=> set({adminName:name}),
    setUserID: (uid)=> set({userID:uid}),
    setAuthenticated: ()=> set({authStatus:"authenticated"}),
    setUnAuthenticated: ()=> set({authStatus:"unauthenticated"}),
    setUserName: (uname)=> set({userName:uname}),
    setAccountLevel: (al)=> set({accountLevel:al}),
    setHasTasks:(ht)=> set({hasTasks:ht}),
    removeHasTasks:()=> set({hasTasks:false}),
    setTaskArray: (array)=> set({taskArray:array}),
    setAccountBalance: (ab)=> set({accountBalance:ab})
   
    
}))

export default usefbStore;