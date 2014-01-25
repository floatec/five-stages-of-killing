var state = require('gamestate');
var constants = require('constants');
var gamejs = require('gamejs');
var Bullet = require('game/bullet').Bullet;
exports.Player = function(position) {

    this.bullets=new Array();
    this.directionX = 0;
    this.directionY = 0;
    this.image = gamejs.image.load(constants.graphics.player);
    this.layers = state.mapDB.getRandomLayers(constants.mapsPerPlayer);
    this.currentLayer = this.layers[0];
    var rect = new gamejs.Rect(position, this.image.getSize());

    this.draw = function(display) {
        display.blit(this.image, rect);
    };
    this.update = function(dt) {

        //Calculate new position
        var amountX =this.directionX * constants.player.speed * dt;
        var newLeft = rect.left + amountX;
        var amountY = this.directionY * constants.player.speed * dt;
        var newTop = rect.top + amountY;

        var newRect = new gamejs.Rect(rect);
        newRect.top = newTop;
        newRect.left = newLeft;
        //Move, if we are still inside the screen afterwards
        if (this.currentLayer.isWalkablePosition(newRect)) {
            rect = newRect;
        }

    };
    this.shot =function (target){

        var start=rect.center;
        var bull=new Bullet(start,target,this.currentLayer);
        this.bullets.push(bull);
    }
};
