"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KidsCampRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/academy");
  }, [router]);
  return null;
}
