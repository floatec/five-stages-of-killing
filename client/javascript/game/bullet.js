var state = require('gamestate');
var constants = require('constants');
var gamejs = require('gamejs');
var guid = require('util').guid;

exports.Bullet=function(start,target,currentLayer) {
    this.visible=true;
    this.currentLayer=currentLayer;
    this.image = gamejs.image.load(constants.graphics.bullet);
    this.size = this.image.getSize();
    this.directionX=target[0]-start[0];
    this.directionY=target[1]-start[1];
    var scalar=Math.sqrt(this.directionX*this.directionX+this.directionY*this.directionY);
    if(scalar!=0){
        this.directionX/=scalar;
        this.directionY/=scalar;
        this.speed = constants.bullet.speed;
    }else{
        this.speed=0;
    }
    // generate a uuid
    this.id = guid();
    //Spawn
    this.rect = new gamejs.Rect([start[0],start[1]], this.size);
    this.update = function(dt) {
        //Movement
        if(this.directionX!= NaN || this.directionY!=NAN){
            var x = this.directionX * this.speed * dt;
            var y = this.directionY * this.speed * dt;
            var newRect = new gamejs.Rect(this.rect);
            newRect.top = this.rect.top+y;
            newRect.left = this.rect.left+x;
            //Move, if we are still inside the screen afterwards
            if (this.currentLayer.isWalkablePosition(newRect)) {
                this.rect = newRect;
            }else{
                this.visible=false;
            }
        }
    };

    this.draw = function(display) {
        if (this.visible) {
          display.blit(this.image, this.rect);
        }
    };
};