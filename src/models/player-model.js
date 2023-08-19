import mongoose, { Schema } from "mongoose";

const playerSchema = new Schema({
  phoneNumber: {
    type: Schema.Types.Number,
  },

  coach: {
    type: Schema.Types.Boolean,
    default: false,
  },

  ci: {
    type: Schema.Types.Number,
  },

  birthDate: {
    type: Schema.Types.Date,
  },

  firstName: {
    type: Schema.Types.String,
  },

  lastName: {
    type: Schema.Types.String,
  },
});

export default mongoose.model("Player", playerSchema);
