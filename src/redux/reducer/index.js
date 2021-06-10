import {CURRENT_WEATHER, ERROR, LOADING, WEATHERDATA} from '../actions/types';

const initialState = {
  weatherData: {},
  currentCityData: {},
  loading: false,
  error: null,
};
export const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case WEATHERDATA:
      return {...state, weatherData: action.payload, loading: false};
    case CURRENT_WEATHER:
      return {...state, currentCityData: action.payload, loading: false};
    case LOADING:
      return {...state, loading: true};
    case ERROR:
      return {...state, error: action.payload, loading: false};
    default:
      return state;
  }
};
