import React from "react";

const SubmitEventProposalPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Host an Event
          </h1>
          <p className="mt-2 text-slate-600">
            Share your knowledge or bring the community together.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              placeholder="e.g., Intro to AI Ethics"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Proposed Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Event Format
              </label>
              <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white">
                <option>Webinar (Online)</option>
                <option>Workshop (In-person)</option>
                <option>Meetup/Networking</option>
                <option>Reunion</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Event Description & Agenda
            </label>
            <textarea
              rows="4"
              placeholder="What will happen during the event?"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Logistics Required
            </label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700 text-sm">Projector/AV</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700 text-sm">Auditorium</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700 text-sm">Zoom License</span>
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg"
            >
              Submit Proposal
            </button>
            <p className="text-xs text-slate-500 text-center mt-3">
              Your proposal will be reviewed by the admin within 24 hours.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitEventProposalPage;
