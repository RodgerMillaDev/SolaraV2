
import usefbStore from "../store/firebasestore";
import { useNavigate } from "react-router-dom";
import useStore from "../store/zustandstore";
import { useEffect } from "react";
function Protected({children}){
    const userID = usefbStore((s)=>s.userID);
    const navigate = useNavigate();
 const hideScreenLoader = useStore((s)=>s.hideScreenLoader)
 const authStatus= usefbStore((s)=>s.authStatus)


    useEffect(()=>{
        if(authStatus=="authenticated"){
           hideScreenLoader()
        }else if(authStatus=="unauthenticated"){
           navigate("/auth")
        }
        else{

        }
    },[authStatus])
        

    return children;
    
  
}

export default Protected;