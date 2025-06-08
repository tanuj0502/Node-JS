const express = require("express");
const app = express();
const PORT= 3690;
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("home")    
})

app.get("/about",(req,res)=>{    
    res.render("about") 
}) 

app.get("/contact",(req,res)=>{ 
    res.render("contact")
}) 

app.get("/services", (req, res) => {
    const services = [
        { name: "Web Development", description: "We craft high-performance websites tailored to your brand." },
        { name: "UI/UX Design", description: "Intuitive and visually appealing designs for enhanced user experience." },
        { name: "Digital Marketing", description: "Boost your online presence with expert marketing strategies." },
        { name: "Cloud Solutions", description: "Secure and scalable cloud infrastructure for your business." }
    ];
    
    res.render("services", { services }); // Make sure services is passed
});


app.listen(PORT,(err)=>{
if(err){
    console.log("Server is not connected")
}else{
    console.log("Server is connected",PORT)
}
})