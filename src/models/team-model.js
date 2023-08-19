import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema({
  name: {
    type: Schema.Types.String,
  },

  rif: {
    type: Schema.Types.String,
  },

  coach: {
    type: Schema.Types.ObjectId,
    ref: "Player",
  },

  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

export default mongoose.model("Team", teamSchema);
