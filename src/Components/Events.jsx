import React from "react";

const Events = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <section className="relative bg-white py-20 px-6 border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Alumni <span className="text-blue-600">Events</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl leading-relaxed">
            Stay updated with upcoming reunions, networking sessions, webinars,
            and campus events. Join the community and reconnect!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              Upcoming Events
            </button>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold border border-slate-200 hover:border-slate-300 transition">
              Past Events
            </button>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-10 text-center">
          Explore Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1564869731584-9f6c2d46dc5c?auto=format&fit=crop&w=800&q=80"
              alt="Event"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="font-bold text-slate-900 mb-2 text-xl">
              Alumni Meetup 2026
            </h3>
            <p className="text-sm text-slate-500 mb-3">
              Join our annual alumni meetup and network with past graduates.
            </p>
            <p className="text-sm text-blue-600 font-semibold">
              Date: 15 Jan 2026
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1573164574390-19d0b3a0f8e7?auto=format&fit=crop&w=800&q=80"
              alt="Event"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="font-bold text-slate-900 mb-2 text-xl">
              Career Webinar
            </h3>
            <p className="text-sm text-slate-500 mb-3">
              Learn from industry experts on how to level up your career.
            </p>
            <p className="text-sm text-blue-600 font-semibold">
              Date: 28 Feb 2026
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=800&q=80"
              alt="Event"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="font-bold text-slate-900 mb-2 text-xl">
              Virtual Networking Night
            </h3>
            <p className="text-sm text-slate-500 mb-3">
              Connect with alumni from around the world in a live online
              session.
            </p>
            <p className="text-sm text-blue-600 font-semibold">
              Date: 12 Mar 2026
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
            Want to host an event?
          </h2>
          <p className="text-lg text-slate-700 mb-8">
            Submit your event and reach thousands of alumni across the globe.
          </p>
          <button className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">
            Submit Your Event
          </button>
        </div>
      </section>
    </div>
  );
};

export default Events;
