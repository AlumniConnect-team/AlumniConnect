import React from 'react';

const Home = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-white py-20 px-6 border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Connecting <span className="text-blue-600">Past Graduates</span> <br /> 
            with Future Opportunities
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl leading-relaxed">
            Welcome to the official AlumniConnect platform. Reconnect with classmates, 
            mentor current students, and stay updated with campus events.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              Explore Directory
            </button>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold border border-slate-200 hover:border-slate-300 transition">
              View Events
            </button>
          </div>
        </div>
      </section>

      {/* --- QUICK ACTIONS SECTION --- */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-10 text-center">What would you like to do today?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-2xl mb-4">🔍</div>
            <h3 className="font-bold text-slate-900 mb-2">Find Alumni</h3>
            <p className="text-sm text-slate-500">Search for seniors by batch, location, or industry.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-2xl mb-4">🤝</div>
            <h3 className="font-bold text-slate-900 mb-2">Mentorship</h3>
            <p className="text-sm text-slate-500">Offer guidance or seek career advice from experts.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center text-2xl mb-4">📢</div>
            <h3 className="font-bold text-slate-900 mb-2">Job Board</h3>
            <p className="text-sm text-slate-500">Post or apply for exclusive job opportunities.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center text-2xl mb-4">✨</div>
            <h3 className="font-bold text-slate-900 mb-2">Success Stories</h3>
            <p className="text-sm text-slate-500">Read inspiring journeys of our global alumni.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;