const Player = require('./player.js');
const Board = require('./board.js');
const readline = require('readline');

var prompt = require('prompt');
 
var player1 = new Player("Player 1");
var player2 = new Player("Player 2");

prompt.start();
console.log("Player1, time to place your ships!");
getInput(player1.ships.aircraftCarrier, "aircraft carrier", player1);
// getInput(player1.ships.submarine, "submarine", player1);
// getInput(player1.ships.battleship, "battleship", player1);
// getInput(player1.ships.patrolBoat, "patrol boat", player1);
// console.log("Player2, time to place your ships!");
// getInput(player2.ships.aircraftCarrier, "aircraft carrier", player1);
// getInput(player2.ships.submarine, "submarine", player1);
// getInput(player2.ships.battleship, "battleship", player1);
// getInput(player2.ships.patrolBoat, "patrol boat", player1);

function getInput(ship, shipName, player) {
  console.log(`Place your ${shipName}`);
  var letter = shipName[0];
  prompt.get(['pair1', 'pair2'], function (err, result) {
    player.board.placeShip(ship, [result.pair1, result.pair2], letter);
  });
}