import { tokenType } from "./types";

export const setToken = (name: tokenType, token: string) => {
  return localStorage.setItem(name, token);
};

export const getToken = (name: tokenType) => {
  if (typeof window === "undefined" || !window.localStorage) {
    return null; // Not running in a browser environment
  }

  if (!window.localStorage.getItem(name)) {
    return null; // "token" item does not exist
  }

  return window.localStorage.getItem(name);
};

export const decodeToken = (token: string) => {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    const res = JSON.parse(decodedPayload);
    const { iat, ...rest } = res;
    return rest;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // Handle the error gracefully by returning null
  }
};

export const removeTokenIfExpired = (name: tokenType) => {
  if (localStorage.getItem(name)) {
    const token = getToken(name);
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) localStorage.removeItem("token");
      }
    }else{
      
    }
  }
};

export const removeToken = (name: tokenType) => {
  localStorage.removeItem(name);
};

export const isTokenExpired = (name: tokenType) => {
  const token = getToken(name);
  if (!token) return null;
  const decodedToken = decodeToken(token);
  if (!decodedToken) {
    return null;
  }
  const currentTime = Date.now() / 1000;
  
  if (decodedToken.exp < currentTime) {
    removeToken(name);
    return true;
  }
  return false;
};
