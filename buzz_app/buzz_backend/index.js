const express= require("express");
const app= express();
const mongoose= require("mongoose");
const dotenv= require("dotenv");
const helmet= require("helmet");
const morgan= require("morgan");
const userRoute= require("./routes/users")
const authRoute= require("./routes/auth")
const postRoute = require("./routes/posts");



dotenv.config();
mongoose.connect("mongodb://localhost/student").then(()=>{
    console.log("connected");
})
app.use(express.json());
app.use("/api/posts", postRoute);
app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)

app.listen(4000,()=>{console.log("running")});