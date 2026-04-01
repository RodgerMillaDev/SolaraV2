// socketStore.js
import { create } from "zustand";

export const useSocketStore = create((set, get) => ({
    socket: null,
    screeningResult: null,
    screeningStatus: null,
    screeningMsg: null,
    screeningStarted: false,
    screeningTimerRemaining: null,
    screeningExpired: false,
    connected: false,
    currentTask: null,
    status: null,
    message: null,
    uid: null,
    taskRespCont: 0,
    taskRespMsg: null,
    taskBegan: false,
    taskRespStatus: null,
    taskTime: "0min 0s",
    completeMethod: "",
    forceLogout: false,
    payOut: 0,
    taskResp: null,
    aIScore: 0,
    taskCompleteError: null,
    taskCompleteErrorMsg: "",
    taskCanceled: false,
    
    // ✅ NEW: Cooldown state
    inCooldown: false,
    cooldownUntil: null,
    cooldownMessage: null,
    remainingCooldown: null,
    cooldownHours: null,
    
    setUid: (uid) => set({ uid }),

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

            ws.send(JSON.stringify({
                type: "init",
                uid,
                taskId: taskId || null
            }));

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
                    break;

                // ✅ UPDATED: Handle cooldown response
                case "taskResponse":
                    set({
                        taskRespCont: get().taskRespCont + 1,
                        taskRespMsg: data.reason,
                        taskRespStatus: data.status,
                        // ✅ Add cooldown handling
                        inCooldown: data.status === "Cooldown",
                        cooldownMessage: data.status === "Cooldown" ? data.reason : null,
                        remainingCooldown: data.remainingTime || null,
                    });
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

                // ✅ UPDATED: Handle cooldown info from task completion
                case "taskComplete":
                    set({
                        completeMethod: data.completeMethod,
                        payOut: data.payOut,
                        taskComplete: true,
                        taskResp: data.taskResp,
                        aIScore: data.aiScore,
                        // ✅ Add cooldown from backend
                        inCooldown: !!data.cooldown,
                        cooldownUntil: data.cooldown?.cooldownUntil || null,
                        cooldownHours: data.cooldown?.cooldownHours || null,
                        cooldownMessage: data.cooldown ? `New tasks available in ${data.cooldown.cooldownHours} hours` : null,
                    });
                    break;

                case "taskCanceled":
                    set({ taskCanceled: true });
                    break;

                case "resumeError":
                    set((prev) => ({
                        taskComplete: true,
                        forceLogout: prev.forceLogout ? prev.forceLogout : true
                    }));
                    break;

                case "forceLogout":
                    set((prev) => (prev.forceLogout ? prev : { forceLogout: true }));
                    ws.close();
                    break;

                case "taskSubmitError":
                    set({ taskCompleteError: true, taskCompleteErrorMsg: data.error });
                    break;

                // ✅ SCREENING TIMER HANDLERS
                case "screeningTimerStarted":
                    set({ 
                        screeningStarted: true,
                        screeningTimerRemaining: data.remainingTime 
                    });
                    break;

                case "screeningTimerUpdate":
                    set({ screeningTimerRemaining: data.remainingTime });
                    break;

                case "screeningTimeExpired":
                    set({ 
                        screeningExpired: true,
                        screeningStarted: false 
                    });
                    break;

                case "screeningResponse":
                    set({
                        screeningStatus: data.status,
                        screeningMsg: data.reason || null,
                    });
                    break;

                case "startScreeningResponse":
                    set({ screeningStarted: true });
                    break;

                case "startScreeningError":
                    set({ screeningStarted: false });
                    break;

                case "screeningResult":
                    set({
                        screeningResult: {
                            score: data.score,
                            passed: data.passed,
                        },
                    });
                    break;

                case "screeningTimeout":
                    set({
                        screeningResult: {
                            score: 0,
                            passed: false,
                            timeout: true,
                        },
                    });
                    break;

                default:
                    console.warn("Unknown WS message type:", data.type);
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

    // ✅ START SCREENING TIMER
    startScreeningTimer: (userId, testId) => {
        get().send({
            type: "startScreeningTimer",
            userId,
            testId,
        });
    },

    // ✅ RESET SCREENING STATE
    resetScreeningState: () => set({
        screeningResult: null,
        screeningStatus: null,
        screeningMsg: null,
        screeningStarted: false,
        screeningTimerRemaining: null,
        screeningExpired: false,
    }),

    // ✅ NEW: Reset cooldown state
    resetCooldown: () => set({
        inCooldown: false,
        cooldownUntil: null,
        cooldownMessage: null,
        remainingCooldown: null,
        cooldownHours: null,
    }),

    disconnect: () => {
        get().socket?.close();
        set({ socket: null, connected: false });
    },

    resetTaskState: () => set({
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
        // ✅ Also reset cooldown when resetting task state
        inCooldown: false,
        cooldownUntil: null,
        cooldownMessage: null,
        remainingCooldown: null,
        cooldownHours: null,
    }),
}));