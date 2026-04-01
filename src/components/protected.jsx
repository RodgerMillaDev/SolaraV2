import { useEffect } from "react";
import { doc, onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";
import usefbStore from "../store/firebasestore";

function Protected({ children }) {
  const userID = usefbStore((s) => s.userID);
  const authStatus = usefbStore((s) => s.authStatus);
  const setAccountPoints = usefbStore((s) => s.setAccountPoints);
  const setUserName = usefbStore((s) => s.setUserName);
  const setScreeningActive = usefbStore((s) => s.setScreeningActive);
  const setScreenCount = usefbStore((s) => s.setScreenCount);
  const setAccountBalance = usefbStore((s) => s.setAccountBalance);
  const setScreeningTest = usefbStore((s) => s.setScreeningTest);
  const setTransactions = usefbStore((s) => s.setTransactions);
  const setJobArray = usefbStore((s) => s.setJobArray);
  
  // ✅ NEW: Cooldown setters
  const setTaskCooldownUntil = usefbStore((s) => s.setTaskCooldownUntil);
  const resetCooldown = usefbStore((s) => s.resetCooldown);

  useEffect(() => {
    if (authStatus !== "authenticated" || !userID) return;

    // 1️⃣ User Document Listener
    const userRef = doc(db, "Users", userID);
    const unsubscribeUser = onSnapshot(userRef, (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();
      setUserName(data.name);
      setScreeningTest(data.screeningTest);
      setScreeningActive(data.screeningActive);
      setScreenCount(data.screenCount);
      console.log(data.screenCount);
      setAccountPoints(data.accountPoints);
      setAccountBalance(data.accountBalance);
      
      // ✅ NEW: Listen for cooldown field from Firestore
      if (data.taskCooldownUntil) {
        setTaskCooldownUntil(data.taskCooldownUntil.toDate());
      } else {
        resetCooldown();
      }
    });

    // 2️⃣ Transactions Listener
    const transactionsRef = collection(db, "Users", userID, "transactions");
    const transactionsQuery = query(transactionsRef, orderBy("createdAt", "desc"));
    
    const unsubscribeTransactions = onSnapshot(transactionsQuery, (snapshot) => {
      const txArray = [];
      snapshot.forEach((doc) => {
        txArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTransactions(txArray);
    });

    // 3️⃣ Jobs Listener (if you need real-time updates)
    const jobsRef = collection(db, "Jobs");
    const unsubscribeJobs = onSnapshot(jobsRef, (snapshot) => {
      const jobsArray = [];
      snapshot.forEach((job) => {
        jobsArray.push({
          id: job.id,
          ...job.data(),
        });
      });
      setJobArray(jobsArray);
    });

    // Cleanup all listeners on unmount
    return () => {
      unsubscribeUser();
      unsubscribeTransactions();
      unsubscribeJobs();
    };
  }, [userID, authStatus]);

  return children;
}

export default Protected;