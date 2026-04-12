import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../config";

const Updatepwd = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (email.includes("@")) {
      setLoading(true);
      setMessage("");
      try {
        const res = await API.post(
          import.meta.env.VITE_SERVER_DOMAIN + "/verify-email",
          {
            email,
            isUpdatePassword: true,
          },
        );
        setMessage(res.data);
        setStep(2);
      } catch (err) {
        setMessage(err.response?.data || "Error sending OTP");
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("Please enter a valid email");
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const res = await API.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/verify-otp",
        {
          email,
          otp,
        },
      );
      setStep(3);
      setMessage(res.data);
    } catch (err) {
      setMessage(err.response?.data || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword === confirmPassword && newPassword !== "") {
      setLoading(true);
      try {
        const res = await API.post(
          import.meta.env.VITE_SERVER_DOMAIN + "/changepwd",
          {
            email,
            newPassword,
          },
        );
        setMessage(res.data);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        setMessage(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("Passwords do not match");
    }
  };

  return (
    <div className="mt-28 flex flex-col items-center w-full px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-200">
        {message && (
          <p className="text-center text-blue-600 font-medium mb-4">
            {message}
          </p>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center text-gray-800">
              Reset Password
            </h2>
            <input
              type="email"
              placeholder="Enter Institute Email ID"
              value={email}
              disabled={Loading}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              disabled={Loading}
              onClick={handleSendOtp}
              className={`w-full text-white font-semibold py-2 rounded-lg transition ${Loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {Loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center text-gray-800">
              Verify OTP
            </h2>
            <div className="bg-gray-100 p-3 rounded text-center text-sm text-gray-600">
              OTP sent to: <span className="font-semibold">{email}</span>
            </div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              disabled={Loading}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              disabled={Loading}
              onClick={handleVerifyOtp}
              className={`w-full text-white font-semibold py-2 rounded-lg transition ${Loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
            >
              {Loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center text-gray-800">
              Set New Password
            </h2>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              disabled={Loading}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              disabled={Loading}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              disabled={Loading}
              onClick={handleUpdatePassword}
              className={`w-full text-white font-semibold py-2 rounded-lg transition ${Loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {Loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-600 mb-2">Success!</h1>
            <p className="text-gray-600">Redirecting to login...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Updatepwd;
