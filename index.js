const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override");

// MongoDB connection
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}
main();

// Middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Root
app.get("/", (req, res) => {
  res.redirect("/chats");
});

// Show all chats (Open chat for everyone)
app.get("/chats", async (req, res, next) => {
  try {
    let chats = await Chat.find().sort({ created_at: -1 });
    res.render("index", { chats });
  } catch (err) {
    next(err);
  }
});

// New chat
app.get("/chats/new", (req, res) => {
  res.render("new");
});

// Create chat (with random anonymous id if from is empty)
app.post("/chats", async (req, res, next) => {
  try {
    let { from, to, msg } = req.body;
    if (!msg || msg.trim() === "") throw new Error("Message cannot be empty!");

    if (!from || from.trim() === "") from = "Anon-" + Math.floor(Math.random() * 1000);
    if (!to || to.trim() === "") to = "Anon-" + Math.floor(Math.random() * 1000);

    let newChat = new Chat({ from, to, msg, created_at: new Date() });
    await newChat.save();
    console.log("✅ Chat saved");
    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

// Edit chat
app.get("/chats/:id/edit", async (req, res, next) => {
  try {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) return res.status(404).render("404", { message: "Chat not found" });
    res.render("edit", { chat });
  } catch (err) {
    next(err);
  }
});

// Update chat
app.put("/chats/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let { msg } = req.body;
    if (!msg || msg.trim() === "") throw new Error("Message cannot be empty!");
    await Chat.findByIdAndUpdate(id, { msg }, { runValidators: true });
    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

// Delete chat
app.delete("/chats/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

// ❌ 404 Route
app.use((req, res) => {
  res.status(404).render("404", { message: "Page not found!" });
});

// ❌ Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(500).render("404", { message: err.message || "Something went wrong!" });
});

app.listen(8080, () => {
  console.log("🚀 Server running at http://localhost:8080");
});
