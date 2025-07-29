"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    console.log("token", hash);
    const params = new URLSearchParams(hash.replace("#", "?"));
    const accessToken = params.get("access_token");

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      router.replace("/app/dashboard");
    } else {
      router.replace("/auth/login");
    }
  }, []);

  return null;
}
