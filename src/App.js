import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import StackedFaqTest from "./pages/test";
import Auth from "./pages/auth";
import Jobs from "./pages/jobs";
import useStore from "./store/zustandstore";
import AdminLoader from "./components/admin/adminLoader";
import Loader from "./components/loader";
import Admin from "./pages/admin";
import Userdash from "./pages/userdash";
import Protected from "./components/protected";
import AuthProvider from "./firebase/authprovider";
import WorkPopUp from "./components/workpage/workpagepopup";
import Workspace from "./pages/work";
import Completetask from "./pages/complete";
function App() {
  const screenLoader = useStore((s) => s.screenLoader);
  const adminLoader = useStore((s)=>s.adminLoader)
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider />
        {screenLoader && <Loader />}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/complete" element={<Completetask />} />
          <Route path="/dashboard" element={<Protected><Userdash/></Protected>} />
          <Route path="/workpopup/:taskId" element={<Protected><WorkPopUp/></Protected>} />
          <Route path="/workspace/:taskId" element={<Protected><Workspace/></Protected>} />
        </Routes>

        {adminLoader && <AdminLoader/>}
        <Routes>
          <Route path="/admin" element={<Admin />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
