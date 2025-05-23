import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

export default function SideMenu() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  return <aside className="w-48 min-h-screen  bg-gray-100 p-5 h-100 shadow-md" style={{ backgroundColor: "var(--accent)" }}>
      <div>
        <h1>
          {t("welcome")}
        </h1>
        <button onClick={toggleLanguage}>
          {i18n.language === "en" ? "عربي" : "English"}
        </button>
      </div>

      <nav className="flex flex-col space-y-4">
        <Link className="nav-link mb-5 text-blue-700 transition-colors p-2 rounded duration-300" style={{ border: "2px solid var(--primary)" }} href="/about">
          About
        </Link>
        <Link className="nav-link mb-5 text-blue-70 transition-colors p-2 rounded duration-300" style={{ border: "2px solid var(--primary)" }} href="/about/mision">
          Mision
        </Link>
        <Link className="nav-link text-blue-700  transition-colors p-2 rounded duration-300" style={{ border: "2px solid var(--primary)" }} href="/about/vision">
          Vision
        </Link>
      </nav>
    </aside>;
}
