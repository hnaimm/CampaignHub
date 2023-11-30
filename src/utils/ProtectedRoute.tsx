"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { LoadingScreen } from "@/components";
import { useAuth } from "@/utils";

const ProtectedRoute = (props) => {
  const { isUserAuthenticated } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  let ComponentToRender;

  //if not authorized, navigate user to home page
  //if authorized, navigate user to campaigns page
  if (
    !isUserAuthenticated &&
    (pathname == "/campaigns" || pathname == "/insights")
  ) {
    ComponentToRender = () => (
      <>
        {props.children}
        <LoadingScreen />
      </>
    );
  } else if (isUserAuthenticated && pathname == "/") {
    ComponentToRender = () => (
      <>
        {props.children}
        <LoadingScreen />
      </>
    );
  }

  if (!ComponentToRender) {
    ComponentToRender = () => props.children;
  }

  useEffect(() => {
    //if not authorized, navigate user to home page
    //if authorized, navigate user to campaigns page
    if (
      !isUserAuthenticated &&
      (pathname == "/campaigns" || pathname == "/insights")
    ) {
      setTimeout(() => {
        router.push("/");
      }, 500);
    } else if (isUserAuthenticated && pathname == "/") {
      setTimeout(() => {
        router.push("/campaigns");
      }, 500);
    }
  }, [pathname]);

  return <ComponentToRender />;
};

export default ProtectedRoute;
