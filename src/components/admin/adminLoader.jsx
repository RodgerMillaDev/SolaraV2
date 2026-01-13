import imgLogo from "../../media/whiteFav.png";
import { Icon } from "@iconify/react";
import  "../../css/adminLoader.css";



function AdminLoader(){

  return (
    <div className="adminWrapper">
        <img src={imgLogo} alt="" />
        <div className="enableDesktop">
            <p>Go to landscape mode</p>
            <Icon className="faIcon" icon="solar:smartphone-rotate-2-broken"/>
        </div>



    </div>
  )
}
export default AdminLoader;