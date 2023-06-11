import cloudy from "../img/Clody.jpg"
const GET_DATA = "GET_DATA";


const initialState = {
  gradus: 31,
  name: "Tashkent",
  humidity: 10,
  speed: 2,
  rainy: 1,
  type: "Sunny",
  image: cloudy,
};

export const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getData = (data) => ({
  type: GET_DATA,
  payload: data,
});
