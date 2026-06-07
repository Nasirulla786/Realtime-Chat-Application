import uploadOncloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.userId;
    // console.log("this is user",user);
    if (!user) {
      return res.json({ message: " user is not found for token" });
    }

    const currentrUser = await User.findById(user);
    if (!currentrUser) {
      return res.json({ message: "current user is not found" });
    }

    return res.status(200).json(currentrUser);
  } catch (error) {
    console.log("this is getCurrentUser error", error);
  }
};




export const editProfie = async(req,res)=>{
  try {

    const {name} = req.body;
    let image;
    if(req.file){
      image = await uploadOncloudinary(req.file.path);
    }

    const user = await User.findByIdAndUpdate(req.userId,{
      name:name,
      image:image
    })

    if(!user){
      return res.status(400).json({message:"something went worng"});
    }

    return res.json(user);



  } catch (error) {console.log("this is edit profile error",error);

  }
}



export const otherUsers= async(req,res)=>{
  try {

    const otherUsers = await User.find({_id:{$ne:req.userId}}).select("-password");

    return res.status(201).json(otherUsers);

  } catch (error) {
    console.log("this is other users error",error)

  }
}
