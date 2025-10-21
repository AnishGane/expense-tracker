import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //   Function to update the user data
  const updateUser = (userData) => {
    setUser(userData);
    console.log(user);
  };

  //   Function  to clear the user data as they logged out or something else
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
