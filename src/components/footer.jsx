 import "../css/landing.css"
 import "../css/landingresp.css"
 import logo1 from "../media/whiteFav.png";
import { Icon } from "@iconify/react";
import logo3 from "../media/darkLogo.png"


 function Footer(){
    return(
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
    )

 }

 export default Footer