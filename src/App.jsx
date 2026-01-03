import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Nav"; 
import Home from "./Components/Home"; // We will create this next
import './App.css';
import Signup from './Components/SignUp';
import Login from './Components/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar /> 
        
        {/* The Routes container decides which component to show */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/search" element={<div className="p-10 text-2xl">Search Alumni Page</div>} />
          <Route path="/events" element={<div className="p-10 text-2xl">Events Page</div>} />
          <Route path="/dashboard" element={<div className="p-10 text-2xl">Dashboard Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;