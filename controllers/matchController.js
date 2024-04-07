// MatchController.js
const Match = require('../models/Match');

exports.createMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMatchById = async (req, res) => {
  try {
    const id = req.params.id;
    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: "No match found with this ID." });
    }
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMatchById = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMatchById = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    res.json({ message: 'Match deleted successfully', match });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
