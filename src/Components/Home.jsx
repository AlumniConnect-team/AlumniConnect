import React from 'react';

const Home = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
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
        
      </div>
    </div>
  </section>

  <section className="py-16 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <p className="text-slate-500 uppercase tracking-widest text-sm font-bold mb-2">Our Community</p>
      <h2 className="text-3xl font-bold text-slate-800">
        Empowering our graduates through a powerful, lifelong professional network.
      </h2>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-500 transition-all cursor-pointer group">
        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          🔍
        </div>
        <h3 className="font-bold text-xl text-slate-900 mb-3">Find Alumni</h3>
        <p className="text-slate-500 leading-relaxed">
          Locate and reconnect with fellow graduates across different batches, industries, and locations worldwide.
        </p>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 transition-all cursor-pointer group">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
          🤝
        </div>
        <h3 className="font-bold text-xl text-slate-900 mb-3">Mentorship</h3>
        <p className="text-slate-500 leading-relaxed">
          Build meaningful professional relationships by sharing your expertise or seeking guidance from experienced seniors.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-purple-500 transition-all cursor-pointer group">
        <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
          ✨
        </div>
        <h3 className="font-bold text-xl text-slate-900 mb-3">Success Stories</h3>
        <p className="text-slate-500 leading-relaxed">
          Celebrate the milestones of our alumni community and get inspired by their professional journeys.
        </p>
      </div>
    </div>
  </section>
</div>
  );
};

export default Home;