import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedJson = atob(payloadBase64);
      const decodedPayload = JSON.parse(decodedJson);
      const expirationTime = decodedPayload.exp * 1000;
      return Date.now() > expirationTime;
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      if (isTokenExpired(storedToken)) {
        console.log("Session expired.");
        logoutUser(); 
      } else {
        // 1. Instantly load from local storage so the UI doesn't flash
        setUser(JSON.parse(storedUser)); 
        
        // 2. NEW: Quietly fetch the absolute latest data from MongoDB in the background
        // This instantly catches any approved vouches, new connections, or new messages!
        refreshUser(); 
      }
    } else if (storedUser || storedToken) {
      logoutUser();
    }
    
    setIsLoading(false);
  }, []);

  const loginUser = (backendData, token) => {
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
      connections: backendData.connections || [],
      notifications: backendData.notifications || [], 
      pendingConnections: backendData.pendingConnections || [],
      vouchRequests: backendData.vouchRequests || [], 
    };

    setUser(safeUserData);
    localStorage.setItem("user", JSON.stringify(safeUserData));
    if (token) {
        localStorage.setItem("token", token);
    }
  };

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/auth/me`, {
        headers: { "x-auth-token": token }
      });
      loginUser(res.data, token); 
    } catch (error) {
      console.error("Failed to refresh user data", error);
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token"); 
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser, refreshUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};