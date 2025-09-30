import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
      title: {
          type: String,
          required: true,
      },
      content: {
          type: String,
          required: true,
      },

    },
    { timestamps: true } // to get createdat time and updated at time.
);

const Note = mongoose.model("Note", noteSchema)

export default Note;