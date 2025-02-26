import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },  // Store Clerk ID
  email: { type: String, required: true, unique: true },
  username: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  photo: { type: String, required: false },
  publicMetadata: { type: mongoose.Schema.Types.Mixed },  // Store metadata
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
