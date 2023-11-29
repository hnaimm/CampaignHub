"use client";
import { AuthProvider } from "@/utils";

const MainComponent = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
export default MainComponent;
