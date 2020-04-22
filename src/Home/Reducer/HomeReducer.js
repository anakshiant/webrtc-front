const homeReducer = (state = {}, action) => {
  switch (action.type) {
    default:
    case "SUCCESS":
      return Object.assign({}, state, {
        homeData: action.details
      });
    case "ERROR":
      return Object.assign({}, state, {
        error: action.error
      });
      return state;
  }
};
export default homeReducer;
