const express = require("express");
const dashboardRouter = express.Router();

dashboardRouter.get("/",(req,res)=>{
    res.render("dashboard");
})

module.exports = dashboardRouter;