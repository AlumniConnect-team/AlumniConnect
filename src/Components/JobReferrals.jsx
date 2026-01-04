import React, { useState } from "react";

const jobPostings = [
  {
    id: 1,
    role: "Software Engineer II",
    company: "Google",
    location: "Bangalore / Remote",
    postedBy: "Rahul Sharma",
    batch: "2018",
    type: "Full-time",
    tags: ["React", "Go", "Cloud"],
    referralAvailable: true,
  },
  {
    id: 2,
    role: "Product Designer",
    company: "Zomato",
    location: "Gurugram",
    postedBy: "Ananya Iyer",
    batch: "2020",
    type: "Full-time",
    tags: ["Figma", "UI/UX"],
    referralAvailable: true,
  },
  {
    id: 3,
    role: "Data Scientist",
    company: "Amazon",
    location: "Hyderabad",
    postedBy: "Sandeep Gupta",
    batch: "2015",
    type: "Contract",
    tags: ["Python", "AWS"],
    referralAvailable: false, // Just a job post, no referral
  },
];

const JobReferrals = () => {
  const [filter, setFilter] = useState("");

  const filteredJobs = jobPostings.filter(job => 
    job.role.toLowerCase().includes(filter.toLowerCase()) || 
    job.company.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Career Opportunities</h1>
            <p className="text-slate-600">Exclusive job openings and referrals from your alumni network.</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all cursor-pointer">
            + Post a Job
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input 
            type="text"
            placeholder="Search by role or company..."
            className="w-full md:w-1/3 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white shadow-sm"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              
              <div className="flex gap-5 items-center">
                {/* Company Logo Placeholder */}
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-slate-400">
                  {job.company[0]}
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{job.role}</h3>
                  <p className="text-blue-600 font-medium">{job.company} • <span className="text-slate-500 font-normal">{job.location}</span></p>
                  <div className="flex gap-2 mt-2">
                    {job.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800">Posted by {job.postedBy}</p>
                    <p className="text-xs text-slate-500">Class of {job.batch}</p>
                  </div>
                  <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-white"></div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  {job.referralAvailable && (
                    <button className="flex-1 md:flex-none bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors cursor-pointer">
                      Ask for Referral
                    </button>
                  )}
                  <button className="flex-1 md:flex-none bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors cursor-pointer">
                    View Details
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobReferrals;