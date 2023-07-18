import actionTypes from '../actions/actionTypes';

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  users: [],
  doctors: [],
  allDoctors: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //gender
    case actionTypes.FETCH_GENDER_START_SUCCESS:
      state.genders = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_START_FAILURE:
      return {
        ...state,
      };

    //position
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILURE:
      state.positions = [];
      return {
        ...state,
      };

    //role
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILURE:
      state.roles = [];
      return {
        ...state,
      };

    //save user
    case actionTypes.SAVE_USER_SUCCESS:
      return {
        ...state
      }
    case actionTypes.SAVE_USER_FAILURE:
      alert(action.data.errMessage);
      return {
        ...state,
      };

    //delete a user
    case actionTypes.DELETE_A_USER_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.DELETE_A_USER_FAILURE:
      return {
        ...state,
      };

    //edit a user
    case actionTypes.EDIT_A_USER_SUCCESS:
      if (action.data.errCode === 0) {
        alert(action.data.errMessage);
      }
      break;
    case actionTypes.EDIT_A_USER_FAILURE:
      if (action.data.errCode === 1) {
        alert(action.data.errMessage);
      }
      break;

    //fetch all users
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.data,
      };
    case actionTypes.FETCH_ALL_USERS_FAILURE:
      return {
        ...state,
        users: [],
      };

    //fetch top doctor
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      return {
        ...state,
        doctors: action.data.data,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILURE:
      return {
        ...state,
        doctors: [],
      };

    //fetch all doctors
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      return {
        ...state,
        allDoctors: action.data.data,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILURE:
      return {
        ...state,
        allDoctors: [],
      };

    //Save detail doctors
    case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.SAVE_DETAIL_DOCTOR_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
