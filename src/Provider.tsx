"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-hidden">
      {children}
      <ToastContainer
        autoClose={3000}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        position="bottom-left"
      />
    </div>
  );
};

export default Provider;
