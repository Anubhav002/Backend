const express= require("express");
const app = express();
const mongoose= require("mongoose");
const dotenv= require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")

dotenv.config();


 
mongoose.connect("mongodb://localhost/studentdata")


//middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use("/api/user", userRoute);



app.listen(8000,()=>{
     console.log("backend server is running")
})
