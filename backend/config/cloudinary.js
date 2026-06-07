import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

const uploadOncloudinary = async (filepath) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET,
    });

    const res = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });


    fs.unlinkSync(filepath);

    return res.secure_url;
  } catch (error) {
    console.log("this is cloudianryError", error);
        fs.unlinkSync(filepath);
  }
};


export default uploadOncloudinary;
