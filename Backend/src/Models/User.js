import mongoose from "mongoose";

// Define the schema for users
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // no duplicate usernames
    },
    email: {
      type: String,
      required: true,
      unique: true, // no duplicate emails
    },
    password: {
      type: String,
      required: true, // will be stored in hashed form
    },
  },
  { timestamps: true }
);

// Export the model
const User = mongoose.model("User", userSchema);
export default User;
