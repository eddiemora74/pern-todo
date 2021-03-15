const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "public")));

const todoRoutes = require("./server/routes/todos");
app.use("/api/todos", todoRoutes);

app.get(["/app", "/app/*"], (req, res) => {
  if (process.env.NODE_ENV === "dev") {
    res.redirect("http://localhost:3000");
  } else {
    res.sendFile(path.join(__dirname, "public", "app.html"));
  }
});

app.get("/", (req, res) => res.render("index"));

app.listen(8080, () => console.log("Listening on port 8080"));
