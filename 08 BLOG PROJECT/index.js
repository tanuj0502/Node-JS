const express = require("express");
const connection = require("./config/db");
const app = express();
const userRouter = require("./routes/userRouter");
const dashboardRouter = require("./routes/dashboardRouter");

const PORT = 8085;
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("assets"));

app.use("/userdata", userRouter);
app.use("/", dashboardRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error in server setup");
  } 
    connection();
    console.log("Server is running ", PORT);

});
