import actionTypes from './actionTypes';
import {
  getAllCodeService,
  createNewUserReact,
  getAllUsers,
  deleteUserReact,
  editUserReact,
  getTopDoctorHome,
  getAllDoctors,
  saveDetailDoctor,
} from '../../services/userService';

//gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('gender');
      if (res && res.errCode === 0) {
        dispatch(fetchGenderStartSuccess(res.data));
      } else {
        dispatch(fetchGenderStartFailure());
      }
    } catch (error) {
      console.error('Error occurred while fetching gender data:', error);
    }
  };
};

export const fetchGenderStartSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_START_SUCCESS,
  data: genderData,
});

export const fetchGenderStartFailure = () => ({
  type: actionTypes.FETCH_GENDER_START_FAILURE,
});

// Position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('position');
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailure());
      }
    } catch (error) {
      console.error('Error occurred while fetching gender data:', error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailure = () => ({
  type: actionTypes.FETCH_POSITION_FAILURE,
});

// role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('role');
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailure());
      }
    } catch (error) {
      console.error('Error occurred while fetching gender data:', error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailure = () => ({
  type: actionTypes.FETCH_ROLE_FAILURE,
});

// save
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserReact(data);
      if (res && res.errCode === 0) {
        dispatch(saveUserSuccess(res));
      } else {
        dispatch(saveUserFailure(res));
      }
    } catch (error) {
      console.error('Error occurred while creating a new user:', error);
    }
  };
};

export const saveUserSuccess = (data) => ({
  type: actionTypes.SAVE_USER_SUCCESS,
  data,
});

export const saveUserFailure = (data) => ({
  type: actionTypes.SAVE_USER_FAILURE,
  data,
});

// delete a user
export const deleteAUSerStart = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserReact(userId);
      if (res && res.errCode === 0) {
        dispatch(deleteAUSerSuccess(res));
      } else {
        dispatch(deleteAUSerFailure(res));
      }
    } catch (error) {
      console.error('Error occurred while delete a user:', error);
    }
  };
};

export const deleteAUSerSuccess = (data) => ({
  type: actionTypes.DELETE_A_USER_SUCCESS,
  data,
});

export const deleteAUSerFailure = (data) => ({
  type: actionTypes.DELETE_A_USER_FAILURE,
  data,
});

// edit a user
export const editAUSer = (userData) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserReact(userData.id, userData);
      if (res && res.errCode === 0) {
        dispatch(deleteAUSerSuccess(res));
      } else {
        dispatch(deleteAUSerFailure(res));
      }
    } catch (error) {
      console.error('Error occurred while delete a user:', error);
    }
  };
};

export const editAUSerSuccess = (data) => ({
  type: actionTypes.EDIT_A_USER_SUCCESS,
  data,
});

export const editAUSerFailure = (data) => ({
  type: actionTypes.EDIT_A_USER_FAILURE,
  data,
});

// fetch all user
export const fetchAllUSersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers('All');
      if (res && res.errCode === 0) {
        dispatch(fetchAllUSersSuccess(res));
      } else {
        dispatch(fetchAllUSersFailure(res));
      }
    } catch (error) {
      console.error('Error occurred while fetching all user:', error);
    }
  };
};

export const fetchAllUSersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  data,
});

export const fetchAllUSersFailure = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_FAILURE,
  data,
});

// fetch top doctor
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHome();
      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctorSuccess(res));
      } else {
        dispatch(fetchTopDoctorFailure(res));
      }
    } catch (error) {
      console.error('Error occurred while fetching all user:', error);
    }
  };
};

export const fetchTopDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
  data,
});

export const fetchTopDoctorFailure = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTOR_FAILURE,
  data,
});

// fetch all doctor
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorsSuccess(res));
      } else {
        dispatch(fetchAllDoctorsFailure(res));
      }
    } catch (error) {
      console.error('Error occurred while fetching all user:', error);
    }
  };
};

export const fetchAllDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  data,
});

export const fetchAllDoctorsFailure = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAILURE,
  data,
});

// save detail doctor
export const saveDetailDoctorRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(data);
      if (res && res.errCode === 0) {
        dispatch(saveDetailDoctorsSuccess(res));
      } else {
        dispatch(saveDetailDoctorsFailure(res));
      }
    } catch (error) {
      console.error('Error occurred while fetching all user:', error);
    }
  };
};

export const saveDetailDoctorsSuccess = (data) => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
  data,
});

export const saveDetailDoctorsFailure = (data) => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAILURE,
  data,
});


// fetch all code shedule hours
export const fetchAllCodeScheduleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('Time');
      if (res && res.errCode === 0) {
        dispatch(fetchAllCodeScheduleSuccess(res.data));
      } else {
        dispatch(fetchAllCodeScheduleFailure(res));
      }
    } catch (error) {
      console.error('Error occurred while fetching all user:', error);
    }
  };
};

export const fetchAllCodeScheduleSuccess = (data) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS,
  data,
});

export const fetchAllCodeScheduleFailure = (data) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILURE,
  data,
});
