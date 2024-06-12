import React, { createContext, useState, useContext, useEffect } from 'react';
const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    return storedUser || { email: null,name: null, userId:null};
  });

  const updateUser = (email,name,userId) => {
    const newUser = { email,name,userId};
    setUser(newUser);
    sessionStorage.setItem('user', JSON.stringify(newUser));
  };

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
