import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("@App:user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signIn = (userData) => {
    setUser(userData);
    localStorage.setItem("@App:user", JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("@App:user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signed: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};