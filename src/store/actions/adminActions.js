import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';


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
      dispatch(fetchGenderStartFailure());
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
      dispatch(fetchPositionFailure());
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
      dispatch(fetchRoleFailure());
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
