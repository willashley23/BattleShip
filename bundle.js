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

	var p = new Player("will");
	console.log(p.name);
	console.log(p.ships);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Ship = __webpack_require__(2);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	
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


/***/ }
/******/ ]);