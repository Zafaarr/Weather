const GET_DATA = "GET_DATA";

const initialState = {};

export const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return { name: action.payload };
    default:
      return state;
  }
};

export const getData = (data) => ({
  type: GET_DATA,
  payload: data,
});
