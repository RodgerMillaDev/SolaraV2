
import usefbStore from "../store/firebasestore";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useStore from "../store/zustandstore";
import { useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
function Protected({children}){
   const userID = usefbStore((s)=>s.userID);
   const navigate = useNavigate();
   const authStatus= usefbStore((s)=>s.authStatus)
   const setAccountLevel = usefbStore((s) =>s.setAccountLevel)
   const setUserName = usefbStore((s) => s.setUserName)
   const setHasTasks = usefbStore((s)=>s.setHasTasks)
   const setTaskArray = usefbStore((s)=>s.setTaskArray)
   const setAccountBalance = usefbStore((s)=>s.setAccountBalance)


    useEffect(()=>{
      const run= async()=>{
           if(authStatus == "authenticated"){
           const docRef = doc(db, "Users", userID)
           const userSnap = await getDoc(docRef)
           if(userSnap.exists()){
            const uname = userSnap.data().name;
            var al = userSnap.data().accountLevel;
            var ht = userSnap.data().hasTasks;
            var ab = userSnap.data().accountBalance;
            setAccountLevel(al)
            setUserName(uname)
            setHasTasks(ht)
            setAccountBalance(ab)

           }
        }else if(authStatus=="unauthenticated"){
           navigate("/auth")
        }
        else{
        }
      }
      run()
   
    },[authStatus])

    useEffect(()=>{
      if(authStatus == "loading" || authStatus === "unauthenticated") return ;

      const q = query(collection(db, "Users", userID, "assignedTasks")
      // where("status","==", "Pending")
      )

      const unsub = onSnapshot(q, (snapshot)=>{
         if(snapshot.empty){
            setHasTasks(false)
            setTaskArray([])
         }else{
            const dbTask = []
           
            snapshot.forEach((shot)=>{                  
             dbTask.push({
               id: shot.id,
               ...shot.data(),
             })
         })
            setHasTasks(true)
            setTaskArray(dbTask)

         }
      })

      return ()=> unsub()
   
      },[userID,authStatus])
   

    return children;
    
  
}

export default Protected;