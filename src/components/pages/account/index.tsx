"use client";

import { useEffect, useState } from "react";
import { twMerge as tw } from "tailwind-merge";
import { interSemiboldFont, poppinsMediumFont } from "fonts";
import ChangePasswordForm from "./ChangePasswordForm";

 interface User {
   name: string;
  email: string;
}

export default function AccountSection() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <section className="flex flex-col items-start gap-10">
      <h1
        className={tw(
          "text-3xl text-color-secondary-2 max-2xl:text-2xl",
          interSemiboldFont.className
        )}
      >
        Your Profile
      </h1>

      <div className="grid grid-cols-6 gap-10 max-3xl:grid-cols-4 max-3xl:gap-14 max-2xl:grid-cols-3">
        <div className="space-y-1">
          <h3
            className={tw(
              "text-2xl capitalize max-2xl:text-xl",
              poppinsMediumFont.className
            )}
          >
            Name
          </h3>
          <p className="text-lg max-2xl:text-base">{user?.name || "Unknown"}</p>
        </div>
        <div className="space-y-1">
          <h3
            className={tw(
              "text-2xl capitalize max-2xl:text-xl",
              poppinsMediumFont.className
            )}
          >
            Email
          </h3>
          <p className="text-lg max-2xl:text-base">{user?.email || "Unknown"}</p>
        </div>
      </div>
      <div className="w-full">
        <h2
          className={tw(
            "text-2xl text-color-secondary-2 mb-4",
            interSemiboldFont.className
          )}
        >
          Change Password
        </h2>
        <ChangePasswordForm />
      </div>
    </section>
  );
}
