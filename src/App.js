import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Landing from './pages/landing';
import StackedFaqTest from './pages/test';
import Auth from './pages/auth';
import Jobs from './pages/jobs';
import useStore from './store.jsx/zustandstore';
import Loader from './components/loader';
import Admin from './pages/admin';

function App() {
  const screenLoader = useStore((s)=> s.screenLoader)
  return (
    <div className="App">

      <BrowserRouter>
      {screenLoader && <Loader/>}
       <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/Auth' element={<Auth/>} />
        <Route path='/Jobs' element={<Jobs/>} />
        <Route path='/Admin' element={<Admin/>} />
       </Routes>
        
    
      </BrowserRouter>
  
    </div>
  );
}

export default App;

