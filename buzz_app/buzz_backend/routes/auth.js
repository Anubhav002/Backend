const router= require("express").Router();
const User= require("../models/User")

router.post("/register", async(req,res)=>{
    const newUser= new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    try{
      const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        console.log(err)
    }
});

router.post("/login",async (req, res)=>{
    try{
    const user= await User.findOne({
        email:req.body.email
    });
    !user && res.status(404).send("user not find")
    user.password===req.body.password?res.send("right"):res.send("wrong password345")
}
    catch(e){
        console.log(e);
    }
})

module.exports=router;