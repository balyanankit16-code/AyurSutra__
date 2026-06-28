
// import { createContext, useContext, useState, useEffect } from "react";
// const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     checkAuth();
//   }, []);
//   const checkAuth = async () => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_SERVER}/auth/verify`, {
//         credentials: 'include'
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         setIsAuthenticated(data.data.isAuthenticated);
//       } else {
//         setIsAuthenticated(false);
//       }
//     } catch (error) {
//       setIsAuthenticated(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email, password, role) => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_SERVER}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password, role }),
//         credentials: 'include'
//       });

//       if (response.ok) {
//         setIsAuthenticated(true);
//         return { success: true };
//       }
//       return { success: false, error: 'Login failed' };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   };

//   const logout = async () => {
//     try {
//       await fetch(`${import.meta.env.VITE_SERVER}/auth/logout`, {
//         method: 'POST',
//         credentials: 'include'
//       });
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       setIsAuthenticated(false);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       isAuthenticated, 
//       login, 
//       logout, 
//       loading 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/auth/verify`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.data.isAuthenticated);
        if (data.data.isAuthenticated) {
          // You might want to fetch user details here
          setUser(data.data.user || { role: 'patient' }); // Default role for demo
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, role) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUser(data.data.user);
        return { success: true, user: data.data.user };
      }
      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const autoLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const sendLoginOTP = async (email, userType) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/auth/send-login-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, userType }), 
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, message: data.message };
        }
        return { success: false, error: data.message || 'Failed to send OTP' };
    } catch (error) {
        return { success: false, error: 'Network error or server unreachable.' };
    }
};
const loginWithOTP = async (email, otp, role) => {
    try {
        let endpoint = '';
        if (role === 'patient') {
            endpoint = '/auth/login/patient-with-otp';
        } else if (role === 'practitioner') {
            endpoint = '/auth/login/practitioner-with-otp';
        } else if (role === 'admin') { // ⬅️ ADDED ADMIN LOGIC
            endpoint = '/auth/login/admin-with-otp'; 
        } else {
            return { success: false, error: 'OTP login not supported for this role.' };
        }

        const response = await fetch(`${import.meta.env.VITE_SERVER}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp }),
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            // Assuming this function is inside AuthProvider
            setIsAuthenticated(true); 
            setUser(data.data.user);
            return { success: true, user: data.data.user };
        }
        
        return { success: false, error: data.message || 'OTP verification failed.' };
    } catch (error) {
        // Catch network errors
        return { success: false, error: error.message };
    }
};

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user,
      login, 
      logout, 
      autoLogin,
      loading,
      sendLoginOTP,
      loginWithOTP
    }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);