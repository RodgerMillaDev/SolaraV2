// ScreeningWorkspace.jsx - Fixed timer integration

import { Icon } from "@iconify/react";
import useStore from "../store/zustandstore";
import { useEffect, useRef, useState } from "react";
import "../css/work.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Jelly } from "ldrs/react";
import { getAuth, signOut } from "firebase/auth";
import { useSocketStore } from "../store/socketstore";
import { useParams } from "react-router-dom";
import usefbStore from "../store/firebasestore";
import { doc, onSnapshot, updateDoc,getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function ScreeningWorkspace() {
    const urlParam = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const userID = usefbStore((s) => s.userID);
    const navigate = useNavigate();
    const setUid = useSocketStore((s) => s.setUid);
    const connected = useSocketStore((s) => s.connected);
    const screeningTimerRemaining = useSocketStore((s) => s.screeningTimerRemaining);
    const screeningExpired = useSocketStore((s) => s.screeningExpired);
    const connect = useSocketStore((s) => s.connect);
    const send = useSocketStore((s) => s.send);
    const hideScreenLoader = useStore((s) => s.hideScreenLoader);
    const taskCanceled = useSocketStore((s) => s.taskCanceled);
    const forceLogout = useSocketStore((s) => s.forceLogout);
    const authStatus = usefbStore((s) => s.authStatus);
    const [quizIdsArray, setQuizIds] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [submitLoader, setSubmitLoader] = useState(false);
    const [score, setScore] = useState(0);
    const screeningActive = usefbStore(s => s.screeningActive);
    const setUserScore = usefbStore(s => s.setUserScore);
    const [isCorrect, setIsCorrect] = useState(null);
    const timerStartedRef = useRef(false);

    // Debug timer
    useEffect(() => {
        if(screeningActive==null){
            
        }
        if(!screeningActive){
              navigate("/prescreening")
              return
       }
    }, [screeningActive]);

    // Format time helper
    const formatTime = (seconds) => {
        if (seconds === null || seconds === undefined) return "--:--";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    // ✅ Start timer when test loads (using userID as the identifier)
    useEffect(() => {
        if (!connected || !userID || timerStartedRef.current) return;
        
        timerStartedRef.current = true;
        
        send({
            type: "startScreeningTimer",
            userId: userID,
        });
    }, [connected, userID, send]);

    // ✅ Handle time expiry
   // Handle time expiry
useEffect(() => {
    if (screeningExpired && quizzes.length > 0) {
        // Get current score from state or Firestore
        const finalScore = score;
        
        Swal.fire({
            title: "Time's Up!",
            text: `Your test has expired.`,
            icon: "warning",
            confirmButtonText: "See Results",
            allowOutsideClick: false,
        }).then(async () => {
            await completeScreening(finalScore, true);
        });
    }
}, [screeningExpired, quizzes.length, score]);

    // ✅ Socket connection
    useEffect(() => {
        if (!userID) return;
        hideScreenLoader();
        setUid(userID);
        if (!connected) {
            connect(null); // No taskId for screening
        }
    }, [userID, connected, setUid, connect, hideScreenLoader]);

    // ✅ Auth check
    useEffect(() => {
        if (authStatus === "unauthenticated") {
            navigate("/auth");
        }
    }, [authStatus, navigate]);

    // ✅ Force logout handler
    useEffect(() => {
        if (forceLogout) {
            Swal.fire({
                title: "Session Ended",
                text: "Your account has been signed in on another device. For security reasons, this session has been closed.",
                icon: "warning",
                timer: 4000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                didClose: () => {
                    const auth = getAuth();
                    signOut(auth).then(() => {
                        navigate("/auth");
                    }).catch(() => {
                        Swal.fire("Error", "An error occurred", "error");
                    });
                }
            });
        }
    }, [forceLogout, navigate]);

    // ✅ Task canceled handler
    useEffect(() => {
        if (taskCanceled === true) {
            navigate("/dashboard");
        }
    }, [taskCanceled, navigate]);

    const roman = ["i", "ii", "iii", "iv", "v", "vi"];

    // Fetch quizzes by IDs
    const getQuizzesByIds = async (ids) => {
        const results = [];
        for (let i = 0; i < ids.length; i += 10) {
            const q = query(
                collection(db, "Screening"),
                where("qId", "in", ids.slice(i, i + 10))
            );
            const snap = await getDocs(q);
            results.push(...snap.docs.map(d => d.data()));
        }
        return results;
    };

    // Real-time user listener
    useEffect(() => {
        if (!userID) return;

        const userRef = doc(db, "Users", userID);
        const unsub = onSnapshot(userRef, async snap => {
            const data = snap.data();
            if (!data || !data.quizIds) return;
            setQuizIds(data.quizIds);
            setScore(data.score || 0);
            setUserScore(data.score || 0);
            setCurrentIndex(data.currentIndex || 0);

            if (quizzes.length === 0) {
                const fetched = await getQuizzesByIds(data.quizIds);
                setQuizzes(fetched);
            }

            const qId = data.quizIds[data.currentIndex];
            if (data.quizProgress?.[qId]) {
                setSelectedAnswer(data.quizProgress[qId].selected);
            }
        });

        return () => unsub();
    }, [userID, quizzes.length, setUserScore]);
const submit = async () => {
    const quiz = quizzes[currentIndex];
    if (!quiz || !selectedAnswer) return;
    setSubmitLoader(true);
    const isAnswerCorrect = selectedAnswer === quiz.ca;
    const isLastQuestion = currentIndex === quizzes.length - 1;
    
    // Calculate new score
    const newScore = isAnswerCorrect ? score + 1 : score;

    const userRef = doc(db, "Users", userID);

    await updateDoc(userRef, {
        [`quizProgress.${quiz.qId}`]: {
            selected: selectedAnswer,
            correct: isAnswerCorrect,
        },
        score: newScore,
        currentIndex: isLastQuestion ? currentIndex : currentIndex + 1,
        quizCompleted: isLastQuestion,
        completedAt: isLastQuestion ? Date.now() : null,
    });

    setIsCorrect(null);
    setSelectedAnswer(null);
    setSubmitLoader(false);

    // If last question, complete the test
    if (isLastQuestion) {
        await completeScreening(newScore, false);
        return;
    }
};

    const backtoDash = () => {
        Swal.fire({
            title: "Are You Leaving?",
            text: "Your progress will be lost!",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "Yes, Leave",
            showCancelButton: true,
            cancelButtonText: "Continue",
        }).then((result) => {
            if (result.isConfirmed) {
                send({
                    type: "cancelScreening",
                    uid: userID,
                });
            }
        });
    };

    if (!quizzes.length) {
        return (
            <div className="workSpaceWrapper">
                <div className="Testloading">
                    <Jelly size="45" speed="1" color="#6a5acd" />
                </div>
            </div>
        );
    }

    const quiz = quizzes[currentIndex];

    // Add to your existing state

// Calculate final score and submit
const completeScreening = async (finalScore, isTimeUp = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
        const userRef = doc(db, "Users", userID);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        
        // Calculate pass/fail (adjust threshold as needed - 70% passing)
        const passingScore = 70;
        const totalQuestions = quizzes.length;
        const percentage = (finalScore / totalQuestions) * 100;
        const passed = percentage >= passingScore;
        const passStatus = passed ? "pass" :"fail"
        
        // Get current screenCount
        const currentScreenCount = userData.screenCount || 0;
        // Update user document
        await updateDoc(userRef, {
            screeningCompleted: true,
            screeningScore: finalScore,
            screeningActive: false,
            quizProgress:[],
            quizIds:[],
            currentIndex:0,
            screeningPercentage: percentage,
            screeningPassed: passed,
            screeningCompletedAt: Date.now(),
            screenCount: currentScreenCount + 1,
            screeningExpired: isTimeUp,
            screeningTest:passStatus
        });
        
        // Send to backend via socket
        const socket = useSocketStore.getState();
        socket.send({
            type: "screeningComplete",
            userId: userID,
            score: finalScore,
            totalQuestions: totalQuestions,
            percentage: percentage,
            passed: passed,
            timeExpired: isTimeUp,
        });
        
        // Navigate to results page
        navigate("/screeningcomplete", {
            state: {
                score: finalScore,
                total: totalQuestions,
                percentage: percentage,
                passed: passed,
                timeExpired: isTimeUp,
            }
        });
        
    } catch (error) {
        console.error("Error saving screening results:", error);
        Swal.fire("Error", "Failed to save test results", "error");
    } finally {
        setIsSubmitting(false);
    }
};

    return (
        <div className="workSpaceWrapper">
            <div className="workspacerPlacer">
                <div className="workSpaceNav">
                    <div className="wspnLeft" onClick={backtoDash}>
                        <p>Back</p>
                    </div>
                    <div className="wspnRight">
                        <Icon className="faIcon" icon="solar:clock-circle-outline" />
                        <p>{formatTime(screeningTimerRemaining)}</p>
                    </div>
                </div>
                <div className="workSpaceContTest">
                    <div className="workSpaceContInst">
                        <p>TASK: Select the correct answer to the questions.</p>
                    </div>

                    <div className="testWrapPlacer">
                        <div className="twpQuizWrap">
                            <div className="quizQuestion">
                                <span>Question {currentIndex + 1}</span>
                                <p>{quiz.q}</p>
                            </div>

                            <div className="quizAnswers">
                                {quiz.answers.map((ans, i) => (
                                    <div
                                        key={i}
                                        className={`quizOpt ${
                                            selectedAnswer === ans ? "quizOptActive" : ""
                                        }`}
                                        onClick={() => {
                                            if (isCorrect !== null) return;
                                            setSelectedAnswer(ans);
                                        }}
                                    >
                                        <p>{roman[i]}. {ans}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="quizSubmit">
                                {!submitLoader ? (
                                    <button disabled={!selectedAnswer} onClick={submit}>
                                        Submit
                                    </button>
                                ) : (
                                    <Jelly size="45" speed="1" color="#6a5acd" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScreeningWorkspace;