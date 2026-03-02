import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (backendData) => {
    const safeUserData = {
      _id: backendData._id,
      fullName: backendData.fullName,
      email: backendData.email,
      collegeName: backendData.collegeName,
      graduationYear: backendData.graduationYear,
      isVerified: backendData.isVerified,
      profilePic: backendData.profilePic,
      resume: backendData.resume || "",
      backupEmail: backendData.backupEmail || "",
      bio: backendData.bio || "",
      currentCompany: backendData.currentCompany || "",
      jobRole: backendData.jobRole || "",
      yearsExperience: backendData.yearsExperience || 0,
      createdAt: backendData.createdAt,
    };

    setUser(safeUserData);
    localStorage.setItem("user", JSON.stringify(safeUserData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token"); 
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};