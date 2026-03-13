// socketStore.js
import { create } from "zustand";

export const useSocketStore = create((set, get) => ({
    socket: null,
    connected: false,
    currentTask: null,
    status:null,
    message:null,
    uid: null,
    taskRespCont:0,
    taskRespMsg: null,
    taskBegan:false,
    taskRespStatus: null,
    taskTime:"0min 0s",
    completeMethod:"",
    forceLogout: false,
    payOut:0,
    taskResp:null,
    aIScore:0,
    taskCompleteError: null,
    taskCompleteErrorMsg: "",
    taskCanceled:false,
    setUid: (uid) => set({uid}),


connect: (taskId) => {
  const existing = get().socket;

  // If socket exists and is open, do nothing
  if (existing && existing.readyState !== WebSocket.CLOSED) return;

  const ws = new WebSocket("wss://solaraback-g1bm.onrender.com");

  ws.onopen = () => {
    const uid = get().uid;

    if (!uid) {
      console.warn("UID missing, closing socket");
      ws.close();
      return;
    }

    // Send init message with UID and optional taskId
    ws.send(
      JSON.stringify({
        type: "init",
        uid,
        taskId: taskId || null
      })
    );

    console.log("WS connected");
    set({ connected: true });
  };

  ws.onclose = () => {
    const { forceLogout } = get();

    if (forceLogout) {
      console.log("WS closed due to force logout — no reconnect");
      set({ connected: false });
      return;
    }

    console.log("WS disconnected – retrying in 2s...");
    setTimeout(() => get().connect(taskId), 2000);
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
      case "taskAssigned":
        console.log("You've been assigned tasks:", data.tasks);
        break;

      case "taskResponse":
        set((prev) => ({
          taskRespCont: prev.taskRespCont + 1,
          taskRespMsg: data.reason,
          taskRespStatus: data.status
        }));
        break;

      case "startTaskResponse":
        set({ taskBegan: true });
        break;

      case "startTaskError":
        set({ taskBegan: false });
        break;

      case "timerUpdate":
        const mins = Math.floor(data.remainingTime / 60);
        const secs = data.remainingTime % 60;
        set({ taskTime: `${mins}mins ${secs.toString().padStart(2, "0")}s` });
        break;

      case "taskComplete":
        set({
          completeMethod: data.completeMethod,
          payOut: data.payOut,
          taskComplete: true,
          taskResp: data.taskResp,
          aIScore: data.aiScore
        });
        break;

      case "taskCanceled":
        set({ taskCanceled: true });
        break;

      case "resumeError":
        // Only trigger forceLogout if not already set
        set((prev) => ({
          taskComplete: true,
          forceLogout: prev.forceLogout ? prev.forceLogout : true
        }));
        break;

      case "forceLogout":
        // Only set once to prevent repeated logout
        set((prev) => (prev.forceLogout ? prev : { forceLogout: true }));
        ws.close();
        break;

      case "taskSubmitError":
        set({ taskCompleteError: true, taskCompleteErrorMsg: data.error });
        break;

      default:
        console.warn("Unknown WS message type:", data.type);
    }
  };

  // Save socket in state
  set({ socket: ws });
},


 send: (payload) => {
  const ws = get().socket;

  if (!ws) {
    console.warn("Socket not initialized");
    return;
  }

  if (ws.readyState !== WebSocket.OPEN) {
    console.warn("Socket not open yet");
    return;
  }

  ws.send(JSON.stringify(payload));
},
  // ---------- CLEANUP ----------
  disconnect: () => {
    get().socket?.close();
    set({ socket: null, connected: false });
  },
  resetTaskState: () =>
  set({
    taskBegan: false,
    taskComplete: false,
    completeMethod: "",
    payOut: 0,
    aIScore: 0,
    taskCanceled: false,
    taskResp: null,
    taskRespCont: 0,
    taskRespMsg: null,
    taskRespStatus: null,
  }),

}));


