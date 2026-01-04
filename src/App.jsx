import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Nav";
import Home from "./Components/Home";
import "./App.css";
import Signup from "./Components/SignUp";
import Login from "./Components/Login";
import Events from "./Components/EVENTS/Events";
import RegisterEventPage from "./Components/EVENTS/RegisterEventPage";
import ViewAgendaPage from "./Components/EVENTS/ViewAgendaPage";
import SubmitEventProposalPage from "./Components/EVENTS/SubmitEventProposalPage";
import HostGuidelinesPage from "./Components/EVENTS/HostGuidelinesPage";
import ScrollToTop from "./Components/ScrollToTop";
import JobReferrals from './Components/JobReferrals';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events">
            <Route index element={<Events />} />
            <Route path="register" element={<RegisterEventPage />} />
            <Route path="agenda" element={<ViewAgendaPage />} />
            <Route
              path="submit-proposal"
              element={<SubmitEventProposalPage />}
            />
            <Route path="guidelines" element={<HostGuidelinesPage />} />
          </Route>

          <Route
            path="/search"
            element={<div className="p-10 text-2xl">Search Alumni Page</div>}
          />
          <Route
            path="/dashboard"
            element={<div className="p-10 text-2xl">Dashboard Page</div>}
          />
          <Route path="/jobs" element={<JobReferrals />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
