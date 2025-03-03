'use client'

import axios from "axios";

export const axiosWithoutToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROD_BASE_URL,
});

export let user = {} as any
if(typeof window !== "undefined")
{
  user =  JSON.parse(window.localStorage?.getItem("user") || "{}")
}




export const axiosWithToken  = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROD_BASE_URL,
  headers: {
    Authorization: (user["token"] && `Bearer ${user["token"]}`) || "",
  },
});

