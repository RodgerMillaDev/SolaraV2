import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Landing from './pages/landing';
import StackedFaqTest from './pages/test';
import Auth from './pages/auth';
import Jobs from './pages/jobs';
import useStore from './store/zustandstore';
import Loader from './components/loader';
import Admin from './pages/admin';
import Userdash from './pages/userdash';
import Protected from './components/protected';
import AuthProvider from './firebase/authprovider';
import WorkPopUp from './components/workpage/workpagepopup';
import Workspace from './pages/work';
import Completetask from './pages/complete';
function App() {
  const screenLoader = useStore((s)=> s.screenLoader)
  return (
    <div className="App">

      <BrowserRouter>
      <AuthProvider/>
      {screenLoader && <Loader/>}
       <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/auth' element={<Auth/>} />
        <Route path='/jobs' element={<Jobs/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/workpopup' element={<WorkPopUp/>} />
        <Route path='/workspace' element={<Workspace/>} />
        <Route path='/complete' element={<Completetask/>} />
        <Route path='/dashboard' element={
          <Protected>
          <Userdash/>
          </Protected>

          } />
        
       </Routes>
        
    
      </BrowserRouter>
  
    </div>
  );
}

export default App;

