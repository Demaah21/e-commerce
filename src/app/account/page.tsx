"use client";
import NavigationTrain from "@/components/navigation_train";
import AccountSection from "@/components/pages/account";
import {
  bottomMarginSaving,
  horizontalMarginLimit,
  topMarginSaving,
} from "@/shared/constants";
import { twMerge as tw } from "tailwind-merge";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/login");
    }
    if (isLoggedIn) {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, [isLoggedIn, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={tw(topMarginSaving, bottomMarginSaving, horizontalMarginLimit)}
    >
      <NavigationTrain />
      <AccountSection />
    </div>
  );
}
