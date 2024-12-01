import mongoose from "mongoose";
import { Comment } from "@/types";

const commentSchema = new mongoose.Schema<Comment>({
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
  entry: { type: String, required: true },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
});

commentSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const commentModel =
  mongoose.models.Comment || mongoose.model<Comment>("Comment", commentSchema);

export default commentModel;
