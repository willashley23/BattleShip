const Ship = require('./ship.js');

function Player(name) {
  this.name = name;
  this.grid = null;
  //this.grid = new Grid(this.name)
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