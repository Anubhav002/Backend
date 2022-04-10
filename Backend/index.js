const express= require("express");
const app = express();
const mongoose= require("mongoose");
const dotenv= require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")

dotenv.config();


 
mongoose.connect("mongodb://localhost/student")
.then(()=>{
     console.log("connected to mongodb");
})

//middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);


app.listen(2000,()=>{
     console.log("backend server is running")
})
