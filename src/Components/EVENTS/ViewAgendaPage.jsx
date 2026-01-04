import React from "react";

const ViewAgendaPage = () => {
  const schedule = [
    {
      time: "09:00 AM",
      title: "Registration & Breakfast",
      desc: "Check-in at the Main Auditorium lobby.",
    },
    {
      time: "10:30 AM",
      title: "Opening Ceremony",
      desc: "Welcome address by the Dean and Student Council.",
    },
    {
      time: "11:30 AM",
      title: "Keynote: Future of Tech",
      desc: "Speaker: Mr. Sharma (CTO of TechCorp, Batch '98).",
    },
    {
      time: "01:00 PM",
      title: "Networking Lunch",
      desc: "Buffet served at the Central Lawn.",
    },
    {
      time: "03:00 PM",
      title: "Department Visits",
      desc: "Visit your old classrooms and labs.",
    },
    {
      time: "06:00 PM",
      title: "Gala Dinner & DJ",
      desc: "Evening entertainment and networking.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Event Agenda
          </h1>
          <p className="text-lg text-slate-600">
            The Grand Alumni Homecoming 2026
          </p>
          <div className="mt-4 inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold">
            Date: 15th January 2026
          </div>
        </div>

        <div className="relative border-l-4 border-blue-200 ml-4 md:ml-10 space-y-12">
          {schedule.map((item, index) => (
            <div key={index} className="relative pl-8 md:pl-12 group">
              <div className="absolute -left-[14px] top-1 bg-white border-4 border-blue-600 w-6 h-6 rounded-full group-hover:scale-125 transition duration-300"></div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition cursor-default">
                <span className="text-blue-600 font-bold text-sm tracking-wide block mb-1">
                  {item.time}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition">
            Download PDF Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAgendaPage;
