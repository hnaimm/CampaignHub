"use client";
import { AuthProvider, ProtectedRoute } from "@/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        {children}
        <ToastContainer />
      </ProtectedRoute>
    </AuthProvider>
  );
};
export default MainComponent;
