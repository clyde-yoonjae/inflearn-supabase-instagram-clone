"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 text-center font-bold text-white">
      <p>
        Movie Database from{" "}
        <Link className="text-blue-600" href="https://www.themoviedb.org/">
          TMDB
        </Link>
      </p>
    </footer>
  );
}
