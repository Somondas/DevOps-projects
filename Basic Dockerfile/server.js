import express from "express";
import path from "path";
const app = express();

const __dirname = path.resolve();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "/public/views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Home Page", message: "Hello from EJS!" });
});

app.listen(3000, () => {
  console.log("server running at 3000");
});
