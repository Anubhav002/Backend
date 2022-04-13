const router= require("express").Router();
const User= require("../models/User")

router.post("/register", async(req,res)=>{
    const newUser= new User({
        givenName: req.body.givenName,
        email: req.body.email,
        familyName: req.body.familyName,
        imageUrl:req.body.imageUrl,
        googleId:req.body.googleId,
        password:req.body.password
    });
    try{
        const userSaved= await User.findOne({
            email:req.body.email
        });
        if(!userSaved){
        const user = await newUser.save();
        res.status(200).json(user);}
        else{
            res.send("already registered")
        }
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
    user.password===req.body.password?res.send(user):res.send("wrong password345")
}
    catch(e){
        console.log(e);
    }
})

router.post("/password/:id",async(req, res)=>{
    try {
       // const salt = await bcrypt.genSalt(10);
       // req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = await User.findByIdAndUpdate(req.params.id,{$set:{password:req.body.password}});
    res.status(200).json(user)
    }catch(err){
        return res.status(400).json(err)
    }
//     try{
//         const user = await User.findByIdAndUpdate(req.params.id,{$set:{password:req.body.password}});
//          res.status(200).json("Account has been updated")
//        }catch(err){
//            return res.status(500).json(err)
//        }
})

module.exports=router;