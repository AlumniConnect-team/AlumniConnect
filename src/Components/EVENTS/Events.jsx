import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [userRole, setUserRole] = useState("alumni");
  const navigate = useNavigate();
  const isAlumni = userRole === "alumni";

  const featuredEvents = [
    {
      id: 1,
      tag: "Coming Soon",
      title: "The Grand Alumni Homecoming 2026",
      description:
        "A night of nostalgia, networking, and celebration. Join over 500+ alumni from across the globe returning to campus. Includes a gala dinner, keynote speeches, and department visits.",
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      date: "Oct 15, 2026",
    },
    {
      id: 2,
      tag: "Live Webinar",
      title: "Future of AI: Alumni Tech Summit",
      description:
        "Join industry leaders from Google, Microsoft, and OpenAI as they discuss the impact of Artificial Intelligence on the global workforce.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      date: "Nov 02, 2026",
    },
    {
      id: 3,
      tag: "Fundraiser",
      title: "Scholarship Gala Night",
      description:
        "Help the next generation of students. An elegant evening of fine dining and auctions to raise funds for underprivileged students.",
      image:
        "https://images.unsplash.com/photo-1519671482538-581aca121e96?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      date: "Dec 10, 2026",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextEvent = () => {
    setCurrentIndex((prev) =>
      prev === featuredEvents.length - 1 ? 0 : prev + 1
    );
  };

  const prevEvent = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredEvents.length - 1 : prev - 1
    );
  };

  const currentEvent = featuredEvents[currentIndex];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      
      <div className="fixed top-20 right-4 z-50 bg-black text-white p-2 rounded-lg text-xs opacity-80 hover:opacity-100">
        <p className="mb-1">
          Current View:{" "}
          <span className="font-bold text-yellow-400 uppercase">
            {userRole}
          </span>
        </p>
        <button
          onClick={() => setUserRole(isAlumni ? "student" : "alumni")}
          className="bg-gray-700 px-2 py-1 rounded border border-gray-500 hover:bg-gray-600"
        >
          Switch Role
        </button>
      </div>

      <section className="relative bg-white pt-24 pb-16 px-6 border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-6">
            Connecting Generations
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
            Alumni <span className="text-blue-600">Events</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed mx-auto">
            Stay updated with upcoming reunions, networking sessions, webinars,
            and campus events. Whether you are here to learn or to lead, there
            is a place for you.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Featured Events</h2>
          <div className="flex gap-2">
            <button
              onClick={prevEvent}
              className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
            >
              ←
            </button>
            <button
              onClick={nextEvent}
              className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
            >
              →
            </button>
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[450px]">
          <div className="md:w-1/2 relative">
            <img
              key={currentEvent.id}
              src={currentEvent.image}
              alt={currentEvent.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition duration-500 animate-fade-in"
            />
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
              {currentEvent.tag}
            </div>
          </div>

          <div className="md:w-1/2 p-10 flex flex-col justify-center text-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-blue-400 font-bold tracking-widest uppercase text-sm">
                Featured
              </h3>
              <span className="text-slate-400 text-sm border border-slate-600 px-2 py-1 rounded">
                {currentEvent.date}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {currentEvent.title}
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              {currentEvent.description}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/events/register")}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold transition"
              >
                Register Now
              </button>

              <button
                onClick={() => navigate("/events/agenda")}
                className="border border-slate-500 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-bold transition"
              >
                View Agenda
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {featuredEvents.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-blue-600" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex gap-2 mb-4 md:mb-0">
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium">
              All Events
            </button>
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">
              Webinars
            </button>
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">
              Meetups
            </button>
          </div>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-4 pr-10 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      <section className="pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white group rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden cursor-pointer">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1564869731584-9f6c2d46dc5c?auto=format&fit=crop&w=800&q=80"
                alt="Event"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-slate-900 shadow-sm">
                15 JAN
              </div>
            </div>
            <div className="p-6">
              <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
                Meetup
              </span>
              <h3 className="font-bold text-slate-900 mt-2 mb-2 text-xl group-hover:text-blue-600 transition">
                Alumni Meetup 2026
              </h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                Join our annual alumni meetup and network with past graduates in
                the main auditorium.
              </p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm text-slate-400">Bangalore Campus</span>
                <span className="text-blue-600 text-sm font-semibold">
                  Free
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white group rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden cursor-pointer">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573164574390-19d0b3a0f8e7?auto=format&fit=crop&w=800&q=80"
                alt="Event"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-slate-900 shadow-sm">
                28 FEB
              </div>
            </div>
            <div className="p-6">
              <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
                Webinar
              </span>
              <h3 className="font-bold text-slate-900 mt-2 mb-2 text-xl group-hover:text-blue-600 transition">
                Tech Career Roadmap
              </h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                Learn from industry experts from Google and Microsoft on how to
                level up your career.
              </p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm text-slate-400">Online (Zoom)</span>
                <span className="text-blue-600 text-sm font-semibold">
                  Free
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white group rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden cursor-pointer">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80"
                alt="Event"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-slate-900 shadow-sm">
                12 MAR
              </div>
            </div>
            <div className="p-6">
              <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
                Networking
              </span>
              <h3 className="font-bold text-slate-900 mt-2 mb-2 text-xl group-hover:text-blue-600 transition">
                Start-up Mixer
              </h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                Connect with alumni founders and VCs. Pitch your ideas or find
                your next co-founder.
              </p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm text-slate-400">Innovation Hub</span>
                <span className="text-blue-600 text-sm font-semibold">
                  $10 Entry
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Memories from Past Events
            </h2>
            <p className="text-slate-500 mt-2">
              See what happens when our community comes together.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-64 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=800&q=80"
                alt="Memory 1"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>
            <div className="h-64 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80"
                alt="Memory 2"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>
            <div className="h-64 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80"
                alt="Memory 3"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>
            <div className="h-64 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                alt="Memory 4"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {isAlumni && (
        <section className="py-24 bg-blue-600 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
            <h2 className="text-4xl font-extrabold text-white mb-6">
              Have an Idea for an Event?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              As a distinguished alumnus, you have the power to bring the
              community together. Host a workshop, organize a reunion, or give a
              guest lecture.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/events/submit-proposal")}
                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition shadow-xl"
              >
                Submit Event Proposal
              </button>
              <button
                onClick={() => navigate("/events/guidelines")}
                className="bg-transparent border border-blue-300 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition"
              >
                Read Host Guidelines
              </button>
            </div>
          </div>
        </section>
      )}

      {!isAlumni && (
        <section className="py-20 bg-blue-600 text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            Don't see what you're looking for?
          </h2>
          <p className=" text-slate-100 mb-6">
            Request a topic for the next webinar.
          </p>
          <button className="bg-transparent border border-blue-300 text-white px-3 py-1 rounded-xl font-bold hover:bg-blue-700 transition">
            Request Topic &rarr;
          </button>
        </section>
      )}
    </div>
  );
};

export default Events;
