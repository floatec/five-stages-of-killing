var gamejs = require('gamejs');
var GameView = require('game').View;
var game = require('gamestate');

exports.View = function(display) {

    this.onTick = function() {
        display.clear();
        display.blit(
            (new gamejs.font.Font('30px Sans-serif')).render('Five Stages of Killing(tm)')
        );
    };

    this.onEvent = function(event) {
        switch (event.type) {
            case gamejs.event.MOUSE_DOWN:
                game.loadView(GameView);
                break;
        }
    };

    return this;
};