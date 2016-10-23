"use strict";

function Board(name) {
  this.cells = this.makeBoard(7,7);
  this.name = name;
  this.placeShip = this.placeShip.bind(this);
  this.obfuscateBoard = this.obfuscateBoard.bind(this);
  this.setDefault = this.setDefault.bind(this);
  this.setDefault();
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

Board.prototype.placeShip = function(ship, coordindates, shipSym) {
  let x1 = parseInt(coordindates[0][1])
  let y1 = parseInt(coordindates[0][3])
  let y2 = parseInt(coordindates[1][1])
  let x2 = parseInt(coordindates[1][3])

  // Check if ship extends vertically or horizontally.
  if (y1 != y2) {
    let len = Math.abs(y1 - y2);
    
    for (let i = y1; i < len; i++) {
      this.cells[x1][i] = shipSym;
    }
  } else if (x1 != x2) {
    let len = Math.abs(x1 - x2);
    
    for (let i = x1; i < len; i++) {
      this.cells[i][y1] = shipSym;
    }
  } else {
    console.log("cannot place ship")
  }
};

// 5 possible outcomes: hit, miss, repeat hit, sunk, victory.
Board.prototype.hit = function(coordindates, player) {
  let x1 = parseInt(coordindates[1])
  let y1 = parseInt(coordindates[3])
  let target = this.cells[x1][y1];

  if (target != 'x' && target != '~') {
    console.log("It's a hit!");
    switch (target) {
      case 'a':
        player.ships.aircraftCarrier.hit();
        break;
      case 'b':
        player.ships.battleship.hit();
        break;
      case 's':
        player.ships.submarine.hit();
        break;
      case 'p':
        player.ships.patrolBoat.hit();
        break;
    }
      // Mark cell so we know that part of the ship has been hit.
      this.cells[x1][y1] = 'x';
  } else if (target === 'x') {
      console.log("You already attacked that spot!");
  } else {
      console.log("Missfire!");
  }
};

// Fill the board with water tiles.
Board.prototype.setDefault = function() {
  this.cells.forEach( row => {
    row.fill('~');
  });
}

// Display board only showing spots where the player has successfully hit the opponent.
Board.prototype.obfuscateBoard = function() {
  let deepCopy = JSON.parse(JSON.stringify(this.cells));
  deepCopy.forEach( (row, i) => {
    row.forEach( (el, j) => {
      if (el !== 'x' && el !== '~') {
        deepCopy[i][j] = '~';
      } 
    });
  });
  return deepCopy;
}

module.exports = Board;