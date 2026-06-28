import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  withCredentials: true, 
});


api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// handles token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;


    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        await axios.post(
          `${import.meta.env.VITE_SERVER}/auth/refresh`,
          {},
          { 
            withCredentials: true 
          }
        );

        // Retry the original request with new tokens 
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        
        // Clear any potentially corrupted auth state
        if (window.location.pathname !== '/auth') {
          window.location.href = '/auth';
        }
        
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      console.error('Forbidden access');
      // Optional: Redirect to unauthorized page
    }

    return Promise.reject(error);
  }
);


export default api;