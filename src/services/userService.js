import axios from '../axios';

export const handleLoginAPI = (email, password) => {
  return axios.post('/api/login', { email, password });
};

export const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

export const createNewUserReact = (data) => {
  return axios.post('/api/create-new-user', data);
};

export const deleteUserReact = (data) => {
  return axios.delete('/api/delete-user', {
    data: {
      id: data,
    },
  });
};


export const editUserReact = (dataId, data) => {
  return axios.put('/api/edit-user', {
    id: dataId,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    email: data.email,
    phoneNumber: data.phoneNumber,
  });
};


export const getAllCodeService = (type) => {
  return axios.get(`/api/allcode?type=${type}`);
};
