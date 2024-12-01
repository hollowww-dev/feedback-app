import mongoose from "mongoose";
import { Reply } from "../../types";
const replySchema = new mongoose.Schema<Reply>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User is required"],
    ref: "User",
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    maxlength: [250, "Maximum length of a comment is 250 characters"],
  },
  replyingTo: { type: String, required: [true, "Replied user is required"] },
  comment: { type: String, required: true },
});

replySchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const replyModel =
  mongoose.models.Reply || mongoose.model<Reply>("Reply", replySchema);

export default replyModel;
