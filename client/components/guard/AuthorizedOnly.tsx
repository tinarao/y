"use client";

import Cookies from "js-cookie"
import { ReactNode } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const AuthorizedOnly = ({ children }: { children: ReactNode }) => {

  const { user, isLogged } = useAuth();
  const isCookieThere = !!Cookies.get("access_token")
  const router = useRouter();

  if (!user?._id && !isLogged && !isCookieThere) {
    router.replace("/login");
  } 
  
  return <>{children}</>;

};

export default AuthorizedOnly;
