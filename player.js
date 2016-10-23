const Ship = require('./ship.js');
const Board = require('./board.js');

function Player(name) {
  this.name = name;
  this.board = new Board(this.name);
  this.ships = this.createShips();
  this.lost = this.lost.bind(this);
}

Player.prototype.createShips = function() {
  return (
    {
      aircraftCarrier: Ship.aircraftCarrier(),
      battleship:       Ship.battleship(),
      submarine:        Ship.submarine(),
      patrolBoat:      Ship.patrolBoat()
      
    }
  )
};

Player.prototype.lost = function() {
  var bool = Object.keys(this.ships).every( (ship) => {
    return this.ships[ship].sunk()
  });
  return bool;
};

module.exports = Player