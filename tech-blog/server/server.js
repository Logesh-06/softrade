const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/innopulse_blog")
.then(() => console.log("MongoDB Connected Successfully! 🚀"))
.catch((err) => console.log("Database connection error: ", err));

// 1. Define Blog Schema & Model right here in server.js
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, default: "Logeshwaran K" },
  readTime: { type: String, default: "5 min read" },
  image: { type: String }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

// REST APIs

// 2. Get All Posts from Database
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("GET Error:", err.message); 
    res.status(500).json({ error: err.message });
  }
});

// 3. Create New Post in Database (Admin)
app.post('/api/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("POST Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 4. Delete a post by ID
// Delete a post by ID
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found in database" });
    }
    
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});