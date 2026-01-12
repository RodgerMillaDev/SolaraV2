import "../css/auth.css"
import { Icon } from "@iconify/react";
import logo1 from "../media/favIcon.png";
import { Jelly } from "ldrs/react";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification,signInWithEmailAndPassword } from "firebase/auth";
import { doc,setDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import "ldrs/react/Jelly.css";
import useStore from "../store/zustandstore";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
function Auth(){

    const showLogAuth = useStore((s)=> s.showLogAuth)
    const signActive = useStore((s)=> s.signActive)
    const logActive = useStore((s)=> s.logActive)
    const showSignAuth = useStore((s)=> s.showSignAuth)
    const signEm = useRef(null)
    const signNm = useRef(null)
    const navigate = useNavigate()
    const signPass = useRef(null)
    const signCpass = useRef(null)
    const signBtn = useRef(null)
    const signLoader = useRef(null)
    const logBtn = useRef(null)
    const logLoader = useRef(null)
    const logEm = useRef(null)
    const logPass = useRef(null)
    const hideScreenLoader = useStore((s)=> s.hideScreenLoader)


    useEffect(()=>{

        hideScreenLoader();

    },[hideScreenLoader])


    const toLog = () =>{
        showLogAuth()
    }
    const toSign = () =>{
        showSignAuth()
    }

    const resetPass =()=>{

    }
    

    
  const SignUp = () =>{
    const fn = signNm.current.value
    const em = signEm.current.value
    const pass = signPass.current.value
    const cpass = signCpass.current.value

    if(em && pass && cpass ){
        if(pass === cpass){
        signBtn.current.style.display="none"
        signLoader.current.style.display="flex"


        createUserWithEmailAndPassword(auth, em,pass).then((userCred)=>{
            var user = userCred.user;
            sendEmailVerification(user).then(async ()=>{
                const userData = {
                    name:fn,
                    em:em,
                    uid:user.uid,
                    fonReg:"",
                    sexReg:"",
                    photoUrl:"",
                    profUpdate:false,
                    accountBalance:0,
                    jobEligibility:true,
                    dailyTaskTaken:0,
                    accountLevel:"Beginner"
                    
                }
                    await setDoc(doc(db, "Users",user.uid), userData).then(()=>{
                        Swal.fire("","Verification email sent.Please check your inbox.").then(()=>{
                                signBtn.current.style.display="block"
                                signLoader.current.style.display="none"
                            toLog()
                        })
                      })
                    })
                  }).catch((err)=>{
                                signBtn.current.style.display="block"
                                signLoader.current.style.display="none"
                    
                                if(err.code === "auth/email-already-in-use"){
                                        Swal.fire("","Email already in use. Try logging in.","warning")
                                }
                    
                            })
        

        }else{
         Swal.fire("", "Your passwords dont match","warning")
         
        }


    }else{
        Swal.fire("", "Oops! Looks like you missed a field","warning")
       
    }
  }

  const LogIn = () =>{

    logBtn.current.style.display="none"

    logLoader.current.style.display="flex"  

    const em = logEm.current.value;
    const pass = logPass.current.value


    if(em &&  pass ){

        signInWithEmailAndPassword(auth,em,pass)
        .then((userCred)=>{
            var user = userCred.user;
            if(user.emailVerified){
                navigate("/")

            }else{
                auth.signOut();
                  Swal.fire({
                        title: "Email Not Verified",
                        text: "Please verify your email before signing in.",
                        icon: "warning",
                        confirmButtonText: "Resend Verification Email",
                    }).then((result) => {
                                     logBtn.current.style.display="block"
    logLoader.current.style.display="none"  
                        if (result.isConfirmed) {
                        // Resend verification email
                        sendEmailVerification(user).then(() => {
                                         logBtn.current.style.display="none"
    logLoader.current.style.display="flex"  
                            Swal.fire("","Verification email sent. Please check your inbox.");
                        });
                        }
                    });            }


        }).catch((error)=>{
                logBtn.current.style.display="block"
    logLoader.current.style.display="none"  
               var errCode = error.code; 
                console.log(error)
                if (errCode === "auth/invalid-email" || errCode === "auth/wrong-password" || errCode === "auth/internal-error" || errCode === "auth/invalid-credential") {
                    Swal.fire("Invalid email or password","error");
                            logBtn.current.style.display="block"

    logLoader.current.style.display="none"  
                }else{
                     
    Swal.fire("","An error occured try again later","warning")
            logBtn.current.style.display="block"

    logLoader.current.style.display="none"  
                    console.log(error)
                }
        })

        

    }else{
       Swal.fire("", "Oops! Looks like you missed a field","warning")
        logBtn.current.style.display="block"

    logLoader.current.style.display="none"  

    }
}



    return(
  
    <div id="AuthWrap">
        <div className="authLeft">
             <div className="authLeftPlacer">
                <div id="authLog" className={`authLog ${logActive ? "authLogActive" : ""}`}>
                        
                    <div className="authLogo">
                        <img src={logo1} alt="logo"/>
                    </div>
                    <div className="authIntro">
                        <h3>Welcome,</h3>
                        <p>Welcome back! Sign in to continue.</p>
                    </div>
                    <div className="authInputsWrap">
                           <div className="authInputWrap">
                            <div className="authInputIcon">
                                <Icon className="faIcon" icon="solar:letter-linear"/>
                             </div>
                            <input ref={logEm} type="email" name="" id="logEm" placeholder="Email"/>
                           </div>
                           <div className="authInputWrap">
                            <div className="authInputIcon">
                                <Icon className="faIcon" icon="solar:lock-password-linear"/>
                                            </div>
                            <input ref={logPass} type="password" name="" id="logPass" placeholder="Password"/>
                           </div>
                           <div className="authBtn">
                            <div id="authLogLoader" ref={logLoader} >
                                <Jelly
                                  size="45"
                                  speed="1"
                                  color="#6a5acd" 
                                ></Jelly>
                            </div>
                            <button ref={logBtn} onClick={LogIn} id="authLogBtn">Sign In</button>
                           </div>
                           <div className="authOpt">
                            <p>Create an account? <span onClick={toSign} >Sign Up</span></p>
                            <p onClick={resetPass}>Reset password</p>
                           </div>
                    </div>
                </div>
                <div  className={`authSign ${signActive ? "authSignActive" : ""}`}>
                    <div className="authLogo">
                        <img src={logo1} alt="logo"/>
                    </div>
                    <div className="authIntro">
                        <h3>Hello there,</h3>
                        <p>Let’s get you started. Sign up below</p>
                    </div>
                    <div className="authInputsWrap">
                           <div className="authInputWrap">
                            <div className="authInputIcon">
                                <Icon className="faIcon" icon="solar:user-rounded-linear"/>
                            </div>
                            <input ref={signNm} type="text" name="" id="signName" placeholder="Full name"/>
                           </div>
                           <div className="authInputWrap">
                            <div className="authInputIcon">
                                <Icon className="faIcon" icon="solar:letter-linear"/>
                            </div>
                            <input ref={signEm} type="email" name="" id="signEm" placeholder="Email"/>
                           </div>
                           <div className="authInputWrap">
                            <div className="authInputIcon">
                                <Icon className="faIcon" icon="solar:lock-password-linear"/>
                            </div>
                            <input ref={signPass} type="password" name="" id="signPass" placeholder="Password"/>
                           </div>
                           <div className="authInputWrap">
                            <div className="authInputIcon">
                                <Icon className="faIcon" icon="solar:lock-password-linear"/>
                             </div>
                            <input ref={signCpass} type="password" name="" id="consignPass" placeholder="Confirm Password"/>
                           </div>
                           <div className="authBtn">
                            <div id="authSignLoader" ref={signLoader}>
                             <Jelly
                                  size="45"
                                  speed="1"
                                  color="#6a5acd" 
                                ></Jelly>
                            </div>
                            <button id="authSignBtn" ref={signBtn} onClick={SignUp} >Sign Up</button>
                           </div>
                           <div className="authOpt">
                            <p>Already have an account? <span onClick={toLog} >Sign In</span></p>
                           </div>
                    </div>

                </div>
             </div>
        </div>
        <div className="authRight">
            <div className="bubble1"></div>
            <div className="bubble2"></div>

            <div className="authRightGlass">
                <h1> "Digital</h1>
                <h1>platform</h1>
                <h1>for <span>remote</span></h1>
                <h1><span>workers.</span>"</h1>
                <p>Find global remote jobs and work from anywhere. Connect with top companies hiring talent worldwide.</p>

            </div>
        </div>
             </div>
    )
}

export default Auth;