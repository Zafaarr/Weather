import cloudy from "../img/Clody.jpg";
const GET_DATA = "GET_DATA";
const ERROR = "ERROR";

const initialState = {
  gradus: 31,
  name: "Tashkent",
  humidity: 10,
  speed: 2,
  rainy: 1,
  type: "Sunny",
  image: cloudy,
  error: "",
};

export const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return { ...state, ...action.payload, error: "" };
    case ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const getData = (data) => ({
  type: GET_DATA,
  payload: data,
});

export const reduxError = (errorMessage) => ({
  type: ERROR,
  payload: errorMessage,
});
