
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Nav"; 
import Home from "./Components/Home"; // We will create this next
import './App.css';
import Signup from './Components/SignUp';
import Login from './Components/Login';
import Events from "./Components/Events";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/search" element={<div className="p-10 text-2xl">Search Alumni Page</div>} />
          <Route path="/dashboard" element={<div className="p-10 text-2xl">Dashboard Page</div>} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
