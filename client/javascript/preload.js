var gamejs = require('gamejs');

var constants = require('constants');

gamejs.preload([
    constants.tmxTileset,
    constants.graphics.player,
    constants.graphics.vignette,
    constants.graphics.splash,
    constants.graphics.outro,
    constants.graphics.intro
]);
