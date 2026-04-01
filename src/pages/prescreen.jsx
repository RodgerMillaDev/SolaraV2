import img from "../media/undraw_interview_yz52 (1).svg"
import Footer from "../components/footer";
import "../css/screening.css"
import Navbar from "../components/nav";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useStore from "../store/zustandstore";
import { db } from "../firebase/firebase";
import { useEffect } from "react";
import usefbStore from "../store/firebasestore";
import { doc,updateDoc,getDocs,collection } from "firebase/firestore";

function PreScreening(){


    const navigate = useNavigate()
    const userID = usefbStore((s)=>s.userID)
    const setScreenCount =usefbStore((s)=>s.setScreenCount)
    const screenCount = usefbStore((s)=>s.screenCount)
    const hideScreenLoader= useStore((s)=>s.hideScreenLoader)
    useEffect(()=>{
     hideScreenLoader()      
    },[userID])
 
      const toTest = async () =>{
        if(!userID){
                        navigate("/auth")
                        return;
        }
        if(userID){
          console.log(screenCount)
          if(screenCount == null) return ;
          if(screenCount < 3){
            // fetch all questions
            const snap = await getDocs(collection(db, "Screening"));
            const allQuizIds = snap.docs.map(d => d.id);
            if (allQuizIds.length < 15) {
              throw new Error("Not enough quizzes");
            }
            // shuffle
            const shuffled = allQuizIds.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 15);
            await updateDoc(doc(db, "Users", userID), {
              quizIds: selected,
              screeningActive: true,
              quizCompleted:false
            }).then(()=>{
                navigate(`/screening/${userID}`)
            })
          }else if(screenCount >= 3){
          Swal.fire(
            "Screening Limit Reached",
            "You've reached the maximum number of attempts. Please contact our support team to request a review or reset.",
            "info"
          );                
          }
 

        }
 

    }
   return (

    <section className="preScreen">
        <div className="navContWhite navContWhiteLg">
                    <Navbar />
        </div>
        <div className="preScrenCont">
       <div className="preScreenImg">
            <img src={img} alt="" />
             <h2>AI Task Screening Test</h2>
        </div>
        <div className="preScreenCont">
            <h3><span>1.</span> Why this test exists.</h3>
<p>
Our platform relies on high-quality human input to evaluate and improve AI-generated content. To ensure that the results produced are accurate, reliable, and useful, every user must demonstrate a strong <b> understanding of English</b> before accessing tasks. This screening helps us confirm that you can read, interpret, and respond to content correctly.
</p>

<p>
By maintaining a consistent standard across all users, we are able to reduce low-quality submissions and create a fair environment where everyone is judged equally. This ensures that users who perform well are rewarded appropriately, and the overall quality of work on the platform remains high.
</p>

<p>
This test is not meant to be difficult or unfair—it simply reflects the type of work you will be doing on the platform. Taking it seriously will help you unlock better opportunities and ensure a smoother experience as you begin completing real tasks.
</p>
       <p>This test is designed to:</p>
       <ul>
        <li>Assess your <b>understanding of English.</b> </li>
        <li>Evaluate your ability to <b> read, write, and interpret content.</b></li>
        <li>Ensure you can complete tasks accurately and consistently</li>
       </ul>
           <h3><span>2. </span>What to Expect.</h3>
<p>
You will complete a short set of tasks that closely reflect the actual work available on the platform, including improving written content, translating text, and evaluating factual information. Each task is designed to test your ability to understand and respond using clear and accurate English. The goal is not speed, but how well you can interpret instructions and provide meaningful, correct answers.
</p>
<p>
Your responses will be automatically scored based on accuracy, clarity, and overall quality. This means every answer you submit matters. The screening is structured to give you a real sense of what working on the platform will feel like, so approach it with focus and attention to detail.
</p>

<h3><span>3. </span>Rules & Guidelines</h3>
<p>
You must complete the screening using your own knowledge without copying from external sources or using automated tools. This test is meant to reflect your personal ability, so all answers should be original. Take your time to carefully read each task and ensure you fully understand what is being asked before responding.
</p>
<p>
Accuracy is more important than speed, so avoid rushing through the tasks. Use clear, correct English with proper grammar and spelling in all your responses. Any attempt to cheat, submit random answers, or provide low-effort responses may lead to disqualification. You have a limited number of attempts, so it is important to take the process seriously.
</p>

<h3><span>4. </span>Passing the Screening.</h3>
<p>
After completing the screening, your responses will be evaluated and you will receive a score based on your performance across all tasks. This score reflects your ability to understand instructions, communicate clearly, and produce accurate results. Based on your score, you will be assigned a level that determines the types of tasks you can access.
</p>
<p>
Only users who meet the required quality standard will be allowed to proceed to paid tasks. Higher performance may unlock more advanced tasks and better opportunities on the platform. If you do not pass, you may be given another chance after a waiting period, depending on the platform rules.
</p>
         <button onClick={()=>toTest()} >I'm ready!</button>

        </div>

        </div>
 

      <Footer/>
        

    </section>
   )
}

export default PreScreening;