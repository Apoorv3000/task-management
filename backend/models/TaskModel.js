import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StatusModel",
    },
    due_date: {
      type: Date,
    },

    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
    },
    assignments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CategoryModel",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("TaskModel", TaskSchema);
