import React from "react";

export default function Blogcard({ image, category, title, description, date, author, readTime }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* 🖼️ Image display */}
      {image ? (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
          No Image Provided
        </div>
      )}

      <div className="p-6">
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{category}</span>
        <h3 className="text-lg font-bold text-gray-900 mt-3">{title}</h3>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500 border-t border-gray-100 pt-4">
          <span>{author}</span>
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  );
}