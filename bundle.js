/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Player = __webpack_require__(1);

	var p = new Player("Player 1");
	var p2 = new Player("Player 2");
	// console.log(p.name);
	// console.log(p.ships);
	// console.log(p.board.cells)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Ship = __webpack_require__(2);
	const Board = __webpack_require__(3);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	
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
	};

	Ship.prototype.placed = function() {
	  return this.placed;
	};

	Ship.prototype.sunk = function() {
	  if (this.numHits === this.length) {
	    return true;
	  } else {
	    return false;
	  }
	};


	module.exports = Ship;


/***/ },
/* 3 */
/***/ function(module, exports) {

	
	"use strict";

	function Board(name) {
	  this.cells = this.makeBoard(7,7);
	  this.name = name;
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

	Board.prototype.placeShip = function(ship, coordindates) {
	  
	};


	module.exports = Board;

/***/ }
/******/ ]);