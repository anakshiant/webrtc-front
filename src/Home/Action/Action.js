export function getHomeData(restId) {
  return async (dispatch, getState, { api }) => {
    try {
      const result = await fetch(
        `http://54.77.46.103:4200/restaurant/${restId}`
      );
      const resultJson = await result.json();
      console.log(resultJson);
      dispatch({
        type: "SUCCESS",
        details: resultJson.data
      });
    } catch (e) {
      dispatch({
        type: "ERROR",
        error: e.message
      });
    }
  };
}
