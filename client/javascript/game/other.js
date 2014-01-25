var gamejs = require('gamejs');
var state = require('gamestate');
var constants = require('constants');
var graphicsDB = require('graphicsDB');

exports.Other = function(id, position, mood) {
  this.id = id;
  var rect = new gamejs.Rect(position, [24, 24]);
  this.mood = mood;
  this.bullets=new Array();
  this.image = graphicsDB.getPlayerIconForMood(this.mood);

  this.checkHit = function(bullet) {
    if (rect.collideRect(bullet.rect)) {
      state.server.connection.send(JSON.stringify({
        type: "Hit",
        playerId: this.id,
        bulletId: bullet.id
      }));
      bullet.visible = false;
    }
    return true;
  };

  this.draw = function(display) {
    display.blit(this.image, [rect.left - 4, rect.top - 4]);
  };

  this.update = function(data) {
    rect.left = data.position[0];
    rect.top = data.position[1];
    if (data.mood !== this.mood) {
      this.mood = data.mood;
      this.image = gamejs.image.load(constants.graphics.player);
    }
  };
};
