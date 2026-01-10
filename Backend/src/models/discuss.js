const mongoose = require("mongoose");
const { Schema } = mongoose;

const discussSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Discuss  = mongoose.model("discuss", discussSchema);
module.exports = Discuss;
