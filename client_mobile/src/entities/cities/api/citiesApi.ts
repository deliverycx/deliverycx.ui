import axios from 'axios';
import { CityResponseModel } from '../types/citiesTypes';

export const getCitiesApi = () => {
  return axios.get<CityResponseModel>(
    'https://xn--q1a.xn--80apgfh0ct5a.xn--p1ai/api/city/all',
  );
};
