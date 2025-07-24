"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLoading } from "../context/LoadingContext";

export default function useTransitionRouter() {
  const router = useRouter();
  const { setLoading } = useLoading();

  const push = async (url: string) => {
    setLoading(true);
    await router.push(url);
    // Let the page load and `useEffect([pathname])` will handle turning off loader
  };

  return { push };
}
