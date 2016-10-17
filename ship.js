
function Ship(length, type) {
  this.length = length;
  this.name = type;
  this.hit_count = 0;
  this.placed = false;
}

Ship.aircraftCarrier = function() {
  return new Ship(5, "aircraft carrier")
};

Ship.submarine = function() {
  return new Ship(4, "submarine")
};

Ship.battleship = function() {
  return new Ship(3, "battleship")
};

Ship.patrolBoat = function() {
  return new Ship(2, "patrol boat")
};

module.exports = Ship;
