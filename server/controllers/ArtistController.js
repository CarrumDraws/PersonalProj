const Artist = require("../models/Artist.js");
const User = require("../models/User.js");

const followArtist = async (req, res) => {
  try {
    const { artistid } = req.params;
    const { userid } = req.body;

    const artist = await Artist.findOne({ _id: artistid });
    if (!artist) return res.status(404).json({ message: "Artist not found" });
    const user = await User.findById(userid);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.follows.push(artist);
    await user.save();
    res.status(200).json(artist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { followArtist };
