import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Nav";
import Home from "./Components/Home";
import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Events from "./Components/EVENTS/Events";
import RegisterEventPage from "./Components/EVENTS/RegisterEventPage";
import ViewAgendaPage from "./Components/EVENTS/ViewAgendaPage";
import SubmitEventProposalPage from "./Components/EVENTS/SubmitEventProposalPage";
import HostGuidelinesPage from "./Components/EVENTS/HostGuidelinesPage";
import ScrollToTop from "./Components/ScrollToTop";
import JobReferrals from "./Components/jobs&Referral/JobReferrals";
import {Toaster} from 'react-hot-toast';
import { UserProvider } from "./context/UserContext";
import SearchAlumni from "./Components/Search";
import Profile from "./Components/profile/Profile";

function App() {
  return (
    <div>
      <UserProvider>
    <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
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
            element={<SearchAlumni/>}
          />
          <Route
            path="/dashboard"
            element={<div className="p-10 text-2xl">Dashboard Page</div>}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<JobReferrals />} />
        </Routes>
      </div>
    </Router>
    </UserProvider>

    </div>
  );
}

export default App;
