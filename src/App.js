import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Auth from "./pages/auth";
import Jobs from "./pages/jobs";
import useStore from "./store/zustandstore";
import AdminLoader from "./components/admin/adminLoader";
import Loader from "./components/loader";
import Admin from "./pages/admin";
import Userdash from "./pages/userdash";
import Protected from "./components/protected";
import AuthProvider from "./firebase/authprovider";
import CompleteTest from "./pages/completedscreening";
import WorkPopUp from "./components/workpage/workpagepopup";
import Workspace from "./pages/work";
import Completetask from "./pages/complete";
import { useEffect } from "react";
import PreScreening from "./pages/prescreen";
import ScreeningWorkspace from "./pages/screening";
import UploadQuestion from "./pages/uploadscreeningtask";
function App() {
  
  const screenLoader = useStore((s) => s.screenLoader);
      const hideScreenLoader= useStore((s)=>s.hideScreenLoader)
    useEffect(()=>{
       hideScreenLoader()
    },[])
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider />
        {screenLoader && <Loader />}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/complete/:taskId/:completeMethod/:payOut/:aIScore" element={<Completetask />} />
          <Route
            path="/jobs"
            element={
              <Protected>
                <Jobs/>
              </Protected>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Userdash />
              </Protected>
            }
          />
          <Route
            path="/workpopup/:taskId/:taskType"
            element={
              <Protected>
                <WorkPopUp />
              </Protected>
            }
          />

          <Route
            path="/prescreening"
            element={
                     <Protected>

                <PreScreening />
                      </Protected>

            }
          />
          <Route
            path="/screeningcomplete"
            element={
                <CompleteTest />
            }
          />
          
          <Route
            path="/upload"
            element={
                <UploadQuestion />
            }
          />
          <Route
            path="/workspace/:taskId/:taskType"
            element={
              <Protected>
                <Workspace />
              </Protected>
            }
          />
          <Route
            path="/screening/:taskId"
            element={
              <Protected>
                <ScreeningWorkspace />
              </Protected>
            }
          />
                    <Route path="/admin" element={<Admin />} />

        </Routes>

       
      </BrowserRouter>

    </div>
  );
}

export default App;
