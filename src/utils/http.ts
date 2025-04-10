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
    ? "https://www.admin.loan.fundit.com.ng/api"
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
        window.location.href = "/";
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
  callback?: (path: string, data: any, error?: any) => void,
  files?: any
): Promise<any> => {
  console.debug("processWithAuth -->", path, data);
  if (files) {
    data = convertToFormData(data, files);
    console.log(data, files, "data from processWithAuth");
    httpAuth!.defaults.headers["Content-Type"] = "multipart/form-data";
    method = "post";
  }
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
  callback?: (path: string, data: any, error?: any) => void,
  files?: any
) => {
  console.debug("processNoAuth", path, data);
  if (files) {
    data = convertToFormData(data, files);
    httpNoAuth!.defaults.headers["Content-Type"] = "multipart/form-data";
    method = "post";
  }

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
    console.log(error);

    if (callback) {
      callback(path, null, error);
    } else {
      throw error.response ? error.response.data : error;
    }
  }
};

// export const convertToFormData = (data, files) => {
//   const formData = new FormData();
//   formData.append("data", JSON.stringify(data));

//   if (Array.isArray(files)) {
//     files.forEach((file, index) => {
//       formData.append(`file${index}`, file);
//     });
//   } else if (typeof files === "object") {
//     Object.keys(files).forEach((key) => {
//       let keyFiles = Array.isArray(files[key]) ? files[key] : [files[key]];
//       keyFiles.forEach((file, index) => {
//         formData.append(`${key}${index}`, file);
//       });
//     });
//   } else if (files.constructor.name === "File") {
//     formData.append(`file`, files);
//   }

//   return formData;
// };

export const convertToFormData = (data: any, files: any) => {
  const formData = new FormData();

  // Append each key in data separately instead of as a JSON string
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
    
  if (Array.isArray(files)) {
    // If files is an array, append each file with the same key
    files.forEach((file) => {
      formData.append("file[]", file); // Use `file[]` for backend array support
    });
  } else if (files instanceof File) {
    formData.append("file", files); // Single file upload
  } else if (typeof files === "object") {
    // If files is an object, loop through keys
    Object.keys(files).forEach((key) => {
      let keyFiles = Array.isArray(files[key]) ? files[key] : [files[key]];
      keyFiles.forEach((file) => {
        formData.append(`${key}[]`, file); // `key[]` ensures proper backend parsing
      });
    });
  }

  return formData;
};
