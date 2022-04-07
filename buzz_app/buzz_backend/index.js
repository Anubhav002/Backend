const express= require("express");
const app= express();
const mongoose= require("mongoose");
const dotenv= require("dotenv");
const helmet= require("helmet");
const morgan= require("morgan");
const userRoute= require("./routes/users")
const authRoute= require("./routes/auth")


dotenv.config();

//databse connection
mongoose.connect("mongodb://localhost/ecomdata")
.then(()=>{console.log("connected")}).catch((err)=>{console.log(err)})




app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)

app.listen(4000,()=>{console.log("running")});