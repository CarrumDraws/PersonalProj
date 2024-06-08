const { Router } = require("express");
const songController = require("../controllers/SongController.js");
const jwtValidation = require("../middlewares/AuthMiddleware.js");

const songRouter = Router();

// GET /songs?search=“”&language=“”&genre=“” : display a list of songs that match the search input based on artist name or song title, and filtering based on optional inputs such as language and genre.
songRouter.get("/", jwtValidation, songController.getSongs);

// PUT /songs/:songid : user likes a song
songRouter.put("/:songid", jwtValidation, songController.toggleLike); // Wait but isnt PUT idempotent?

module.exports = songRouter;
