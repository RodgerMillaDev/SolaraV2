import loadAnimation from '../media/loader.json'; // Import directly
import Lottie from "lottie-web";
import { useEffect, useRef } from 'react';
import Aos from 'aos';


function Loader (){

    const loadContAnim = useRef(null)

      useEffect(()=>{
    Aos.init({duration:1000})
   
  const animation = Lottie.loadAnimation({
    container: loadContAnim.current,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: loadAnimation // Use imported JSON
  });
    
    return () => animation.destroy();

 
  },[])


    return(
        
    <div className="loaderCover" >
        <div className="loadContAnim" ref={loadContAnim}></div>
        
      </div>
    )
}
export default Loader;