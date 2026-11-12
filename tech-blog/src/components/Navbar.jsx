import React from "react";

function Navbar({ activeView, setActiveView }) {
  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg text-lg">InnoPulse</span>
        <span className="font-semibold text-gray-800 text-lg hidden sm:inline">Tech Blog</span>
      </div>

      <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
        <button
          onClick={() => setActiveView("home")}
          className={`cursor-pointer transition-colors ${activeView === "home" ? "text-blue-600 font-bold" : "hover:text-blue-600"}`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveView("articles")}
          className={`cursor-pointer transition-colors ${activeView === "articles" ? "text-blue-600 font-bold" : "hover:text-blue-600"}`}
        >
          Articles
        </button>
        <button
          onClick={() => setActiveView("categories")}
          className={`cursor-pointer transition-colors ${activeView === "categories" ? "text-blue-600 font-bold" : "hover:text-blue-600"}`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveView("about")}
          className={`cursor-pointer transition-colors ${activeView === "about" ? "text-blue-600 font-bold" : "hover:text-blue-600"}`}
        >
          About
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold">
          MERN Stack
        </span>
      </div>
    </nav>
  );
}

export default Navbar;