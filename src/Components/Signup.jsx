import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CollegeSelect from './CollegeSelect';
import axios from 'axios';
import { validatePassword } from './Login';
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContext';

const Signup = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
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
  const {loginUser} = useContext(UserContext);
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleCollegeSelect = (name, domain) => {
    setFormData((prev) => ({
      ...prev,
      collegeName: name,
      emailDomain: domain ? `@${domain}` : "",
    }));
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (isLoading || timer > 0) return;

    if (!formData.emailPrefix.length || !formData.emailDomain.length) {
      return toast.error("Select College and Enter the prefix of email first");
    }

    setIsLoading(true);

    const email = `${formData.emailPrefix}${formData.emailDomain}`;

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/verify-email", {
        email: email,
      })
      .then((res) => {
        toast.success(res.data);
        setIsOtpSent(true);
        setTimer(30);
      })
      .catch((err) => {
        console.log(err);
        const errorMsg =
          err.response?.data?.message ||
          err.response?.data ||
          "Something went wrong";
        toast.error(
          typeof errorMsg === "object" ? JSON.stringify(errorMsg) : errorMsg
        );
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

    const email = `${formData.emailPrefix}${formData.emailDomain}`;
    const payLoad = {
      email: email,
      otp: formData.otp,
    };
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/verify-otp", payLoad)
      .then((res) => {
        setFormData((prev) => ({ ...prev, isVerified: true }));
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        const errorMsg =
          err.response?.data?.message ||
          err.response?.data ||
          "Verification failed";
        toast.error(errorMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    const finalData = {
      ...formData,
      email: `${formData.emailPrefix}${formData.emailDomain}`,
    };

    if (!validatePassword(finalData.password)) {
      toast.error("Password must contain: 1 Uppercase, 1 Number, 1 Symbol");
    } else {
      setIsLoading(true);
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/signup", finalData)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));
            setUser(res.data);
            loginUser(res.data.user);
            toast.success("Signup successful!");
            navigate('/');
          } else {
            toast.success("Account created! Please log in.");
            navigate('/login');
          }
        })
        .catch((err) => {
          const errorMsg =
            err.response?.data?.msg || err.response?.data || "Signup failed";
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
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
            <div>
              <CollegeSelect onSelect={handleCollegeSelect} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                College Email ID
              </label>
              <div className="mt-1 flex flex-col sm:flex-row gap-2">
                <div className="flex flex-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    required
                    placeholder="student_id"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-r-0"
                    onChange={(e) =>
                      setFormData({ ...formData, emailPrefix: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    readOnly
                    placeholder="@college.edu"
                    value={formData.emailDomain}
                    className="flex-1 inline-flex items-center px-3 rounded-r-md border border-slate-300 bg-slate-50 text-slate-500 sm:text-sm cursor-not-allowed"
                  />
                </div>
                {!isOtpSent && !formData.isVerified && (
                  <button
                    className={`px-6 py-2 rounded-lg text-white font-medium transition-colors whitespace-nowrap ${
                      isLoading 
                        ? "bg-green-300 cursor-not-allowed" 
                        : "bg-green-500 hover:bg-green-600 cursor-pointer" 
                    }`}
                    disabled={isLoading}
                    onClick={handleVerify}
                  >
                    {isLoading ? "Sending..." : "Verify Email"}
                  </button>
                )}
              </div>
              {isOtpSent && !formData.isVerified && (
                <div className="mt-4 animate-fade-in-down">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Enter One-Time Password
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) =>
                        setFormData({ ...formData, otp: e.target.value })
                      }
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm whitespace-nowrap cursor-pointer"
                      onClick={handleOtp}
                    >
                      Confirm OTP
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Didn't receive code?{" "}
                    <button
                      className="text-blue-600 hover:underline cursor-pointer"
                      onClick={handleVerify}
                      disabled={timer > 0}
                    >
                      {timer > 0 ? `Resend in ${timer}s` : "Resend"}
                    </button>
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Graduation Year
                </label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="2024"
                  onChange={(e) =>
                    setFormData({ ...formData, graduationYear: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 cursor-pointer">
                <img
                  className="h-5 w-5"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                />
                <span className="ml-2">Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;