import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (!config.url.includes("/login") && !config.url.includes("/register")) {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling 401 errors and refreshing token
let isRefreshing = false;
let failedRequestsQueue = [];

const processQueue = (error, token = null) => {
  failedRequestsQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedRequestsQueue = [];
};

api.interceptors.response.use(
  (response) => {
    return response; // Pass through successful responses
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      // Prevent retrying the same request multiple times
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) {
          return Promise.reject(error); // If no refresh token, reject the promise
        }

        // Refresh token logic (replace with your refresh token API call)
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_HOST}/auth/refresh-token`,
          {
            refresh_token: refreshToken,
          }
        );

        const newAccessToken = data.accessToken;

        // Save new access and refresh tokens
        localStorage.setItem("access", newAccessToken);
        // localStorage.setItem("refresh", data.refreshToken);  // Update refresh token if provided

        // Update Authorization header for the failed request and retry it
        api.defaults.headers["Authorization"] = "Bearer " + newAccessToken;
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;

        processQueue(null, newAccessToken);

        return api(originalRequest); // Retry the original request with new token
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
