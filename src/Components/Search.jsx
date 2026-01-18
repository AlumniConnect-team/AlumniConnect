import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext'; 

const SearchAlumni = () => {
  const { user } = useContext(UserContext);
  const [alumni, setAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAlumni = async (query = "") => {
    if (!user) return;

    try {
      const payload = {
        college: user.college,
        userGraduationYear: user.graduationYear,
        searchQuery: query
      };

      const res = await axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/search-alumni", payload);
      setAlumni(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAlumni(); 
    }
  }, [user]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    fetchAlumni(e.target.value);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-slate-800">
        <div className="text-center p-8 bg-white shadow-xl rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Access Restricted</h2>
          <p className="text-gray-600">Please log in to view the Alumni Network.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <div className="bg-slate-800 text-white pt-16 pb-24 px-4 text-center rounded-b-[3rem] mb-8 shadow-2xl relative z-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Alumni Connect</h1>
        <p className="text-lg text-slate-300 opacity-90">Find seniors and mentors from {user.college}</p>
        
        <div className="mt-8 flex justify-center">
          <input 
            type="text" 
            placeholder="Search alumni by name..." 
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full max-w-lg px-8 py-4 rounded-full border-none shadow-xl text-white focus:ring-4 focus:ring-blue-400/50 focus:outline-none text-lg placeholder-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto -mt-16 relative z-10">
        {alumni.map((alum) => (
          <div key={alum._id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col group">
            
            <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-600 relative flex justify-center">
              <div className="w-20 h-20 bg-white rounded-full absolute -bottom-10 flex items-center justify-center text-2xl font-bold text-blue-600 border-[5px] border-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                {alum.fullName.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="pt-14 pb-6 px-6 text-center flex-grow">
              <h3 className="text-xl font-bold text-slate-800 mb-1">{alum.fullName}</h3>
              <p className="text-sm font-medium text-blue-500 uppercase tracking-wide mb-4">{alum.branch || "Engineering"}</p>
              <div className="w-full h-px bg-gray-100 mb-4"></div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">Class of</span>
                  <span className="text-slate-700 font-bold">{alum.graduationYear}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">Company</span>
                  <span className="text-slate-700 font-bold truncate max-w-[120px]">{alum.currentCompany || "N/A"}</span>
                </div>
              </div>

              <button className="w-full mt-6 py-2.5 bg-slate-800 text-white rounded-xl font-semibold hover:bg-blue-600 active:scale-95 transition-all shadow-md hover:shadow-lg">
                View Profile
              </button>
            </div>
          </div>
        ))}

        {alumni.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-400 font-medium">No alumni found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAlumni;