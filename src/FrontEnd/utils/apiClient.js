export const API_URL = import.meta.env.VITE_API_URL;

//set once by AuthContext so apiFetch can log the user out on session loss without importing AuthContext itself
let onUnauthorized = () => {};
export const setUnauthorizedHandler = (handler) => {
    onUnauthorized = handler;
};

//shared fetch wrapper: prefixes VITE_API_URL, sends the session cookie, JSON-encodes `json` bodies
//(or passes `body` through as-is for FormData uploads), parses the JSON response, and logs the user
//out automatically when the backend reports the session is no longer authenticated.
export async function apiFetch(path, { method = "GET", json, body, headers = {} } = {}) {
    const options = {
        method,
        credentials: "include",
        headers: { ...headers },
    };

    if (json !== undefined) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(json);
    } else if (body !== undefined) {
        options.body = body;
    }

    const response = await fetch(API_URL + path, options);
    const data = await response.json();

    if (data?.isAuthenticated === false) {
        onUnauthorized();
    }

    return data;
}
