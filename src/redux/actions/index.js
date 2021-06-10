import axios from 'axios';
import {API_KEY, LIST_CITY} from '../../constants/apiConstant';
import {CURRENT_WEATHER, ERROR, LOADING, WEATHERDATA} from './types';

export const getWeatherData = () => {
  return async dispatch => {
    try {
      dispatch({
        type: LOADING,
      });
      const response = await axios.get(LIST_CITY);
      dispatch({
        type: WEATHERDATA,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error in get List City', error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const getCurrentCityData = (lat, long) => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`,
      );
      dispatch({
        type: CURRENT_WEATHER,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error('Error in get Current City', error);
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
