"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/images/tmdbflix_logo.png"
        alt="TMDBFLIX Logo"
        width={50}
        height={30}
        className="!h-auto !w-20"
      />
    </Link>
  );
}
