const mongoose = require("mongoose");

const connection = async () => {

    await mongoose.connect("mongodb://localhost:27017/moviesDB");
    console.log("MongoDB connected");

};

module.exports = connection;
    