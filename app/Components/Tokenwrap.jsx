"use client";
import React, { useEffect } from "react";
import useTokenAndData from "./tokens";
import { redirect, usePathname, useRouter } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";

const TokenDataWrapper = ({ children }) => {
  const { isValid, data } = useTokenAndData();
  const path = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem(`rtoken`);
    router.refresh();

    if (token && path === "/") {
      redirect("/main/dashboard");
    }
  }, [isValid, data]);

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default TokenDataWrapper;
