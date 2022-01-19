import axios from 'axios';
import { BASE_URL } from '../util';

export const fetchChars = (pageNumber) => dispatch => {
  dispatch({type:'FETCH_IS_LOADING',payload:false})
  return axios
    .get(BASE_URL+'/character/?page='+pageNumber)
    .then(res => {
      let { results } = res.data;

      return dispatch({
        type: "FETCH_CHARS",
        payload: results
      });
    })
    .catch(err => {
      console.log('Could not fetch chars. Try again later.');
    });
};
