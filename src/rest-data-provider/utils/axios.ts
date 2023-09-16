import { HttpError } from "@refinedev/core";
import axios, { AxiosRequestConfig } from "axios";
import nookies from "nookies";
import { BASE_API_URL } from "pages/_app";
import { use } from "react";
import { UserAuth } from "src/data/user";
import { getUser } from "src/localDataProvider";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const userAuth : UserAuth | null = getUser();
  if (userAuth) {
    
    if (request.headers) {
      // Set the Authorization header if it exists

      request.headers["Authorization"] = `Bearer ${userAuth.access_token}`;
    } else {
      // Create the headers property if it does not exist
      request.headers = {
        Authorization: `Bearer ${userAuth.access_token}`,
      };
    }
  }
  // Check if the header property exists


  return request;
});


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

export { axiosInstance };

export function getUrl(url: string) {
  return BASE_API_URL + url;
}
