import axios from 'axios'

export const axiosWithoutToken = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PROD_BASE_URL,
    timeout: 4000,
  });


const user = JSON.parse(window.localStorage.getItem('user') || "{}") 
export const axiosWithToken = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PROD_BASE_URL,
    timeout: 4000,
    headers: {'Authorization': user['token'] && `Bearer ${user['token']}` || ""}
  });
