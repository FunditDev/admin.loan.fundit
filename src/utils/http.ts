import axios, { AxiosError, AxiosInstance } from "axios";
import { getToken, isTokenExpired, removeToken, setToken } from "./token";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import { useRouting } from "@/hooks/useRouting";
let httpAuth;
let httpNoAuth;

let refreshToking = false;
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://admin.smartcash.fundit.com.ng/api" ||
      "https://www.admin.smartcash.fundit.com.ng/api"
    : "http://localhost:3300/api";

if (typeof window !== undefined) {
  httpNoAuth = axios.create({
    baseURL,
    timeout: 40000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

httpNoAuth?.interceptors.request.use((config) => {
  return config;
});

if (typeof window !== undefined) {
  httpAuth = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

httpAuth?.interceptors.request.use(
  (config) => {
    const token = getToken("token");
    let authorization;
    const istokenExpire = isTokenExpired("token");
    if (
      token &&
      token.trim().length > 10 &&
      typeof token === "string" &&
      !istokenExpire
    ) {
      authorization = `Bearer ${token}`;
    } else {
      const refresh = getToken("refreshToken");
      if (refresh) {
        const token = getToken("token");
        if (
          token &&
          token.trim().length > 10 &&
          typeof token === "string" &&
          !istokenExpire
        ) {
          authorization = `Bearer ${token}`;
        }
      } else {
        toast.error("Session expired, please login again", {
          toastId: "expired_session",
        });
        // Router.push("/");
      }
    }
    config.headers.Authorization = authorization;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// request with auth
export const processWithAuth = async (
  method: string,
  path: string,
  data?: any,
  callback?: (path: string, data: any, error?: any) => void
): Promise<any> => {
  console.debug("processWithAuth -->", path, data);
  let rt;
  try {
    if (method === "get") {
      rt = await httpAuth!.get(path);
    } else if (method === "post") {
      rt = await httpAuth!.post(path, data);
    } else if (method === "put") {
      rt = await httpAuth!.put(path, data);
    } else if (method === "delete") {
      rt = await httpAuth!.delete(path);
    } else {
      throw new Error("Method not found");
    }
    if (callback) {
      callback(path, rt.data);
    }

    return { data: rt.data, status: rt.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      // if (error?.response?.status === 401 && !refreshToking) {
      //   const refreshedUser = await refreshUser();
      //   if (refreshedUser) {
      //     return await processWithAuth(method, path, data, callback);
      //   }
      // } else if (
      //   !refreshToking &&
      //   error?.response?.status === 401 &&
      //   error?.response?.data?.message.toLowerCase().includes("unauthorized")
      // ) {
      //   const refreshedUser = await refreshUser();
      //   if (refreshedUser) {
      //     return await processWithAuth(method, path, data, callback);
      //   }
      // }
      console.log(error, "error from rt2");
      if (callback) {
        callback(path, null, error);
      } else {
        throw error.response ? error.response.data : error;
      }
    }
  }
};

// refresh token function
const refreshUser = async () => {
  console.log("token expired refreshing token");
  try {
    if (getToken("refreshToken")) {
      refreshToking = true;
      const refreshedResponse = await processNoAuth("post", "/auth/refresh", {
        refreshToken: getToken("refreshToken"),
      });
      if (refreshedResponse) {
        setToken("token", refreshedResponse.data.access_token);
        return refreshedResponse;
      } else {
        removeToken("token");
        removeToken("refreshToken");
      }
    }
  } catch (error) {
    refreshToking = false;
  } finally {
    refreshToking = false;
  }
  return null;
};

// no auth
export const processNoAuth = async (
  method: string,
  path: string,
  data?: any,
  callback?: any
) => {
  console.debug("processNoAuth", path, data);

  let rt;
  try {
    if (method === "get") {
      rt = await httpNoAuth!.get(path);
    } else if (method === "post") {
      rt = await httpNoAuth!.post(path, data);
    } else if (method === "put") {
      rt = await httpNoAuth!.put(path, data);
    } else if (method === "delete") {
      rt = await httpNoAuth!.delete(path);
    } else {
      throw new Error("Method not found");
    }
    if (callback) {
      callback(path, rt.data);
    }
    // console.log(rt.data, "rt");
    if (rt.status === 200 || rt.status === 201) {
      return { data: rt.data, status: rt.status };
    }
  } catch (error: any) {
    console.log(error, "error from rt no auth");

    if (callback) {
      callback(path, null, error);
    } else {
      console.log("error from rt no auth");
      throw error.response ? error.response.data : error;
    }
  }
};
