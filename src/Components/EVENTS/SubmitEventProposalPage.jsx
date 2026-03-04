import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SubmitEventProposalPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    format: "Webinar (Online)",
    description: "",
    logistics: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, logistics: [...formData.logistics, value] });
    } else {
      setFormData({
        ...formData,
        logistics: formData.logistics.filter((item) => item !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.description) {
      return toast.error("Please fill all required fields");
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/events/proposal",
        formData,
        {
          headers: { "x-auth-token": token },
        },
      );

      toast.success("Proposal submitted successfully!");
      navigate("/events");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to submit proposal");
    } finally {
      setLoading(false);
    }
  };

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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Intro to AI Ethics"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Proposed Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Event Format *
              </label>
              <select
                name="format"
                value={formData.format}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
              >
                <option value="Webinar (Online)">Webinar (Online)</option>
                <option value="Workshop (In-person)">
                  Workshop (In-person)
                </option>
                <option value="Meetup/Networking">Meetup/Networking</option>
                <option value="Reunion">Reunion</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Event Description & Agenda *
            </label>
            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
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
                  value="Projector/AV"
                  onChange={handleCheckboxChange}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700 text-sm">Projector/AV</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  value="Auditorium"
                  onChange={handleCheckboxChange}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700 text-sm">Auditorium</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  value="Zoom License"
                  onChange={handleCheckboxChange}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700 text-sm">Zoom License</span>
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Proposal"}
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
