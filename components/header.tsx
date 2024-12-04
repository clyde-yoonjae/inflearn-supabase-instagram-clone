"use client";

import { useRecoilState } from "recoil";
import Logo from "./logo";
import { searchState } from "utils/recoil/atoms";

export default function Header() {
  const [search, setSearch] = useRecoilState(searchState);
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-gray-900 px-4 py-2">
      <nav className="flex gap-4">
        <Logo />
        <ul className="flex gap-2 text-white">
          <li>Movies</li>
          <li>Dramas</li>
        </ul>
      </nav>
      <div className="flex w-full max-w-72 items-center gap-2 rounded-md border-white bg-transparent p-2 text-white">
        <i className="fas fa-search" />
        <input
          className="bg-transparent"
          placeholder="Search movies"
          value={search}
          onChange={(e) => e.target.value}
        />
      </div>
    </header>
  );
}
