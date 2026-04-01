import { useEffect } from "react"
import { auth } from "./firebase"
import usefbStore from "../store/firebasestore"

function AuthProvider(){
    const userID = usefbStore((s)=>s.userID)
    const setUserID = usefbStore((s)=>s.setUserID)
    const setAuthenticated = usefbStore((s)=>s.setAuthenticated)
    const setUnAuthenticated = usefbStore((s)=>s.setUnAuthenticated)


useEffect(() => {
  const unsub = auth.onAuthStateChanged((user) => {
    if (!user) {
      setUserID(null);
      setUnAuthenticated();
    } else {
      setUserID(user.uid);
      setAuthenticated();
    }
  });

  return () => unsub();
}, []);


    return null;
}

export default AuthProvider