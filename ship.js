function Ship(length, type) {
  this.length = length;
  this.name = type;
  this.numHits = 0;
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

Ship.prototype.hit = function() {
  this.numHits += 1;
  if (this.sunk()) {
    console.log(`You sunk your opponent's ${this.name}!`)
  }
};

Ship.prototype.sunk = function() {
  if (this.numHits === this.length) {
    return true;
  } else {
    return false;
  }
};

module.exports = Ship;