import mongoose from "mongoose";
import { EntryDetailed } from "../../types";

const feedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  upvotes: {
    type: Number,
    required: [true, "Upvotes is required"],
  },
  status: {
    type: String,
    required: [true, "Status is required"],
  },
  description: {
    type: String,
    required: [true, "Status is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User is required"],
    ref: "User",
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

feedbackSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const feedbackModel =
  mongoose.models.Feedback ||
  mongoose.model<Omit<EntryDetailed, "commentsLength">>(
    "Feedback",
    feedbackSchema
  );

export default feedbackModel;
