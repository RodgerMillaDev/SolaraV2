import { Icon } from "@iconify/react";
import logo1 from "../media/favIcon.png";
import logo2 from "../media/fullLogoTrans.png";
import "../css/navlanding.css";
import "../css/navlandingresp.css"
import usefbStore from "../store/firebasestore";
import { useNavigate } from "react-router-dom";
import useStore from "../store/zustandstore";
import { signOut,getAuth } from "firebase/auth";
import Swal from "sweetalert2";
function Navbar() {

  const openFonMenu = useStore((s)=> s.openFonMenu);
  const navigate = useNavigate()
    const authStatus = usefbStore((s)=>s.authStatus)
  


    const showFon = () =>{
      openFonMenu();
    }
    const toAuth=()=>{
      navigate("/auth")
    }
  
        const logOut =()=>{
          Swal.fire({
                    title:"Are You Sure?",
                    text:"Please confirm you are signing out!",
                    icon:"question",
                    showConfirmButton:true,
                    confirmButtonText:"Log Out",
                    showCancelButton:true,
                    cancelButtonText:"Cancel",
                    cancelButtonColor:"#"
                
                }).then((result)=>{
                    if(result.isConfirmed){
                    const auth = getAuth()
                    signOut(auth).then(()=>{
                        navigate("/auth")
                    }).catch(()=>{
                        Swal.fire("Error", "An error occured", "error")
                    })
                    }
                  
                })
    
      
    }
  return (
    <nav>
      <div className="navPlacer">
        <div className="navLogo">
          <img src={logo1} alt="" />
        </div>
        <div className="navLinks">
          
          <div className="navLink">
             <a href="/Jobs">Job Opportunities</a>

          </div>
          <div className="navLink">
            <a href="/dashboard">AI Tasks</a>
          </div>
          <div className="navLink">
            <a href="/">Referrals</a>
          </div>
          <div className="navLink">
              <a href="/dashboard">About Us</a>

          </div>
         
        </div>
        <div className="fonNavIcon" onClick={showFon}>
                    <Icon className="faIcon" icon="solar:widget-linear" />

        </div>
        <div className="navBtns">
          <div className="navBtn">
            {authStatus == "authenticated" ? (<button onClick={()=>logOut()}>Sign Out</button>
):(            <button onClick={()=>toAuth()}>Sign In</button>
)}

          </div>

        </div>
      </div>
    </nav>
  );
}
export default Navbar;
