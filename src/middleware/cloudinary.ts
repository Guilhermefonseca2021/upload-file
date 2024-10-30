import { v2 as cloudinary} from 'cloudinary'

const uploadToCloudinary = async (path: string, folder: string) => {
    try {
      const data = await cloudinary.uploader.upload(path, { folder: folder });
      return { url: data.secure_url, publicId: data.public_id };
    } catch (err: any) {
      throw err.message;
    }
  };
 
export default uploadToCloudinary;