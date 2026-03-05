import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext'; 
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]); 
  const [displayList, setDisplayList] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("alumni"); 
  const [loading, setLoading] = useState(true);

  const fetchNetwork = async (query = "") => {
    if (!user) return;
    try {
      setLoading(true);
      const payload = {
        college: user.college,
        userGraduationYear: user.graduationYear,
        searchQuery: query
      };
      const res = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-alumni", payload);
      setAllUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNetwork(); 
    }
  }, [user]);

  useEffect(() => {
    if (!user || allUsers.length === 0) return;

    let filtered = allUsers;

    if (searchTerm) {
      filtered = filtered.filter(u => 
        u.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeTab === "alumni") {
      filtered = filtered.filter(u => parseInt(u.graduationYear) < parseInt(user.graduationYear));
    } else {
      filtered = filtered.filter(u => parseInt(u.graduationYear) > parseInt(user.graduationYear));
    }

    setDisplayList(filtered);
  }, [activeTab, searchTerm, allUsers, user]);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    fetchNetwork(e.target.value); 
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10 bg-white shadow-2xl rounded-3xl max-w-lg mx-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Welcome to Alumni Connect</h2>
          <p className="text-gray-500 mb-8">Please log in to access your network.</p>
          <Link to="/login" className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition">
            Login Now
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <div className="bg-slate-900 text-white pt-20 pb-32 px-4 text-center rounded-b-[3rem] shadow-2xl relative">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Hello, <span className="text-blue-400">{user.fullName || user.name}</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          {activeTab === "alumni" 
            ? "Connect with seniors who have walked your path." 
            : "Guide the next generation of students."}
        </p>
        <div className="mt-10 inline-flex bg-slate-800 p-1.5 rounded-full border border-slate-700 shadow-xl">
            <button 
                onClick={() => setActiveTab("alumni")}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === "alumni" ? "bg-blue-600 text-white shadow-lg scale-105" : "text-slate-400 hover:text-white"}`}
            >
                My Alumni (Seniors)
            </button>
            <button 
                onClick={() => setActiveTab("juniors")}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === "juniors" ? "bg-blue-600 text-white shadow-lg scale-105" : "text-slate-400 hover:text-white"}`}
            >
                My Juniors (Students)
            </button>
        </div>

        <div className="mt-8 flex justify-center relative z-20">
          <input 
            type="text" 
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full max-w-lg px-8 py-4 rounded-full border-none shadow-xl text-white focus:ring-4 focus:ring-blue-500/50 focus:outline-none text-lg placeholder-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto -mt-20 relative z-10">
        
        {loading ? (
            <p className="text-center col-span-full text-gray-500">Loading your network...</p>
        ) : (
            <>
                {displayList.map((person) => (
                  <div key={person._id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col group border border-gray-100">
                    
                    <div className={`h-24 relative flex justify-center ${activeTab === "alumni" ? "bg-gradient-to-r from-blue-600 to-indigo-600" : "bg-gradient-to-r from-emerald-500 to-teal-500"}`}>
                      <div className="w-20 h-20 bg-white rounded-full absolute -bottom-10 flex items-center justify-center text-3xl font-bold text-slate-800 border-[4px] border-white shadow-md group-hover:scale-110 transition-transform">
                        {person.fullName ? person.fullName.charAt(0).toUpperCase() : "?"}
                      </div>
                    </div>

                    <div className="pt-14 pb-6 px-6 text-center flex-grow">
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{person.fullName}</h3>
                      <p className={`text-xs font-bold uppercase tracking-wide mb-4 ${activeTab === "alumni" ? "text-blue-600" : "text-emerald-600"}`}>
                        {person.branch || "Engineering"}
                      </p>
                      
                      <div className="w-full h-px bg-gray-100 mb-4"></div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-medium">Class of</span>
                          <span className="text-slate-800 font-bold">{person.graduationYear}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-medium">Current Role</span>
                          <span className="text-slate-800 font-bold truncate max-w-[120px]">{person.currentCompany || "Student"}</span>
                        </div>
                      </div>

                      <button className={`w-full mt-6 py-2.5 text-white rounded-xl font-semibold active:scale-95 transition-all shadow-md hover:shadow-lg ${activeTab === "alumni" ? "bg-slate-900 hover:bg-blue-700" : "bg-slate-900 hover:bg-emerald-600"}`}>
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
            </>
        )}

        {!loading && displayList.length === 0 && (
          <div className="col-span-full text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-2xl text-slate-400 font-bold mb-2">No profiles found.</p>
            <p className="text-gray-400">Try adjusting your search or switching tabs.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;