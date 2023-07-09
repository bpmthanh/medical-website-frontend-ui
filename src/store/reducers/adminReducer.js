import actionTypes from '../actions/actionTypes';

const initialState = {
  genders: [],
  roles: [],
  positions: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //gender
    case actionTypes.FETCH_GENDER_START_SUCCESS:
      // console.log('Fetched gender successfully', action);
      state.genders = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_START_FAILURE:
      // console.log('Fetched gender failure', action);
      return {
        ...state,
      };
    //position
    case actionTypes.FETCH_POSITION_SUCCESS:
      // console.log('Fetched position success', action);
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILURE:
      // console.log('Fetched position failure', action);
      state.positions = [];
      return {
        ...state,
      };
    //role
    case actionTypes.FETCH_ROLE_SUCCESS:
      // console.log('Fetched role success', action);
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILURE:
      // console.log('Fetched role failure', action);
      state.roles = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
