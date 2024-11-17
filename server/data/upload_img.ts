"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const uploadImg = async ({ readyImgData }: { readyImgData: string }) => {
  try {
    const data = await cloudinary.uploader.upload(readyImgData);
    return { secure_url: data.secure_url, public_id: data.public_id };
  } catch (error) {
    return { message: "error occuers whilw uplaoding the image" };
  }
};
