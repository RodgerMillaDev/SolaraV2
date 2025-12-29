import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Landing from './pages/landing';
import StackedFaqTest from './pages/test';
import Auth from './pages/auth';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
       <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/Auth' element={<Auth/>} />
       </Routes>
        
    
      </BrowserRouter>
  
    </div>
  );
}

export default App;

