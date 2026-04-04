import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Helper function to decode the token and check expiration
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      // A JWT has 3 parts separated by a dot. The payload is the 2nd part (index 1).
      // atob() decodes the base64 encoded string.
      const payloadBase64 = token.split('.')[1];
      const decodedJson = atob(payloadBase64);
      const decodedPayload = JSON.parse(decodedJson);
      
      // The 'exp' claim is in seconds. Date.now() is in milliseconds.
      // So we multiply exp by 1000 to compare them properly.
      const expirationTime = decodedPayload.exp * 1000;
      
      return Date.now() > expirationTime;
    } catch (error) {
      // If the token is malformed and fails to decode, treat it as expired
      return true;
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token"); // Get the token from storage

    if (storedUser && storedToken) {
      // Check if the token is still valid before logging them in
      if (isTokenExpired(storedToken)) {
        console.log("Session expired. Logging out.");
        logoutUser(); // Clears everything if the token is dead
      } else {
        setUser(JSON.parse(storedUser)); // Safe to log them in
      }
    } else {
      // If there is a user but no token, something is wrong, clean it up
      logoutUser();
    }
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
      pendingConnections: backendData.pendingConnections || [], // <--- ADD THIS LINE
    };

    setUser(safeUserData);
    localStorage.setItem("user", JSON.stringify(safeUserData));
    // MAKE SURE you are passing the token into loginUser when you call it in your Login component!
    if (token) {
        localStorage.setItem("token", token);
    }
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