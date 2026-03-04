import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [myEvents, setMyEvents] = useState({ registered: [], hosted: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const headers = {
          "x-auth-token": token,
          Authorization: `Bearer ${token}`,
        };

        const profileRes = await axios.get(
          "http://localhost:5000/api/profile/dashboard",
          { headers },
        );
        setData(profileRes.data);

        try {
          const eventsRes = await axios.get(
            "http://localhost:5000/api/events/my-events",
            { headers },
          );
          setMyEvents({
            registered: eventsRes.data.registeredEvents || [],
            hosted: eventsRes.data.hostedEvents || [],
          });
        } catch (eventErr) {
          console.error("Failed to fetch events for dashboard", eventErr);
        }
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
    fetchDashboardData();
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
  const now = new Date();

  const upcomingEvents = myEvents.registered.filter(
    (e) => new Date(e.date) >= now,
  );
  const pastEvents = myEvents.registered.filter((e) => new Date(e.date) < now);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {isAlumni ? (
            <>
              <StatCard
                title="Total Students"
                value={data.stats?.studentsEnrolled || 0}
                icon="👨‍🎓"
                color="blue"
              />
              <StatCard
                title="Events Hosted"
                value={myEvents.hosted.length}
                icon="🎤"
                color="purple"
              />
              <StatCard
                title="Upcoming Events"
                value={upcomingEvents.length}
                icon="📅"
                color="green"
              />
              <StatCard
                title="Events Attended"
                value={pastEvents.length}
                icon="✅"
                color="orange"
              />
            </>
          ) : (
            <>
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
                title="Upcoming Events"
                value={upcomingEvents.length}
                icon="📅"
                color="teal"
              />
              <StatCard
                title="Events Attended"
                value={pastEvents.length}
                icon="✅"
                color="green"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-4 text-slate-800">
              Upcoming Events (Registered)
            </h2>
            {upcomingEvents.length === 0 ? (
              <div className="text-slate-500 italic p-4 border-2 border-dashed rounded-lg text-center">
                You haven't registered for any upcoming events. <br />
                <button
                  onClick={() => navigate("/events")}
                  className="text-blue-600 font-bold mt-2 hover:underline"
                >
                  Browse Events
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {upcomingEvents.map((event) => (
                  <li
                    key={event._id}
                    className="p-4 bg-slate-50 rounded-lg border border-slate-100"
                  >
                    <p className="font-bold text-slate-800">{event.title}</p>
                    <p className="text-sm text-blue-600">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-4 text-slate-800">
              Event History
            </h2>
            {pastEvents.length === 0 ? (
              <div className="text-slate-500 italic p-4 border-2 border-dashed rounded-lg text-center">
                No past event history found.
              </div>
            ) : (
              <ul className="space-y-4">
                {pastEvents.map((event) => (
                  <li
                    key={event._id}
                    className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-slate-800">{event.title}</p>
                      <p className="text-sm text-slate-500">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">
                      Attended
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {isAlumni && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">
                  Events You Are Hosting
                </h2>
                <button
                  onClick={() => navigate("/events")}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
                >
                  + Propose New
                </button>
              </div>

              {myEvents.hosted.length === 0 ? (
                <div className="text-slate-500 italic p-4 border-2 border-dashed rounded-lg text-center">
                  You haven't proposed any events yet. Share your expertise with
                  the community!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myEvents.hosted.map((event) => (
                    <div
                      key={event._id}
                      className="p-4 bg-blue-50 rounded-lg border border-blue-100"
                    >
                      <p className="font-bold text-slate-800">{event.title}</p>
                      <p className="text-sm text-slate-600 mt-1">
                        Status:{" "}
                        <span className="text-blue-600 font-bold">
                          {event.status || "Approved"}
                        </span>
                      </p>
                      <p className="text-sm text-slate-600">
                        Attendees: <b>{event.attendees?.length || 0}</b>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
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
