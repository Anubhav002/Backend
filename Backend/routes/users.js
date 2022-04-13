const User= require("../models/User");
const router= require("express").Router();
const bcrypt = require("bcrypt");
const { route } = require("./auth");
const { findById } = require("../models/User");




//upadate user
router.put("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err)
            }
        } 
         try{
             const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body});
              res.status(200).json("Account has been updated")
            }catch(err){
                return res.status(500).json(err)
            }

    }   else{
         return res.status(403).json("you can update only your account!");  
             }
});
//delete user
router.delete("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        
         try{
              await User.findByIdAndDelete(req.params.id);
              res.status(200).json("Account has been deleted")
            }catch(err){
                return res.status(500).json(err)
            }

    }   else{
         return res.status(403).json("you can delete only your account!");  
             }
}); 
//get a user
router.get("/:id",async(req,res)=>{
    try{
       const user = await User.findOne({googleId:req.params.id});
       //const {password,updateAT, ...other} = user._doc
       res.status(200).json(user)
    }catch(err){
        res.status(500).json(err);
    }
});

// get Suggestions

router.get("/suggestions", async(req, res)=>{
    try{
        const user = await User.find();
        res.send(user);
    }
    catch(err){
        res.send(err);
    }
})

// router.put("/:id/follow", async (req, res) => {
//     if (req.body.userId !== req.params.id) {
//       try {
//         const user = await User.findById(req.params.id);
//         const currentUser = await User.findById(req.body.userId);
//         if (!user.followers.includes(req.body.userId)) {
//           await user.updateOne({ $push: { followers: req.body.userId } });
//           await currentUser.updateOne({ $push: { followings: req.params.id } });
//           res.status(200).json("user has been followed");
//         } else {
//           res.status(403).json("you allready follow this user");
//         }
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(403).json("you cant follow yourself");
//     }
//   })
// //follow user

router.put("/:id/follow", async (req,res)=>{
    if(req.body.userId!== req.params.id){
      try{
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.body.userId)
        if(!user.followers.includes(req.body.userId)){
           await user.updateOne({$push: { followers:req.body.userId}});
       //  await currentUser.updateOne({$push: { followings:req.body.Id}});
           res.status(200).json(user);
        }else{
            res.status(403).json("you already follow this user")
        }
      }catch(err){
          res.status(500).json(err)
      }
    }else{
        res.status(403).json("you cant follow yourself")
    }
});

// Accept Request
router.put("/:id/accept", async ( req, res)=>{
    if(req.body.userId!== req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if((currentUser.followers.includes(req.params.id))){
                await currentUser.updateOne({$pull: { followers:req.params.id}});
                await user.updateOne({$push: { followings:req.body.userId}});
                await currentUser.updateOne({$push: { followings:req.params.id}});
                res.status(200).json("user has been followed");
            }
            else{
                res.json("you havnt frnd requst")
            }
        }
        catch(err){
            res.json(err)
        }
    }
    else{
        res.json("you can not accept your frnd request")
    }
})

//unfollow user
router.put("/:id/unfollow", async (req,res)=>{
    if(req.body.userId!== req.params.id){
      try{
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.body.userid)
        if(user.followers.includes(req.body.userid)){
           await user.updateOne({$pull: { followers:req.body.userid}});
           await currentUser.updateOne({$pull: { followings:req.body.id}});
           res.status(200).json("user has been unfollowed");
        }else{
            res.status(403).json("you dont follow this user")
        }
      }catch(err){
          res.status(500).json(err)
      }
    }else{
        res.status(403).json("you cant unfollow yourself")
    }
})

//friends
router.get("/:id/followings", async(req, res)=>{
    const user= await User.findById(req.params.id);
   const friends= await Promise.all(user.followings.map((friendId)=>{
        return User.findById(friendId)
    }))
    let friendList=[];
    friends.map((friend)=>{
        const {_id,name,imageUrl}= friend;
        friendList.push({_id,name,imageUrl})
    })
    res.json(friendList)
})

module.exports=router;
