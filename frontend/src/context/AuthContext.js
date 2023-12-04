// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context for auth
const AuthContext = createContext(null);

// AuthProvider component that will wrap your app and provide the auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially, no user is logged in

  // Simulate a sign-in function
  const signIn = (username, avatar) => {
    // Set the user state with the username and avatar
    setUser({ username, avatar });
    // Here you would have your actual sign-in logic, potentially involving
    // API calls to a backend service and setting authentication tokens
  };

  // Simulate a sign-out function
  const signOut = () => {
    // Clear the user state
    setUser(null);
    // Here you would also handle the sign-out logic, such as invalidating tokens
    // and clearing any stored authentication data
  };

  // The context provider gives access to the user state and sign-in/sign-out functions to its children
  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
