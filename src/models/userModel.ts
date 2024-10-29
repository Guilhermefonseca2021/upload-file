import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        }, 
        username: {
            type: String,
            required: true,
        },
        image:{
            publicId:{
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    }, {timestamps: true}
);
const User = mongoose.model("User", postSchema);
export default User;
