import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Grab the data we passed secretly from the Home page!
  const profileData = location.state?.profileData;

  if (!profileData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">User not found</h2>
        <button onClick={() => navigate('/')} className="text-blue-600 hover:underline font-bold">
          &larr; Go Back Home
        </button>
      </div>
    );
  }

  // Helper function to format the image/resume URL correctly from the backend
  const getFileUrl = (filePath) => {
    if (!filePath) return null;
    if (filePath.startsWith('http')) return filePath; // Already a full link
    return `${import.meta.env.VITE_SERVER_DOMAIN}/${filePath.replace(/\\/g, '/')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 px-6 pb-12 font-sans">
       <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
         
         {/* DYNAMIC PROFILE PICTURE */}
         {profileData.profilePic ? (
           <div className="w-32 h-32 mx-auto mb-6 rounded-full p-1 bg-white shadow-lg border border-gray-200">
             <img 
               src={getFileUrl(profileData.profilePic)} 
               alt={profileData.fullName} 
               className="w-full h-full object-cover rounded-full"
             />
           </div>
         ) : (
           <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-5xl font-bold mx-auto mb-6 shadow-lg border-4 border-white ring-4 ring-blue-50">
             {profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : "?"}
           </div>
         )}
         
         <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{profileData.fullName}</h1>
         <p className="text-lg text-blue-600 font-bold uppercase tracking-wider mb-6">
           {profileData.jobRole ? profileData.jobRole : (profileData.branch || "Engineering")}
         </p>
         
         <div className="w-full h-px bg-gray-100 mb-8"></div>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
           <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
             <p className="text-xs text-gray-400 font-bold uppercase mb-1">Class of</p>
             <p className="text-lg font-semibold text-slate-800">{profileData.graduationYear}</p>
           </div>
           <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
             <p className="text-xs text-gray-400 font-bold uppercase mb-1">Current Company</p>
             <p className="text-lg font-semibold text-slate-800">{profileData.currentCompany || "Student"}</p>
           </div>
           {profileData.yearsExperience && (
             <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 sm:col-span-2">
               <p className="text-xs text-gray-400 font-bold uppercase mb-1">Experience</p>
               <p className="text-lg font-semibold text-slate-800">{profileData.yearsExperience} Years</p>
             </div>
           )}
         </div>

         {profileData.bio && (
             <div className="text-left bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100">
                 <p className="text-sm text-blue-500 font-bold uppercase mb-2">About</p>
                 <p className="text-slate-700 leading-relaxed">{profileData.bio}</p>
             </div>
         )}

         {/* DYNAMIC RESUME BUTTON */}
         {profileData.resume && (
             <a 
               href={getFileUrl(profileData.resume)} 
               target="_blank" 
               rel="noopener noreferrer"
               className="block w-full py-4 mb-6 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-bold hover:bg-emerald-100 transition-colors shadow-sm"
             >
               📄 View Resume
             </a>
         )}

         <button 
            onClick={() => navigate(-1)} 
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95 cursor-pointer"
         >
           ← Back to Network
         </button>
       </div>
    </div>
  );
}

export default UserProfile;