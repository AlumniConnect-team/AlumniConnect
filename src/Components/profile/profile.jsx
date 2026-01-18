import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Assuming you are using react-hot-toast

const Profile = () => {
  // --- 1. State for Form Data ---
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "", // Read-only (primary email)
    backupEmail: "",
    currentCompany: "",
    jobRole: "",
    yearsExperience: "",
    bio: "",
  });

  // --- 2. State for Files (Images/Resume) ---
  const [profilePic, setProfilePic] = useState(null); // The actual file object
  const [previewPic, setPreviewPic] = useState(null); // The URL for previewing
  const [resume, setResume] = useState(null);

  // --- 3. Fetch User Data on Load ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_DOMAIN}/api/auth/me`,
          {
            headers: { "x-auth-token": token },
          },
        );

        // Pre-fill form with existing data
        setFormData({
          fullName: res.data.fullName || "",
          email: res.data.email || "",
          backupEmail: res.data.backupEmail || "",
          currentCompany: res.data.currentCompany || "",
          jobRole: res.data.jobRole || "",
          yearsExperience: res.data.yearsExperience || "",
          bio: res.data.bio || "",
        });
        // If you have a stored profile pic URL, set it here:
        // setPreviewPic(res.data.profilePicUrl)
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile data");
      }
    };
    fetchProfile();
  }, []);

  // --- 4. Handle Text Inputs ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- 5. Handle File Inputs ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (e.target.name === "profilePic") {
      setProfilePic(file);
      setPreviewPic(URL.createObjectURL(file)); // Show preview immediately
    } else if (e.target.name === "resume") {
      setResume(file);
    }
  };

  // --- 6. Submit Updates ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Since we are uploading files, we MUST use FormData (not JSON)
      const dataToSend = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        dataToSend.append(key, formData[key]);
      });

      // Append files if they exist
      if (profilePic) dataToSend.append("profilePic", profilePic);
      if (resume) dataToSend.append("resume", resume);

      // API Call (Note: You need to create this route later!)
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_DOMAIN}/api/profile/update`,
        dataToSend,
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 px-8 py-6 text-white">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="opacity-90 mt-2">
            Update your personal details and work history.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* --- LEFT COLUMN: Profile Picture --- */}
          <div className="md:col-span-1 flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full border-4 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                {previewPic ? (
                  <img
                    src={previewPic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl">👤</span>
                )}
              </div>

              {/* Overlay for uploading */}
              <label
                htmlFor="profilePicInput"
                className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
              >
                <span className="text-white font-bold text-sm">
                  Change Photo
                </span>
              </label>
              <input
                type="file"
                id="profilePicInput"
                name="profilePic"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-500 text-center">
              Allowed *.jpeg, *.jpg, *.png, *.gif <br /> Max size of 3.1 MB
            </p>
          </div>

          {/* --- RIGHT COLUMN: Form Fields --- */}
          <div className="md:col-span-2 space-y-6">
            {/* Section: Basic Info */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                Personal Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Primary Email (Locked)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-2 border bg-gray-200 text-gray-500 rounded-md cursor-not-allowed"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Backup Email (For Recovery)
                  </label>
                  <input
                    type="email"
                    name="backupEmail"
                    value={formData.backupEmail}
                    onChange={handleChange}
                    placeholder="e.g. personal@gmail.com"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Section: Work Experience */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                Professional Experience
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Current Company
                  </label>
                  <input
                    type="text"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    placeholder="e.g. Google"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Job Role
                  </label>
                  <input
                    type="text"
                    name="jobRole"
                    value={formData.jobRole}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Years at Company
                  </label>
                  <input
                    type="number"
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Section: Documents */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                Resume / CV
              </h3>

              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <span className="text-3xl mb-2">📄</span>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">
                        Click to upload resume
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOCX (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              {resume && (
                <p className="mt-2 text-sm text-green-600 font-semibold">
                  Selected: {resume.name}
                </p>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 bg-blue-600 text-white font-bold rounded-md shadow-md hover:bg-blue-700 transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
