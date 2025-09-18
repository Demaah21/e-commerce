"use client";
import SignUpForm from "@/components/pages/sign_up/SignUpForm";
import Image from "next/image";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUp() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <main className="grid grid-cols-2 items-center">
      <Image
        src="/images/sign_up/phones.webp"
        alt="phones"
        width={1000}
        height={1000}
        className="w-full h-full object-cover"
      />
      <div className="w-1/2 mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl">Create an account</h1>
          <p className="text-lg">Enter your details below</p>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}
