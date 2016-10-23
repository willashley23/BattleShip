# Battleships!

A backend implementation Battleship using JavaScript.

## Setup

You will need to have the `prompt-sync` module for synchronous prompting of user input:

`npm install --save prompt-sync`

Clone the repo, navigate to the directory, and run:

 `node app.js`

 Simple as that! For placing ships, enter coordinates in the form `[x,y]`, for attacking ships, use `[y,x]`

## Design

Battleships uses an object-oriented approach to game design:

### Classes

**Player**        
Has a `name`, `board`, and collection of `ships`. Giving each player a board allows us to abstract the board logic to its own class, and define a set of functions that will work regardless of the state of the current player's board. 

Player has one instance method on its prototype – `lost()` which makes use of ES6's `Array.prototype.every()` function to check if all ships in the collection are sunk.

**Ship**       
Ships have a `name`, `length`, and `numHits`. The ship uses 4 static methods to create instances of itself: 

```
Ship.aircraftCarrier = function() {
  return new Ship(5, "aircraft carrier")
};
```

This allows the `Player` class to have ships like so:


```
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
```
Ships have a `hit()` method, which increments `numHits` and checks its `sunk()` method.

**Board**    
The board manages the placement of ships, checking if an attack hits or misses, and creation of the obfuscated board.

Ships are represented on the board as letters. For example, aircraft carriers are represented by the letter 'a'. The board iterates over its cells and uses a switch statement to handle a successful hit: 

```
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
```

`obfuscateBoard()` is used to display the 'upper' board of the player, which is essentially (for now) a record of successful hits. During a given players turn, they will see their opponents obfuscated board. Board obfuscation is accomplished by making a deep copy of the board and replacing anything other than an 'x' (a hit) with '~'

```
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
```

**app**      
The game driver, app.js, is not actually a class. It is a collection of functions mainly used to set up the game and maintain the rules with validation of coordinates, checking if the game is over, etc. It instantiates two players and then calls `gameSetup()` once for each player followed by `playGame()`

Validation is tricky. There are many ways for a user to give bad input. `validCoords()` stops four behaviors: placing ships diagonally, placing ships out of bounds, placing ships on top of one another, placing ships in a space that is too small or large for the given ship.
