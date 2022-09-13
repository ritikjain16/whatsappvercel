import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  uid1: String,
  uid2: String,
  chatbg: String,
  chatbgref: String,
  messages: Array,
  docid: String,
});

export default mongoose.model("chat", chatSchema);
