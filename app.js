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
getInput(player1.ships.submarine, "submarine", player1);
getInput(player1.ships.battleship, "battleship", player1);
getInput(player1.ships.patrolBoat, "patrol boat", player1);
console.log("Player2, time to place your ships!");
getInput(player2.ships.aircraftCarrier, "aircraft carrier", player1);
getInput(player2.ships.submarine, "submarine", player1);
getInput(player2.ships.battleship, "battleship", player1);
getInput(player2.ships.patrolBoat, "patrol boat", player1);

function getInput(ship, shipName, player) {
  var letter = shipName[0];
  var pair1 = prompt(`Place your ${shipName}, start position`)
  var pair2 = prompt(`Place your ${shipName}, end position`)
  while (!validCoords(pair1, pair2)) {
    console.log("Invalid coordinates!")
    var pair1 = prompt(`Place your ${shipName}, start position`)
    var pair2 = prompt(`Place your ${shipName}, end position`)
  }
  player.board.placeShip(ship, [pair1, pair2], letter);
}


function validCoords(p1, p2) {
  return (p1[0] != p2[0]) && (p1[1] != p2[1]) 
}

function getAttackCoords() {

}


function switchPlayers() {
  currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
}


function playGame() {
  // if (currentPlayer.lost) {
  //   console.log (`${currentPlayer.name} wins!`);
  // }



  // switchPlayers();
}


function displayBoards() {

}