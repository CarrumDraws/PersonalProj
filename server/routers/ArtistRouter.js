const { Router } = require("express");
const artistController = require("../controllers/ArtistController.js");

const artistRouter = Router();

// Follow Artist (userid in body)
artistRouter.put("/:artistid", artistController.followArtist);

module.exports = artistRouter;
