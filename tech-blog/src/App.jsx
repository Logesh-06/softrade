import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Blogcard from "./components/Blogcard";
import CreatePostModal from "./components/CreatePostModal";
import BlogDetailModal from "./components/BlogDetailModal";
import AdminLoginModal from "./components/AdminLoginModal";

function App() {
  const [currentView, setCurrentView] = useState("home"); // "home", "articles", "categories", "about"
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      setBlogPosts(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setLoading(false);
    }
  };

  
  const handleAddPost = async (newPostData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/posts", newPostData);
      setBlogPosts([response.data, ...blogPosts]);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  
  const handleDeletePost = async (id) => {
    try {
      const cleanId = String(id).trim();
      await axios.delete(`http://localhost:5000/api/posts/${cleanId}`);
      setBlogPosts(prevPosts => prevPosts.filter(post => post._id !== id));
      console.log("Deleted successfully!");
    } catch (err) {
      console.error("Error deleting post:", err.response?.data || err.message);
    }
  };

  const handleRoleToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAdminSuccess = () => {
    setIsAdmin(true);
    setIsAdminLoginOpen(false);
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeView={currentView} setActiveView={setCurrentView} />

      <main className="max-w-7xl mx-auto px-8 py-8">
        
        
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">Active View:</span>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
              {isAdmin ? "Admin Panel" : "User Panel"}
            </span>
          </div>

          <button
            onClick={handleRoleToggle}
            className="text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            {isAdmin ? "Logout Admin" : "Switch to Admin Mode"}
          </button>
        </div>

        
        {currentView === "home" && (
          <div className="space-y-12">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-12 shadow-xl flex flex-col items-start justify-between">
              <span className="bg-blue-500/30 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                Welcome to InnoPulse 🚀
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Engineering Insights & Full-Stack Mastery
              </h1>
              <p className="text-blue-100 text-lg max-w-2xl mb-8 leading-relaxed">
                Explore deep dives into modern web architecture, cloud infrastructure automation, and advanced algorithms.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentView("articles")}
                  className="bg-white text-blue-900 font-bold px-6 py-3 rounded-xl shadow hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  Explore Articles
                </button>
                {isAdmin && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    + Create Article
                  </button>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Featured Highlights</h2>
                <button
                  onClick={() => setCurrentView("articles")}
                  className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer"
                >
                  View All →
                </button>
              </div>

              {loading ? (
                <div className="text-center py-10 text-gray-500">Loading featured articles...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {blogPosts.slice(0, 3).map((post) => {
                    const postId = post._id || post.id;
                    return (
                      <div key={postId} className="relative group">
                        <div 
                          onClick={() => setSelectedPost(post)}
                          className="cursor-pointer"
                        >
                          <Blogcard 
                            image={post.image}
                            category={post.category}
                            title={post.title}
                            description={post.description}
                            date={post.date}
                            author={post.author}
                            readTime={post.readTime}
                          />
                        </div>

                        {isAdmin && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePost(postId);
                            }}
                            className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md transition-colors cursor-pointer z-10"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === "articles" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">All Technology Articles</h1>
                <p className="text-gray-600 mt-2">Browse through our comprehensive library of technical tutorials.</p>
              </div>
              
              {isAdmin && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  + Create Article
                </button>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="All">All Categories</option>
                <option value="Software Development">Software Development</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Algorithms">Algorithms</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center py-16 text-gray-500">Loading articles from database...</div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-200">
                No articles found matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => {
                  const postId = post._id || post.id;
                  return (
                    <div key={postId} className="relative group">
                      <div 
                        onClick={() => setSelectedPost(post)}
                        className="cursor-pointer"
                      >
                        <Blogcard 
                          image={post.image}
                          category={post.category}
                          title={post.title}
                          description={post.description}
                          date={post.date}
                          author={post.author}
                          readTime={post.readTime}
                        />
                      </div>

                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePost(postId);
                          }}
                          className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md transition-colors cursor-pointer z-10"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {currentView === "categories" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Explore Categories</h1>
              <p className="text-gray-600 mt-2">Select a category to view specialized technical articles.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Software Development", "Cloud Computing", "Algorithms"].map((cat) => (
                <div
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentView("articles");
                  }}
                  className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                      Category
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-4">{cat}</h3>
                    <p className="text-gray-600 text-sm mt-2">
                      Click to explore all tutorials, guides, and articles under {cat}.
                    </p>
                  </div>
                  <span className="text-blue-600 font-semibold text-sm mt-6 inline-block">
                    Browse Articles →
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === "about" && (
          <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
              About InnoPulse
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900">Modern MERN Stack Architecture</h1>
            <p className="text-gray-700 leading-relaxed">
              InnoPulse is a high-performance technical blogging platform engineered with React, Node.js, Express, and MongoDB. It features professional role-based admin controls, dynamic view navigation, and full-stack REST API communication.
            </p>
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Core Technologies Used:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Frontend:</strong> React, Vite, Tailwind CSS, Axios</li>
                <li><strong>Backend:</strong> Node.js, Express.js REST APIs</li>
                <li><strong>Database:</strong> MongoDB & Mongoose ODM</li>
              </ul>
            </div>
          </div>
        )}

      </main>

      {/* Modals */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminSuccess}
      />

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPost={handleAddPost}
      />

      <BlogDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  );
}

export default App;