import mongoose, { Schema } from "mongoose";

const tournamentSchema = new Schema({
  name: {
    type: Schema.Types.String,
  },

  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  ],

  startDate: {
    type: Schema.Types.Date,
    default: Date.now,
  },

  endDate: {
    type: Schema.Types.Date,
    default: () => {
      const currentDate = new Date();
      const futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + 30);
      return futureDate;
    },
  },
});

export default mongoose.model("Tournament", tournamentSchema);
