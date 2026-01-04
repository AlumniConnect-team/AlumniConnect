import React from "react";

const HostGuidelinesPage = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 border-b pb-4">
          Host Guidelines & Policies
        </h1>

        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
          Thank you for your interest in giving back to the community. As an
          alumni host, you play a pivotal role in shaping the future of our
          students. Please review the following guidelines before submitting a
          proposal.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-xl font-bold text-blue-800 mb-3">✅ Do's</h3>
            <ul className="space-y-2 text-slate-700 list-disc list-inside">
              <li>Focus on educational or networking value.</li>
              <li>Be punctual and respectful of time.</li>
              <li>Provide clear learning outcomes.</li>
              <li>Engage with students and answer queries.</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border border-red-100">
            <h3 className="text-xl font-bold text-red-800 mb-3">❌ Don'ts</h3>
            <ul className="space-y-2 text-slate-700 list-disc list-inside">
              <li>No direct selling of products or services.</li>
              <li>Avoid political or religious topics.</li>
              <li>Do not share student data with third parties.</li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How it works
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold mr-4">
                1
              </div>
              <p className="text-slate-700 pt-1">
                Submit your proposal using the online form.
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold mr-4">
                2
              </div>
              <p className="text-slate-700 pt-1">
                The Alumni Committee reviews your application (24-48 hrs).
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold mr-4">
                3
              </div>
              <p className="text-slate-700 pt-1">
                Once approved, the event is listed on the Events Dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-100 p-6 rounded-xl text-center">
          <p className="text-slate-700">
            Need help? Contact the support team at{" "}
            <span className="font-bold text-blue-600">support@alumni.edu</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HostGuidelinesPage;
