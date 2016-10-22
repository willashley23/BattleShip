const Player = require('./player.js');
const Board = require('./board.js');
const readline = require('readline');
var prompt = require('prompt-sync') ({
 autocomplete: null,
});
 
var player1 = new Player("Player 1");
var player2 = new Player("Player 2");
var currentPlayer = player1;

console.log("Player1, time to place your ships!");
getInput(player1.ships.aircraftCarrier, "aircraft carrier", player1);
// getInput(player1.ships.submarine, "submarine", player1);
// console.log(player1.board.cells)
// getInput(player1.ships.battleship, "battleship", player1);
// getInput(player1.ships.patrolBoat, "patrol boat", player1);
console.log("Player2, time to place your ships!");
getInput(player2.ships.aircraftCarrier, "aircraft carrier", player2);
// getInput(player2.ships.submarine, "submarine", player2);
// console.log(player2.board.cells)
// getInput(player2.ships.battleship, "battleship", player2);
// getInput(player2.ships.patrolBoat, "patrol boat", player2);

function getInput(ship, shipName, player) {
  var letter = shipName[0];
  var pair1 = prompt(`Place your ${shipName}, start position`)
  var pair2 = prompt(`Place your ${shipName}, end position`)
  while (validCoords(pair1, pair2)) {
    console.log("Invalid coordinates!")
    var pair1 = prompt(`Place your ${shipName}, start position`)
    var pair2 = prompt(`Place your ${shipName}, end position`)
  }
  player.board.placeShip(ship, [pair1, pair2], letter);
}


function validCoords(p1, p2) {
  return (p1[0] != p2[0]) && (p1[1] != p2[1]) 
  // Does it have ~ for water? Is it empty?
  // Is the distance between the non matching coordinates === ship.length? will need to pass in ship as param to check.
}

function getAttackCoords() {

}

function switchPlayers() {
  currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
}

function oppositePlayer() {
  var other = (currentPlayer === player1 ? player2 : player1);
  return other;
}

function playGame() {
  var currentPlayer = player1;
  while (!currentPlayer.lost()) {
    console.log(`${currentPlayer.name}, it's your turn!`)
    console.log("Your opponent's board:")
    console.log(oppositePlayer().board.obfuscateBoard());
    var attackCoords = currentPlayer.getAttackCoords();
    currentPlayer.board.hit(attackCoords, currentPlayer);
    switchPlayers();
  }
  console.log (`${oppositePlayer().name} loses!`)
}

// function displayBoards(player) {

// }

playGame();