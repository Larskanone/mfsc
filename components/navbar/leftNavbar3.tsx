"use client"

import dynamic from "next/dynamic";

export const LeftNavbar = dynamic(() => import("./leftNavbar2").then(mod => mod.LeftNavbarSSR), { ssr: false });