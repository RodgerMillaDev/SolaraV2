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
import userP from "../media/pexels-tima-miroshnichenko-5198252.jpg";
import userP2 from "../media/user.png";
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
        cardA:"We provide digital task solutions."
    },
    {    
        id:2,
        cardImgL:"cardImgBL",
        cardImgr:"cardImgTR",
        cardQ:"How do I get paid?",
        cardA:"Payments are processed after approval."
    },
    {    
        id:3,
          cardImgL:"cardImgTL",
        cardImgR:"cardImgBR",
        cardQ:"Is this remote?",
        cardA:"Yes, all tasks are done online."
    },
    {    
        id:4,
   cardImgL:"cardImgBL",
        cardImgr:"cardImgTR",
        cardQ:"When can I withdraw?",
        cardA:"After reaching the minimum payout."
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
  const text = new SplitType(char, {types: "chars"})
  gsap.from(text.chars,{
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
             <a href="/dashboard">Dashbboard</a>
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi,
                molestias? Corrupti saepe recusandae provident? Necessitatibus
                ipsa dolorum deserunt beatae unde?
              </p>
              <button onClick={toJobs}> Get Job</button>
            </div>
            <div className="heroContImg">
              <img className="blob1" src={blob} alt="" />

              <div className="heroUsersCont" data-aos="fade-left">
                <div className="heroUsers">
                  <img src={userP} alt="" />
                  <img src={userP} alt="" />
                  <img src={userP2} alt="" />
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
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet. consectetur
              adipisicing elit. Dolore, aspernatur?
            </p>
          </div>
          <div className="actBoxed">
            <div className="actBox1" data-aos="fade-up">
              <div className="actBoxCont">
                <div className="ab1T">
                  <h3>Instant Transfers</h3>
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
                    icon="solar:diagram-up-linear"
                  />
                </div>
                <span>Real-time Alerts</span>
                <p>
                  Lorem ipsum dolor sittur adipisicing elit. Accusantium, modi
                  nihil. Consequuntur id quis tempora?
                </p>
              </div>
            </div>
            <div className="actBox3" data-aos="fade-up">
              <div className="actBox2Cont">
                <div className="actBox3Cont">
                  <div className="actBoxIcon">
                    <Icon className="faIcon" icon="solar:user-rounded-linear" />
                  </div>
                  <span>Real-time Alerts</span>
                  <p>
                    Lorem adipisicing elit. Accusantium, modi nihil.
                    Consequuntur id quis tempora?
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
                      icon="solar:laptop-minimalistic-linear"
                    />
                  </div>
                  <span>Real-time Alerts</span>
                  <p>
                    Lorem ipsum dolouing t. Accusantium, modi nihil.
                    Consequuntur id quis tempora?
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
              Lorem ipsum <span>dolor sit</span> amet, consectg elit.{" "}
            </h2>
          </div>
          <div className="actUnlock" ref={unlock}>
            <div className="actUnlockLeft" ref={unlockleft}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
                consectetur illum beatae ea nobis voluptate.
              </p>
              <button onClick={toAuth}>Sign Up</button>
            </div>
            <div className="actUnlockRight" ref={unlockright}>
              <div className="unlockGrid" data-aos="fade-up">
                <div className="ug1">
                  <div className="ugcont">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Odio, atque totam esse debitis incidunt facilis mollitia
                      eaque iure voluptatibus, dolor eos quas natus, illum ab?
                      Expedita ea ipsum illum. Accusamus.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Odio, atque totam esse debitis incidunt facilis mollitia
                      eaque iure voluptatibus, dolor eos quas natus, illum ab?
                      Expedita ea ipsum illum. Accusamus.
                    </p>
                    <div className="unlockNumbers">
                      <div className="arrUp">
                        <Icon className="faIcon" icon="solar:arrow-up-linear" />
                      </div>
                      <motion.h2>4k +</motion.h2>
                    </div>
                  </div>
                </div>
                <div className="ug2">
                  <div className="ugcont">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Odio, atque totam esse debitis incidunt facilis mollitia
                      eaque iure voluptatibus, dolor eos quas natus, illum ab?
                      Expedita ea ipsum illum. Accusamus.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Odio, atque totam esse debitis incidunt facilis mollitia
                      eaque iure voluptatibus, dolor eos quas natus, illum ab?
                      Expedita ea ipsum illum. Accusamus.
                    </p>
                    <div className="unlockNumbers">
                      <div className="arrUp">
                        <Icon className="faIcon" icon="solar:arrow-up-linear" />
                      </div>
                      <h2>300k +</h2>
                    </div>
                  </div>
                </div>
                <div className="ug3">
                  <div className="ugcont">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Odio, atque totam esse debitis incidunt facilis mollitia
                      eaque iure voluptatibus, dolor eos quas natus, illum ab?
                      Expedita ea ipsum illum. Accusamus.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Odio, atque totam esse debitis incidunt facilis mollitia
                      eaque iure voluptatibus, dolor eos quas natus, illum ab?
                      Expedita ea ipsum illum. Accusamus.
                    </p>
                    <div className="unlockNumbers">
                      <div className="arrUp">
                        <Icon className="faIcon" icon="solar:arrow-up-linear" />
                      </div>
                      <h2>300k +</h2>
                    </div>
                  </div>
                </div>
                <div className="ug4">
                  <div className="ugcont">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Odio, atque totam esse debitis incidunt facilis mollitia
                      eaque iure voluptatibus, dolor eos quas natus, illum ab?
                      Expedita ea ipsum illum. Accusamus.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Odio, atque totam esse debitis incidunt facilis mollitia
                      eaque iure voluptatibus, dolor eos quas natus, illum ab?
                      Expedita ea ipsum illum. Accusamus.
                    </p>
                    <div className="unlockNumbers">
                      <div className="arrUp">
                        <Icon className="faIcon" icon="solar:arrow-up-linear" />
                      </div>
                      <h2>300k +</h2>
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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem recusandae culpa eum molestiae mollitia velit nulla ipsum deleniti neque veritatis distinctio, soluta officia enim laudantium.</p>
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
                        <h2 className="reveal-type">Lorem ipsum dolor si Lorem ipsum dolor t amet consectetur.</h2>
                    </div>
                    <div className="penSol">
                        <span>02</span>
                        <h2 className="reveal-type">Lorem ipsum dolor si Lorem ipsum dolor t amet consectetur.</h2>
                    </div>
                    <div className="penSol">
                        <span>03</span>
                        <h2 className="reveal-type">Lorem ipsum dolor si Lorem ipsum dolor t amet consectetur.</h2>
                    </div>
                    <div className="penSol">
                        <span>04</span>
                        <h2 className="reveal-type">Lorem ipsum dolor si Lorem ipsum dolor t amet consectetur.</h2>
                    </div>
                </div>
                <div className="penRight">
                </div>
            </div>
        </div>
      </section>
      <section className="faq">

        <div className="faqPlacer">
            <div className="faqLeft">
                <div className="faqLeftCont">
                <p>Lorem, ipsum dolor.</p>
        <div className="faqLeftIcon">
                        <Icon className="faIcon" icon="solar:like-linear" />

                </div>
                </div>
        
            </div>
            <div className="faqRight">

                <div className="faqRightT">
                    <h2>Lorem <span>Ipsum</span> </h2>
                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto praesentium ad magni libero quia deserunt optio enim? A, magnam velit?</p>
                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto praesentium ad magni libero quia deserunt optio enim? A, magnam velit?</p>
                </div>
                <div className="faqRightB" data-aos="fade-in">
                    <div className="faqRightBCont">
                        <h2>45%</h2>
                        <p>Lorem ipsum dolor sit.</p>
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
              <h3>Refer a Freelancer</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, tenetur. Velit ratione voluptatibus alias tempora laborum, soluta qui eos! Neque.</p>
              <button>Refer a Freelancer                 
                  <Icon className="faIcon" icon="solar:user-rounded-linear" /></button>

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
