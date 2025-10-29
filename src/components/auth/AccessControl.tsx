"use client";

import { redirect, usePathname } from "next/navigation";
import type { Session } from "next-auth";
import "@/styles/globals.css";

export default async function AccessControl({
  session,
}: {
  session?: Session | undefined | null;
}) {
  const pathname = usePathname();
  if (!session) {
    if (pathname !== "/") redirect("/");
  }

  return <div></div>;
}
