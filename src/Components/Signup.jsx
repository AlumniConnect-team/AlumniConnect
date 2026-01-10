import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CollegeSelect from './CollegeSelect'; 
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    collegeName: '',
    graduationYear: '',
    emailPrefix: '', 
    emailDomain: '', 
    password: ''
  });

  const handleCollegeSelect = (name, domain) => {
    setFormData(prev => ({ 
      ...prev, 
      collegeName: name, 
      emailDomain: domain ? `@${domain}` : '' 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      email: `${formData.emailPrefix}${formData.emailDomain}`
    };
    axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/signup",finalData)
    .then((res)=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err.message);
    })
    console.log("Submitting User Data:", finalData);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Join the Alumni Network
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <input 
                type="text" 
                required
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                placeholder="John Doe"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div>
              <CollegeSelect onSelect={handleCollegeSelect} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">College Email ID</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  required
                  placeholder="student_id"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-r-0"
                  onChange={(e) => setFormData({...formData, emailPrefix: e.target.value})}
                />
                
                <input
                  type="text"
                  readOnly
                  placeholder="@college.edu"
                  value={formData.emailDomain}
                  className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-slate-300 bg-slate-50 text-slate-500 sm:text-sm w-1/2 cursor-not-allowed"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Select your college above to auto-fill the domain.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Graduation Year</label>
              <input 
                type="number" 
                required
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                placeholder="2024"
                onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input 
                type="password" 
                required
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div>
              <button 
                type="submit" 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer"
                
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 cursor-pointer">
                <img className="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
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