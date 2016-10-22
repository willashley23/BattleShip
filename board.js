"use strict";

function Board(name) {
  this.cells = this.makeBoard(7,7);
  this.name = name;
  this.placeShip = this.placeShip.bind(this);
  this.obfuscateBoard = this.obfuscateBoard.bind(this);
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

  // Check if ship extends vertically or horizontally
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

Board.prototype.hit = function(coords, player) {
  let x1 = parseInt(coordindates[0][1])
  let y1 = parseInt(coordindates[0][3])
  let target = this.cells[x1][y1];

  if (!target && target != 'x') {
    console.log("It's a hit!");
    switch (target) {
      case 'a':
        player.ships.aircraftCarrier.hit;
        break;
      case 'b':
        player.ships.battleship.hit;
        break;
      case 's':
        player.ships.submarine.hit;
        break;
      case 'p':
        player.ships.patrolBoat.hit;
        break;
    }
      // Mark cell so we know that part of the ship has been hit.
      this.cells[x1][y1] = 'x';
  } else {
    console.log("Missfire!")
  }
};

Board.prototype.obfuscateBoard = function() {
  deepCopy = JSON.parse(JSON.stringify(this.cells));
  obfuscated = deepCopy.map( row => {
    return row.map( cell => {
      if (cell === 'x') {
        return cell;
      } else {
        return '~'
      }
    });
  });
  return obfuscated;
}

module.exports = Board;