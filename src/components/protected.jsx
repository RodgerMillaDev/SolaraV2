import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import usefbStore from "../store/firebasestore";

function Protected({ children }) {
  const userID = usefbStore((s) => s.userID);
  const authStatus = usefbStore((s) => s.authStatus);
  const setAccountLevel = usefbStore((s) => s.setAccountLevel);
  const setUserName = usefbStore((s) => s.setUserName);
  const setAccountBalance = usefbStore((s) => s.setAccountBalance);

  // Load initial user info
  useEffect(() => {
    if (authStatus !== "authenticated" || !userID) return;
    const docRef = doc(db, "Users", userID);
    getDoc(docRef).then((snap) => {
      if (!snap.exists()) return;
      const data = snap.data();
      setUserName(data.name);
      setAccountLevel(data.accountLevel);
      setAccountBalance(data.accountBalance);
    });
  }, [authStatus, userID]);


  return children;
}

export default Protected;
