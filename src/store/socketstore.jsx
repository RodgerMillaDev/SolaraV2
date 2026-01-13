// socketStore.js
import { create } from "zustand";
import adminLoader from "../components/admin/adminLoader";

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
    setUid: (uid) => set({uid}),


connect: (taskId) => {
  const existing = get().socket;

  if (existing && existing.readyState !== WebSocket.CLOSED) return;

      const ws = new WebSocket("wss://solaraback-g1bm.onrender.com");
      ws.onopen = () => {
      const uid = get().uid;

  if (!uid) {
    console.warn("UID missing, closing socket");
    ws.close();
    return;
  }
  if(taskId== undefined){
 ws.send(JSON.stringify({
    type: "init",
    uid,
    taskId:null
  }));
  }else{
 ws.send(JSON.stringify({
    type: "init",
    uid,
    taskId
  }));
  }


  console.log("WS connected");
  set({ connected: true });
};

       ws.onclose = () => {
      console.log("WS disconnected – retrying...");
      setTimeout(() => get().connect(), 2000);
    };
    
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if(data.type==="taskAssigned"){

               const tasks = data.tasks
               console.log("youve been assigned tasks")
          
                
            }else if(data.type=="taskResponse"){
                set({taskRespMsg:data.reason})
                set({taskRespStatus:data.status})
                set({taskRespCont:prev => prev + 1})

              if(data.status==="error"){
                set({taskRespMsg:data.reason})
              }
              if(data.status==="denied"){
                set({taskRespMsg:data.reason})
              }
              if(data.status==="empty"){
                set({taskRespMsg:data.reason})
              }

            }
            if(data.type === "startTaskResponse"){
              set({taskBegan:true})
            }
            if(data.type === "startTaskError"){
            set({taskBegan:false})
            }
            if(data.type === "timerUpdate"){
              const time = data.remainingTime
              function formatTime(time) {
  const mins = Math.floor(time / 60);
  const secs = time % 60;

   set({taskTime:`${mins}mins ${secs.toString().padStart(2, "0")}s`});
}
formatTime(time)

            }
            if(data.type === "taskComplete"){
             set({taskComplete:true})
            
            }
            if(data.type === "resumeError"){
             set({taskComplete:true})
            
            }
        };

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
  }
}));


