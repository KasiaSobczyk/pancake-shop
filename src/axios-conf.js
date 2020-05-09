import axios from 'axios';

const base = axios.create({
  baseURL: 'https://pancake-shop.firebaseio.com/',
});

export default base;
