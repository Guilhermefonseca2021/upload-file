import { v2 as cloudinary} from 'cloudinary'

const uploadToCloudinary = async (path: string, folder = "my-profile") => {
    try {
      const data = await cloudinary.uploader.upload(path, { folder: folder });
      return { url: data.secure_url, publicId: data.public_id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
 
export default uploadToCloudinary;