import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          "http://localhost:5000/api/profile/dashboard",
          {
            headers: {
              // We send the token in BOTH formats to ensure the backend accepts it
              "x-auth-token": token,
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setData(res.data);
      } catch (err) {
        console.error("Dashboard error", err);
        setError(
          err.response?.data?.msg ||
            "Failed to load dashboard data. (Authorization Error)",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-3 font-bold text-slate-600">
          Loading Workspace...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center">
        <div className="text-red-500 font-bold mb-4">⚠️ {error}</div>
        <a href="/login" className="text-blue-600 underline">
          Go to Login
        </a>
      </div>
    );
  }

  if (!data || !data.user) {
    return <div className="p-10 text-center">No profile data found.</div>;
  }

  const isAlumni = data.role === "Alumni";

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">
              {isAlumni ? "Alumni Console" : "Student Portal"}
            </h1>
            <p className="text-slate-500">Welcome back, {data.user.name}</p>
          </div>
          <div
            className={`px-4 py-2 rounded-full text-sm font-bold ${
              isAlumni
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {isAlumni ? "🎓 ALUMNI" : "📖 STUDENT"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isAlumni ? (
            <>
              <StatCard
                title="Total Students"
                value={data.stats?.studentsEnrolled || 0}
                icon="👨‍🎓"
                color="blue"
              />
              <StatCard
                title="Upcoming Sessions"
                value={data.stats?.upcomingSessions || 0}
                icon="📅"
                color="purple"
              />
              <StatCard
                title="Money Earned"
                value={`$${data.stats?.totalEarned || 0}`}
                icon="💰"
                color="green"
              />
              <StatCard
                title="Free Classes"
                value={data.stats?.freeClasses || 0}
                icon="🎁"
                color="orange"
              />
            </>
          ) : (
            <>
              <StatCard
                title="Money Spent"
                value={`$${data.stats?.amountSpent || 0}`}
                icon="💸"
                color="red"
              />
              <StatCard
                title="Seniors Followed"
                value={data.stats?.seniorsFollowed || 0}
                icon="🤝"
                color="blue"
              />
              <StatCard
                title="Messages"
                value={data.stats?.unreadMessages || 0}
                icon="📩"
                color="indigo"
              />
              <StatCard
                title="Active Courses"
                value={data.stats?.activeCourses || 0}
                icon="📚"
                color="teal"
              />
            </>
          )}
        </div>

        <div className="mt-10 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4">
            {isAlumni
              ? "Recent Student Requests"
              : "Recent Messages from Seniors"}
          </h2>
          <div className="text-slate-500 italic p-4 border-2 border-dashed rounded-lg">
            No recent conversations found. Start a new one from the{" "}
            {isAlumni ? "Search Students" : "Search Alumni"} page!
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    indigo: "bg-indigo-50 text-indigo-600",
    teal: "bg-teal-50 text-teal-600",
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${colorMap[color]}`}
      >
        {icon}
      </div>
      <div className="text-2xl font-black text-slate-800">{value}</div>
      <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
        {title}
      </p>
    </div>
  );
};

export default Dashboard;
