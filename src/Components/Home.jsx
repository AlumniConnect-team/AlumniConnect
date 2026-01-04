import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative bg-white py-24 px-6 border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            New: Alumni Mentorship Program 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
            Connecting <span className="text-blue-600">Past Graduates</span> <br /> 
            with Future Opportunities
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl leading-relaxed">
            Welcome to the official AlumniConnect platform. Reconnect with classmates, 
            mentor current students, and stay updated with campus events.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all transform hover:-translate-y-1">
              Join the Network
            </Link>
            <Link to="/search" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all">
              Find Classmates
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-blue-400">10k+</p>
            <p className="text-slate-400 text-sm">Active Alumni</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-400">50+</p>
            <p className="text-slate-400 text-sm">Countries</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-400">200+</p>
            <p className="text-slate-400 text-sm">Hiring Partners</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-400">$1M+</p>
            <p className="text-slate-400 text-sm">Grants Awarded</p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-600 uppercase tracking-widest text-xs font-black mb-3">Our Ecosystem</p>
          <h2 className="text-4xl font-bold text-slate-900">
            Lifelong professional value.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">🔍</div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">Directory Search</h3>
            <p className="text-slate-500">Filter alumni by company, location, or graduation year to find the right connection.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">🤝</div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">1-on-1 Mentorship</h3>
            <p className="text-slate-500">Get career guidance from seniors who have been in your shoes at top companies.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all">💼</div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">Exclusive Jobs</h3>
            <p className="text-slate-500">Access internal job postings and referral opportunities shared directly by alumni.</p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-20 bg-slate-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Upcoming Events</h2>
              <p className="text-slate-600 mt-2">Don't miss out on these networking opportunities.</p>
            </div>
            <Link to="/events" className="text-blue-600 font-bold hover:underline">View all events →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl flex gap-6 items-center border border-slate-200">
              <div className="bg-blue-600 text-white p-4 rounded-xl text-center min-w-[80px]">
                <p className="text-sm uppercase">Jan</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <div>
                <h4 className="font-bold text-lg">Global Alumni Meetup 2026</h4>
                <p className="text-slate-500 text-sm">Virtual • 6:00 PM IST</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl flex gap-6 items-center border border-slate-200">
              <div className="bg-slate-200 text-slate-700 p-4 rounded-xl text-center min-w-[80px]">
                <p className="text-sm uppercase">Feb</p>
                <p className="text-2xl font-bold">02</p>
              </div>
              <div>
                <h4 className="font-bold text-lg">Tech Career Fair</h4>
                <p className="text-slate-500 text-sm">Main Campus • 10:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;