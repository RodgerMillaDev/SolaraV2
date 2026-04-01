import { Icon } from "@iconify/react";
import Navbar from "../components/nav";
import logo1 from "../media/whiteFav.png";
import logo2 from "../media/favIcon.png";
import Lenis from '@studio-freight/lenis';
import Aos from "aos";
import "aos/dist/aos.css";
import Footer from "../components/footer";
import "../css/landing.css";
import blob from "../media/blob.svg";
import userP from "../media/pexels-gustavo-fring-4972205.avif";
import userP3 from "../media/pexels-shah-47-14865961-6317963.avif";
import userP2 from "../media/pexels-olly-3801703.avif";
import lines from "../media/lines.webp";
import zigzag from "../media/zigzag.svg";
import { useRef, useState, useEffect, forwardRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { motion, useTransform, animate, useMotionValue, useMotionTemplate } from "motion/react";
import "../css/landingresp.css"
import SplitType from 'split-type'; // ← ADD THIS LINE
import useStore from "../store/zustandstore";
import { useNavigate } from "react-router-dom";
import usefbStore from "../store/firebasestore";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

gsap.registerPlugin(useGSAP);



function Landing() {
  const cursorDot = useRef(null);
  const cursorCircle = useRef(null);
  const navCont = useRef(null);
  const hero = useRef(null);
  const unlock = useRef(null);
  const unlockleft = useRef(null);
  const unlockright = useRef(null);
  const cardsRef = useRef([])
  const loaderCover = useRef(null)
  const cardsCont = useRef(null)
  const cardsContFixed = useRef(null)
  const fonMenu = useRef(null)
  const ContHeight = useRef(null)
  const svgLine = useRef(null)
  const countOne = useMotionValue(0);
  const closeFonMenu = useStore((s)=> s.closeFonMenu)
  const fonMenuDrawer = useStore((s)=> s.fonMenuDrawer)
  const screenLoader = useStore((s)=> s.screenLoader)
  const countTwo = useMotionValue(0);
  const navigate = useNavigate()
  const loadContAnim = useRef(null)

      const hideScreenLoader = useStore((s)=> s.hideScreenLoader)

      const toJobs=()=>{
        navigate("/jobs")
      }
      const toDash=()=>{
        navigate("/dashboard")
      }


    useEffect(()=>{

        hideScreenLoader();

    },[hideScreenLoader])

  const cnclFon = () =>{
    closeFonMenu();
  }

   const toAuth=()=>{

      navigate("/auth")
    }
     


  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if(!cursorDot.current) return;

    cursorDot.current.style.left = `${posX}px`;
    cursorDot.current.style.top = `${posY}px`;

    cursorCircle.current.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 2000, fill: "forwards" }
    );

    cursorDot.current.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: "forwards" }
    );
  });

const faqCards = [

  {    
      id:1,
      cardImgL:"cardImgTL",
      cardImgR:"cardImgBR",
      cardQ:"What is your service?",
      cardA:"We provide a platform where you can access remote jobs and complete AI-powered tasks to earn online from one place."
  },
  {    
      id:2,
      cardImgL:"cardImgBL",
      cardImgr:"cardImgTR",
      cardQ:"How do I get paid?",
      cardA:"Payments are processed securely after task or job approval, ensuring you receive your earnings quickly and reliably."
  },
  {    
      id:3,
      cardImgL:"cardImgTL",
      cardImgR:"cardImgBR",
      cardQ:"Is this remote?",
      cardA:"Yes, all tasks and job opportunities are fully remote, allowing you to work from anywhere with internet access."
  },
  {    
      id:4,
      cardImgL:"cardImgBL",
      cardImgr:"cardImgTR",
      cardQ:"When can I withdraw?",
      cardA:"You can withdraw your earnings once you reach the minimum payout threshold, with a simple and transparent process."
  }

]
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if(!navCont.current) return;

          if (entry.isIntersecting) {
            navCont.current.classList.remove("navContWhite");
          } else {
            navCont.current.classList.add("navContWhite");
          }
        });
      },
      {
        threshold: 0.2, // percentage visible
      }
    );

    observer.observe(hero.current);
  }, []);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;

      // Initial state
      cards.forEach((card, index) => {
        gsap.set(card, {
          yPercent: index === 0 ? 0 : 100,
          scale: 1,
          transformOrigin: "center center"
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsCont.current,
          pin: true,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          scrub: 1,
        },
        defaults: { ease: "none" }
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        // Bring current card in
        tl.to(card, {
          yPercent: 0,
          duration: 1
        });

        // Scale previous card
        tl.to(
          cards[index - 1],
          {
            scale: 0.9,
            borderRadius: "12px",
            duration: 1
          },
          "<"
        );
      });
    }, cardsCont);

    return () => ctx.revert();
  }, []);



useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if(!unlock.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            unlockleft.current.style.position = "sticky";
            unlockleft.current.style.top = "15vh";
            unlockright.current.style.position = "static";
          } else {
            unlockleft.current.style.position = "static";
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(unlock.current);
  }, []);

  const roundedCount = useTransform(countOne, (value) => Math.round(value));

  
   // This creates a string that updates with countOne
  const countOneDis = useMotionTemplate`${roundedCount}k +`;
  
  useEffect(() => {
    const controls = animate(countOne, 14, { duration: 3 });
    return () => controls.stop();
  }, []);


  useEffect(()=>{
const splitTypes = document.querySelectorAll(".reveal-type")

splitTypes.forEach((char, i)=>{
  const text = new SplitType(char, {types: "words"})
  gsap.from(text.words,{
    scrollTrigger:{
      trigger: char,
      start: 'top 80%',
      end: "top 20%",
      scrub: true,
      markers:false,
           
    },
    opacity:0.1,
    stagger:0.1,
  })
})
  },[])



  return (
    <div>
     

      <div className={`fonMenu ${fonMenuDrawer ? "fonMenuActive" : ""}`} >
        <img src={logo1} alt="" />
        <div className="sideMenuPlacer">
          <div className="fonMenuX" onClick={cnclFon}>
                
                <Icon className="faIcon" icon="solar:alt-arrow-right-linear" />
          </div>
          <div className="fonMenuLinks">

             <a href="/Jobs">Job Opportunities</a>
             <a href="/dashboard">Dashboard</a>
             <a href="/dashboard">AI Tasks</a>
             <a href="/">Referral Programme</a>
            <button onClick={toAuth}>Get Started</button>
          </div>
          
        </div>
      </div>
      <div className="cursorDot" ref={cursorDot} data-cursor-dot></div>
      <div className="cursorCircle" ref={cursorCircle} data-cursor-circle></div>
      <section className="hero" ref={hero}>
        <img className="zigzag1" src={zigzag} alt="" />
        <div className="navCont" ref={navCont}>
          <Navbar />
        </div>
        <div className="heroCont">
          <div className="heroLeft">
            <div className="heroLH1">
              <h1>Apply.</h1>
            </div>
          </div>
          <div className="heroRight">
            <div className="heroRCont">
              <h1>Work.</h1>
              <h1>Earn.</h1>
              <p>
              Built for freelancers who want flexibility, consistent work, and smarter ways to earn online.  
              </p>
              
              <div className="heroBtns">
              <button onClick={()=>toDash()}>AI Task</button>

              </div>
            </div>
            <div className="heroContImg">
              <img className="blob1" src={blob} alt="" />

              <div className="heroUsersCont" data-aos="fade-left">
                <div className="heroUsers">
                  <img src={userP} alt="" />
                  <img src={userP2} alt="" />

                  <img src={userP3} alt="" />
                </div>
           <div className="heroUserActCont">
      <motion.span >{countOneDis}</motion.span> {/* ✅ Works! */}
      <p>Freelancers online</p>
    </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="boxed">
        <img className="lines" src={lines} alt="" />
        <div className="boxedPlc">
          <div className="boxIntro">
            <span className="miniIntroIntro">Work Now</span>
            <h2>Are You a <span>Freelancer</span>?</h2>
            <p>
              One platform. Real work. AI-powered tasks and freelance opportunities designed to help you earn faster.
            </p>
          </div>
          <div className="actBoxed">
            <div className="actBox1" data-aos="fade-up">
              <div className="actBoxCont">
                <div className="ab1T">
                  <h3>Grow Your Skills</h3>
                </div>
                <div className="ab1B">
                  <Icon className="faIcon" icon="solar:arrow-right-up-linear" />
                </div>
              </div>
            </div>
            <div className="actBox2" data-aos="fade-up">
              <div className="actBox2Cont">
                <div className="actBoxIcon">
                    <Icon
                      className="faIcon"
                      icon="solar:laptop-minimalistic-linear"
                    />
                  </div>
                <span>Find Remote Work</span>
                <p>
                 Access a wide range of remote jobs across industries, from coding to creative freelance opportunities.
                </p>
              </div>
            </div>
            <div className="actBox3" data-aos="fade-up">
              <div className="actBox2Cont">
                <div className="actBox3Cont">
                  <div className="actBoxIcon">
                    <Icon className="faIcon" icon="solar:user-rounded-linear" />
                  </div>
                  <span>Earn With AI Tasks</span>
                  <p>
                   Complete simple AI-powered tasks anytime and get paid quickly while building useful digital experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="actBox4" data-aos="fade-up">
              <div className="actBox3Cont">
                <div className="actBox2Cont">
                  <div className="actBoxIcon">
                    <Icon
                      className="faIcon"
                      icon="solar:clock-circle-outline"
                    />
                  </div>
                  <span>Flexible Schedule</span>
                  <p>
                   Work when you want, choose tasks that fit your time, and stay in control of your workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="unlock">
        <div className="secPlacer">
          <div className="unlockIntro">
            <h2>
              Solara in Numbers: <span>Freelancers and Opportunities</span> 
            </h2>
          </div>
          <div className="actUnlock" ref={unlock}>
            <div className="actUnlockLeft" ref={unlockleft}>
              <p>
                Remote opportunities span tech, creative, and digital fields for flexible work.
              </p>
              <button onClick={()=>toDash()}>Get Started</button>
            </div>
            <div className="actUnlockRight" ref={unlockright}>
              <div className="unlockGrid" data-aos="fade-up">
                <div className="ug1">
                  <div className="ugcont">
                    <p>
We’ve already seen over 3,500 tasks completed on the platform, showing strong early traction and consistent freelancer engagement.
                    </p>
                    <p>
As more users join and contribute daily, this number continues to grow, reflecting real work being done and real value being created.
                    </p>
                    <div className="unlockNumbers">
                      <div className="arrUp">
                        <Icon className="faIcon" icon="solar:arrow-up-linear" />
                      </div>
                      <motion.h2>3.5k +</motion.h2>
                    </div>
                  </div>
                </div>
                <div className="ug2">
                  <div className="ugcont">
                    <p>
Our freelancers maintain a 92% task completion rate, consistently delivering quality work on time.                    </p>
                    <p>
This reliability ensures smooth workflows, builds trust across the platform, and demonstrates the growing dedication and efficiency of our active freelancer community every day.                    </p>
                    <div className="unlockNumbers">
                      <div className="arrUp">
                        <Icon className="faIcon" icon="solar:arrow-up-linear" />
                      </div>
                      <h2>92%</h2>
                    </div>
                  </div>
                </div>
                <div className="ug3">
                  <div className="ugcont">
                    <p>
We have over 1,200 remote jobs have been posted on our platform, providing diverse opportunities across tech, creative, and digital fields. Submit your CV and you're all set.                   </p>
                    <p>
This steady flow of work allows freelancers to find tasks matching their skills and earn reliably on their own schedule.                    </p>
                    <div className="unlockNumbers">
                      <div className="arrUp">
                        <Icon className="faIcon" icon="solar:arrow-up-linear" />
                      </div>
                      <h2>1,200</h2>
                    </div>
                  </div>
                </div>
                <div className="ug4">
                  <div className="ugcont">
                    <p>
                    Over 950 payments have already been processed, ensuring freelancers receive their earnings quickly and reliably.
                    </p>
                    <p>Transparent payout system supports trust, encourages consistent work, and demonstrates our commitment to helping freelancers get paid on time for every completed task.
                    </p>
                    <div className="unlockNumbers">
                      <div className="arrUp">
                        <Icon className="faIcon" icon="solar:arrow-up-linear" />
                      </div>
                      <h2>950 +</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="abstract">
        <div className="abstractPlacer">

            <div className="abstractBox" data-aos="fade-up">
                <div className="abstractBoxWrap">
                     <img src={blob} alt="" />

            <div className="abIcon">
                        <Icon className="faIcon" icon="solar:like-linear" />

            </div>
            <div className="abCont">
                <h2>Work From Anywhere</h2>
                <p>Complete tasks, tackle projects, and earn income on your schedule, giving freelancers the flexibility to balance work, life, and growth without being tied to a single location.</p>
            </div>
                </div>
           

            </div>

        </div>


      </section>
      <div className="ContHeight" ref={ContHeight}>
         
      <section className="penDraw" >
     <div className="penDrawPlacer">
    <div className="penDrawIntro">
        <span>Our Solutions</span>
    </div>
    <div className="penDrawerCont">
        <div className="penLeft">

            <div className="penSol">
                <span>01</span>
                <h2 className="reveal-type">Access remote freelance jobs tailored to your skills and schedule.</h2>
            </div>
            <div className="penSol">
                <span>02</span>
                <h2 className="reveal-type">Complete AI-powered tasks efficiently and earn consistently online.</h2>
            </div>
            <div className="penSol">
                <span>03</span>
                <h2 className="reveal-type">Discover diverse opportunities across tech, creative, and digital industries.</h2>
            </div>
            <div className="penSol">
                <span>04</span>
                <h2 className="reveal-type">Build skills, gain experience, and grow your freelance career with us.</h2>
            </div>
        </div>
        <div className="penRight">
            {/* You can add an image, illustration, or animation here */}
        </div>
    </div>
</div>
      </section>
      <section className="faq">

        <div className="faqPlacer">
            <div className="faqLeft">
               
        
            </div>
            <div className="faqRight">

    <div className="faqRightT">
        <h2>Work <span>Smarter</span></h2>

        <p>
            Our platform combines remote job opportunities with AI-powered tasks, giving you multiple ways to earn from a single place. Whether you're looking for long-term projects or quick income, everything is designed for flexibility and efficiency.
        </p>

        <p>
            Skip the limitations of traditional freelancing. With a steady flow of tasks and curated job listings, you can stay productive, build real experience, and scale your earnings without constantly searching for your next opportunity.
        </p>
    </div>

    <div className="faqRightB" data-aos="fade-in">
        <div className="faqRightBCont">
            <h2>2x</h2>
            <p>More opportunities with jobs and AI tasks </p>
        </div>
    </div>

</div>
        </div>

      </section>
      </div>
      <section className="realFaq" >
            <div className="rfCont" ref={cardsCont} >
                {
                    faqCards.map((card, index)=>(
                      <div 
                      key={index.id}
                      className={`faqCard faqCard${card.id}`} 
                      ref={(el) => (cardsRef.current[index] = el)}
                      >
                        <div className="faqCardCont">
                                  <img className={card.cardImgL} src={logo1} alt="" />
                        <h3>
                            {card.cardQ}
                        </h3>
                        <p>
                            {card.cardA}
                        </p>
                            <img className={"cardImgBR"} src={logo1} alt="" />
                        </div>
                    </div>
                    ))
                }
            </div>
      </section>
      <section className="Affiliate">
        <div className="affPlacer">
          <div className="afCont">
     <div className="afLeft">
  <span>Join Us</span>
  <h3>Refer and Earn</h3>
  <p>
    Invite freelancers to join the platform and earn rewards as they complete tasks and jobs. 
    It’s a simple way to grow your network while generating passive income from every successful referral.
  </p>
  <button>
    Start Referring
    <Icon className="faIcon" icon="solar:user-rounded-linear" />
  </button>
</div>
            <div className="afRight">
<div className="container">
    <div className="planet">
      <div className="orbit">
        <div className="moon"></div>
      </div>
 
      <div className="orbit2">
        <div className="moon2"></div>
        <div className="moon21"></div>
      </div>
      <div className="orbit3">
        <div className="moon3"></div>
      </div>
      <div className="orbit4">
        <div className="moon4"></div>
        <div className="moon41"></div>
      </div>
    </div>
  </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Landing;
