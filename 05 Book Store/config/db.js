const mongoose = require("mongoose");

const connection = async() =>{
    await mongoose.connect("mongodb://127.0.0.1:27017/book-store");
    console.log("db is connected")
}

module.exports = connection;