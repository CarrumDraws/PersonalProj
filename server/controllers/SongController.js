const User = require("../models/User.js");
const Song = require("../models/Song.js");

const getSongs = async (req, res) => {
  try {
    // GET /songs?search=“”&language=“”&genre=“”
    const { search, language, genre } = req.query;
    if (!search || !language || !genre)
      return res.status(400).json({ message: "Bad Request" });
    // Search Songs with Filtered Data
    const songs = await Song.find({
      // Note: Search can match title OR artist
      $or: [{ title: search }, { artist: search }],
      language: language,
      genre: genre,
    });

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json(error);
  }
};

// PUT /songs/:songid : user likes a song
// id in body
const toggleLike = async (req, res) => {
  try {
    const { songid } = req.params;
    const { id } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const song = await Song.findById(songid);
    if (!song) return res.status(404).json({ message: "Song not found" });

    user.likes.push(song);
    await user.save();

    res.status(200).json(song);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getSongs,
  toggleLike,
};
