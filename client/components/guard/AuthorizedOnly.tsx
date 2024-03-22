"use client";

import Cookies from "js-cookie"
import { ReactNode, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const AuthorizedOnly = ({ children }: { children: ReactNode }) => {

  const { user, isLogged } = useAuth();
  const isCookieThere = !!Cookies.get("access_token")
  const router = useRouter();

  useEffect(() => {
    if (!user?._id && !isLogged && !isCookieThere) {
      router.replace("/login");
    } 
  }, [isCookieThere, router, isLogged, user?._id])
  
  return <>{children}</>;

};

export default AuthorizedOnly;
