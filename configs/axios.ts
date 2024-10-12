import axios from 'axios'

export const axiosWithoutToken = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PROD_BASE_URL + ``,
    timeout: 4000,
    headers: {'X-Custom-Header': 'foobar'}
  });

export const axiosWithToken = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PROD_BASE_URL + ``,
    timeout: 4000,
    headers: {'X-Custom-Header': 'foobar'}
  });
