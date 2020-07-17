import React from "react";
import axios from "axios";
import Routes from "./routes/Routes";
import { getCookie, signout } from "./utils/helpers";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.interceptors.request.use((config) => {
  const token = getCookie("token");
  config.headers.Authorization = token;

  return config;
});

// null for success, and second parameter cllback for failure
axios.interceptors.response.use(null, (error) => {
  if (error.response.status === 401) {
    signout(() => {
      window.location("/");
    });
    return Promise.reject(error);
  }
});

function App() {
  return <Routes />;
}

export default App;
