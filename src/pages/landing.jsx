import { Icon } from "@iconify/react";
import Navbar from "../components/nav";
import logo1 from "../media/whiteFav.png";
import logo2 from "../media/favIcon.png";
import Lenis from '@studio-freight/lenis';

import logo3 from "../media/darkLogo.png"
import "../css/landing.css";
import blob from "../media/blob.svg";
import userP from "../media/pexels-tima-miroshnichenko-5198252.jpg";
import userP2 from "../media/user.png";
import lines from "../media/lines.webp";
import sideport from "../media/fotografia-editorial-XiKj4-d3hYo-unsplash.jpg"
import zigzag from "../media/zigzag.svg";
import dfon from "../media/fonImg2.png";
import { useRef, useState, useEffect, forwardRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { path, svg } from "motion/react-client";
import { motion, useTransform, animate, useMotionValue, useMotionTemplate } from "motion/react";
import "../css/landingresp.css"
import { type } from "@testing-library/user-event/dist/type";
import SplitType from 'split-type'; // ← ADD THIS LINE


import useStore from "../store.jsx/zustandstore";

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
  const cardsCont = useRef(null)
  const cardsContFixed = useRef(null)
  const fonMenu = useRef(null)
  const ContHeight = useRef(null)
  const svgLine = useRef(null)
  const countOne = useMotionValue(0);
  const closeFonMenu = useStore((s)=> s.closeFonMenu)
  const fonMenuDrawer = useStore((s)=> s.fonMenuDrawer)
  const countTwo = useMotionValue(0);

  const cnclFon = () =>{
    closeFonMenu();
    console.log("yes")
  }


  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };

  }, []);

useEffect(() => {

  const path = svgLine.current?.querySelector('path');
  const container = ContHeight.current;
  
  if (!path || !container) return;

  const length = path.getTotalLength();
  
  // Direct fromTo with ScrollTrigger
  gsap.fromTo(path, 
    {
      strokeDasharray: length,
      strokeDashoffset: length
    },
    {
      strokeDashoffset: 0,
      duration: 1,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // ✅ This was missing
        // toggleActions: "play none none reverse" // Alternative
      }
    }
  );

}, []);

  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

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
        cardQ:"Is Solara accessible worldwide",
        cardA:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates magnam accusamus esse consequatur, cumque magni deleniti dolorem atque temporibus quidem!"
    },
    {    
        id:2,
        cardImgL:"cardImgBL",
        cardImgr:"cardImgTR",
        cardQ:"Is Solara accessible worldwide",
        cardA:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates magnam accusamus esse consequatur, cumque magni deleniti dolorem atque temporibus quidem!"
    },
    {    
        id:3,
          cardImgL:"cardImgTL",
        cardImgR:"cardImgBR",
        cardQ:"Is Solara accessible worldwide",
        cardA:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates magnam accusamus esse consequatur, cumque magni deleniti dolorem atque temporibus quidem!"
    },
    {    
        id:4,
   cardImgL:"cardImgBL",
        cardImgr:"cardImgTR",
        cardQ:"Is Solara accessible worldwide",
        cardA:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates magnam accusamus esse consequatur, cumque magni deleniti dolorem atque temporibus quidem!"
    }

  ]
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
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
  const cards = cardsRef.current;

  if (!cards.length) return;

  // 1️⃣ Set initial stacked state
  gsap.set(cards, {
    y: 0,
    // rotation: (i) => -5 * i,
    zIndex: (i) => cards.length - i,
  });

  // 2️⃣ Build timeline
  const tl = gsap.timeline();

  cards.forEach((card, i) => {
    if (i === cards.length - 1) return; // keep last card

    tl.to(card, {
      y: "-120vh",
      // rotation: -48,
      ease: "none",
    });
  });
const CARD_SCROLL = window.innerHeight * 1;
const TOTAL_SCROLL = CARD_SCROLL * (cards.length - 1);

ScrollTrigger.create({
  trigger: cardsCont.current,
  start: "top top",
  end: `+=${TOTAL_SCROLL}`,
  pin: cardsContFixed.current,
  scrub: true,
  animation: tl,
  anticipatePin: 1,
  // markers: true
});

  ScrollTrigger.refresh();

  return () => {
    ScrollTrigger.killAll();
  };
}, []);

useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
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
  // const roundedCount2 = useTransform(countTwo, (value) => Math.round(value));

  //  // This creates a string that updates with countOne
  // const countTwoDis = useMotionTemplate`${roundedCount2}k +`;
  
  // useEffect(() => {
  //   const controls2 = animate(countTwo, 300, { duration: 5 });
  //   return () => controls2.stop();
  // }, []);

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
        <div className="sideMenuPlacer">
          <div className="fonMenuX" onClick={cnclFon}>
                
                <Icon className="faIcon" icon="solar:alt-arrow-right-linear" />
          </div>
          <div className="fonMenuLinks">

            <p>Job Opportunities</p>
            <p>Dashboard</p>
            <p>Referrals</p>
            <p>About Us</p>
            <button>Get Started</button>

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
              <button>Get Job</button>
            </div>
            <div className="heroContImg">
              <img className="blob1" src={blob} alt="" />

              <div className="heroUsersCont">
                <div className="heroUsers">
                  <img src={userP} alt="" />
                  <img src={userP} alt="" />
                  <img src={userP2} alt="" />
                </div>
           <div className="heroUserActCont">
      <motion.span>{countOneDis}</motion.span> {/* ✅ Works! */}
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
            <div className="actBox1">
              <div className="actBoxCont">
                <div className="ab1T">
                  <h3>Instant Transfers</h3>
                </div>
                <div className="ab1B">
                  <Icon className="faIcon" icon="solar:arrow-right-up-linear" />
                </div>
              </div>
            </div>
            <div className="actBox2">
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
            <div className="actBox3">
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
            <div className="actBox4">
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
              <button>Sign Up</button>
            </div>
            <div className="actUnlockRight" ref={unlockright}>
              <div className="unlockGrid">
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

            <div className="abstractBox">
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
           <div className="svgCont">
        <svg ref={svgLine} width="1036" height="1998" viewBox="0 0 1036 1998" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M53.3082 0.180923C53.3082 0.180923 -43.7593 246.141 25.3082 376.181C149.322 609.673 439.068 158.87 689.308 244.181C786.69 277.38 863.536 288.466 917.308 376.181C1012.97 532.225 596.481 546.435 689.308 704.181C738.529 787.825 822.927 954.788 917.308 932.181C974.493 918.484 1024.03 894.246 1033.31 836.181C1044.14 768.415 980.482 730.988 917.308 704.181C774.882 643.744 706.846 874.459 689.308 1028.18C676.939 1136.6 666.557 1233.98 753.308 1300.18C852.733 1376.05 861.162 1150.94 965.308 1220.18C1106.74 1314.22 874.843 1454.19 709.308 1492.18C503.994 1539.3 357.403 1242.7 185.308 1364.18C115.119 1413.73 66.3377 1352.7 25.3082 1428.18C-24.2315 1519.32 47.956 1576.58 53.3082 1680.18C67.8594 1961.83 573.308 1768.18 629.308 1764.18C685.308 1760.18 653.308 1620.18 533.308 1636.18C413.308 1652.18 591.876 2013.32 497.308 1940.18C483.328 1929.37 481.435 1915.41 465.308 1908.18C433.276 1893.82 482.949 2024.21 497.308 1992.18" stroke="#5EA7FA" strokeWidth={"10"}/>
</svg>

      </div>
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
                <div className="faqRightB">
                    <div className="faqRightBCont">
                        <h2>45%</h2>
                        <p>Lorem ipsum dolor sit.</p>
                    </div>
                    
                </div>


            </div>
        </div>

      </section>
      </div>

      <section className="realFaq" ref={cardsCont}>
        <div className="realFaqPlacer" ref={cardsContFixed}>
        <div className="rfIntro">
            <span>Know More</span>
            <h2>Lorem ipsmet conse.</h2>
            </div>    
            <div className="rfCont" >

                {
                    faqCards.map((card, index)=>(
   <div key={index} className={`faqCard faqCard${card.id}`} ref={(el) =>(cardsRef.current[index] = el)}>
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
      <footer>
        <div className="footerPlacer">
          <div className="footerTop">
            <div className="ftLeft">
              <div className="ftTT">
                <img src={logo3} alt="" />
              </div>
              <div className="ftBB">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim accusantium unde alias.</p>

              </div>

            </div>
            <div className="ftMid">
              <div className="ftMidLeft">
                     <div className="ftTT">
                      <p>Links</p>
                      </div>

                <div className="ftBB">
                               <p>Home                  
                                 <Icon className="faIcon" icon="solar:arrow-right-up-linear" /></p>
                <p>Referral Program   <Icon className="faIcon" icon="solar:arrow-right-up-linear" /></p>
                <p>Dashboard   <Icon className="faIcon" icon="solar:arrow-right-up-linear" /></p>
                <p>About Us   <Icon className="faIcon" icon="solar:arrow-right-up-linear" /></p>
                </div>
                
              </div>
              <div className="ftMidRight">
                     <div className="ftTT">
                      <p>Socials</p>
                      </div>

                <div className="ftBB">
                <p>Instagram   <Icon className="faIcon" icon="solar:arrow-right-up-linear" /></p>
                <p>Twitter   <Icon className="faIcon" icon="solar:arrow-right-up-linear" /></p>
                <p>Dashboard   <Icon className="faIcon" icon="solar:arrow-right-up-linear" /></p>
                <p>About Us  <Icon className="faIcon" icon="solar:arrow-right-up-linear" /></p>
                </div>
                
              </div>
           
              
            </div>
      <div className="ftRight">
                   <div className="ftTT">
                      <p>NewsLetter</p>
                      </div>

                <div className="ftBB">
                <p>Receive news on jobs posted, updates and early access.</p>

                <div className="newsLetterWrap">
                  <div className="nlInput">
                    <input type="email" placeholder="Enter your email" />

                  </div>
                  <div className="nLBtn">
                  <Icon className="faIcon" icon="solar:plain-3-linear" />

                  </div>
                </div>
              
                </div>

              </div>

            
          </div>
          <div className="footerBtm">
            <span> &copy; 2026 Solara Jobs. All rights reserved. </span>

          </div>

        </div>

      </footer>
    </div>
  );
}

export default Landing;
