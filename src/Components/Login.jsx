import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
};

const Login = () => {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...data };

    if (!validatePassword(finalData.password)) {
      toast.error("Invalid Password Format");
      return;
    }

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/login", finalData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);

        toast.success("Authentication successful");
        console.log(res.data);

        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Invalid Login Credentials");
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Create one today
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                onChange={(e) => {
                  setdata({ ...data, email: e.target.value });
                }}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <input
                type="password"
                required
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setdata({ ...data, password: e.target.value })}
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-slate-900"
              >
                Remember me
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6">
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
              <button className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                <img
                  className="h-5 w-5"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                />
                <span className="ml-2">Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;