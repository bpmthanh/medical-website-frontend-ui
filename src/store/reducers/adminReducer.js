import actionTypes from '../actions/actionTypes';

const initialState = {
  genders: [],
  roles: [],
  positions: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      console.log('Fetched started', action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_START_SUCCESS:
      console.log('Fetched successfully', action);
      state.genders=action.data
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_START_FAILURE:
      console.log('Fetched failure', action);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
