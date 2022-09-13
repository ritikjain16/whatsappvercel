import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: String,
  firebaseToken: String,
  image: String,
  imageRef: String,
  name: String,
  status: String,
  themecolor: String,
  uid: String,
  stories: Array,
  expoPushToken: String,
});

export default mongoose.model("user", userSchema);
