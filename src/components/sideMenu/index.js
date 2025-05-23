import Link from "next/link";
import React from "react";

export default function SideMenu() {
  return (
    <aside className="w-48 min-h-screen bg-gray-100 p-4 shadow-md">
      <nav className="flex flex-col space-y-4">
        <Link className="nav-link text-blue-700 hover:underline" href="/about">
          About
        </Link>
        <Link
          className="nav-link text-blue-700 hover:underline"
          href="/about/mision"
        >
          Mision
        </Link>
        <Link
          className="nav-link text-blue-700 hover:underline"
          href="/about/vision"
        >
          Vision
        </Link>
      </nav>
    </aside>
  );
}
