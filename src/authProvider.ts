import { AuthBindings } from "@refinedev/core";
import nookies from "nookies";
import {axiosInstance, getUrl} from "./rest-data-provider/utils/axios"
import { getUser, removeUser, setUser } from "./localDataProvider";
import { UserAuth } from "./data/user";


const mockUsers = [
  {
    name: "John Doe",
    email: "johndoe@mail.com",
    roles: ["admin"],
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Jane Doe",
    email: "janedoe@mail.com",
    roles: ["editor"],
    avatar: "https://i.pravatar.cc/150?img=11",
  },
];

export const authProvider: AuthBindings = {
  login: async ({ email, username, password, remember, redirectTo }) => {
    // Suppose we actually send a request to the back end here.
    const response = await axiosInstance.post(getUrl("/users/login"), {
      email, password
    });

    const user = response.data.data;

    if (user) {
      setUser(user);
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    const response = await axiosInstance.post(getUrl("/users/logout"));
    console.log(response)
    removeUser();
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async (ctx: any) => {
    const cookies = nookies.get(ctx);

    if (getUser()) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    // const auth = nookies.get()["auth"];
    const userAuth : UserAuth | null = getUser();
    if (userAuth) {
      return userAuth.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const userAuth : UserAuth | null = getUser();
    console.log(authProvider)
    if (userAuth) {
      return userAuth;
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },

  register: async (params) => {
    return Promise.resolve({ success: true });
  },
};
