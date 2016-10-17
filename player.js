const Ship = require('./ship.js');
const Board = require('./board.js');

function Player(name) {
  this.name = name;
  this.board = new Board(this.name)
  this.ships = this.createShips();
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

module.exports = Player