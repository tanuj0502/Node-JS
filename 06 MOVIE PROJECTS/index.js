const express = require("express");
const connection = require("./config/db");
// Ensure your middleware folder is named correctly. Using "middleware" here.
const upload = require("./middleware/multer"); 
const MovieModel = require("./models/movieModel");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3040;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", async (req, res) => {
  try {
    const movieData = await MovieModel.find({});
    res.render("home", { movieData });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.redirect("/");
  }
});

app.post("/add-movie", upload, async (req, res) => {
  try {
    if (req.file) {
      req.body.image = "/uploads/" + req.file.filename;
      console.log("Uploaded file:", req.file);
    }
    await MovieModel.create(req.body);
    console.log("Movie added with data:", req.body);
    res.redirect("/");
  } catch (error) {
    console.error("Error adding movie:", error);
    res.redirect("/");
  }
});

app.get("/deleteMovie", async (req, res) => {
  const id = req.query.dataId;
  console.log("Deleting movie with id:", id);
  try {
    const movieData = await MovieModel.findById(id);
    if (!movieData) {
      console.error("Movie not found!");
      return res.redirect("/");
    }

    await MovieModel.findByIdAndDelete(id);

    // Build the full file path and check if it exists before deleting
    const filePath = path.join(__dirname, movieData.image);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.log("Movie deleted successfully.");
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.redirect("/");
  }
});

app.get("/editMovie/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Editing movie with id:", id);
  try {
    const movieData = await MovieModel.findById(id);
    if (!movieData) {
      console.error("Movie not found!");
      return res.redirect("/");
    }
    res.render("edit", { movieData });
  } catch (error) {
    console.error("Error fetching movie data for edit:", error);
    res.redirect("/");
  }
});

app.post("/updateMovie", upload, async (req, res) => {
  try {
    console.log("Updating movie with data:", req.body);
    const movieData = await MovieModel.findById(req.body.id);
    if (!movieData) {
      console.error("Movie not found for update!");
      return res.redirect("/");
    }

    if (req.file) {
      // Delete the previous image if it exists
      const oldFilePath = path.join(__dirname, movieData.image);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      req.body.image = "/uploads/" + req.file.filename;
    }
    
    await MovieModel.findByIdAndUpdate(req.body.id, req.body);
    console.log("Movie data updated successfully.");
    res.redirect("/");
  } catch (error) {
    console.error("Error updating movie:", error);
    res.redirect("/");
  }
});

app.listen(port, (error) => {
  if (error) {
    console.error("Server failed to connect:", error);
  } else {
    connection();
    console.log(`Server is connected on port ${port}`);
  }
});
