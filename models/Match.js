// Match.js
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  team1: String,
  team2: String,
  date: Date,
  scores: [
    {
      player: String,
      jerseyNumber: Number,
      goals: [
        {
          timing: Number,
        },
      ],
      offsides: Number,
      freeKicks: Number,
      penalties: Number,
    },
  ],
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
