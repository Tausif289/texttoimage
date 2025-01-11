import mongoose from "mongoose";
const userschema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      creditBalance: {
        type: Number,
        default: 5,
      },
    }
  );

const usermodel = mongoose.model.user || mongoose.model("user", userschema);
export default usermodel;