import React, { useState, useEffect, useRef } from "react";

// --- REUSABLE API AUTOCOMPLETE COMPONENT (Same logic as Search) ---
const ApiInput = ({
  label,
  placeholder,
  apiType,
  value,
  onChange,
  helpText,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // Handle typing & API fetch
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!value || value.length < 2) {
        setSuggestions([]);
        return;
      }

      // Only fetch if the user is currently typing (dropdown is open)
      if (!isOpen) return;

      setIsLoading(true);
      try {
        let results = [];
        if (apiType === "location") {
          const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=5&language=en&format=json`
          );
          const data = await res.json();
          if (data.results)
            results = data.results.map((p) => `${p.name}, ${p.country}`);
        } else if (apiType === "job") {
          const res = await fetch(
            `https://api.datamuse.com/words?ml=${value}&max=5`
          );
          const data = await res.json();
          results = data.map(
            (i) => i.word.charAt(0).toUpperCase() + i.word.slice(1)
          );
        }
        setSuggestions(results);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 400); // Debounce
    return () => clearTimeout(timer);
  }, [value, apiType, isOpen]);

  return (
    <div className="relative mb-6" ref={wrapperRef}>
      <label className="block text-sm font-bold text-slate-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => value.length > 1 && setIsOpen(true)}
      />
      {helpText && <p className="text-xs text-slate-400 mt-1">{helpText}</p>}

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-slate-200 rounded-xl shadow-xl mt-1 overflow-hidden">
          {isLoading ? (
            <div className="p-3 text-xs text-slate-400 text-center">
              Fetching...
            </div>
          ) : (
            suggestions.map((item, idx) => (
              <div
                key={idx}
                className="px-4 py-3 hover:bg-blue-50 text-sm cursor-pointer text-slate-700 border-b border-slate-50 last:border-0"
                onClick={() => {
                  onChange(item);
                  setIsOpen(false);
                }}
              >
                {item}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const PostJob = ({ onBack }) => {
  // onBack prop to go back to listing
  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    location: "",
    type: "Full-time",
    description: "",
    applyLink: "",
    referralAvailable: false,
  });

  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // --- HANDLERS ---
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock API Submission
    setTimeout(() => {
      console.log("Job Posted:", { ...formData, tags });
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white max-w-lg w-full p-10 rounded-3xl shadow-xl text-center border border-slate-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            Job Posted!
          </h2>
          <p className="text-slate-500 mb-8">
            Your opportunity has been shared with the alumni network. Good luck!
          </p>
          <button
            onClick={() => window.location.reload()} // In real app, navigate to listing
            className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all w-full"
          >
            Post Another Job
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        {/* --- HEADER --- */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Post a Job
            </h1>
            <p className="text-slate-600 mt-1">
              Share an opportunity with your juniors and batchmates.
            </p>
          </div>
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-slate-900 font-medium"
          >
            Cancel
          </button>
        </div>

        {/* --- FORM CARD --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 md:p-10">
            {/* 1. Job Details Group */}
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 border-b border-slate-100 pb-2">
              Role Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Live Role API */}
              <ApiInput
                label="Job Role"
                placeholder="e.g. Product Designer"
                apiType="job"
                value={formData.role}
                onChange={(val) => setFormData({ ...formData, role: val })}
                helpText="We'll use this to help candidates find your job."
              />

              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Microsoft"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Live Location API */}
              <ApiInput
                label="Location"
                placeholder="e.g. Bangalore"
                apiType="location"
                value={formData.location}
                onChange={(val) => setFormData({ ...formData, location: val })}
              />

              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Job Type
                </label>
                <select
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                  <option>Remote</option>
                </select>
              </div>
            </div>

            {/* 2. Skills & Description */}
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 mt-4 border-b border-slate-100 pb-2">
              Requirements
            </h3>

            {/* Tags Input */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Skills / Tags
              </label>
              <div className="border border-slate-300 rounded-xl p-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all flex flex-wrap gap-2 min-h-[50px]">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  className="flex-1 min-w-[120px] outline-none text-sm px-2 py-1"
                  placeholder="Type skill & hit Enter (e.g. React)"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows="4"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Briefly describe the role, responsibilities, and requirements..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* 3. Referral & Application */}
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 mt-4 border-b border-slate-100 pb-2">
              Application
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Application Link / Email <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="https://company.com/careers/job-id or email@company.com"
                value={formData.applyLink}
                onChange={(e) =>
                  setFormData({ ...formData, applyLink: e.target.value })
                }
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center justify-between mb-8">
              <div>
                <h4 className="font-bold text-blue-900 text-sm">
                  Offer Referral?
                </h4>
                <p className="text-xs text-blue-700 mt-1">
                  Check this if you are willing to refer candidates internally.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.referralAvailable}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      referralAvailable: e.target.checked,
                    })
                  }
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-200 transition-all ${
                isSubmitting
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl"
              }`}
            >
              {isSubmitting ? "Publishing..." : "Post Opportunity"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
