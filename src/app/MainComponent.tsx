"use client";
import { AuthProvider } from "@/utils";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      {children}
      <ToastContainer />
    </AuthProvider>
  );
};
export default MainComponent;
