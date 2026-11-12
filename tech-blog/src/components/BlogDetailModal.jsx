import React from "react";

function BlogDetailModal({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
        >
          ✕
        </button>

        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          {post.category}
        </span>

        <h2 className="text-2xl font-bold text-gray-900 mt-3 mb-2">{post.title}</h2>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 pb-4 border-b border-gray-100">
          <span>By {post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
          alt="Article Cover"
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <div className="text-gray-700 leading-relaxed space-y-4">
          <p className="font-semibold text-lg text-gray-800">{post.description}</p>
          <p>
            Modern web development requires scalable architecture, efficient state management, and optimized database queries. Building full-stack systems with the MERN stack allows developers to craft high-performing digital products using JavaScript across the entire ecosystem.
          </p>
          <p>
            Whether you are configuring cloud pipelines using Terraform on Google Cloud or tackling complex algorithmic challenges, clean code and modular design principles remain essential for long-term scalability.
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 cursor-pointer text-sm"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailModal;