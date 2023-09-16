import { UserAuth } from "./data/user";
import nookies from "nookies";

export function setUser(user : UserAuth) {
    nookies.set(null, "auth", JSON.stringify(user), {maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
}

export function getUser() : UserAuth | null {
    const auth = nookies.get()["auth"];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
}

export function removeUser() {
    nookies.destroy(null, "auth");
}

export function getToken() : string | null {
    const user = getUser();
    if (user) {
        return user.access_token;
    }
    return null;
}