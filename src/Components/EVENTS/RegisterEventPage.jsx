import React from "react";

const RegisterEventPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-slate-200">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
            Event Registration
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Secure your spot for{" "}
            <span className="font-bold text-blue-600">
              The Grand Alumni Homecoming 2026
            </span>
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="batch"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Passing Year
              </label>
              <input
                id="batch"
                name="batch"
                type="number"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="2022"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="diet"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Dietary Preference
              </label>
              <select
                id="diet"
                name="diet"
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-300 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option>None</option>
                <option>Vegetarian</option>
                <option>Vegan</option>
                <option>Gluten Free</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Confirm Registration
            </button>
          </div>

          <div className="text-center">
            <a
              href="/events"
              className="text-sm text-slate-500 hover:text-blue-600"
            >
              Cancel and go back
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterEventPage;
