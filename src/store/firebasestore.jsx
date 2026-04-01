import { create } from "zustand";

const usefbStore = create((set) => ({

    adminName: "admin",
    userID: null,
    screenCount: null,
    authStatus: "loading",
    userName: null,
    accountPoints: null,
    hasTasks: false,
    taskArray: [],
    screeningActive: null,
    userScore: 0,
    accountBalance: 0,
    screeningTest: false,
    transactions: [],
    jobsArray: [],
    
    // ✅ NEW: Cooldown fields
    taskCooldownUntil: null,     // When cooldown ends (timestamp)
    inCooldown: false,            // Whether user is in cooldown
    lastTaskBatchCompletedAt: null, // When last batch was completed

    setAdminName: (name) => set({ adminName: name }),
    setJobArray: (ja) => set({ jobArray: ja }),
    setTransactions: (t) => set({ transactions: t }),
    setUserID: (uid) => set({ userID: uid }),
    setScreeningActive: (a) => set({ screeningActive: a }),
    setAuthenticated: () => set({ authStatus: "authenticated" }),
    setUnAuthenticated: () => set({ authStatus: "unauthenticated" }),
    setUserName: (uname) => set({ userName: uname }),
    setScreenCount: (sc) => set({ screenCount: sc }),
    setAccountPoints: (al) => set({ accountPoints: al }),
    setHasTasks: (ht) => set({ hasTasks: ht }),
    removeHasTasks: () => set({ hasTasks: false }),
    setTaskArray: (array) => set({ taskArray: array }),
    setAccountBalance: (ab) => set({ accountBalance: ab }),
    setScreeningTest: (st) => set({ screeningTest: st }),
    setUserScore: (score) => set({ userScore: score }),
    
    // ✅ NEW: Cooldown setters
    setTaskCooldownUntil: (cooldownUntil) => set({ 
        taskCooldownUntil: cooldownUntil,
        inCooldown: cooldownUntil ? new Date(cooldownUntil) > new Date() : false
    }),
    resetCooldown: () => set({ 
        taskCooldownUntil: null, 
        inCooldown: false,
        lastTaskBatchCompletedAt: null 
    }),
}));

export default usefbStore;