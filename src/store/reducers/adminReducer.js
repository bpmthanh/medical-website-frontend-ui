import actionTypes from '../actions/actionTypes';

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  users: [],
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
      // console.log('Save user success: ', action.data);
      // if (action.data.errCode === 0) {
      //   alert(action.data.errMessage);
      // }
      break;
    case actionTypes.SAVE_USER_FAILURE:
      // console.log('Save user failure: ', action.data);
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
      // console.log('Fetch all users failure: ', action.data);
      return {
        ...state,
        users: [],
      };

    //delete a user
    case actionTypes.DELETE_A_USER_SUCCESS:
      // if (action.data.errCode === 0) {
      //   alert(action.data.errMessage);
      // }
      return {
        ...state,
      };
      break;
    case actionTypes.DELETE_A_USER_FAILURE:
      // if (action.data.errCode === 1) {
      //   alert(action.data.errMessage);
      // }
      return {
        ...state,
      };
      break;

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

    default:
      return state;
  }
};

export default adminReducer;
