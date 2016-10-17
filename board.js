
"use strict";

function Board(name) {
  this.cells = this.makeBoard(7,7);
  this.name = name;
}

Board.prototype.makeBoard = function(length) {
  let arr = new Array(length || 0),
      i = length;
    if (arguments.length > 1) {
        let args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = this.makeBoard.apply(this, args);
    }
    return arr;
};

Board.prototype.placeShip = function(ship, coordindates) {
  
};


module.exports = Board;