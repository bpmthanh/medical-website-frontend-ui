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
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    phone: data.phone,
    gender: data.gender,
    role: data.role,
    position: data.position,
    avatar: data.avatar,
  });
};

export const getAllCodeService = (type) => {
  return axios.get(`/api/allcode?type=${type}`);
};

export const getTopDoctorHome = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

export const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};

export const saveDetailDoctor = (data) => {
  return axios.post(`/api/save-info-doctors`,data);
};

export const getDetailInfoDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor?id=${id}`);
};

export const getScheduleDoctorByDate = (id,date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${id}&date=${date}`
  );
};

export const getDoctorInfoById = (id) => {
  return axios.get(
    `/api/get-extra-info-doctor-by-id?doctorId=${id}`
  );
};

export const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};

export const savePatientBooking = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};

export const postVerifyBookAppointment = (data) => {
  return axios.post(`/api/patient-verify-book-appointment`, data);
};

export const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};

export const getAllSpecialty = () => {
  return axios.get(`/api/get-all-specialty`);
};
export const getDetailSpecialtyById = (id,location) => {
  return axios.get(`/api/get-detail-specialty-by-id?specialtyId=${id}&location=${location}`);
};
