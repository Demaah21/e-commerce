"use client";
import { IHeaderLink } from "types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderLink({ href, text }: IHeaderLink) {
  const pathname = usePathname();

  return (
    <Link
      href={href.startsWith("/") ? href : `/${href}`}
      className={`capitalize text-base max-2xl:text-sm ${
        pathname === `/${href}` ? "underline underline-offset-4" : ""
      } `}
    >
      {text}
    </Link>
  );
}
