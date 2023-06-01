import axios from "../axios";

export const handleLoginAPI = (email, password) => {
  return axios.post('/api/login',{email,password});
};
