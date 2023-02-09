import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

export default mongoose.model("StatusModel", StatusSchema);
