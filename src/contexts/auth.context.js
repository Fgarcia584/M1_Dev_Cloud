import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export  function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const login = (userData, token) => {
    setUser({ userData, token });
    localStorage.setItem('token', token);
  };

  const logout = async () => {
    await fetch('/api/auth/log-out', {
      method: 'POST',
      body: JSON.stringify({
        email: user.userData.email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setUser(null);
      localStorage.removeItem('token');
      router.push('/');
    }).catch((error) => {
      console.error('Failed to log out', error);
    });

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}