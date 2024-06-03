export const initialState = {
  userDetails: localStorage.getItem('userDetails')
    ? JSON.parse(localStorage.getItem('userDetails'))
    : {},
  token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_DETAILS':
      return {
        ...state,
        userDetails: action.userDetails
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading
      };
    case 'SET_ERROR_MESSAGE':
      return {
        ...state,
        errMess: action.errMess
      };
    default:
      return state;
  }
};

export default reducer;
