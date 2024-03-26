"use client"
import React, { useEffect } from "react";
import useTokenAndData from "./tokens";
import { redirect, usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";

const TokenDataWrapper = ({ children }) => {
	const { isValid, data } = useTokenAndData();
	const path = usePathname()
	useEffect(() => {
		const token = localStorage.getItem(`rtoken`)
		if (!token && path != "/") {
			redirect("/");
		}
		if (token && path === "/") {
			redirect("/main/dashboard");
		}

	}, [isValid, data]);


	return <>
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>

	</>;
};

export default TokenDataWrapper

