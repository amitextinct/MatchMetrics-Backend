const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  tournament: String,

  team1: String,
  team1Score: Number,
  team1possesion: Number,
  team1shots: Number,
  team1shotsOnTarget: Number,
  team1fouls: Number,
  team1yellowCards: Number,
  team1redCards: Number,
  team1offsides: Number,  
  team1freeKicks: Number,
  team1penalties: Number,

  team2: String,
  team2Score: Number,
  team2possesion: Number,
  team2shots: Number,
  team2shotsOnTarget: Number,
  team2fouls: Number,
  team2yellowCards: Number,
  team2redCards: Number,
  team2offsides: Number,
  team2freeKicks: Number,
  team2penalties: Number,

  date: Date,
  scores: [
    {
      player: String,
      team: String,
      jerseyNumber: Number,
      goals: [
        {
          timing: Number,
        },
      ],
      
    },
  ],
  comments: [
    {
      userImage: String,
      username: String,
      date: { type: Date, default: Date.now },
      text: String,
    },
  ],
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;