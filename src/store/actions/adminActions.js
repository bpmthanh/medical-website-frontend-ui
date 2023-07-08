import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_GENDER_START });
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
