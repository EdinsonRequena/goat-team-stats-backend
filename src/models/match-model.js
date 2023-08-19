import mongoose, { Schema } from "mongoose";

const matchSchema = new Schema({
  tournament: {
    type: Schema.Types.ObjectId,
    ref: "Tournament",
  },

  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },

  visitorTeam: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },

  date: { type: Schema.Types.Date },

  goals: {
    home: { type: Schema.Types.Number, default: 0 },
    visitor: { type: Schema.Types.Number, default: 0 },
  },

  yellowCards: {
    home: { type: Schema.Types.Number, default: 0 },
    visitor: { type: Schema.Types.Number, default: 0 },
  },

  redCards: {
    home: { type: Schema.Types.Number, default: 0 },
    visitor: { type: Schema.Types.Number, default: 0 },
  },

  shots: {
    home: { type: Schema.Types.Number, default: 0 },
    visitor: { type: Schema.Types.Number, default: 0 },
  },

  shotsOnGoal: {
    home: { type: Schema.Types.Number, default: 0 },
    visitor: { type: Schema.Types.Number, default: 0 },
  },

  completedPasses: {
    home: { type: Schema.Types.Number, default: 0 },
    visitor: { type: Schema.Types.Number, default: 0 },
  },

  fouls: {
    home: { type: Schema.Types.Number, default: 0 },
    visitor: { type: Schema.Types.Number, default: 0 },
  },

  winner: {
    type: Schema.Types.String,
    ref: "Team",
    default: null, // Puede ser null para indicar empate
  },
});

export default mongoose.model("Match", matchSchema);
