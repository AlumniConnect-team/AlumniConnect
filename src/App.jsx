import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Nav";
import Home from "./Components/Home";
import Events from "./Components/Events";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
