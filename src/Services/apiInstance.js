import axios, { AxiosInstance } from "axios";
import { getApiUrl } from "./appConfig";

let api= null;

export const getApi = () => {
  if (!api) {
    api = axios.create({
      baseURL: getApiUrl(), //  now safe
      timeout: 100000
      
    });

    //  Attach Token Automatically
    api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("user-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 📥 Handle Response
    api.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("user-token");
        }
        return Promise.reject(error);
      }
    );
  }

  return api;
};
