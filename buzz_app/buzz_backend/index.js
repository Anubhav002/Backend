const express= require("express");
const app= express();
const mongoose= require("mongoose");
const dotenv= require("dotenv");
const helmet= require("helmet");
const morgan= require("morgan");
const postRoute = require("./routes/posts");

dotenv.config();
mongoose.connect("mongodb://localhost/student").then(()=>{
    console.log("connected");
})
app.get("/",(req, res)=>{res.send("hello")});

app.use("/api/posts", postRoute);

app.listen(2000,()=>{console.log("running")});