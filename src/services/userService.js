import axios from "../axios";

export const handleLoginAPI = (email, password) => {
  return axios.post("/api/login", { email, password });
};

export const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

export const createNewUserReact = (data) => {
  return axios.post(`/api/create-new-user`,data);
};

