import { useAuthStore } from "@/stores";

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

const request = (method) => {
  return (url, body) => {
    const requestOptions = {
      method,
      headers: authHeader(url),
    };

    if (body) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }

    return fetch(url, requestOptions).then(handleResponse);
  };
};

// Helper funcions

// Returns auth header with JWT if user is logged in and request is to the api url
const authHeader = (url) => {
  const { user, isLoggedIn } = useAuthStore();
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);

  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const handleResponse = async (response) => {
  const isJson = response.headers
    ?.get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  // Check for error response
  if (!response.ok) {
    const { user, logout } = useAuthStore();
    // Auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    if ([401, 403].includes(response.status) && user) {
      logout();
    }

    // Get error message from body or default to response status
    const error = (data && data.message) || response.status;
    return Promise.reject(error);
  }

  return data;
};