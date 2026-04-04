import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CollegeSelect from './CollegeSelect';
import axios from 'axios';
import { validatePassword } from './Login';
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContext';

const Signup = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);
  
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  
  const [formData, setFormData] = useState({
    fullName: "",
    collegeName: "",
    graduationYear: "",
    emailPrefix: "",
    emailDomain: "",
    password: "",
    otp: "",
    isVerified: false,
  });

  const currentYear = new Date().getFullYear();
  // Determine if the user is an Alumni based on what they type
  const isAlumni = formData.graduationYear && parseInt(formData.graduationYear) <= currentYear;

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle Graduation Year changes and prevent cheating the OTP system
  const handleGradYearChange = (e) => {
    const newYear = e.target.value;
    const isNowAlumni = newYear && parseInt(newYear) <= currentYear;

    // If they change from Student to Alumni (or vice versa), reset the email and OTP state
    if (isAlumni !== isNowAlumni) {
      setFormData({ 
        ...formData, 
        graduationYear: newYear, 
        emailPrefix: "", 
        isVerified: false, 
        otp: "" 
      });
      setIsOtpSent(false);
      setTimer(0);
    } else {
      setFormData({ ...formData, graduationYear: newYear });
    }
  };

  const handleCollegeSelect = (name, domain) => {
    setFormData((prev) => ({
      ...prev,
      collegeName: name,
      emailDomain: domain ? `@${domain}` : "",
    }));
  };

  // Helper function to get the correct email string based on user type
  const getFinalEmail = () => {
    return isAlumni ? formData.emailPrefix : `${formData.emailPrefix}${formData.emailDomain}`;
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (isLoading || timer > 0) return;

    if (!formData.collegeName) {
      return toast.error("Please select your college first");
    }
    if (!formData.emailPrefix) {
      return toast.error("Please enter your email");
    }

    setIsLoading(true);
    const email = getFinalEmail();

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/verify-email", { email })
      .then((res) => {
        toast.success(res.data);
        setIsOtpSent(true);
        setTimer(30);
      })
      .catch((err) => {
        console.log(err);
        const errorMsg = err.response?.data?.message || err.response?.data || "Something went wrong";
        toast.error(typeof errorMsg === "object" ? JSON.stringify(errorMsg) : errorMsg);
        setIsOtpSent(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOtp = (e) => {
    e.preventDefault();
    
    if (!formData.otp.length) {
      return toast.error("Enter valid otp");
    }

    setIsLoading(true);
    const email = getFinalEmail();
    const payLoad = { email, otp: formData.otp };

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/verify-otp", payLoad)
      .then((res) => {
        setFormData((prev) => ({ ...prev, isVerified: true }));
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        const errorMsg = err.response?.data?.message || err.response?.data || "Verification failed";
        toast.error(errorMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!formData.isVerified) {
      return toast.error("Please verify your email before creating an account.");
    }

    const finalData = {
      ...formData,
      email: getFinalEmail(),
    };

    if (!validatePassword(finalData.password)) {
      toast.error("Password must contain: 1 Uppercase, 1 Number, 1 Symbol");
    } else {
      setIsLoading(true);
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/signup", finalData)
        .then((res) => {
          if (res.data.token) {
            loginUser(res.data.user, res.data.token); 
            toast.success("Signup successful!");
            navigate('/');
          } else {
            toast.success("Account created! Please log in.");
            navigate('/login');
          }
        })
        .catch((err) => {
          const errorMsg = err.response?.data?.msg || err.response?.data || "Signup failed";
          toast.error(errorMsg);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Join the Alumni Network
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* 1. FULL NAME */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            {/* 2. GRADUATION YEAR (Moved up so the UI can adapt early) */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Graduation Year <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={`e.g. ${currentYear}`}
                value={formData.graduationYear}
                onChange={handleGradYearChange}
              />
              {/* Visual Indicator of their Status */}
              {formData.graduationYear && (
                <p className={`mt-2 text-xs font-bold ${isAlumni ? "text-purple-600" : "text-blue-600"}`}>
                  {isAlumni 
                    ? "🎓 Alumni Status: You may register with a personal email." 
                    : "📚 Student Status: Verification requires your official college email."}
                </p>
              )}
            </div>

            {/* 3. COLLEGE SELECT */}
            <div className={isOtpSent || formData.isVerified ? "opacity-50 pointer-events-none" : ""}>
              <CollegeSelect onSelect={handleCollegeSelect} />
            </div>

            {/* 4. DYNAMIC EMAIL INPUT & OTP */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                {isAlumni ? "Personal Email ID" : "College Email ID"} <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex flex-col sm:flex-row gap-2">
                <div className="flex flex-1 rounded-md shadow-sm">
                  {isAlumni ? (
                    // ALUMNI VIEW: Full Email Input
                    <input
                      type="email"
                      required
                      disabled={isOtpSent || formData.isVerified}
                      placeholder="e.g. john.doe@gmail.com"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-slate-100 disabled:text-slate-500"
                      value={formData.emailPrefix}
                      onChange={(e) => setFormData({ ...formData, emailPrefix: e.target.value })}
                    />
                  ) : (
                    // STUDENT VIEW: Split Email Input
                    <>
                      <input
                        type="text"
                        required
                        disabled={isOtpSent || formData.isVerified}
                        placeholder="student_id"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-r-0 disabled:bg-slate-100 disabled:text-slate-500"
                        value={formData.emailPrefix}
                        onChange={(e) => setFormData({ ...formData, emailPrefix: e.target.value })}
                      />
                      <input
                        type="text"
                        readOnly
                        placeholder="@college.edu"
                        value={formData.emailDomain}
                        className="flex-1 inline-flex items-center px-3 rounded-r-md border border-slate-300 bg-slate-50 text-slate-500 sm:text-sm cursor-not-allowed"
                      />
                    </>
                  )}
                </div>
                {!isOtpSent && !formData.isVerified && (
                  <button
                    className={`px-6 py-2 rounded-lg text-white font-medium transition-colors whitespace-nowrap ${
                      isLoading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 cursor-pointer"
                    }`}
                    disabled={isLoading || !formData.graduationYear}
                    onClick={handleVerify}
                  >
                    {isLoading ? "Sending..." : "Verify"}
                  </button>
                )}
              </div>

              {/* OTP Section */}
              {isOtpSent && !formData.isVerified && (
                <div className="mt-4 animate-fade-in-down p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Enter Verification Code sent to {getFinalEmail()}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm tracking-widest text-center font-bold"
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-bold text-sm whitespace-nowrap cursor-pointer transition-colors"
                      onClick={handleOtp}
                    >
                      Confirm
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-slate-500 text-center">
                    Didn't receive code?{" "}
                    <button
                      className="text-blue-600 hover:underline cursor-pointer font-bold disabled:text-slate-400 disabled:no-underline"
                      onClick={handleVerify}
                      disabled={timer > 0}
                    >
                      {timer > 0 ? `Resend in ${timer}s` : "Resend Now"}
                    </button>
                  </p>
                </div>
              )}
            </div>

            {/* 5. PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || !formData.isVerified}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading || !formData.isVerified 
                    ? "bg-slate-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }`}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
              {!formData.isVerified && (
                <p className="text-center text-xs text-slate-500 mt-2">
                  * You must verify your email before submitting.
                </p>
              )}
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Signup;