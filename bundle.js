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
	const Board = __webpack_require__(3);
	const readline = __webpack_require__(4);

	var prompt = __webpack_require__(14);
	 
	var player1 = new Player("Player 1");
	var player2 = new Player("Player 2");
	console.log("Player1, time to place your ships!");
	console.log("Player1, time to place your Aircraft Carrier!");
	prompt.start();
	prompt.get(['pair1', 'pair2'], function (err, result) {
	    player1.board.placeShip(player1.ships.aircraftCarrier, [result.pair1, result.pair2]);
	});

	console.log("Player1, time to place your BattleShip!");
	console.log("Player1, time to place your Submarine!");
	console.log("Player1, time to place your Patrol Boat!");



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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    EventEmitter = __webpack_require__(9).EventEmitter,
	    util = __webpack_require__(10);

	var readLine = module.exports = function(file, opts) {
	  if (!(this instanceof readLine)) return new readLine(file, opts);

	  EventEmitter.call(this);
	  opts = opts || {};
	  opts.maxLineLength = opts.maxLineLength || 4096; // 4K
	  opts.retainBuffer = !!opts.retainBuffer; //do not convert to String prior to invoking emit 'line' event
	  var self = this,
	      lineBuffer = new Buffer(opts.maxLineLength),
	      lineLength = 0,
	      lineCount = 0,
	      byteCount = 0,
	      emit = function(lineCount, byteCount) {
	        try {
	          var line = lineBuffer.slice(0, lineLength);
	          self.emit('line', opts.retainBuffer? line : line.toString(), lineCount, byteCount);
	        } catch (err) {
	          self.emit('error', err);
	        } finally {
	          lineLength = 0; // Empty buffer.
	        }
	      };
	  this.input = ('string' === typeof file) ? fs.createReadStream(file, opts) : file;
	  this.input.on('open', function(fd) {
	      self.emit('open', fd);
	    })
	    .on('data', function(data) {
	      for (var i = 0; i < data.length; i++) {
	        if (data[i] == 10 || data[i] == 13) { // Newline char was found.
	          if (data[i] == 10) {
	            lineCount++;
	            emit(lineCount, byteCount);
	          }
	        } else {
	          lineBuffer[lineLength] = data[i]; // Buffer new line data.
	          lineLength++;
	        }
	        byteCount++;
	      }
	    })
	    .on('error', function(err) {
	      self.emit('error', err);
	    })
	    .on('end', function() {
	      // Emit last line if anything left over since EOF won't trigger it.
	      if (lineLength) {
	        lineCount++;
	        emit(lineCount, byteCount);
	      }
	      self.emit('end');
	    })
	    .on('close', function() {
	      self.emit('close');
	    });
	};
	util.inherits(readLine, EventEmitter);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(6)
	var ieee754 = __webpack_require__(7)
	var isArray = __webpack_require__(8)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0
	    this.parent = undefined
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined
	  Buffer.prototype.parent = undefined
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 7 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(12);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(13);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(11)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, process) {/*
	 * prompt.js: Simple prompt for prompting information from the command line
	 *
	 * (C) 2010, Nodejitsu Inc.
	 *
	 */

	var events = __webpack_require__(9),
	    readline = __webpack_require__(4),
	    utile = __webpack_require__(16),
	    async = utile.async,
	    read = __webpack_require__(53),
	    validate = __webpack_require__(72).validate,
	    winston = __webpack_require__(73),
	    colors = __webpack_require__(147);

	//
	// Monkey-punch readline.Interface to work-around
	// https://github.com/joyent/node/issues/3860
	//
	readline.Interface.prototype.setPrompt = function(prompt, length) {
	  this._prompt = prompt;
	  if (length) {
	    this._promptLength = length;
	  } else {
	    var lines = prompt.split(/[\r\n]/);
	    var lastLine = lines[lines.length - 1];
	    this._promptLength = lastLine.replace(/\u001b\[(\d+(;\d+)*)?m/g, '').length;
	  }
	};

	//
	// Expose version using `pkginfo`
	//
	__webpack_require__(160)(module, 'version');

	var stdin, stdout, history = [];
	var prompt = module.exports = Object.create(events.EventEmitter.prototype);
	var logger = prompt.logger = new winston.Logger({
	  transports: [new (winston.transports.Console)()]
	});

	prompt.started    = false;
	prompt.paused     = false;
	prompt.stopped    = true;
	prompt.allowEmpty = false;
	prompt.message    = 'prompt';
	prompt.delimiter  = ': ';
	prompt.colors     = true;

	//
	// Create an empty object for the properties
	// known to `prompt`
	//
	prompt.properties = {};

	//
	// Setup the default winston logger to use
	// the `cli` levels and colors.
	//
	logger.cli();

	//
	// ### function start (options)
	// #### @options {Object} **Optional** Options to consume by prompt
	// Starts the prompt by listening to the appropriate events on `options.stdin`
	// and `options.stdout`. If no streams are supplied, then `process.stdin`
	// and `process.stdout` are used, respectively.
	//
	prompt.start = function (options) {
	  if (prompt.started) {
	    return;
	  }

	  options = options        || {};
	  stdin   = options.stdin  || process.stdin;
	  stdout  = options.stdout || process.stdout;

	  //
	  // By default: Remember the last `10` prompt property /
	  // answer pairs and don't allow empty responses globally.
	  //
	  prompt.memory     = options.memory     || 10;
	  prompt.allowEmpty = options.allowEmpty || false;
	  prompt.message    = options.message    || prompt.message;
	  prompt.delimiter  = options.delimiter  || prompt.delimiter;
	  prompt.colors     = options.colors     || prompt.colors;

	  if (process.platform !== 'win32') {
	    // windows falls apart trying to deal with SIGINT
	    process.on('SIGINT', function () {
	      stdout.write('\n');
	      process.exit(1);
	    });
	  }

	  prompt.emit('start');
	  prompt.started = true;
	  prompt.stopped = false;
	  return prompt;
	};

	//
	// ### function pause ()
	// Pauses input coming in from stdin
	//
	prompt.pause = function () {
	  if (!prompt.started || prompt.stopped || prompt.paused) {
	    return;
	  }

	  stdin.pause();
	  prompt.emit('pause');
	  prompt.paused = true;
	  return prompt;
	};

	//
	// ### function stop ()
	// Stops input coming in from stdin
	//
	prompt.stop = function () {
	    if (prompt.stopped || !prompt.started) {
	        return;
	    }
	    
	    stdin.destroy();
	    prompt.emit('stop');
	    prompt.stopped = true;
	    prompt.started = false;
	    prompt.paused = false;
	    return prompt;
	}

	//
	// ### function resume ()
	// Resumes input coming in from stdin
	//
	prompt.resume = function () {
	  if (!prompt.started || !prompt.paused) {
	    return;
	  }

	  stdin.resume();
	  prompt.emit('resume');
	  prompt.paused = false;
	  return prompt;
	};

	//
	// ### function history (search)
	// #### @search {Number|string} Index or property name to find.
	// Returns the `property:value` pair from within the prompts
	// `history` array.
	//
	prompt.history = function (search) {
	  if (typeof search === 'number') {
	    return history[search] || {};
	  }

	  var names = history.map(function (pair) {
	    return typeof pair.property === 'string'
	      ? pair.property
	      : pair.property.name;
	  });

	  if (!~names.indexOf(search)) {
	    return null;
	  }

	  return history.filter(function (pair) {
	    return typeof pair.property === 'string'
	      ? pair.property === search
	      : pair.property.name === search;
	  })[0];
	};

	//
	// ### function get (schema, callback)
	// #### @schema {Array|Object|string} Set of variables to get input for.
	// #### @callback {function} Continuation to pass control to when complete.
	// Gets input from the user via stdin for the specified message(s) `msg`.
	//
	prompt.get = function (schema, callback) {
	  //
	  // Transforms a full JSON-schema into an array describing path and sub-schemas.
	  // Used for iteration purposes.
	  //
	  function untangle(schema, path) {
	    var results = [];
	    path = path || [];

	    if (schema.properties) {
	      //
	      // Iterate over the properties in the schema and use recursion
	      // to process sub-properties.
	      //
	      Object.keys(schema.properties).forEach(function (key) {
	        var obj = {};
	        obj[key] = schema.properties[key];

	        //
	        // Concat a sub-untangling to the results.
	        //
	        results = results.concat(untangle(obj[key], path.concat(key)));
	      });

	      // Return the results.
	      return results;
	    }

	    //
	    // This is a schema "leaf".
	    //
	    return {
	      path: path,
	      schema: schema
	    };
	  }

	  //
	  // Iterate over the values in the schema, represented as
	  // a legit single-property object subschemas. Accepts `schema`
	  // of the forms:
	  //
	  //    'prop-name'
	  //
	  //    ['string-name', { path: ['or-well-formed-subschema'], properties: ... }]
	  //
	  //    { path: ['or-well-formed-subschema'], properties: ... ] }
	  //
	  //    { properties: { 'schema-with-no-path' } }
	  //
	  // And transforms them all into
	  //
	  //    { path: ['path', 'to', 'property'], properties: { path: { to: ...} } }
	  //
	  function iterate(schema, get, done) {
	    var iterator = [],
	        result = {};

	    if (typeof schema === 'string') {
	      //
	      // We can iterate over a single string.
	      //
	      iterator.push({
	        path: [schema],
	        schema: prompt.properties[schema.toLowerCase()] || {}
	      });
	    }
	    else if (Array.isArray(schema)) {
	      //
	      // An array of strings and/or single-prop schema and/or no-prop schema.
	      //
	      iterator = schema.map(function (element) {
	        if (typeof element === 'string') {
	          return {
	            path: [element],
	            schema: prompt.properties[element.toLowerCase()] || {}
	          };
	        }
	        else if (element.properties) {
	          return {
	            path: [Object.keys(element.properties)[0]],
	            schema: element.properties[Object.keys(element.properties)[0]]
	          };
	        }
	        else if (element.path && element.schema) {
	          return element;
	        }
	        else {
	          return {
	            path: [element.name || 'question'],
	            schema: element
	          };
	        }
	      });
	    }
	    else if (schema.properties) {
	      //
	      // Or a complete schema `untangle` it for use.
	      //
	      iterator = untangle(schema);
	    }
	    else {
	      //
	      // Or a partial schema and path.
	      // TODO: Evaluate need for this option.
	      //
	      iterator = [{
	        schema: schema.schema ? schema.schema : schema,
	        path: schema.path || [schema.name || 'question']
	      }];
	    }

	    //
	    // Now, iterate and assemble the result.
	    //
	    async.forEachSeries(iterator, function (branch, next) {
	      get(branch, function assembler(err, line) {
	        if (err) {
	          return next(err);
	        }

	        function build(path, line) {
	          var obj = {};
	          if (path.length) {
	            obj[path[0]] = build(path.slice(1), line);
	            return obj;
	          }

	          return line;
	        }

	        function attach(obj, attr) {
	          var keys;
	          if (typeof attr !== 'object' || attr instanceof Array) {
	            return attr;
	          }

	          keys = Object.keys(attr);
	          if (keys.length) {
	            if (!obj[keys[0]]) {
	              obj[keys[0]] = {};
	            }
	            obj[keys[0]] = attach(obj[keys[0]], attr[keys[0]]);
	          }

	          return obj;
	        }

	        result = attach(result, build(branch.path, line));
	        next();
	      });
	    }, function (err) {
	      return err ? done(err) : done(null, result);
	    });
	  }

	  iterate(schema, function get(target, next) {
	    prompt.getInput(target, function (err, line) {
	      return err ? next(err) : next(null, line);
	    });
	  }, callback);

	  return prompt;
	};

	//
	// ### function confirm (msg, callback)
	// #### @msg {Array|Object|string} set of message to confirm
	// #### @callback {function} Continuation to pass control to when complete.
	// Confirms a single or series of messages by prompting the user for a Y/N response.
	// Returns `true` if ALL messages are answered in the affirmative, otherwise `false`
	//
	// `msg` can be a string, or object (or array of strings/objects).
	// An object may have the following properties:
	//
	//    {
	//      description: 'yes/no' // message to prompt user
	//      pattern: /^[yntf]{1}/i // optional - regex defining acceptable responses
	//      yes: /^[yt]{1}/i // optional - regex defining `affirmative` responses
	//      message: 'yes/no' // optional - message to display for invalid responses
	//    }
	//
	prompt.confirm = function (/* msg, options, callback */) {
	  var args     = Array.prototype.slice.call(arguments),
	      msg      = args.shift(),
	      callback = args.pop(),
	      opts     = args.shift(),
	      vars     = !Array.isArray(msg) ? [msg] : msg,
	      RX_Y     = /^[yt]{1}/i,
	      RX_YN    = /^[yntf]{1}/i;

	  function confirm(target, next) {
	    var yes = target.yes || RX_Y,
	      options = utile.mixin({
	        description: typeof target === 'string' ? target : target.description||'yes/no',
	        pattern: target.pattern || RX_YN,
	        name: 'confirm',
	        message: target.message || 'yes/no'
	      }, opts || {});


	    prompt.get([options], function (err, result) {
	      next(err ? false : yes.test(result[options.name]));
	    });
	  }

	  async.rejectSeries(vars, confirm, function(result) {
	    callback(null, result.length===0);
	  });
	};


	// Variables needed outside of getInput for multiline arrays.
	var tmp = [];


	// ### function getInput (prop, callback)
	// #### @prop {Object|string} Variable to get input for.
	// #### @callback {function} Continuation to pass control to when complete.
	// Gets input from the user via stdin for the specified message `msg`.
	//
	prompt.getInput = function (prop, callback) {
	  var schema = prop.schema || prop,
	      propName = prop.path && prop.path.join(':') || prop,
	      storedSchema = prompt.properties[propName.toLowerCase()],
	      delim = prompt.delimiter,
	      defaultLine,
	      against,
	      hidden,
	      length,
	      valid,
	      name,
	      raw,
	      msg;

	  //
	  // If there is a stored schema for `propName` in `propmpt.properties`
	  // then use it.
	  //
	  if (schema instanceof Object && !Object.keys(schema).length &&
	    typeof storedSchema !== 'undefined') {
	    schema = storedSchema;
	  }

	  //
	  // Build a proper validation schema if we just have a string
	  // and no `storedSchema`.
	  //
	  if (typeof prop === 'string' && !storedSchema) {
	    schema = {};
	  }

	  schema = convert(schema);
	  defaultLine = schema.default;
	  name = prop.description || schema.description || propName;
	  raw = prompt.colors
	    ? [colors.grey(name), colors.grey(delim)]
	    : [name, delim];

	  if (prompt.message)
	    raw.unshift(prompt.message, delim);

	  prop = {
	    schema: schema,
	    path: propName.split(':')
	  };

	  //
	  // If the schema has no `properties` value then set
	  // it to an object containing the current schema
	  // for `propName`.
	  //
	  if (!schema.properties) {
	    schema = (function () {
	      var obj = { properties: {} };
	      obj.properties[propName] = schema;
	      return obj;
	    })();
	  }

	  //
	  // Handle overrides here.
	  // TODO: Make overrides nestable
	  //
	  if (prompt.override && prompt.override[propName]) {
	    if (prompt._performValidation(name, prop, prompt.override, schema, -1, callback)) {
	      return callback(null, prompt.override[propName]);
	    }

	    delete prompt.override[propName];
	  }

	  //
	  // Check if we should skip this prompt
	  //
	  if (typeof prop.schema.ask === 'function' &&
	    !prop.schema.ask()) {
	    return callback(null, prop.schema.default || '');
	  }

	  var type = (schema.properties && schema.properties[propName] &&
	              schema.properties[propName].type || '').toLowerCase().trim(),
	      wait = type === 'array';

	  if (type === 'array') {
	    length = prop.schema.maxItems;
	    if (length) {
	      msg = (tmp.length + 1).toString() + '/' + length.toString();
	    }
	    else {
	      msg = (tmp.length + 1).toString();
	    }
	    msg += delim;
	    raw.push(prompt.colors ? msg.grey : msg);
	  }

	  //
	  // Calculate the raw length and colorize the prompt
	  //
	  length = raw.join('').length;
	  raw[0] = raw[0];
	  msg = raw.join('');

	  if (schema.help) {
	    schema.help.forEach(function (line) {
	      logger.help(line);
	    });
	  }

	  //
	  // Emit a "prompting" event
	  //
	  prompt.emit('prompt', prop);

	  //
	  // If there is no default line, set it to an empty string
	  //
	  if(typeof defaultLine === 'undefined') {
	    defaultLine = '';
	  }

	  //
	  // set to string for readline ( will not accept Numbers )
	  //
	  defaultLine = defaultLine.toString();

	  //
	  // Make the actual read
	  //
	  read({
	    prompt: msg,
	    silent: prop.schema && prop.schema.hidden,
	    replace: prop.schema && prop.schema.replace,
	    default: defaultLine,
	    input: stdin,
	    output: stdout
	  }, function (err, line) {
	    if (err && wait === false) {
	      return callback(err);
	    }

	    var against = {},
	        numericInput,
	        isValid;

	    if (line !== '') {

	      if (schema.properties[propName]) {
	        var type = (schema.properties[propName].type || '').toLowerCase().trim() || undefined;

	        //
	        // If type is some sort of numeric create a Number object to pass to revalidator
	        //
	        if (type === 'number' || type === 'integer') {
	          line = Number(line);
	        }

	        //
	        // Attempt to parse input as a boolean if the schema expects a boolean
	        //
	        if (type == 'boolean') {
	          if(line.toLowerCase() === "true" || line.toLowerCase() === 't') {
	            line = true;
	          } else if(line.toLowerCase() === "false" || line.toLowerCase() === 'f') {
	            line = false;
	          }
	        }

	        //
	        // If the type is an array, wait for the end. Fixes #54
	        //
	        if (type == 'array') {
	          var length = prop.schema.maxItems;
	          if (err) {
	            if (err.message == 'canceled') {
	              wait = false;
	              stdout.write('\n');
	            }
	          }
	          else {
	            if (length) {
	              if (tmp.length + 1 < length) {
	                isValid = false;
	                wait = true;
	              }
	              else {
	                isValid = true;
	                wait = false;
	              }
	            }
	            else {
	              isValid = false;
	              wait = true;
	            }
	            tmp.push(line);
	          }
	          line = tmp;
	        }
	      }

	      against[propName] = line;
	    }

	    if (prop && prop.schema.before) {
	      line = prop.schema.before(line);
	    }

	    // Validate
	    if (isValid === undefined) isValid = prompt._performValidation(name, prop, against, schema, line, callback);

	    if (!isValid) {
	      return prompt.getInput(prop, callback);
	    }

	    //
	    // Log the resulting line, append this `property:value`
	    // pair to the history for `prompt` and respond to
	    // the callback.
	    //
	    logger.input(line.yellow);
	    prompt._remember(propName, line);
	    callback(null, line);

	    // Make sure `tmp` is emptied
	    tmp = [];
	  });
	};

	//
	// ### function performValidation (name, prop, against, schema, line, callback)
	// #### @name {Object} Variable name
	// #### @prop {Object|string} Variable to get input for.
	// #### @against {Object} Input
	// #### @schema {Object} Validation schema
	// #### @line {String|Boolean} Input line
	// #### @callback {function} Continuation to pass control to when complete.
	// Perfoms user input validation, print errors if needed and returns value according to validation
	//
	prompt._performValidation = function (name, prop, against, schema, line, callback) {
	  var numericInput, valid, msg;
	  try {
	    valid = validate(against, schema);
	  }
	  catch (err) {
	    return (line !== -1) ? callback(err) : false;
	  }

	  if (!valid.valid) {
	    if (prop.schema.message) {
	      logger.error(prop.schema.message);
	    } else {
	      msg = line !== -1 ? 'Invalid input for ' : 'Invalid command-line input for ';

	      if (prompt.colors) {
	        logger.error(msg + name.grey);
	      }
	      else {
	        logger.error(msg + name);
	      }
	    }

	    prompt.emit('invalid', prop, line);
	  }

	  return valid.valid;
	};

	//
	// ### function addProperties (obj, properties, callback)
	// #### @obj {Object} Object to add properties to
	// #### @properties {Array} List of properties to get values for
	// #### @callback {function} Continuation to pass control to when complete.
	// Prompts the user for values each of the `properties` if `obj` does not already
	// have a value for the property. Responds with the modified object.
	//
	prompt.addProperties = function (obj, properties, callback) {
	  properties = properties.filter(function (prop) {
	    return typeof obj[prop] === 'undefined';
	  });

	  if (properties.length === 0) {
	    return callback(obj);
	  }

	  prompt.get(properties, function (err, results) {
	    if (err) {
	      return callback(err);
	    }
	    else if (!results) {
	      return callback(null, obj);
	    }

	    function putNested (obj, path, value) {
	      var last = obj, key;

	      while (path.length > 1) {
	        key = path.shift();
	        if (!last[key]) {
	          last[key] = {};
	        }

	        last = last[key];
	      }

	      last[path.shift()] = value;
	    }

	    Object.keys(results).forEach(function (key) {
	      putNested(obj, key.split('.'), results[key]);
	    });

	    callback(null, obj);
	  });

	  return prompt;
	};

	//
	// ### @private function _remember (property, value)
	// #### @property {Object|string} Property that the value is in response to.
	// #### @value {string} User input captured by `prompt`.
	// Prepends the `property:value` pair into the private `history` Array
	// for `prompt` so that it can be accessed later.
	//
	prompt._remember = function (property, value) {
	  history.unshift({
	    property: property,
	    value: value
	  });

	  //
	  // If the length of the `history` Array
	  // has exceeded the specified length to remember,
	  // `prompt.memory`, truncate it.
	  //
	  if (history.length > prompt.memory) {
	    history.splice(prompt.memory, history.length - prompt.memory);
	  }
	};

	//
	// ### @private function convert (schema)
	// #### @schema {Object} Schema for a property
	// Converts the schema into new format if it is in old format
	//
	function convert(schema) {
	  var newProps = Object.keys(validate.messages),
	      newSchema = false,
	      key;

	  newProps = newProps.concat(['description', 'dependencies']);

	  for (key in schema) {
	    if (newProps.indexOf(key) > 0) {
	      newSchema = true;
	      break;
	    }
	  }

	  if (!newSchema || schema.validator || schema.warning || typeof schema.empty !== 'undefined') {
	    schema.description = schema.message;
	    schema.message = schema.warning;

	    if (typeof schema.validator === 'function') {
	      schema.conform = schema.validator;
	    } else {
	      schema.pattern = schema.validator;
	    }

	    if (typeof schema.empty !== 'undefined') {
	      schema.required = !(schema.empty);
	    }

	    delete schema.warning;
	    delete schema.validator;
	    delete schema.empty;
	  }

	  return schema;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module), __webpack_require__(11)))

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * index.js: Top-level include for the `utile` module.
	 *
	 * (C) 2011, Charlie Robbins & the Contributors
	 * MIT LICENSE
	 *
	 */

	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    path = __webpack_require__(17),
	    util = __webpack_require__(10);

	var utile = module.exports;

	//
	// Extend the `utile` object with all methods from the
	// core node `util` methods.
	//
	Object.keys(util).forEach(function (key) {
	  utile[key] = util[key];
	});

	Object.defineProperties(utile, {

	  //
	  // ### function async
	  // Simple wrapper to `require('async')`.
	  //
	  'async': {
	    get: function() {
	      return utile.async = __webpack_require__(18);
	    }
	  },

	  //
	  // ### function inflect
	  // Simple wrapper to `require('i')`.
	  //
	  'inflect': {
	    get: function() {
	      return utile.inflect = __webpack_require__(20)();
	    }
	  },

	  //
	  // ### function mkdirp
	  // Simple wrapper to `require('mkdirp')`
	  //
	  'mkdirp': {
	    get: function() {
	      return utile.mkdirp = __webpack_require__(26);
	    }
	  },

	  //
	  // ### function deepEqual
	  // Simple wrapper to `require('deep-equal')`
	  // Remark: deepEqual is 4x faster then using assert.deepEqual
	  //         see: https://gist.github.com/2790507
	  //
	  'deepEqual': {
	    get: function() {
	      return utile.deepEqual = __webpack_require__(27);
	    }
	  },

	  //
	  // ### function rimraf
	  // Simple wrapper to `require('rimraf')`
	  //
	  'rimraf': {
	    get: function() {
	      return utile.rimraf = __webpack_require__(30);
	    }
	  },

	  //
	  // ### function cpr
	  // Simple wrapper to `require('ncp').ncp`
	  //
	  'cpr': {
	    get: function() {
	      return utile.cpr = __webpack_require__(47).ncp;
	    }
	  },

	  //
	  // ### @file {Object}
	  // Lazy-loaded `file` module
	  //
	  'file': {
	    get: function() {
	      return utile.file = __webpack_require__(48);
	    }
	  },

	  //
	  // ### @args {Object}
	  // Lazy-loaded `args` module
	  //
	  'args': {
	    get: function() {
	      return utile.args = __webpack_require__(49);
	    }
	  },

	  //
	  // ### @base64 {Object}
	  // Lazy-loaded `base64` object
	  //
	  'base64': {
	    get: function() {
	      return utile.base64 = __webpack_require__(50);
	    }
	  },

	  //
	  // ### @format {Object}
	  // Lazy-loaded `format` object
	  //
	  'format': {
	    get: function() {
	      return utile.format = __webpack_require__(51);
	    }
	  }

	});


	//
	// ### function rargs(_args)
	// #### _args {Arguments} Original function arguments
	//
	// Top-level method will accept a javascript "arguments" object
	// (the actual keyword "arguments" inside any scope) and return
	// back an Array.
	//
	utile.rargs = function (_args, slice) {
	  if (!slice) {
	    slice = 0;
	  }

	  var len = (_args || []).length,
	      args = new Array(len - slice),
	      i;

	  //
	  // Convert the raw `_args` to a proper Array.
	  //
	  for (i = slice; i < len; i++) {
	    args[i - slice] = _args[i];
	  }

	  return args;
	};

	//
	// ### function each (obj, iterator)
	// #### @obj {Object} Object to iterate over
	// #### @iterator {function} Continuation to use on each key. `function (value, key, object)`
	// Iterate over the keys of an object.
	//
	utile.each = function (obj, iterator) {
	  Object.keys(obj).forEach(function (key) {
	    iterator(obj[key], key, obj);
	  });
	};

	//
	// ### function find (o)
	//
	//
	utile.find = function (obj, pred) {
	  var value, key;

	  for (key in obj) {
	    value = obj[key];
	    if (pred(value, key)) {
	      return value;
	    }
	  }
	};

	//
	// ### function pad (str, len, chr)
	// ### @str {String} String to pad
	// ### @len {Number} Number of chars to pad str with
	// ### @chr {String} Optional replacement character, defaults to empty space
	// Appends chr to str until it reaches a length of len
	//
	utile.pad = function pad(str, len, chr) {
	  var s;
	  if (!chr) {
	    chr = ' ';
	  }
	  str = str || '';
	  s = str;
	  if (str.length < len) {
	    for (var i = 0; i < (len - str.length); i++) {
	      s += chr;
	    }
	  }
	  return s;
	}

	//
	// ### function path (obj, path, value)
	// ### @obj {Object} Object to insert value into
	// ### @path {Array} List of nested keys to insert value at
	// Retreives a value from given Object, `obj`, located at the
	// nested keys, `path`.
	//
	utile.path = function (obj, path) {
	  var key, i;

	  for (i in path) {
	    if (typeof obj === 'undefined') {
	      return undefined;
	    }

	    key = path[i];
	    obj = obj[key];
	  }

	  return obj;
	};

	//
	// ### function createPath (obj, path, value)
	// ### @obj {Object} Object to insert value into
	// ### @path {Array} List of nested keys to insert value at
	// ### @value {*} Value to insert into the object.
	// Inserts the `value` into the given Object, `obj`, creating
	// any keys in `path` along the way if necessary.
	//
	utile.createPath = function (obj, path, value) {
	  var key, i;

	  for (i in path) {
	    key = path[i];
	    if (!obj[key]) {
	      obj[key] = ((+i + 1 === path.length) ? value : {});
	    }

	    obj = obj[key];
	  }
	};

	//
	// ### function mixin (target [source0, source1, ...])
	// Copies enumerable properties from `source0 ... sourceN`
	// onto `target` and returns the resulting object.
	//
	utile.mixin = function (target) {
	  utile.rargs(arguments, 1).forEach(function (o) {
	    Object.getOwnPropertyNames(o).forEach(function(attr) {
	      var getter = Object.getOwnPropertyDescriptor(o, attr).get,
	          setter = Object.getOwnPropertyDescriptor(o, attr).set;

	      if (!getter && !setter) {
	        target[attr] = o[attr];
	      }
	      else {
	        Object.defineProperty(target, attr, {
	          get: getter,
	          set: setter
	        });
	      }
	    });
	  });

	  return target;
	};


	//
	// ### function capitalize (str)
	// #### @str {string} String to capitalize
	// Capitalizes the specified `str`.
	//
	utile.capitalize = utile.inflect.camelize;

	//
	// ### function escapeRegExp (str)
	// #### @str {string} String to be escaped
	// Escape string for use in Javascript regex
	//
	utile.escapeRegExp = function (str) {
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	};

	//
	// ### function randomString (length)
	// #### @length {integer} The number of bits for the random base64 string returned to contain
	// randomString returns a pseude-random ASCII string (subset)
	// the return value is a string of length ⌈bits/6⌉ of characters
	// from the base64 alphabet.
	//
	utile.randomString = function (length) {
	  var chars, rand, i, ret, mod, bits;

	  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
	  ret = '';
	  // standard 4
	  mod = 4;
	  // default is 16
	  bits = length * mod || 64;

	  // in v8, Math.random() yields 32 pseudo-random bits (in spidermonkey it gives 53)
	  while (bits > 0) {
	    // 32-bit integer
	    rand = Math.floor(Math.random() * 0x100000000);
	    //we use the top bits
	    for (i = 26; i > 0 && bits > 0; i -= mod, bits -= mod) {
	      ret += chars[0x3F & rand >>> i];
	    }
	  }

	  return ret;
	};

	//
	// ### function filter (object, test)
	// #### @obj {Object} Object to iterate over
	// #### @pred {function} Predicate applied to each property. `function (value, key, object)`
	// Returns an object with properties from `obj` which satisfy
	// the predicate `pred`
	//
	utile.filter = function (obj, pred) {
	  var copy;
	  if (Array.isArray(obj)) {
	    copy = [];
	    utile.each(obj, function (val, key) {
	      if (pred(val, key, obj)) {
	        copy.push(val);
	      }
	    });
	  }
	  else {
	    copy = {};
	    utile.each(obj, function (val, key) {
	      if (pred(val, key, obj)) {
	        copy[key] = val;
	      }
	    });
	  }
	  return copy;
	};

	//
	// ### function requireDir (directory)
	// #### @directory {string} Directory to require
	// Requires all files and directories from `directory`, returning an object
	// with keys being filenames (without trailing `.js`) and respective values
	// being return values of `require(filename)`.
	//
	utile.requireDir = function (directory) {
	  var result = {},
	      files = fs.readdirSync(directory);

	  files.forEach(function (file) {
	    if (file.substr(-3) === '.js') {
	      file = file.substr(0, file.length - 3);
	    }
	    result[file] = __webpack_require__(52)(path.resolve(directory, file));
	  });
	  return result;
	};

	//
	// ### function requireDirLazy (directory)
	// #### @directory {string} Directory to require
	// Lazily requires all files and directories from `directory`, returning an
	// object with keys being filenames (without trailing `.js`) and respective
	// values (getters) being return values of `require(filename)`.
	//
	utile.requireDirLazy = function (directory) {
	  var result = {},
	      files = fs.readdirSync(directory);

	  files.forEach(function (file) {
	    if (file.substr(-3) === '.js') {
	      file = file.substr(0, file.length - 3);
	    }
	    Object.defineProperty(result, file, {
	      get: function() {
	        return result[file] = __webpack_require__(52)(path.resolve(directory, file));
	      }
	    });
	  });

	  return result;
	};

	//
	// ### function clone (object, filter)
	// #### @object {Object} Object to clone
	// #### @filter {Function} Filter to be used
	// Shallow clones the specified object.
	//
	utile.clone = function (object, filter) {
	  return Object.keys(object).reduce(filter ? function (obj, k) {
	    if (filter(k)) obj[k] = object[k];
	    return obj;
	  } : function (obj, k) {
	    obj[k] = object[k];
	    return obj;
	  }, {});
	};

	//
	// ### function camelToUnderscore (obj)
	// #### @obj {Object} Object to convert keys on.
	// Converts all keys of the type `keyName` to `key_name` on the
	// specified `obj`.
	//
	utile.camelToUnderscore = function (obj) {
	  if (typeof obj !== 'object' || obj === null) {
	    return obj;
	  }

	  if (Array.isArray(obj)) {
	    obj.forEach(utile.camelToUnderscore);
	    return obj;
	  }

	  Object.keys(obj).forEach(function (key) {
	    var k = utile.inflect.underscore(key);
	    if (k !== key) {
	      obj[k] = obj[key];
	      delete obj[key];
	      key = k;
	    }
	    utile.camelToUnderscore(obj[key]);
	  });

	  return obj;
	};

	//
	// ### function underscoreToCamel (obj)
	// #### @obj {Object} Object to convert keys on.
	// Converts all keys of the type `key_name` to `keyName` on the
	// specified `obj`.
	//
	utile.underscoreToCamel = function (obj) {
	  if (typeof obj !== 'object' || obj === null) {
	    return obj;
	  }

	  if (Array.isArray(obj)) {
	    obj.forEach(utile.underscoreToCamel);
	    return obj;
	  }

	  Object.keys(obj).forEach(function (key) {
	    var k = utile.inflect.camelize(key, false);
	    if (k !== key) {
	      obj[k] = obj[key];
	      delete obj[key];
	      key = k;
	    }
	    utile.underscoreToCamel(obj[key]);
	  });

	  return obj;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, setImmediate) {/*!
	 * async
	 * https://github.com/caolan/async
	 *
	 * Copyright 2010-2014 Caolan McMahon
	 * Released under the MIT license
	 */
	/*jshint onevar: false, indent:4 */
	/*global setImmediate: false, setTimeout: false, console: false */
	(function () {

	    var async = {};

	    // global on the server, window in the browser
	    var root, previous_async;

	    root = this;
	    if (root != null) {
	      previous_async = root.async;
	    }

	    async.noConflict = function () {
	        root.async = previous_async;
	        return async;
	    };

	    function only_once(fn) {
	        var called = false;
	        return function() {
	            if (called) throw new Error("Callback was already called.");
	            called = true;
	            fn.apply(root, arguments);
	        }
	    }

	    //// cross-browser compatiblity functions ////

	    var _toString = Object.prototype.toString;

	    var _isArray = Array.isArray || function (obj) {
	        return _toString.call(obj) === '[object Array]';
	    };

	    var _each = function (arr, iterator) {
	        for (var i = 0; i < arr.length; i += 1) {
	            iterator(arr[i], i, arr);
	        }
	    };

	    var _map = function (arr, iterator) {
	        if (arr.map) {
	            return arr.map(iterator);
	        }
	        var results = [];
	        _each(arr, function (x, i, a) {
	            results.push(iterator(x, i, a));
	        });
	        return results;
	    };

	    var _reduce = function (arr, iterator, memo) {
	        if (arr.reduce) {
	            return arr.reduce(iterator, memo);
	        }
	        _each(arr, function (x, i, a) {
	            memo = iterator(memo, x, i, a);
	        });
	        return memo;
	    };

	    var _keys = function (obj) {
	        if (Object.keys) {
	            return Object.keys(obj);
	        }
	        var keys = [];
	        for (var k in obj) {
	            if (obj.hasOwnProperty(k)) {
	                keys.push(k);
	            }
	        }
	        return keys;
	    };

	    //// exported async module functions ////

	    //// nextTick implementation with browser-compatible fallback ////
	    if (typeof process === 'undefined' || !(process.nextTick)) {
	        if (typeof setImmediate === 'function') {
	            async.nextTick = function (fn) {
	                // not a direct alias for IE10 compatibility
	                setImmediate(fn);
	            };
	            async.setImmediate = async.nextTick;
	        }
	        else {
	            async.nextTick = function (fn) {
	                setTimeout(fn, 0);
	            };
	            async.setImmediate = async.nextTick;
	        }
	    }
	    else {
	        async.nextTick = process.nextTick;
	        if (typeof setImmediate !== 'undefined') {
	            async.setImmediate = function (fn) {
	              // not a direct alias for IE10 compatibility
	              setImmediate(fn);
	            };
	        }
	        else {
	            async.setImmediate = async.nextTick;
	        }
	    }

	    async.each = function (arr, iterator, callback) {
	        callback = callback || function () {};
	        if (!arr.length) {
	            return callback();
	        }
	        var completed = 0;
	        _each(arr, function (x) {
	            iterator(x, only_once(done) );
	        });
	        function done(err) {
	          if (err) {
	              callback(err);
	              callback = function () {};
	          }
	          else {
	              completed += 1;
	              if (completed >= arr.length) {
	                  callback();
	              }
	          }
	        }
	    };
	    async.forEach = async.each;

	    async.eachSeries = function (arr, iterator, callback) {
	        callback = callback || function () {};
	        if (!arr.length) {
	            return callback();
	        }
	        var completed = 0;
	        var iterate = function () {
	            iterator(arr[completed], function (err) {
	                if (err) {
	                    callback(err);
	                    callback = function () {};
	                }
	                else {
	                    completed += 1;
	                    if (completed >= arr.length) {
	                        callback();
	                    }
	                    else {
	                        iterate();
	                    }
	                }
	            });
	        };
	        iterate();
	    };
	    async.forEachSeries = async.eachSeries;

	    async.eachLimit = function (arr, limit, iterator, callback) {
	        var fn = _eachLimit(limit);
	        fn.apply(null, [arr, iterator, callback]);
	    };
	    async.forEachLimit = async.eachLimit;

	    var _eachLimit = function (limit) {

	        return function (arr, iterator, callback) {
	            callback = callback || function () {};
	            if (!arr.length || limit <= 0) {
	                return callback();
	            }
	            var completed = 0;
	            var started = 0;
	            var running = 0;

	            (function replenish () {
	                if (completed >= arr.length) {
	                    return callback();
	                }

	                while (running < limit && started < arr.length) {
	                    started += 1;
	                    running += 1;
	                    iterator(arr[started - 1], function (err) {
	                        if (err) {
	                            callback(err);
	                            callback = function () {};
	                        }
	                        else {
	                            completed += 1;
	                            running -= 1;
	                            if (completed >= arr.length) {
	                                callback();
	                            }
	                            else {
	                                replenish();
	                            }
	                        }
	                    });
	                }
	            })();
	        };
	    };


	    var doParallel = function (fn) {
	        return function () {
	            var args = Array.prototype.slice.call(arguments);
	            return fn.apply(null, [async.each].concat(args));
	        };
	    };
	    var doParallelLimit = function(limit, fn) {
	        return function () {
	            var args = Array.prototype.slice.call(arguments);
	            return fn.apply(null, [_eachLimit(limit)].concat(args));
	        };
	    };
	    var doSeries = function (fn) {
	        return function () {
	            var args = Array.prototype.slice.call(arguments);
	            return fn.apply(null, [async.eachSeries].concat(args));
	        };
	    };


	    var _asyncMap = function (eachfn, arr, iterator, callback) {
	        arr = _map(arr, function (x, i) {
	            return {index: i, value: x};
	        });
	        if (!callback) {
	            eachfn(arr, function (x, callback) {
	                iterator(x.value, function (err) {
	                    callback(err);
	                });
	            });
	        } else {
	            var results = [];
	            eachfn(arr, function (x, callback) {
	                iterator(x.value, function (err, v) {
	                    results[x.index] = v;
	                    callback(err);
	                });
	            }, function (err) {
	                callback(err, results);
	            });
	        }
	    };
	    async.map = doParallel(_asyncMap);
	    async.mapSeries = doSeries(_asyncMap);
	    async.mapLimit = function (arr, limit, iterator, callback) {
	        return _mapLimit(limit)(arr, iterator, callback);
	    };

	    var _mapLimit = function(limit) {
	        return doParallelLimit(limit, _asyncMap);
	    };

	    // reduce only has a series version, as doing reduce in parallel won't
	    // work in many situations.
	    async.reduce = function (arr, memo, iterator, callback) {
	        async.eachSeries(arr, function (x, callback) {
	            iterator(memo, x, function (err, v) {
	                memo = v;
	                callback(err);
	            });
	        }, function (err) {
	            callback(err, memo);
	        });
	    };
	    // inject alias
	    async.inject = async.reduce;
	    // foldl alias
	    async.foldl = async.reduce;

	    async.reduceRight = function (arr, memo, iterator, callback) {
	        var reversed = _map(arr, function (x) {
	            return x;
	        }).reverse();
	        async.reduce(reversed, memo, iterator, callback);
	    };
	    // foldr alias
	    async.foldr = async.reduceRight;

	    var _filter = function (eachfn, arr, iterator, callback) {
	        var results = [];
	        arr = _map(arr, function (x, i) {
	            return {index: i, value: x};
	        });
	        eachfn(arr, function (x, callback) {
	            iterator(x.value, function (v) {
	                if (v) {
	                    results.push(x);
	                }
	                callback();
	            });
	        }, function (err) {
	            callback(_map(results.sort(function (a, b) {
	                return a.index - b.index;
	            }), function (x) {
	                return x.value;
	            }));
	        });
	    };
	    async.filter = doParallel(_filter);
	    async.filterSeries = doSeries(_filter);
	    // select alias
	    async.select = async.filter;
	    async.selectSeries = async.filterSeries;

	    var _reject = function (eachfn, arr, iterator, callback) {
	        var results = [];
	        arr = _map(arr, function (x, i) {
	            return {index: i, value: x};
	        });
	        eachfn(arr, function (x, callback) {
	            iterator(x.value, function (v) {
	                if (!v) {
	                    results.push(x);
	                }
	                callback();
	            });
	        }, function (err) {
	            callback(_map(results.sort(function (a, b) {
	                return a.index - b.index;
	            }), function (x) {
	                return x.value;
	            }));
	        });
	    };
	    async.reject = doParallel(_reject);
	    async.rejectSeries = doSeries(_reject);

	    var _detect = function (eachfn, arr, iterator, main_callback) {
	        eachfn(arr, function (x, callback) {
	            iterator(x, function (result) {
	                if (result) {
	                    main_callback(x);
	                    main_callback = function () {};
	                }
	                else {
	                    callback();
	                }
	            });
	        }, function (err) {
	            main_callback();
	        });
	    };
	    async.detect = doParallel(_detect);
	    async.detectSeries = doSeries(_detect);

	    async.some = function (arr, iterator, main_callback) {
	        async.each(arr, function (x, callback) {
	            iterator(x, function (v) {
	                if (v) {
	                    main_callback(true);
	                    main_callback = function () {};
	                }
	                callback();
	            });
	        }, function (err) {
	            main_callback(false);
	        });
	    };
	    // any alias
	    async.any = async.some;

	    async.every = function (arr, iterator, main_callback) {
	        async.each(arr, function (x, callback) {
	            iterator(x, function (v) {
	                if (!v) {
	                    main_callback(false);
	                    main_callback = function () {};
	                }
	                callback();
	            });
	        }, function (err) {
	            main_callback(true);
	        });
	    };
	    // all alias
	    async.all = async.every;

	    async.sortBy = function (arr, iterator, callback) {
	        async.map(arr, function (x, callback) {
	            iterator(x, function (err, criteria) {
	                if (err) {
	                    callback(err);
	                }
	                else {
	                    callback(null, {value: x, criteria: criteria});
	                }
	            });
	        }, function (err, results) {
	            if (err) {
	                return callback(err);
	            }
	            else {
	                var fn = function (left, right) {
	                    var a = left.criteria, b = right.criteria;
	                    return a < b ? -1 : a > b ? 1 : 0;
	                };
	                callback(null, _map(results.sort(fn), function (x) {
	                    return x.value;
	                }));
	            }
	        });
	    };

	    async.auto = function (tasks, callback) {
	        callback = callback || function () {};
	        var keys = _keys(tasks);
	        var remainingTasks = keys.length
	        if (!remainingTasks) {
	            return callback();
	        }

	        var results = {};

	        var listeners = [];
	        var addListener = function (fn) {
	            listeners.unshift(fn);
	        };
	        var removeListener = function (fn) {
	            for (var i = 0; i < listeners.length; i += 1) {
	                if (listeners[i] === fn) {
	                    listeners.splice(i, 1);
	                    return;
	                }
	            }
	        };
	        var taskComplete = function () {
	            remainingTasks--
	            _each(listeners.slice(0), function (fn) {
	                fn();
	            });
	        };

	        addListener(function () {
	            if (!remainingTasks) {
	                var theCallback = callback;
	                // prevent final callback from calling itself if it errors
	                callback = function () {};

	                theCallback(null, results);
	            }
	        });

	        _each(keys, function (k) {
	            var task = _isArray(tasks[k]) ? tasks[k]: [tasks[k]];
	            var taskCallback = function (err) {
	                var args = Array.prototype.slice.call(arguments, 1);
	                if (args.length <= 1) {
	                    args = args[0];
	                }
	                if (err) {
	                    var safeResults = {};
	                    _each(_keys(results), function(rkey) {
	                        safeResults[rkey] = results[rkey];
	                    });
	                    safeResults[k] = args;
	                    callback(err, safeResults);
	                    // stop subsequent errors hitting callback multiple times
	                    callback = function () {};
	                }
	                else {
	                    results[k] = args;
	                    async.setImmediate(taskComplete);
	                }
	            };
	            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
	            var ready = function () {
	                return _reduce(requires, function (a, x) {
	                    return (a && results.hasOwnProperty(x));
	                }, true) && !results.hasOwnProperty(k);
	            };
	            if (ready()) {
	                task[task.length - 1](taskCallback, results);
	            }
	            else {
	                var listener = function () {
	                    if (ready()) {
	                        removeListener(listener);
	                        task[task.length - 1](taskCallback, results);
	                    }
	                };
	                addListener(listener);
	            }
	        });
	    };

	    async.retry = function(times, task, callback) {
	        var DEFAULT_TIMES = 5;
	        var attempts = [];
	        // Use defaults if times not passed
	        if (typeof times === 'function') {
	            callback = task;
	            task = times;
	            times = DEFAULT_TIMES;
	        }
	        // Make sure times is a number
	        times = parseInt(times, 10) || DEFAULT_TIMES;
	        var wrappedTask = function(wrappedCallback, wrappedResults) {
	            var retryAttempt = function(task, finalAttempt) {
	                return function(seriesCallback) {
	                    task(function(err, result){
	                        seriesCallback(!err || finalAttempt, {err: err, result: result});
	                    }, wrappedResults);
	                };
	            };
	            while (times) {
	                attempts.push(retryAttempt(task, !(times-=1)));
	            }
	            async.series(attempts, function(done, data){
	                data = data[data.length - 1];
	                (wrappedCallback || callback)(data.err, data.result);
	            });
	        }
	        // If a callback is passed, run this as a controll flow
	        return callback ? wrappedTask() : wrappedTask
	    };

	    async.waterfall = function (tasks, callback) {
	        callback = callback || function () {};
	        if (!_isArray(tasks)) {
	          var err = new Error('First argument to waterfall must be an array of functions');
	          return callback(err);
	        }
	        if (!tasks.length) {
	            return callback();
	        }
	        var wrapIterator = function (iterator) {
	            return function (err) {
	                if (err) {
	                    callback.apply(null, arguments);
	                    callback = function () {};
	                }
	                else {
	                    var args = Array.prototype.slice.call(arguments, 1);
	                    var next = iterator.next();
	                    if (next) {
	                        args.push(wrapIterator(next));
	                    }
	                    else {
	                        args.push(callback);
	                    }
	                    async.setImmediate(function () {
	                        iterator.apply(null, args);
	                    });
	                }
	            };
	        };
	        wrapIterator(async.iterator(tasks))();
	    };

	    var _parallel = function(eachfn, tasks, callback) {
	        callback = callback || function () {};
	        if (_isArray(tasks)) {
	            eachfn.map(tasks, function (fn, callback) {
	                if (fn) {
	                    fn(function (err) {
	                        var args = Array.prototype.slice.call(arguments, 1);
	                        if (args.length <= 1) {
	                            args = args[0];
	                        }
	                        callback.call(null, err, args);
	                    });
	                }
	            }, callback);
	        }
	        else {
	            var results = {};
	            eachfn.each(_keys(tasks), function (k, callback) {
	                tasks[k](function (err) {
	                    var args = Array.prototype.slice.call(arguments, 1);
	                    if (args.length <= 1) {
	                        args = args[0];
	                    }
	                    results[k] = args;
	                    callback(err);
	                });
	            }, function (err) {
	                callback(err, results);
	            });
	        }
	    };

	    async.parallel = function (tasks, callback) {
	        _parallel({ map: async.map, each: async.each }, tasks, callback);
	    };

	    async.parallelLimit = function(tasks, limit, callback) {
	        _parallel({ map: _mapLimit(limit), each: _eachLimit(limit) }, tasks, callback);
	    };

	    async.series = function (tasks, callback) {
	        callback = callback || function () {};
	        if (_isArray(tasks)) {
	            async.mapSeries(tasks, function (fn, callback) {
	                if (fn) {
	                    fn(function (err) {
	                        var args = Array.prototype.slice.call(arguments, 1);
	                        if (args.length <= 1) {
	                            args = args[0];
	                        }
	                        callback.call(null, err, args);
	                    });
	                }
	            }, callback);
	        }
	        else {
	            var results = {};
	            async.eachSeries(_keys(tasks), function (k, callback) {
	                tasks[k](function (err) {
	                    var args = Array.prototype.slice.call(arguments, 1);
	                    if (args.length <= 1) {
	                        args = args[0];
	                    }
	                    results[k] = args;
	                    callback(err);
	                });
	            }, function (err) {
	                callback(err, results);
	            });
	        }
	    };

	    async.iterator = function (tasks) {
	        var makeCallback = function (index) {
	            var fn = function () {
	                if (tasks.length) {
	                    tasks[index].apply(null, arguments);
	                }
	                return fn.next();
	            };
	            fn.next = function () {
	                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
	            };
	            return fn;
	        };
	        return makeCallback(0);
	    };

	    async.apply = function (fn) {
	        var args = Array.prototype.slice.call(arguments, 1);
	        return function () {
	            return fn.apply(
	                null, args.concat(Array.prototype.slice.call(arguments))
	            );
	        };
	    };

	    var _concat = function (eachfn, arr, fn, callback) {
	        var r = [];
	        eachfn(arr, function (x, cb) {
	            fn(x, function (err, y) {
	                r = r.concat(y || []);
	                cb(err);
	            });
	        }, function (err) {
	            callback(err, r);
	        });
	    };
	    async.concat = doParallel(_concat);
	    async.concatSeries = doSeries(_concat);

	    async.whilst = function (test, iterator, callback) {
	        if (test()) {
	            iterator(function (err) {
	                if (err) {
	                    return callback(err);
	                }
	                async.whilst(test, iterator, callback);
	            });
	        }
	        else {
	            callback();
	        }
	    };

	    async.doWhilst = function (iterator, test, callback) {
	        iterator(function (err) {
	            if (err) {
	                return callback(err);
	            }
	            var args = Array.prototype.slice.call(arguments, 1);
	            if (test.apply(null, args)) {
	                async.doWhilst(iterator, test, callback);
	            }
	            else {
	                callback();
	            }
	        });
	    };

	    async.until = function (test, iterator, callback) {
	        if (!test()) {
	            iterator(function (err) {
	                if (err) {
	                    return callback(err);
	                }
	                async.until(test, iterator, callback);
	            });
	        }
	        else {
	            callback();
	        }
	    };

	    async.doUntil = function (iterator, test, callback) {
	        iterator(function (err) {
	            if (err) {
	                return callback(err);
	            }
	            var args = Array.prototype.slice.call(arguments, 1);
	            if (!test.apply(null, args)) {
	                async.doUntil(iterator, test, callback);
	            }
	            else {
	                callback();
	            }
	        });
	    };

	    async.queue = function (worker, concurrency) {
	        if (concurrency === undefined) {
	            concurrency = 1;
	        }
	        function _insert(q, data, pos, callback) {
	          if (!q.started){
	            q.started = true;
	          }
	          if (!_isArray(data)) {
	              data = [data];
	          }
	          if(data.length == 0) {
	             // call drain immediately if there are no tasks
	             return async.setImmediate(function() {
	                 if (q.drain) {
	                     q.drain();
	                 }
	             });
	          }
	          _each(data, function(task) {
	              var item = {
	                  data: task,
	                  callback: typeof callback === 'function' ? callback : null
	              };

	              if (pos) {
	                q.tasks.unshift(item);
	              } else {
	                q.tasks.push(item);
	              }

	              if (q.saturated && q.tasks.length === q.concurrency) {
	                  q.saturated();
	              }
	              async.setImmediate(q.process);
	          });
	        }

	        var workers = 0;
	        var q = {
	            tasks: [],
	            concurrency: concurrency,
	            saturated: null,
	            empty: null,
	            drain: null,
	            started: false,
	            paused: false,
	            push: function (data, callback) {
	              _insert(q, data, false, callback);
	            },
	            kill: function () {
	              q.drain = null;
	              q.tasks = [];
	            },
	            unshift: function (data, callback) {
	              _insert(q, data, true, callback);
	            },
	            process: function () {
	                if (!q.paused && workers < q.concurrency && q.tasks.length) {
	                    var task = q.tasks.shift();
	                    if (q.empty && q.tasks.length === 0) {
	                        q.empty();
	                    }
	                    workers += 1;
	                    var next = function () {
	                        workers -= 1;
	                        if (task.callback) {
	                            task.callback.apply(task, arguments);
	                        }
	                        if (q.drain && q.tasks.length + workers === 0) {
	                            q.drain();
	                        }
	                        q.process();
	                    };
	                    var cb = only_once(next);
	                    worker(task.data, cb);
	                }
	            },
	            length: function () {
	                return q.tasks.length;
	            },
	            running: function () {
	                return workers;
	            },
	            idle: function() {
	                return q.tasks.length + workers === 0;
	            },
	            pause: function () {
	                if (q.paused === true) { return; }
	                q.paused = true;
	            },
	            resume: function () {
	                if (q.paused === false) { return; }
	                q.paused = false;
	                // Need to call q.process once per concurrent
	                // worker to preserve full concurrency after pause
	                for (var w = 1; w <= q.concurrency; w++) {
	                    async.setImmediate(q.process);
	                }
	            }
	        };
	        return q;
	    };

	    async.priorityQueue = function (worker, concurrency) {

	        function _compareTasks(a, b){
	          return a.priority - b.priority;
	        };

	        function _binarySearch(sequence, item, compare) {
	          var beg = -1,
	              end = sequence.length - 1;
	          while (beg < end) {
	            var mid = beg + ((end - beg + 1) >>> 1);
	            if (compare(item, sequence[mid]) >= 0) {
	              beg = mid;
	            } else {
	              end = mid - 1;
	            }
	          }
	          return beg;
	        }

	        function _insert(q, data, priority, callback) {
	          if (!q.started){
	            q.started = true;
	          }
	          if (!_isArray(data)) {
	              data = [data];
	          }
	          if(data.length == 0) {
	             // call drain immediately if there are no tasks
	             return async.setImmediate(function() {
	                 if (q.drain) {
	                     q.drain();
	                 }
	             });
	          }
	          _each(data, function(task) {
	              var item = {
	                  data: task,
	                  priority: priority,
	                  callback: typeof callback === 'function' ? callback : null
	              };

	              q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);

	              if (q.saturated && q.tasks.length === q.concurrency) {
	                  q.saturated();
	              }
	              async.setImmediate(q.process);
	          });
	        }

	        // Start with a normal queue
	        var q = async.queue(worker, concurrency);

	        // Override push to accept second parameter representing priority
	        q.push = function (data, priority, callback) {
	          _insert(q, data, priority, callback);
	        };

	        // Remove unshift function
	        delete q.unshift;

	        return q;
	    };

	    async.cargo = function (worker, payload) {
	        var working     = false,
	            tasks       = [];

	        var cargo = {
	            tasks: tasks,
	            payload: payload,
	            saturated: null,
	            empty: null,
	            drain: null,
	            drained: true,
	            push: function (data, callback) {
	                if (!_isArray(data)) {
	                    data = [data];
	                }
	                _each(data, function(task) {
	                    tasks.push({
	                        data: task,
	                        callback: typeof callback === 'function' ? callback : null
	                    });
	                    cargo.drained = false;
	                    if (cargo.saturated && tasks.length === payload) {
	                        cargo.saturated();
	                    }
	                });
	                async.setImmediate(cargo.process);
	            },
	            process: function process() {
	                if (working) return;
	                if (tasks.length === 0) {
	                    if(cargo.drain && !cargo.drained) cargo.drain();
	                    cargo.drained = true;
	                    return;
	                }

	                var ts = typeof payload === 'number'
	                            ? tasks.splice(0, payload)
	                            : tasks.splice(0, tasks.length);

	                var ds = _map(ts, function (task) {
	                    return task.data;
	                });

	                if(cargo.empty) cargo.empty();
	                working = true;
	                worker(ds, function () {
	                    working = false;

	                    var args = arguments;
	                    _each(ts, function (data) {
	                        if (data.callback) {
	                            data.callback.apply(null, args);
	                        }
	                    });

	                    process();
	                });
	            },
	            length: function () {
	                return tasks.length;
	            },
	            running: function () {
	                return working;
	            }
	        };
	        return cargo;
	    };

	    var _console_fn = function (name) {
	        return function (fn) {
	            var args = Array.prototype.slice.call(arguments, 1);
	            fn.apply(null, args.concat([function (err) {
	                var args = Array.prototype.slice.call(arguments, 1);
	                if (typeof console !== 'undefined') {
	                    if (err) {
	                        if (console.error) {
	                            console.error(err);
	                        }
	                    }
	                    else if (console[name]) {
	                        _each(args, function (x) {
	                            console[name](x);
	                        });
	                    }
	                }
	            }]));
	        };
	    };
	    async.log = _console_fn('log');
	    async.dir = _console_fn('dir');
	    /*async.info = _console_fn('info');
	    async.warn = _console_fn('warn');
	    async.error = _console_fn('error');*/

	    async.memoize = function (fn, hasher) {
	        var memo = {};
	        var queues = {};
	        hasher = hasher || function (x) {
	            return x;
	        };
	        var memoized = function () {
	            var args = Array.prototype.slice.call(arguments);
	            var callback = args.pop();
	            var key = hasher.apply(null, args);
	            if (key in memo) {
	                async.nextTick(function () {
	                    callback.apply(null, memo[key]);
	                });
	            }
	            else if (key in queues) {
	                queues[key].push(callback);
	            }
	            else {
	                queues[key] = [callback];
	                fn.apply(null, args.concat([function () {
	                    memo[key] = arguments;
	                    var q = queues[key];
	                    delete queues[key];
	                    for (var i = 0, l = q.length; i < l; i++) {
	                      q[i].apply(null, arguments);
	                    }
	                }]));
	            }
	        };
	        memoized.memo = memo;
	        memoized.unmemoized = fn;
	        return memoized;
	    };

	    async.unmemoize = function (fn) {
	      return function () {
	        return (fn.unmemoized || fn).apply(null, arguments);
	      };
	    };

	    async.times = function (count, iterator, callback) {
	        var counter = [];
	        for (var i = 0; i < count; i++) {
	            counter.push(i);
	        }
	        return async.map(counter, iterator, callback);
	    };

	    async.timesSeries = function (count, iterator, callback) {
	        var counter = [];
	        for (var i = 0; i < count; i++) {
	            counter.push(i);
	        }
	        return async.mapSeries(counter, iterator, callback);
	    };

	    async.seq = function (/* functions... */) {
	        var fns = arguments;
	        return function () {
	            var that = this;
	            var args = Array.prototype.slice.call(arguments);
	            var callback = args.pop();
	            async.reduce(fns, args, function (newargs, fn, cb) {
	                fn.apply(that, newargs.concat([function () {
	                    var err = arguments[0];
	                    var nextargs = Array.prototype.slice.call(arguments, 1);
	                    cb(err, nextargs);
	                }]))
	            },
	            function (err, results) {
	                callback.apply(that, [err].concat(results));
	            });
	        };
	    };

	    async.compose = function (/* functions... */) {
	      return async.seq.apply(null, Array.prototype.reverse.call(arguments));
	    };

	    var _applyEach = function (eachfn, fns /*args...*/) {
	        var go = function () {
	            var that = this;
	            var args = Array.prototype.slice.call(arguments);
	            var callback = args.pop();
	            return eachfn(fns, function (fn, cb) {
	                fn.apply(that, args.concat([cb]));
	            },
	            callback);
	        };
	        if (arguments.length > 2) {
	            var args = Array.prototype.slice.call(arguments, 2);
	            return go.apply(this, args);
	        }
	        else {
	            return go;
	        }
	    };
	    async.applyEach = doParallel(_applyEach);
	    async.applyEachSeries = doSeries(_applyEach);

	    async.forever = function (fn, callback) {
	        function next(err) {
	            if (err) {
	                if (callback) {
	                    return callback(err);
	                }
	                throw err;
	            }
	            fn(next);
	        }
	        next();
	    };

	    // Node.js
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = async;
	    }
	    // AMD / RequireJS
	    else if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return async;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	    // included directly via <script> tag
	    else {
	        root.async = async;
	    }

	}());

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11), __webpack_require__(19).setImmediate))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(11).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19).setImmediate, __webpack_require__(19).clearImmediate))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// Requiring modules

	module.exports = function (attach) {
	  var methods = __webpack_require__(21);

	  if (attach) {
	    __webpack_require__(25)(methods);
	  }

	  return methods
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// The Inflector transforms words from singular to plural, class names to table names, modularized class names to ones without,
	// and class names to foreign keys. The default inflections for pluralization, singularization, and uncountable words are kept
	// in inflections.coffee
	//
	// If you discover an incorrect inflection and require it for your application, you'll need
	// to correct it yourself (explained below).

	var util = __webpack_require__(22);

	var inflect = module.exports;

	// Import [inflections](inflections.html) instance
	inflect.inflections = __webpack_require__(23)

	// Gives easy access to add inflections to this class
	inflect.inflect = function (inflections_function) {
	  inflections_function(inflect.inflections);
	};

	// By default, _camelize_ converts strings to UpperCamelCase. If the argument to _camelize_
	// is set to _false_ then _camelize_ produces lowerCamelCase.
	//
	// _camelize_ will also convert '/' to '.' which is useful for converting paths to namespaces.
	//
	//     "bullet_record".camelize()             // => "BulletRecord"
	//     "bullet_record".camelize(false)        // => "bulletRecord"
	//     "bullet_record/errors".camelize()      // => "BulletRecord.Errors"
	//     "bullet_record/errors".camelize(false) // => "bulletRecord.Errors"
	//
	// As a rule of thumb you can think of _camelize_ as the inverse of _underscore_,
	// though there are cases where that does not hold:
	//
	//     "SSLError".underscore.camelize // => "SslError"
	inflect.camelize = function(lower_case_and_underscored_word, first_letter_in_uppercase) {
	  var result;
	  if (first_letter_in_uppercase == null) first_letter_in_uppercase = true;
	  result = util.string.gsub(lower_case_and_underscored_word, /\/(.?)/, function($) {
	    return "." + (util.string.upcase($[1]));
	  });
	  result = util.string.gsub(result, /(?:_)(.)/, function($) {
	    return util.string.upcase($[1]);
	  });
	  if (first_letter_in_uppercase) {
	    return util.string.upcase(result);
	  } else {
	    return util.string.downcase(result);
	  }
	};

	// Makes an underscored, lowercase form from the expression in the string.
	//
	// Changes '.' to '/' to convert namespaces to paths.
	//
	//     "BulletRecord".underscore()         // => "bullet_record"
	//     "BulletRecord.Errors".underscore()  // => "bullet_record/errors"
	//
	// As a rule of thumb you can think of +underscore+ as the inverse of +camelize+,
	// though there are cases where that does not hold:
	//
	//     "SSLError".underscore().camelize() // => "SslError"
	inflect.underscore = function (camel_cased_word) {
	  var self;
	  self = util.string.gsub(camel_cased_word, /\./, '/');
	  self = util.string.gsub(self, /([A-Z]+)([A-Z][a-z])/, "$1_$2");
	  self = util.string.gsub(self, /([a-z\d])([A-Z])/, "$1_$2");
	  self = util.string.gsub(self, /-/, '_');
	  return self.toLowerCase();
	};

	// Replaces underscores with dashes in the string.
	//
	//     "puni_puni".dasherize()   // => "puni-puni"
	inflect.dasherize = function (underscored_word) {
	  return util.string.gsub(underscored_word, /_/, '-');
	};

	// Removes the module part from the expression in the string.
	//
	//     "BulletRecord.String.Inflections".demodulize() // => "Inflections"
	//     "Inflections".demodulize()                     // => "Inflections"
	inflect.demodulize = function (class_name_in_module) {
	  return util.string.gsub(class_name_in_module, /^.*\./, '');
	};

	// Creates a foreign key name from a class name.
	// _separate_class_name_and_id_with_underscore_ sets whether
	// the method should put '_' between the name and 'id'.
	//
	//     "Message".foreign_key()      // => "message_id"
	//     "Message".foreign_key(false) // => "messageid"
	//     "Admin::Post".foreign_key()  // => "post_id"
	inflect.foreign_key = function (class_name, separate_class_name_and_id_with_underscore) {
	  if (separate_class_name_and_id_with_underscore == null) {
	    separate_class_name_and_id_with_underscore = true;
	  }
	  return inflect.underscore(inflect.demodulize(class_name)) + (separate_class_name_and_id_with_underscore ? "_id" : "id");
	};

	// Turns a number into an ordinal string used to denote the position in an
	// ordered sequence such as 1st, 2nd, 3rd, 4th.
	//
	//     ordinalize(1)     // => "1st"
	//     ordinalize(2)     // => "2nd"
	//     ordinalize(1002)  // => "1002nd"
	//     ordinalize(1003)  // => "1003rd"
	//     ordinalize(-11)   // => "-11th"
	//     ordinalize(-1021) // => "-1021st"
	inflect.ordinalize = function (number) {
	  var _ref;
	  number = parseInt(number);
	  if ((_ref = Math.abs(number) % 100) === 11 || _ref === 12 || _ref === 13) {
	    return "" + number + "th";
	  } else {
	    switch (Math.abs(number) % 10) {
	      case 1:
	        return "" + number + "st";
	      case 2:
	        return "" + number + "nd";
	      case 3:
	        return "" + number + "rd";
	      default:
	        return "" + number + "th";
	    }
	  }
	};

	// Checks a given word for uncountability
	//
	//     "money".uncountability()     // => true
	//     "my money".uncountability()  // => true
	inflect.uncountability = function (word) {
	  return inflect.inflections.uncountables.some(function(ele, ind, arr) {
	    return word.match(new RegExp("(\\b|_)" + ele + "$", 'i')) != null;
	  });
	};

	// Returns the plural form of the word in the string.
	//
	//     "post".pluralize()             // => "posts"
	//     "octopus".pluralize()          // => "octopi"
	//     "sheep".pluralize()            // => "sheep"
	//     "words".pluralize()            // => "words"
	//     "CamelOctopus".pluralize()     // => "CamelOctopi"
	inflect.pluralize = function (word) {
	  var plural, result;
	  result = word;
	  if (word === '' || inflect.uncountability(word)) {
	    return result;
	  } else {
	    for (var i = 0; i < inflect.inflections.plurals.length; i++) {
	      plural = inflect.inflections.plurals[i];
	      result = util.string.gsub(result, plural[0], plural[1]);
	      if (word.match(plural[0]) != null) break;
	    }
	    return result;
	  }
	};

	// The reverse of _pluralize_, returns the singular form of a word in a string.
	//
	//     "posts".singularize()            // => "post"
	//     "octopi".singularize()           // => "octopus"
	//     "sheep".singularize()            // => "sheep"
	//     "word".singularize()             // => "word"
	//     "CamelOctopi".singularize()      // => "CamelOctopus"
	inflect.singularize = function (word) {
	  var result, singular;
	  result = word;
	  if (word === '' || inflect.uncountability(word)) {
	    return result;
	  } else {
	    for (var i = 0; i < inflect.inflections.singulars.length; i++) {
	      singular = inflect.inflections.singulars[i];
	      result = util.string.gsub(result, singular[0], singular[1]);
	      if (word.match(singular[0])) break;
	    }
	    return result;
	  }
	};

	// Capitalizes the first word and turns underscores into spaces and strips a
	// trailing "_id", if any. Like _titleize_, this is meant for creating pretty output.
	//
	//     "employee_salary".humanize()   // => "Employee salary"
	//     "author_id".humanize()         // => "Author"
	inflect.humanize = function (lower_case_and_underscored_word) {
	  var human, result;
	  result = lower_case_and_underscored_word;
	  for (var i = 0; i < inflect.inflections.humans.length; i++) {
	    human = inflect.inflections.humans[i];
	    result = util.string.gsub(result, human[0], human[1]);
	  }
	  result = util.string.gsub(result, /_id$/, "");
	  result = util.string.gsub(result, /_/, " ");
	  return util.string.capitalize(result, true);
	};

	// Capitalizes all the words and replaces some characters in the string to create
	// a nicer looking title. _titleize_ is meant for creating pretty output. It is not
	// used in the Bullet internals.
	//
	//
	//     "man from the boondocks".titleize()   // => "Man From The Boondocks"
	//     "x-men: the last stand".titleize()    // => "X Men: The Last Stand"
	inflect.titleize = function (word) {
	  var self;
	  self = inflect.humanize(inflect.underscore(word));
	  return util.string.capitalize(self);
	};

	// Create the name of a table like Bullet does for models to table names. This method
	// uses the _pluralize_ method on the last word in the string.
	//
	//     "RawScaledScorer".tableize()   // => "raw_scaled_scorers"
	//     "egg_and_ham".tableize()       // => "egg_and_hams"
	//     "fancyCategory".tableize()     // => "fancy_categories"
	inflect.tableize = function (class_name) {
	  return inflect.pluralize(inflect.underscore(class_name));
	};

	// Create a class name from a plural table name like Bullet does for table names to models.
	// Note that this returns a string and not a Class.
	//
	//     "egg_and_hams".classify()   // => "EggAndHam"
	//     "posts".classify()          // => "Post"
	//
	// Singular names are not handled correctly:
	//
	//     "business".classify()       // => "Busines"
	inflect.classify = function (table_name) {
	  return inflect.camelize(inflect.singularize(util.string.gsub(table_name, /.*\./, '')));
	}


/***/ },
/* 22 */
/***/ function(module, exports) {

	// Some utility functions in js

	var u = module.exports = {
	  array: {
	    // Returns a copy of the array with the value removed once
	    //
	    //     [1, 2, 3, 1].del 1 #=> [2, 3, 1]
	    //     [1, 2, 3].del 4    #=> [1, 2, 3]
	    del: function (arr, val) {
	      var index = arr.indexOf(val);
	      if (index != -1) {
	        if (index == 0) {
	         return arr.slice(1)
	        } else {
	          return arr.slice(0, index).concat(arr.slice(index+1));
	        }
	      } else {
	        return arr;
	      }
	    },

	    // Returns the first element of the array
	    //
	    //     [1, 2, 3].first() #=> 1
	    first: function(arr) {
	      return arr[0];
	    },

	    // Returns the last element of the array
	    //
	    //     [1, 2, 3].last()  #=> 3
	    last: function(arr) {
	      return arr[arr.length-1];
	    }
	  },
	  string: {
	    // Returns a copy of str with all occurrences of pattern replaced with either replacement or the return value of a function.
	    // The pattern will typically be a Regexp; if it is a String then no regular expression metacharacters will be interpreted
	    // (that is /\d/ will match a digit, but ‘\d’ will match a backslash followed by a ‘d’).
	    //
	    // In the function form, the current match object is passed in as a parameter to the function, and variables such as
	    // $[1], $[2], $[3] (where $ is the match object) will be set appropriately. The value returned by the function will be
	    // substituted for the match on each call.
	    //
	    // The result inherits any tainting in the original string or any supplied replacement string.
	    //
	    //     "hello".gsub /[aeiou]/, '*'      #=> "h*ll*"
	    //     "hello".gsub /[aeiou]/, '<$1>'   #=> "h<e>ll<o>"
	    //     "hello".gsub /[aeiou]/, ($) {
	    //       "<#{$[1]}>"                    #=> "h<e>ll<o>"
	    //
	    gsub: function (str, pattern, replacement) {
	      var i, match, matchCmpr, matchCmprPrev, replacementStr, result, self;
	      if (!((pattern != null) && (replacement != null))) return u.string.value(str);
	      result = '';
	      self = str;
	      while (self.length > 0) {
	        if ((match = self.match(pattern))) {
	          result += self.slice(0, match.index);
	          if (typeof replacement === 'function') {
	            match[1] = match[1] || match[0];
	            result += replacement(match);
	          } else if (replacement.match(/\$[1-9]/)) {
	            matchCmprPrev = match;
	            matchCmpr = u.array.del(match, void 0);
	            while (matchCmpr !== matchCmprPrev) {
	              matchCmprPrev = matchCmpr;
	              matchCmpr = u.array.del(matchCmpr, void 0);
	            }
	            match[1] = match[1] || match[0];
	            replacementStr = replacement;
	            for (i = 1; i <= 9; i++) {
	              if (matchCmpr[i]) {
	                replacementStr = u.string.gsub(replacementStr, new RegExp("\\\$" + i), matchCmpr[i]);
	              }
	            }
	            result += replacementStr;
	          } else {
	            result += replacement;
	          }
	          self = self.slice(match.index + match[0].length);
	        } else {
	          result += self;
	          self = '';
	        }
	      }
	      return result;
	    },

	    // Returns a copy of the String with the first letter being upper case
	    //
	    //     "hello".upcase #=> "Hello"
	    upcase: function(str) {
	      var self = u.string.gsub(str, /_([a-z])/, function ($) {
	        return "_" + $[1].toUpperCase();
	      });
	      self = u.string.gsub(self, /\/([a-z])/, function ($) {
	        return "/" + $[1].toUpperCase();
	      });
	      return self[0].toUpperCase() + self.substr(1);
	    },

	    // Returns a copy of capitalized string
	    //
	    //     "employee salary" #=> "Employee Salary"
	    capitalize: function (str, spaces) {
	      var self = str.toLowerCase();
	      if(!spaces) {
	        self = u.string.gsub(self, /\s([a-z])/, function ($) {
	          return " " + $[1].toUpperCase();
	        });
	      }
	      return self[0].toUpperCase() + self.substr(1);
	    },

	    // Returns a copy of the String with the first letter being lower case
	    //
	    //     "HELLO".downcase #=> "hELLO"
	    downcase: function(str) {
	      var self = u.string.gsub(str, /_([A-Z])/, function ($) {
	        return "_" + $[1].toLowerCase();
	      });
	      self = u.string.gsub(self, /\/([A-Z])/, function ($) {
	        return "/" + $[1].toLowerCase();
	      });
	      return self[0].toLowerCase() + self.substr(1);
	    },

	    // Returns a string value for the String object
	    //
	    //     "hello".value() #=> "hello"
	    value: function (str) {
	      return str.substr(0);
	    }
	  }
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// A singleton instance of this class is yielded by Inflector.inflections, which can then be used to specify additional
	// inflection rules. Examples:
	//
	//     BulletSupport.Inflector.inflect ($) ->
	//       $.plural /^(ox)$/i, '$1en'
	//       $.singular /^(ox)en/i, '$1'
	//
	//       $.irregular 'octopus', 'octopi'
	//
	//       $.uncountable "equipment"
	//
	// New rules are added at the top. So in the example above, the irregular rule for octopus will now be the first of the
	// pluralization and singularization rules that is runs. This guarantees that your rules run before any of the rules that may
	// already have been loaded.

	var util = __webpack_require__(22);

	var Inflections = function () {
	  this.plurals = [];
	  this.singulars = [];
	  this.uncountables = [];
	  this.humans = [];
	  __webpack_require__(24)(this);
	  return this;
	};

	// Specifies a new pluralization rule and its replacement. The rule can either be a string or a regular expression.
	// The replacement should always be a string that may include references to the matched data from the rule.
	Inflections.prototype.plural = function (rule, replacement) {
	  if (typeof rule == 'string') {
	    this.uncountables = util.array.del(this.uncountables, rule);
	  }
	  this.uncountables = util.array.del(this.uncountables, replacement);
	  this.plurals.unshift([rule, replacement]);
	};

	// Specifies a new singularization rule and its replacement. The rule can either be a string or a regular expression.
	// The replacement should always be a string that may include references to the matched data from the rule.
	Inflections.prototype.singular = function (rule, replacement) {
	  if (typeof rule == 'string') {
	    this.uncountables = util.array.del(this.uncountables, rule);
	  }
	  this.uncountables = util.array.del(this.uncountables, replacement);
	  this.singulars.unshift([rule, replacement]);
	};

	// Specifies a new irregular that applies to both pluralization and singularization at the same time. This can only be used
	// for strings, not regular expressions. You simply pass the irregular in singular and plural form.
	//
	//     irregular 'octopus', 'octopi'
	//     irregular 'person', 'people'
	Inflections.prototype.irregular =  function (singular, plural, fullMatchRequired) {
	  this.uncountables = util.array.del(this.uncountables, singular);
	  this.uncountables = util.array.del(this.uncountables, plural);
	  var prefix = "";
	  if (fullMatchRequired) {
	    prefix = "^";
	  }
	  if (singular[0].toUpperCase() == plural[0].toUpperCase()) {
	    this.plural(new RegExp("(" + prefix + singular[0] + ")" + singular.slice(1) + "$", "i"), '$1' + plural.slice(1));
	    this.plural(new RegExp("(" + prefix + plural[0] + ")" + plural.slice(1) + "$", "i"), '$1' + plural.slice(1));
	    this.singular(new RegExp("(" + prefix + plural[0] + ")" + plural.slice(1) + "$", "i"), '$1' + singular.slice(1));
	  } else {
	    this.plural(new RegExp(prefix + (singular[0].toUpperCase()) + singular.slice(1) + "$"), plural[0].toUpperCase() + plural.slice(1));
	    this.plural(new RegExp(prefix + (singular[0].toLowerCase()) + singular.slice(1) + "$"), plural[0].toLowerCase() + plural.slice(1));
	    this.plural(new RegExp(prefix + (plural[0].toUpperCase()) + plural.slice(1) + "$"), plural[0].toUpperCase() + plural.slice(1));
	    this.plural(new RegExp(prefix + (plural[0].toLowerCase()) + plural.slice(1) + "$"), plural[0].toLowerCase() + plural.slice(1));
	    this.singular(new RegExp(prefix + (plural[0].toUpperCase()) + plural.slice(1) + "$"), singular[0].toUpperCase() + singular.slice(1));
	    this.singular(new RegExp(prefix + (plural[0].toLowerCase()) + plural.slice(1) + "$"), singular[0].toLowerCase() + singular.slice(1));
	  }
	};

	// Specifies a humanized form of a string by a regular expression rule or by a string mapping.
	// When using a regular expression based replacement, the normal humanize formatting is called after the replacement.
	// When a string is used, the human form should be specified as desired (example: 'The name', not 'the_name')
	//
	//     human /(.*)_cnt$/i, '$1_count'
	//     human "legacy_col_person_name", "Name"
	Inflections.prototype.human = function (rule, replacement) {
	  this.humans.unshift([rule, replacement]);
	}

	// Add uncountable words that shouldn't be attempted inflected.
	//
	//     uncountable "money"
	//     uncountable ["money", "information"]
	Inflections.prototype.uncountable = function (words) {
	  this.uncountables = this.uncountables.concat(words);
	}

	// Clears the loaded inflections within a given scope (default is _'all'_).
	// Give the scope as a symbol of the inflection type, the options are: _'plurals'_,
	// _'singulars'_, _'uncountables'_, _'humans'_.
	//
	//     clear 'all'
	//     clear 'plurals'
	Inflections.prototype.clear = function (scope) {
	  if (scope == null) scope = 'all';
	  switch (scope) {
	    case 'all':
	      this.plurals = [];
	      this.singulars = [];
	      this.uncountables = [];
	      this.humans = [];
	    default:
	      this[scope] = [];
	  }
	}

	// Clears the loaded inflections and initializes them to [default](../inflections.html)
	Inflections.prototype.default = function () {
	  this.plurals = [];
	  this.singulars = [];
	  this.uncountables = [];
	  this.humans = [];
	  __webpack_require__(24)(this);
	  return this;
	};

	module.exports = new Inflections();


/***/ },
/* 24 */
/***/ function(module, exports) {

	// Default inflections
	module.exports = function (inflect) {

	  inflect.plural(/$/, 's');
	  inflect.plural(/s$/i, 's');
	  inflect.plural(/(ax|test)is$/i, '$1es');
	  inflect.plural(/(octop|vir)us$/i, '$1i');
	  inflect.plural(/(octop|vir)i$/i, '$1i');
	  inflect.plural(/(alias|status)$/i, '$1es');
	  inflect.plural(/(bu)s$/i, '$1ses');
	  inflect.plural(/(buffal|tomat)o$/i, '$1oes');
	  inflect.plural(/([ti])um$/i, '$1a');
	  inflect.plural(/([ti])a$/i, '$1a');
	  inflect.plural(/sis$/i, 'ses');
	  inflect.plural(/(?:([^fa])fe|(?:(oa)f)|([lr])f)$/i, '$1ves');
	  inflect.plural(/(hive)$/i, '$1s');
	  inflect.plural(/([^aeiouy]|qu)y$/i, '$1ies');
	  inflect.plural(/(x|ch|ss|sh)$/i, '$1es');
	  inflect.plural(/(matr|vert|ind)(?:ix|ex)$/i, '$1ices');
	  inflect.plural(/([m|l])ouse$/i, '$1ice');
	  inflect.plural(/([m|l])ice$/i, '$1ice');
	  inflect.plural(/^(ox)$/i, '$1en');
	  inflect.plural(/^(oxen)$/i, '$1');
	  inflect.plural(/(quiz)$/i, '$1zes');

	  inflect.singular(/s$/i, '');
	  inflect.singular(/(n)ews$/i, '$1ews');
	  inflect.singular(/([ti])a$/i, '$1um');
	  inflect.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1sis');
	  inflect.singular(/(^analy)ses$/i, '$1sis');
	  inflect.singular(/([^f])ves$/i, '$1fe');
	  inflect.singular(/(hive)s$/i, '$1');
	  inflect.singular(/(tive)s$/i, '$1');
	  inflect.singular(/(oave)s$/i, 'oaf');
	  inflect.singular(/([lr])ves$/i, '$1f');
	  inflect.singular(/([^aeiouy]|qu)ies$/i, '$1y');
	  inflect.singular(/(s)eries$/i, '$1eries');
	  inflect.singular(/(m)ovies$/i, '$1ovie');
	  inflect.singular(/(x|ch|ss|sh)es$/i, '$1');
	  inflect.singular(/([m|l])ice$/i, '$1ouse');
	  inflect.singular(/(bus)es$/i, '$1');
	  inflect.singular(/(o)es$/i, '$1');
	  inflect.singular(/(shoe)s$/i, '$1');
	  inflect.singular(/(cris|ax|test)es$/i, '$1is');
	  inflect.singular(/(octop|vir)i$/i, '$1us');
	  inflect.singular(/(alias|status)es$/i, '$1');
	  inflect.singular(/^(ox)en/i, '$1');
	  inflect.singular(/(vert|ind)ices$/i, '$1ex');
	  inflect.singular(/(matr)ices$/i, '$1ix');
	  inflect.singular(/(quiz)zes$/i, '$1');
	  inflect.singular(/(database)s$/i, '$1');

	  inflect.irregular('child', 'children');
	  inflect.irregular('person', 'people');
	  inflect.irregular('man', 'men');
	  inflect.irregular('child', 'children');
	  inflect.irregular('sex', 'sexes');
	  inflect.irregular('move', 'moves');
	  inflect.irregular('cow', 'kine');
	  inflect.irregular('zombie', 'zombies');
	  inflect.irregular('oaf', 'oafs', true);
	  inflect.irregular('jefe', 'jefes');
	  inflect.irregular('save', 'saves');
	  inflect.irregular('safe', 'safes');
	  inflect.irregular('fife', 'fifes');

	  inflect.uncountable(['equipment', 'information', 'rice', 'money', 'species', 'series', 'fish', 'sheep', 'jeans', 'sushi']);
	}


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function (obj) {

	  var addProperty = function (method, func) {
	    String.prototype.__defineGetter__(method, func);
	  }

	  var stringPrototypeBlacklist = [
	    '__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'charAt', 'constructor',
	    'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'charCodeAt',
	    'indexOf', 'lastIndexof', 'length', 'localeCompare', 'match', 'replace', 'search', 'slice', 'split', 'substring',
	    'toLocaleLowerCase', 'toLocaleUpperCase', 'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight', 'gsub'
	  ];

	  Object.keys(obj).forEach(function (key) {
	    if (key != 'inflect' && key != 'inflections') {
	      if (stringPrototypeBlacklist.indexOf(key) !== -1) {
	        console.log('warn: You should not override String.prototype.' + key);
	      } else {
	        addProperty(key, function () {
	          return obj[key](this);
	        });
	      }
	    }
	  });

	}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var path = __webpack_require__(17);
	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var _0777 = parseInt('0777', 8);

	module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;

	function mkdirP (p, opts, f, made) {
	    if (typeof opts === 'function') {
	        f = opts;
	        opts = {};
	    }
	    else if (!opts || typeof opts !== 'object') {
	        opts = { mode: opts };
	    }
	    
	    var mode = opts.mode;
	    var xfs = opts.fs || fs;
	    
	    if (mode === undefined) {
	        mode = _0777 & (~process.umask());
	    }
	    if (!made) made = null;
	    
	    var cb = f || function () {};
	    p = path.resolve(p);
	    
	    xfs.mkdir(p, mode, function (er) {
	        if (!er) {
	            made = made || p;
	            return cb(null, made);
	        }
	        switch (er.code) {
	            case 'ENOENT':
	                mkdirP(path.dirname(p), opts, function (er, made) {
	                    if (er) cb(er, made);
	                    else mkdirP(p, opts, cb, made);
	                });
	                break;

	            // In the case of any other error, just see if there's a dir
	            // there already.  If so, then hooray!  If not, then something
	            // is borked.
	            default:
	                xfs.stat(p, function (er2, stat) {
	                    // if the stat fails, then that's super weird.
	                    // let the original error be the failure reason.
	                    if (er2 || !stat.isDirectory()) cb(er, made)
	                    else cb(null, made);
	                });
	                break;
	        }
	    });
	}

	mkdirP.sync = function sync (p, opts, made) {
	    if (!opts || typeof opts !== 'object') {
	        opts = { mode: opts };
	    }
	    
	    var mode = opts.mode;
	    var xfs = opts.fs || fs;
	    
	    if (mode === undefined) {
	        mode = _0777 & (~process.umask());
	    }
	    if (!made) made = null;

	    p = path.resolve(p);

	    try {
	        xfs.mkdirSync(p, mode);
	        made = made || p;
	    }
	    catch (err0) {
	        switch (err0.code) {
	            case 'ENOENT' :
	                made = sync(path.dirname(p), opts, made);
	                sync(p, opts, made);
	                break;

	            // In the case of any other error, just see if there's a dir
	            // there already.  If so, then hooray!  If not, then something
	            // is borked.
	            default:
	                var stat;
	                try {
	                    stat = xfs.statSync(p);
	                }
	                catch (err1) {
	                    throw err0;
	                }
	                if (!stat.isDirectory()) throw err0;
	                break;
	        }
	    }

	    return made;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(28);
	var isArguments = __webpack_require__(29);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 28 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 29 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {module.exports = rimraf
	rimraf.sync = rimrafSync

	var assert = __webpack_require__(31)
	var path = __webpack_require__(17)
	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	var glob = __webpack_require__(32)

	var defaultGlobOpts = {
	  nosort: true,
	  silent: true
	}

	// for EMFILE handling
	var timeout = 0

	var isWindows = (process.platform === "win32")

	function defaults (options) {
	  var methods = [
	    'unlink',
	    'chmod',
	    'stat',
	    'lstat',
	    'rmdir',
	    'readdir'
	  ]
	  methods.forEach(function(m) {
	    options[m] = options[m] || fs[m]
	    m = m + 'Sync'
	    options[m] = options[m] || fs[m]
	  })

	  options.maxBusyTries = options.maxBusyTries || 3
	  options.emfileWait = options.emfileWait || 1000
	  if (options.glob === false) {
	    options.disableGlob = true
	  }
	  options.disableGlob = options.disableGlob || false
	  options.glob = options.glob || defaultGlobOpts
	}

	function rimraf (p, options, cb) {
	  if (typeof options === 'function') {
	    cb = options
	    options = {}
	  }

	  assert(p, 'rimraf: missing path')
	  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
	  assert.equal(typeof cb, 'function', 'rimraf: callback function required')
	  assert(options, 'rimraf: invalid options argument provided')
	  assert.equal(typeof options, 'object', 'rimraf: options should be object')

	  defaults(options)

	  var busyTries = 0
	  var errState = null
	  var n = 0

	  if (options.disableGlob || !glob.hasMagic(p))
	    return afterGlob(null, [p])

	  options.lstat(p, function (er, stat) {
	    if (!er)
	      return afterGlob(null, [p])

	    glob(p, options.glob, afterGlob)
	  })

	  function next (er) {
	    errState = errState || er
	    if (--n === 0)
	      cb(errState)
	  }

	  function afterGlob (er, results) {
	    if (er)
	      return cb(er)

	    n = results.length
	    if (n === 0)
	      return cb()

	    results.forEach(function (p) {
	      rimraf_(p, options, function CB (er) {
	        if (er) {
	          if (isWindows && (er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") &&
	              busyTries < options.maxBusyTries) {
	            busyTries ++
	            var time = busyTries * 100
	            // try again, with the same exact callback as this one.
	            return setTimeout(function () {
	              rimraf_(p, options, CB)
	            }, time)
	          }

	          // this one won't happen if graceful-fs is used.
	          if (er.code === "EMFILE" && timeout < options.emfileWait) {
	            return setTimeout(function () {
	              rimraf_(p, options, CB)
	            }, timeout ++)
	          }

	          // already gone
	          if (er.code === "ENOENT") er = null
	        }

	        timeout = 0
	        next(er)
	      })
	    })
	  }
	}

	// Two possible strategies.
	// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
	// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
	//
	// Both result in an extra syscall when you guess wrong.  However, there
	// are likely far more normal files in the world than directories.  This
	// is based on the assumption that a the average number of files per
	// directory is >= 1.
	//
	// If anyone ever complains about this, then I guess the strategy could
	// be made configurable somehow.  But until then, YAGNI.
	function rimraf_ (p, options, cb) {
	  assert(p)
	  assert(options)
	  assert(typeof cb === 'function')

	  // sunos lets the root user unlink directories, which is... weird.
	  // so we have to lstat here and make sure it's not a dir.
	  options.lstat(p, function (er, st) {
	    if (er && er.code === "ENOENT")
	      return cb(null)

	    // Windows can EPERM on stat.  Life is suffering.
	    if (er && er.code === "EPERM" && isWindows)
	      fixWinEPERM(p, options, er, cb)

	    if (st && st.isDirectory())
	      return rmdir(p, options, er, cb)

	    options.unlink(p, function (er) {
	      if (er) {
	        if (er.code === "ENOENT")
	          return cb(null)
	        if (er.code === "EPERM")
	          return (isWindows)
	            ? fixWinEPERM(p, options, er, cb)
	            : rmdir(p, options, er, cb)
	        if (er.code === "EISDIR")
	          return rmdir(p, options, er, cb)
	      }
	      return cb(er)
	    })
	  })
	}

	function fixWinEPERM (p, options, er, cb) {
	  assert(p)
	  assert(options)
	  assert(typeof cb === 'function')
	  if (er)
	    assert(er instanceof Error)

	  options.chmod(p, 666, function (er2) {
	    if (er2)
	      cb(er2.code === "ENOENT" ? null : er)
	    else
	      options.stat(p, function(er3, stats) {
	        if (er3)
	          cb(er3.code === "ENOENT" ? null : er)
	        else if (stats.isDirectory())
	          rmdir(p, options, er, cb)
	        else
	          options.unlink(p, cb)
	      })
	  })
	}

	function fixWinEPERMSync (p, options, er) {
	  assert(p)
	  assert(options)
	  if (er)
	    assert(er instanceof Error)

	  try {
	    options.chmodSync(p, 666)
	  } catch (er2) {
	    if (er2.code === "ENOENT")
	      return
	    else
	      throw er
	  }

	  try {
	    var stats = options.statSync(p)
	  } catch (er3) {
	    if (er3.code === "ENOENT")
	      return
	    else
	      throw er
	  }

	  if (stats.isDirectory())
	    rmdirSync(p, options, er)
	  else
	    options.unlinkSync(p)
	}

	function rmdir (p, options, originalEr, cb) {
	  assert(p)
	  assert(options)
	  if (originalEr)
	    assert(originalEr instanceof Error)
	  assert(typeof cb === 'function')

	  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
	  // if we guessed wrong, and it's not a directory, then
	  // raise the original error.
	  options.rmdir(p, function (er) {
	    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
	      rmkids(p, options, cb)
	    else if (er && er.code === "ENOTDIR")
	      cb(originalEr)
	    else
	      cb(er)
	  })
	}

	function rmkids(p, options, cb) {
	  assert(p)
	  assert(options)
	  assert(typeof cb === 'function')

	  options.readdir(p, function (er, files) {
	    if (er)
	      return cb(er)
	    var n = files.length
	    if (n === 0)
	      return options.rmdir(p, cb)
	    var errState
	    files.forEach(function (f) {
	      rimraf(path.join(p, f), options, function (er) {
	        if (errState)
	          return
	        if (er)
	          return cb(errState = er)
	        if (--n === 0)
	          options.rmdir(p, cb)
	      })
	    })
	  })
	}

	// this looks simpler, and is strictly *faster*, but will
	// tie up the JavaScript thread and fail on excessively
	// deep directory trees.
	function rimrafSync (p, options) {
	  options = options || {}
	  defaults(options)

	  assert(p, 'rimraf: missing path')
	  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
	  assert(options, 'rimraf: missing options')
	  assert.equal(typeof options, 'object', 'rimraf: options should be object')

	  var results

	  if (options.disableGlob || !glob.hasMagic(p)) {
	    results = [p]
	  } else {
	    try {
	      options.lstatSync(p)
	      results = [p]
	    } catch (er) {
	      results = glob.sync(p, options.glob)
	    }
	  }

	  if (!results.length)
	    return

	  for (var i = 0; i < results.length; i++) {
	    var p = results[i]

	    try {
	      var st = options.lstatSync(p)
	    } catch (er) {
	      if (er.code === "ENOENT")
	        return

	      // Windows can EPERM on stat.  Life is suffering.
	      if (er.code === "EPERM" && isWindows)
	        fixWinEPERMSync(p, options, er)
	    }

	    try {
	      // sunos lets the root user unlink directories, which is... weird.
	      if (st && st.isDirectory())
	        rmdirSync(p, options, null)
	      else
	        options.unlinkSync(p)
	    } catch (er) {
	      if (er.code === "ENOENT")
	        return
	      if (er.code === "EPERM")
	        return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
	      if (er.code !== "EISDIR")
	        throw er
	      rmdirSync(p, options, er)
	    }
	  }
	}

	function rmdirSync (p, options, originalEr) {
	  assert(p)
	  assert(options)
	  if (originalEr)
	    assert(originalEr instanceof Error)

	  try {
	    options.rmdirSync(p)
	  } catch (er) {
	    if (er.code === "ENOENT")
	      return
	    if (er.code === "ENOTDIR")
	      throw originalEr
	    if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
	      rmkidsSync(p, options)
	  }
	}

	function rmkidsSync (p, options) {
	  assert(p)
	  assert(options)
	  options.readdirSync(p).forEach(function (f) {
	    rimrafSync(path.join(p, f), options)
	  })
	  options.rmdirSync(p, options)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:

	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }

	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}

	// based on node assert, original notice:

	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	var util = __webpack_require__(10);
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = (function () {
	  return function foo() {}.name === 'foo';
	}());
	function pToString (obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.

	var assert = module.exports = ok;

	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })

	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;

	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }

	      this.stack = out;
	    }
	  }
	};

	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);

	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' +  name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(inspect(self.expected), 128);
	}

	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.

	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.

	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}

	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;

	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.

	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;

	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);

	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};

	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);

	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};

	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);

	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};

	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};

	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;

	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();

	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;

	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if ((actual === null || typeof actual !== 'object') &&
	             (expected === null || typeof expected !== 'object')) {
	    return strict ? actual === expected : actual == expected;

	  // If both values are instances of typed arrays, wrap their underlying
	  // ArrayBuffers in a Buffer each to increase performance
	  // This optimization requires the arrays to have the same type as checked by
	  // Object.prototype.toString (aka pToString). Never perform binary
	  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	  // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) &&
	             pToString(actual) === pToString(expected) &&
	             !(actual instanceof Float32Array ||
	               actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer),
	                   new Uint8Array(expected.buffer)) === 0;

	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || {actual: [], expected: []};

	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }

	    memos.actual.push(actual);
	    memos.expected.push(expected);

	    return objEquiv(actual, expected, strict, memos);
	  }
	}

	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}

	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined)
	    return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b))
	    return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
	    return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
	      return false;
	  }
	  return true;
	}

	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);

	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};

	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}


	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);

	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};

	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};

	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }

	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }

	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }

	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }

	  return expected.call({}, actual) === true;
	}

	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}

	function _throws(shouldThrow, block, expected, message) {
	  var actual;

	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }

	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }

	  actual = _tryBlock(block);

	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');

	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }

	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;

	  if ((isUnwantedException &&
	      userProvidedMessage &&
	      expectedException(actual, expected)) ||
	      isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }

	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}

	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);

	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};

	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};

	assert.ifError = function(err) { if (err) throw err; };

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Approach:
	//
	// 1. Get the minimatch set
	// 2. For each pattern in the set, PROCESS(pattern, false)
	// 3. Store matches per-set, then uniq them
	//
	// PROCESS(pattern, inGlobStar)
	// Get the first [n] items from pattern that are all strings
	// Join these together.  This is PREFIX.
	//   If there is no more remaining, then stat(PREFIX) and
	//   add to matches if it succeeds.  END.
	//
	// If inGlobStar and PREFIX is symlink and points to dir
	//   set ENTRIES = []
	// else readdir(PREFIX) as ENTRIES
	//   If fail, END
	//
	// with ENTRIES
	//   If pattern[n] is GLOBSTAR
	//     // handle the case where the globstar match is empty
	//     // by pruning it out, and testing the resulting pattern
	//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
	//     // handle other cases.
	//     for ENTRY in ENTRIES (not dotfiles)
	//       // attach globstar + tail onto the entry
	//       // Mark that this entry is a globstar match
	//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
	//
	//   else // not globstar
	//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
	//       Test ENTRY against pattern[n]
	//       If fails, continue
	//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
	//
	// Caveat:
	//   Cache all stats and readdirs results to minimize syscall.  Since all
	//   we ever care about is existence and directory-ness, we can just keep
	//   `true` for files, and [children,...] for directories, or `false` for
	//   things that don't exist.

	module.exports = glob

	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	var rp = __webpack_require__(33)
	var minimatch = __webpack_require__(35)
	var Minimatch = minimatch.Minimatch
	var inherits = __webpack_require__(39)
	var EE = __webpack_require__(9).EventEmitter
	var path = __webpack_require__(17)
	var assert = __webpack_require__(31)
	var isAbsolute = __webpack_require__(40)
	var globSync = __webpack_require__(41)
	var common = __webpack_require__(42)
	var alphasort = common.alphasort
	var alphasorti = common.alphasorti
	var setopts = common.setopts
	var ownProp = common.ownProp
	var inflight = __webpack_require__(43)
	var util = __webpack_require__(10)
	var childrenIgnored = common.childrenIgnored
	var isIgnored = common.isIgnored

	var once = __webpack_require__(45)

	function glob (pattern, options, cb) {
	  if (typeof options === 'function') cb = options, options = {}
	  if (!options) options = {}

	  if (options.sync) {
	    if (cb)
	      throw new TypeError('callback provided to sync glob')
	    return globSync(pattern, options)
	  }

	  return new Glob(pattern, options, cb)
	}

	glob.sync = globSync
	var GlobSync = glob.GlobSync = globSync.GlobSync

	// old api surface
	glob.glob = glob

	function extend (origin, add) {
	  if (add === null || typeof add !== 'object') {
	    return origin
	  }

	  var keys = Object.keys(add)
	  var i = keys.length
	  while (i--) {
	    origin[keys[i]] = add[keys[i]]
	  }
	  return origin
	}

	glob.hasMagic = function (pattern, options_) {
	  var options = extend({}, options_)
	  options.noprocess = true

	  var g = new Glob(pattern, options)
	  var set = g.minimatch.set

	  if (!pattern)
	    return false

	  if (set.length > 1)
	    return true

	  for (var j = 0; j < set[0].length; j++) {
	    if (typeof set[0][j] !== 'string')
	      return true
	  }

	  return false
	}

	glob.Glob = Glob
	inherits(Glob, EE)
	function Glob (pattern, options, cb) {
	  if (typeof options === 'function') {
	    cb = options
	    options = null
	  }

	  if (options && options.sync) {
	    if (cb)
	      throw new TypeError('callback provided to sync glob')
	    return new GlobSync(pattern, options)
	  }

	  if (!(this instanceof Glob))
	    return new Glob(pattern, options, cb)

	  setopts(this, pattern, options)
	  this._didRealPath = false

	  // process each pattern in the minimatch set
	  var n = this.minimatch.set.length

	  // The matches are stored as {<filename>: true,...} so that
	  // duplicates are automagically pruned.
	  // Later, we do an Object.keys() on these.
	  // Keep them as a list so we can fill in when nonull is set.
	  this.matches = new Array(n)

	  if (typeof cb === 'function') {
	    cb = once(cb)
	    this.on('error', cb)
	    this.on('end', function (matches) {
	      cb(null, matches)
	    })
	  }

	  var self = this
	  var n = this.minimatch.set.length
	  this._processing = 0
	  this.matches = new Array(n)

	  this._emitQueue = []
	  this._processQueue = []
	  this.paused = false

	  if (this.noprocess)
	    return this

	  if (n === 0)
	    return done()

	  var sync = true
	  for (var i = 0; i < n; i ++) {
	    this._process(this.minimatch.set[i], i, false, done)
	  }
	  sync = false

	  function done () {
	    --self._processing
	    if (self._processing <= 0) {
	      if (sync) {
	        process.nextTick(function () {
	          self._finish()
	        })
	      } else {
	        self._finish()
	      }
	    }
	  }
	}

	Glob.prototype._finish = function () {
	  assert(this instanceof Glob)
	  if (this.aborted)
	    return

	  if (this.realpath && !this._didRealpath)
	    return this._realpath()

	  common.finish(this)
	  this.emit('end', this.found)
	}

	Glob.prototype._realpath = function () {
	  if (this._didRealpath)
	    return

	  this._didRealpath = true

	  var n = this.matches.length
	  if (n === 0)
	    return this._finish()

	  var self = this
	  for (var i = 0; i < this.matches.length; i++)
	    this._realpathSet(i, next)

	  function next () {
	    if (--n === 0)
	      self._finish()
	  }
	}

	Glob.prototype._realpathSet = function (index, cb) {
	  var matchset = this.matches[index]
	  if (!matchset)
	    return cb()

	  var found = Object.keys(matchset)
	  var self = this
	  var n = found.length

	  if (n === 0)
	    return cb()

	  var set = this.matches[index] = Object.create(null)
	  found.forEach(function (p, i) {
	    // If there's a problem with the stat, then it means that
	    // one or more of the links in the realpath couldn't be
	    // resolved.  just return the abs value in that case.
	    p = self._makeAbs(p)
	    rp.realpath(p, self.realpathCache, function (er, real) {
	      if (!er)
	        set[real] = true
	      else if (er.syscall === 'stat')
	        set[p] = true
	      else
	        self.emit('error', er) // srsly wtf right here

	      if (--n === 0) {
	        self.matches[index] = set
	        cb()
	      }
	    })
	  })
	}

	Glob.prototype._mark = function (p) {
	  return common.mark(this, p)
	}

	Glob.prototype._makeAbs = function (f) {
	  return common.makeAbs(this, f)
	}

	Glob.prototype.abort = function () {
	  this.aborted = true
	  this.emit('abort')
	}

	Glob.prototype.pause = function () {
	  if (!this.paused) {
	    this.paused = true
	    this.emit('pause')
	  }
	}

	Glob.prototype.resume = function () {
	  if (this.paused) {
	    this.emit('resume')
	    this.paused = false
	    if (this._emitQueue.length) {
	      var eq = this._emitQueue.slice(0)
	      this._emitQueue.length = 0
	      for (var i = 0; i < eq.length; i ++) {
	        var e = eq[i]
	        this._emitMatch(e[0], e[1])
	      }
	    }
	    if (this._processQueue.length) {
	      var pq = this._processQueue.slice(0)
	      this._processQueue.length = 0
	      for (var i = 0; i < pq.length; i ++) {
	        var p = pq[i]
	        this._processing--
	        this._process(p[0], p[1], p[2], p[3])
	      }
	    }
	  }
	}

	Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
	  assert(this instanceof Glob)
	  assert(typeof cb === 'function')

	  if (this.aborted)
	    return

	  this._processing++
	  if (this.paused) {
	    this._processQueue.push([pattern, index, inGlobStar, cb])
	    return
	  }

	  //console.error('PROCESS %d', this._processing, pattern)

	  // Get the first [n] parts of pattern that are all strings.
	  var n = 0
	  while (typeof pattern[n] === 'string') {
	    n ++
	  }
	  // now n is the index of the first one that is *not* a string.

	  // see if there's anything else
	  var prefix
	  switch (n) {
	    // if not, then this is rather simple
	    case pattern.length:
	      this._processSimple(pattern.join('/'), index, cb)
	      return

	    case 0:
	      // pattern *starts* with some non-trivial item.
	      // going to readdir(cwd), but not include the prefix in matches.
	      prefix = null
	      break

	    default:
	      // pattern has some string bits in the front.
	      // whatever it starts with, whether that's 'absolute' like /foo/bar,
	      // or 'relative' like '../baz'
	      prefix = pattern.slice(0, n).join('/')
	      break
	  }

	  var remain = pattern.slice(n)

	  // get the list of entries.
	  var read
	  if (prefix === null)
	    read = '.'
	  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
	    if (!prefix || !isAbsolute(prefix))
	      prefix = '/' + prefix
	    read = prefix
	  } else
	    read = prefix

	  var abs = this._makeAbs(read)

	  //if ignored, skip _processing
	  if (childrenIgnored(this, read))
	    return cb()

	  var isGlobStar = remain[0] === minimatch.GLOBSTAR
	  if (isGlobStar)
	    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
	  else
	    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
	}

	Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
	  var self = this
	  this._readdir(abs, inGlobStar, function (er, entries) {
	    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
	  })
	}

	Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

	  // if the abs isn't a dir, then nothing can match!
	  if (!entries)
	    return cb()

	  // It will only match dot entries if it starts with a dot, or if
	  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
	  var pn = remain[0]
	  var negate = !!this.minimatch.negate
	  var rawGlob = pn._glob
	  var dotOk = this.dot || rawGlob.charAt(0) === '.'

	  var matchedEntries = []
	  for (var i = 0; i < entries.length; i++) {
	    var e = entries[i]
	    if (e.charAt(0) !== '.' || dotOk) {
	      var m
	      if (negate && !prefix) {
	        m = !e.match(pn)
	      } else {
	        m = e.match(pn)
	      }
	      if (m)
	        matchedEntries.push(e)
	    }
	  }

	  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

	  var len = matchedEntries.length
	  // If there are no matched entries, then nothing matches.
	  if (len === 0)
	    return cb()

	  // if this is the last remaining pattern bit, then no need for
	  // an additional stat *unless* the user has specified mark or
	  // stat explicitly.  We know they exist, since readdir returned
	  // them.

	  if (remain.length === 1 && !this.mark && !this.stat) {
	    if (!this.matches[index])
	      this.matches[index] = Object.create(null)

	    for (var i = 0; i < len; i ++) {
	      var e = matchedEntries[i]
	      if (prefix) {
	        if (prefix !== '/')
	          e = prefix + '/' + e
	        else
	          e = prefix + e
	      }

	      if (e.charAt(0) === '/' && !this.nomount) {
	        e = path.join(this.root, e)
	      }
	      this._emitMatch(index, e)
	    }
	    // This was the last one, and no stats were needed
	    return cb()
	  }

	  // now test all matched entries as stand-ins for that part
	  // of the pattern.
	  remain.shift()
	  for (var i = 0; i < len; i ++) {
	    var e = matchedEntries[i]
	    var newPattern
	    if (prefix) {
	      if (prefix !== '/')
	        e = prefix + '/' + e
	      else
	        e = prefix + e
	    }
	    this._process([e].concat(remain), index, inGlobStar, cb)
	  }
	  cb()
	}

	Glob.prototype._emitMatch = function (index, e) {
	  if (this.aborted)
	    return

	  if (isIgnored(this, e))
	    return

	  if (this.paused) {
	    this._emitQueue.push([index, e])
	    return
	  }

	  var abs = isAbsolute(e) ? e : this._makeAbs(e)

	  if (this.mark)
	    e = this._mark(e)

	  if (this.absolute)
	    e = abs

	  if (this.matches[index][e])
	    return

	  if (this.nodir) {
	    var c = this.cache[abs]
	    if (c === 'DIR' || Array.isArray(c))
	      return
	  }

	  this.matches[index][e] = true

	  var st = this.statCache[abs]
	  if (st)
	    this.emit('stat', e, st)

	  this.emit('match', e)
	}

	Glob.prototype._readdirInGlobStar = function (abs, cb) {
	  if (this.aborted)
	    return

	  // follow all symlinked directories forever
	  // just proceed as if this is a non-globstar situation
	  if (this.follow)
	    return this._readdir(abs, false, cb)

	  var lstatkey = 'lstat\0' + abs
	  var self = this
	  var lstatcb = inflight(lstatkey, lstatcb_)

	  if (lstatcb)
	    fs.lstat(abs, lstatcb)

	  function lstatcb_ (er, lstat) {
	    if (er && er.code === 'ENOENT')
	      return cb()

	    var isSym = lstat && lstat.isSymbolicLink()
	    self.symlinks[abs] = isSym

	    // If it's not a symlink or a dir, then it's definitely a regular file.
	    // don't bother doing a readdir in that case.
	    if (!isSym && lstat && !lstat.isDirectory()) {
	      self.cache[abs] = 'FILE'
	      cb()
	    } else
	      self._readdir(abs, false, cb)
	  }
	}

	Glob.prototype._readdir = function (abs, inGlobStar, cb) {
	  if (this.aborted)
	    return

	  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
	  if (!cb)
	    return

	  //console.error('RD %j %j', +inGlobStar, abs)
	  if (inGlobStar && !ownProp(this.symlinks, abs))
	    return this._readdirInGlobStar(abs, cb)

	  if (ownProp(this.cache, abs)) {
	    var c = this.cache[abs]
	    if (!c || c === 'FILE')
	      return cb()

	    if (Array.isArray(c))
	      return cb(null, c)
	  }

	  var self = this
	  fs.readdir(abs, readdirCb(this, abs, cb))
	}

	function readdirCb (self, abs, cb) {
	  return function (er, entries) {
	    if (er)
	      self._readdirError(abs, er, cb)
	    else
	      self._readdirEntries(abs, entries, cb)
	  }
	}

	Glob.prototype._readdirEntries = function (abs, entries, cb) {
	  if (this.aborted)
	    return

	  // if we haven't asked to stat everything, then just
	  // assume that everything in there exists, so we can avoid
	  // having to stat it a second time.
	  if (!this.mark && !this.stat) {
	    for (var i = 0; i < entries.length; i ++) {
	      var e = entries[i]
	      if (abs === '/')
	        e = abs + e
	      else
	        e = abs + '/' + e
	      this.cache[e] = true
	    }
	  }

	  this.cache[abs] = entries
	  return cb(null, entries)
	}

	Glob.prototype._readdirError = function (f, er, cb) {
	  if (this.aborted)
	    return

	  // handle errors, and cache the information
	  switch (er.code) {
	    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
	    case 'ENOTDIR': // totally normal. means it *does* exist.
	      var abs = this._makeAbs(f)
	      this.cache[abs] = 'FILE'
	      if (abs === this.cwdAbs) {
	        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
	        error.path = this.cwd
	        error.code = er.code
	        this.emit('error', error)
	        this.abort()
	      }
	      break

	    case 'ENOENT': // not terribly unusual
	    case 'ELOOP':
	    case 'ENAMETOOLONG':
	    case 'UNKNOWN':
	      this.cache[this._makeAbs(f)] = false
	      break

	    default: // some unusual error.  Treat as failure.
	      this.cache[this._makeAbs(f)] = false
	      if (this.strict) {
	        this.emit('error', er)
	        // If the error is handled, then we abort
	        // if not, we threw out of here
	        this.abort()
	      }
	      if (!this.silent)
	        console.error('glob error', er)
	      break
	  }

	  return cb()
	}

	Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
	  var self = this
	  this._readdir(abs, inGlobStar, function (er, entries) {
	    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
	  })
	}


	Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
	  //console.error('pgs2', prefix, remain[0], entries)

	  // no entries means not a dir, so it can never have matches
	  // foo.txt/** doesn't match foo.txt
	  if (!entries)
	    return cb()

	  // test without the globstar, and with every child both below
	  // and replacing the globstar.
	  var remainWithoutGlobStar = remain.slice(1)
	  var gspref = prefix ? [ prefix ] : []
	  var noGlobStar = gspref.concat(remainWithoutGlobStar)

	  // the noGlobStar pattern exits the inGlobStar state
	  this._process(noGlobStar, index, false, cb)

	  var isSym = this.symlinks[abs]
	  var len = entries.length

	  // If it's a symlink, and we're in a globstar, then stop
	  if (isSym && inGlobStar)
	    return cb()

	  for (var i = 0; i < len; i++) {
	    var e = entries[i]
	    if (e.charAt(0) === '.' && !this.dot)
	      continue

	    // these two cases enter the inGlobStar state
	    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
	    this._process(instead, index, true, cb)

	    var below = gspref.concat(entries[i], remain)
	    this._process(below, index, true, cb)
	  }

	  cb()
	}

	Glob.prototype._processSimple = function (prefix, index, cb) {
	  // XXX review this.  Shouldn't it be doing the mounting etc
	  // before doing stat?  kinda weird?
	  var self = this
	  this._stat(prefix, function (er, exists) {
	    self._processSimple2(prefix, index, er, exists, cb)
	  })
	}
	Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

	  //console.error('ps2', prefix, exists)

	  if (!this.matches[index])
	    this.matches[index] = Object.create(null)

	  // If it doesn't exist, then just mark the lack of results
	  if (!exists)
	    return cb()

	  if (prefix && isAbsolute(prefix) && !this.nomount) {
	    var trail = /[\/\\]$/.test(prefix)
	    if (prefix.charAt(0) === '/') {
	      prefix = path.join(this.root, prefix)
	    } else {
	      prefix = path.resolve(this.root, prefix)
	      if (trail)
	        prefix += '/'
	    }
	  }

	  if (process.platform === 'win32')
	    prefix = prefix.replace(/\\/g, '/')

	  // Mark this as a match
	  this._emitMatch(index, prefix)
	  cb()
	}

	// Returns either 'DIR', 'FILE', or false
	Glob.prototype._stat = function (f, cb) {
	  var abs = this._makeAbs(f)
	  var needDir = f.slice(-1) === '/'

	  if (f.length > this.maxLength)
	    return cb()

	  if (!this.stat && ownProp(this.cache, abs)) {
	    var c = this.cache[abs]

	    if (Array.isArray(c))
	      c = 'DIR'

	    // It exists, but maybe not how we need it
	    if (!needDir || c === 'DIR')
	      return cb(null, c)

	    if (needDir && c === 'FILE')
	      return cb()

	    // otherwise we have to stat, because maybe c=true
	    // if we know it exists, but not what it is.
	  }

	  var exists
	  var stat = this.statCache[abs]
	  if (stat !== undefined) {
	    if (stat === false)
	      return cb(null, stat)
	    else {
	      var type = stat.isDirectory() ? 'DIR' : 'FILE'
	      if (needDir && type === 'FILE')
	        return cb()
	      else
	        return cb(null, type, stat)
	    }
	  }

	  var self = this
	  var statcb = inflight('stat\0' + abs, lstatcb_)
	  if (statcb)
	    fs.lstat(abs, statcb)

	  function lstatcb_ (er, lstat) {
	    if (lstat && lstat.isSymbolicLink()) {
	      // If it's a symlink, then treat it as the target, unless
	      // the target does not exist, then treat it as a file.
	      return fs.stat(abs, function (er, stat) {
	        if (er)
	          self._stat2(f, abs, null, lstat, cb)
	        else
	          self._stat2(f, abs, er, stat, cb)
	      })
	    } else {
	      self._stat2(f, abs, er, lstat, cb)
	    }
	  }
	}

	Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
	  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
	    this.statCache[abs] = false
	    return cb()
	  }

	  var needDir = f.slice(-1) === '/'
	  this.statCache[abs] = stat

	  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
	    return cb(null, false, stat)

	  var c = true
	  if (stat)
	    c = stat.isDirectory() ? 'DIR' : 'FILE'
	  this.cache[abs] = this.cache[abs] || c

	  if (needDir && c === 'FILE')
	    return cb()

	  return cb(null, c, stat)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {module.exports = realpath
	realpath.realpath = realpath
	realpath.sync = realpathSync
	realpath.realpathSync = realpathSync
	realpath.monkeypatch = monkeypatch
	realpath.unmonkeypatch = unmonkeypatch

	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	var origRealpath = fs.realpath
	var origRealpathSync = fs.realpathSync

	var version = process.version
	var ok = /^v[0-5]\./.test(version)
	var old = __webpack_require__(34)

	function newError (er) {
	  return er && er.syscall === 'realpath' && (
	    er.code === 'ELOOP' ||
	    er.code === 'ENOMEM' ||
	    er.code === 'ENAMETOOLONG'
	  )
	}

	function realpath (p, cache, cb) {
	  if (ok) {
	    return origRealpath(p, cache, cb)
	  }

	  if (typeof cache === 'function') {
	    cb = cache
	    cache = null
	  }
	  origRealpath(p, cache, function (er, result) {
	    if (newError(er)) {
	      old.realpath(p, cache, cb)
	    } else {
	      cb(er, result)
	    }
	  })
	}

	function realpathSync (p, cache) {
	  if (ok) {
	    return origRealpathSync(p, cache)
	  }

	  try {
	    return origRealpathSync(p, cache)
	  } catch (er) {
	    if (newError(er)) {
	      return old.realpathSync(p, cache)
	    } else {
	      throw er
	    }
	  }
	}

	function monkeypatch () {
	  fs.realpath = realpath
	  fs.realpathSync = realpathSync
	}

	function unmonkeypatch () {
	  fs.realpath = origRealpath
	  fs.realpathSync = origRealpathSync
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var pathModule = __webpack_require__(17);
	var isWindows = process.platform === 'win32';
	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	// JavaScript implementation of realpath, ported from node pre-v6

	var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

	function rethrow() {
	  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
	  // is fairly slow to generate.
	  var callback;
	  if (DEBUG) {
	    var backtrace = new Error;
	    callback = debugCallback;
	  } else
	    callback = missingCallback;

	  return callback;

	  function debugCallback(err) {
	    if (err) {
	      backtrace.message = err.message;
	      err = backtrace;
	      missingCallback(err);
	    }
	  }

	  function missingCallback(err) {
	    if (err) {
	      if (process.throwDeprecation)
	        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
	      else if (!process.noDeprecation) {
	        var msg = 'fs: missing callback ' + (err.stack || err.message);
	        if (process.traceDeprecation)
	          console.trace(msg);
	        else
	          console.error(msg);
	      }
	    }
	  }
	}

	function maybeCallback(cb) {
	  return typeof cb === 'function' ? cb : rethrow();
	}

	var normalize = pathModule.normalize;

	// Regexp that finds the next partion of a (partial) path
	// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
	if (isWindows) {
	  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
	} else {
	  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
	}

	// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
	if (isWindows) {
	  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
	} else {
	  var splitRootRe = /^[\/]*/;
	}

	exports.realpathSync = function realpathSync(p, cache) {
	  // make p is absolute
	  p = pathModule.resolve(p);

	  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
	    return cache[p];
	  }

	  var original = p,
	      seenLinks = {},
	      knownHard = {};

	  // current character position in p
	  var pos;
	  // the partial path so far, including a trailing slash if any
	  var current;
	  // the partial path without a trailing slash (except when pointing at a root)
	  var base;
	  // the partial path scanned in the previous round, with slash
	  var previous;

	  start();

	  function start() {
	    // Skip over roots
	    var m = splitRootRe.exec(p);
	    pos = m[0].length;
	    current = m[0];
	    base = m[0];
	    previous = '';

	    // On windows, check that the root exists. On unix there is no need.
	    if (isWindows && !knownHard[base]) {
	      fs.lstatSync(base);
	      knownHard[base] = true;
	    }
	  }

	  // walk down the path, swapping out linked pathparts for their real
	  // values
	  // NB: p.length changes.
	  while (pos < p.length) {
	    // find the next part
	    nextPartRe.lastIndex = pos;
	    var result = nextPartRe.exec(p);
	    previous = current;
	    current += result[0];
	    base = previous + result[1];
	    pos = nextPartRe.lastIndex;

	    // continue if not a symlink
	    if (knownHard[base] || (cache && cache[base] === base)) {
	      continue;
	    }

	    var resolvedLink;
	    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
	      // some known symbolic link.  no need to stat again.
	      resolvedLink = cache[base];
	    } else {
	      var stat = fs.lstatSync(base);
	      if (!stat.isSymbolicLink()) {
	        knownHard[base] = true;
	        if (cache) cache[base] = base;
	        continue;
	      }

	      // read the link if it wasn't read before
	      // dev/ino always return 0 on windows, so skip the check.
	      var linkTarget = null;
	      if (!isWindows) {
	        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
	        if (seenLinks.hasOwnProperty(id)) {
	          linkTarget = seenLinks[id];
	        }
	      }
	      if (linkTarget === null) {
	        fs.statSync(base);
	        linkTarget = fs.readlinkSync(base);
	      }
	      resolvedLink = pathModule.resolve(previous, linkTarget);
	      // track this, if given a cache.
	      if (cache) cache[base] = resolvedLink;
	      if (!isWindows) seenLinks[id] = linkTarget;
	    }

	    // resolve the link, then start over
	    p = pathModule.resolve(resolvedLink, p.slice(pos));
	    start();
	  }

	  if (cache) cache[original] = p;

	  return p;
	};


	exports.realpath = function realpath(p, cache, cb) {
	  if (typeof cb !== 'function') {
	    cb = maybeCallback(cache);
	    cache = null;
	  }

	  // make p is absolute
	  p = pathModule.resolve(p);

	  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
	    return process.nextTick(cb.bind(null, null, cache[p]));
	  }

	  var original = p,
	      seenLinks = {},
	      knownHard = {};

	  // current character position in p
	  var pos;
	  // the partial path so far, including a trailing slash if any
	  var current;
	  // the partial path without a trailing slash (except when pointing at a root)
	  var base;
	  // the partial path scanned in the previous round, with slash
	  var previous;

	  start();

	  function start() {
	    // Skip over roots
	    var m = splitRootRe.exec(p);
	    pos = m[0].length;
	    current = m[0];
	    base = m[0];
	    previous = '';

	    // On windows, check that the root exists. On unix there is no need.
	    if (isWindows && !knownHard[base]) {
	      fs.lstat(base, function(err) {
	        if (err) return cb(err);
	        knownHard[base] = true;
	        LOOP();
	      });
	    } else {
	      process.nextTick(LOOP);
	    }
	  }

	  // walk down the path, swapping out linked pathparts for their real
	  // values
	  function LOOP() {
	    // stop if scanned past end of path
	    if (pos >= p.length) {
	      if (cache) cache[original] = p;
	      return cb(null, p);
	    }

	    // find the next part
	    nextPartRe.lastIndex = pos;
	    var result = nextPartRe.exec(p);
	    previous = current;
	    current += result[0];
	    base = previous + result[1];
	    pos = nextPartRe.lastIndex;

	    // continue if not a symlink
	    if (knownHard[base] || (cache && cache[base] === base)) {
	      return process.nextTick(LOOP);
	    }

	    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
	      // known symbolic link.  no need to stat again.
	      return gotResolvedLink(cache[base]);
	    }

	    return fs.lstat(base, gotStat);
	  }

	  function gotStat(err, stat) {
	    if (err) return cb(err);

	    // if not a symlink, skip to the next path part
	    if (!stat.isSymbolicLink()) {
	      knownHard[base] = true;
	      if (cache) cache[base] = base;
	      return process.nextTick(LOOP);
	    }

	    // stat & read the link if not read before
	    // call gotTarget as soon as the link target is known
	    // dev/ino always return 0 on windows, so skip the check.
	    if (!isWindows) {
	      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
	      if (seenLinks.hasOwnProperty(id)) {
	        return gotTarget(null, seenLinks[id], base);
	      }
	    }
	    fs.stat(base, function(err) {
	      if (err) return cb(err);

	      fs.readlink(base, function(err, target) {
	        if (!isWindows) seenLinks[id] = target;
	        gotTarget(err, target);
	      });
	    });
	  }

	  function gotTarget(err, target, base) {
	    if (err) return cb(err);

	    var resolvedLink = pathModule.resolve(previous, target);
	    if (cache) cache[base] = resolvedLink;
	    gotResolvedLink(resolvedLink);
	  }

	  function gotResolvedLink(resolvedLink) {
	    // resolve the link, then start over
	    p = pathModule.resolve(resolvedLink, p.slice(pos));
	    start();
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = minimatch
	minimatch.Minimatch = Minimatch

	var path = { sep: '/' }
	try {
	  path = __webpack_require__(17)
	} catch (er) {}

	var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
	var expand = __webpack_require__(36)

	var plTypes = {
	  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
	  '?': { open: '(?:', close: ')?' },
	  '+': { open: '(?:', close: ')+' },
	  '*': { open: '(?:', close: ')*' },
	  '@': { open: '(?:', close: ')' }
	}

	// any single thing other than /
	// don't need to escape / when using new RegExp()
	var qmark = '[^/]'

	// * => any number of characters
	var star = qmark + '*?'

	// ** when dots are allowed.  Anything goes, except .. and .
	// not (^ or / followed by one or two dots followed by $ or /),
	// followed by anything, any number of times.
	var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

	// not a ^ or / followed by a dot,
	// followed by anything, any number of times.
	var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

	// characters that need to be escaped in RegExp.
	var reSpecials = charSet('().*{}+?[]^$\\!')

	// "abc" -> { a:true, b:true, c:true }
	function charSet (s) {
	  return s.split('').reduce(function (set, c) {
	    set[c] = true
	    return set
	  }, {})
	}

	// normalizes slashes.
	var slashSplit = /\/+/

	minimatch.filter = filter
	function filter (pattern, options) {
	  options = options || {}
	  return function (p, i, list) {
	    return minimatch(p, pattern, options)
	  }
	}

	function ext (a, b) {
	  a = a || {}
	  b = b || {}
	  var t = {}
	  Object.keys(b).forEach(function (k) {
	    t[k] = b[k]
	  })
	  Object.keys(a).forEach(function (k) {
	    t[k] = a[k]
	  })
	  return t
	}

	minimatch.defaults = function (def) {
	  if (!def || !Object.keys(def).length) return minimatch

	  var orig = minimatch

	  var m = function minimatch (p, pattern, options) {
	    return orig.minimatch(p, pattern, ext(def, options))
	  }

	  m.Minimatch = function Minimatch (pattern, options) {
	    return new orig.Minimatch(pattern, ext(def, options))
	  }

	  return m
	}

	Minimatch.defaults = function (def) {
	  if (!def || !Object.keys(def).length) return Minimatch
	  return minimatch.defaults(def).Minimatch
	}

	function minimatch (p, pattern, options) {
	  if (typeof pattern !== 'string') {
	    throw new TypeError('glob pattern string required')
	  }

	  if (!options) options = {}

	  // shortcut: comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === '#') {
	    return false
	  }

	  // "" only matches ""
	  if (pattern.trim() === '') return p === ''

	  return new Minimatch(pattern, options).match(p)
	}

	function Minimatch (pattern, options) {
	  if (!(this instanceof Minimatch)) {
	    return new Minimatch(pattern, options)
	  }

	  if (typeof pattern !== 'string') {
	    throw new TypeError('glob pattern string required')
	  }

	  if (!options) options = {}
	  pattern = pattern.trim()

	  // windows support: need to use /, not \
	  if (path.sep !== '/') {
	    pattern = pattern.split(path.sep).join('/')
	  }

	  this.options = options
	  this.set = []
	  this.pattern = pattern
	  this.regexp = null
	  this.negate = false
	  this.comment = false
	  this.empty = false

	  // make the set of regexps etc.
	  this.make()
	}

	Minimatch.prototype.debug = function () {}

	Minimatch.prototype.make = make
	function make () {
	  // don't do it more than once.
	  if (this._made) return

	  var pattern = this.pattern
	  var options = this.options

	  // empty patterns and comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === '#') {
	    this.comment = true
	    return
	  }
	  if (!pattern) {
	    this.empty = true
	    return
	  }

	  // step 1: figure out negation, etc.
	  this.parseNegate()

	  // step 2: expand braces
	  var set = this.globSet = this.braceExpand()

	  if (options.debug) this.debug = console.error

	  this.debug(this.pattern, set)

	  // step 3: now we have a set, so turn each one into a series of path-portion
	  // matching patterns.
	  // These will be regexps, except in the case of "**", which is
	  // set to the GLOBSTAR object for globstar behavior,
	  // and will not contain any / characters
	  set = this.globParts = set.map(function (s) {
	    return s.split(slashSplit)
	  })

	  this.debug(this.pattern, set)

	  // glob --> regexps
	  set = set.map(function (s, si, set) {
	    return s.map(this.parse, this)
	  }, this)

	  this.debug(this.pattern, set)

	  // filter out everything that didn't compile properly.
	  set = set.filter(function (s) {
	    return s.indexOf(false) === -1
	  })

	  this.debug(this.pattern, set)

	  this.set = set
	}

	Minimatch.prototype.parseNegate = parseNegate
	function parseNegate () {
	  var pattern = this.pattern
	  var negate = false
	  var options = this.options
	  var negateOffset = 0

	  if (options.nonegate) return

	  for (var i = 0, l = pattern.length
	    ; i < l && pattern.charAt(i) === '!'
	    ; i++) {
	    negate = !negate
	    negateOffset++
	  }

	  if (negateOffset) this.pattern = pattern.substr(negateOffset)
	  this.negate = negate
	}

	// Brace expansion:
	// a{b,c}d -> abd acd
	// a{b,}c -> abc ac
	// a{0..3}d -> a0d a1d a2d a3d
	// a{b,c{d,e}f}g -> abg acdfg acefg
	// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
	//
	// Invalid sets are not expanded.
	// a{2..}b -> a{2..}b
	// a{b}c -> a{b}c
	minimatch.braceExpand = function (pattern, options) {
	  return braceExpand(pattern, options)
	}

	Minimatch.prototype.braceExpand = braceExpand

	function braceExpand (pattern, options) {
	  if (!options) {
	    if (this instanceof Minimatch) {
	      options = this.options
	    } else {
	      options = {}
	    }
	  }

	  pattern = typeof pattern === 'undefined'
	    ? this.pattern : pattern

	  if (typeof pattern === 'undefined') {
	    throw new TypeError('undefined pattern')
	  }

	  if (options.nobrace ||
	    !pattern.match(/\{.*\}/)) {
	    // shortcut. no need to expand.
	    return [pattern]
	  }

	  return expand(pattern)
	}

	// parse a component of the expanded set.
	// At this point, no pattern may contain "/" in it
	// so we're going to return a 2d array, where each entry is the full
	// pattern, split on '/', and then turned into a regular expression.
	// A regexp is made at the end which joins each array with an
	// escaped /, and another full one which joins each regexp with |.
	//
	// Following the lead of Bash 4.1, note that "**" only has special meaning
	// when it is the *only* thing in a path portion.  Otherwise, any series
	// of * is equivalent to a single *.  Globstar behavior is enabled by
	// default, and can be disabled by setting options.noglobstar.
	Minimatch.prototype.parse = parse
	var SUBPARSE = {}
	function parse (pattern, isSub) {
	  if (pattern.length > 1024 * 64) {
	    throw new TypeError('pattern is too long')
	  }

	  var options = this.options

	  // shortcuts
	  if (!options.noglobstar && pattern === '**') return GLOBSTAR
	  if (pattern === '') return ''

	  var re = ''
	  var hasMagic = !!options.nocase
	  var escaping = false
	  // ? => one single character
	  var patternListStack = []
	  var negativeLists = []
	  var stateChar
	  var inClass = false
	  var reClassStart = -1
	  var classStart = -1
	  // . and .. never match anything that doesn't start with .,
	  // even when options.dot is set.
	  var patternStart = pattern.charAt(0) === '.' ? '' // anything
	  // not (start or / followed by . or .. followed by / or end)
	  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
	  : '(?!\\.)'
	  var self = this

	  function clearStateChar () {
	    if (stateChar) {
	      // we had some state-tracking character
	      // that wasn't consumed by this pass.
	      switch (stateChar) {
	        case '*':
	          re += star
	          hasMagic = true
	        break
	        case '?':
	          re += qmark
	          hasMagic = true
	        break
	        default:
	          re += '\\' + stateChar
	        break
	      }
	      self.debug('clearStateChar %j %j', stateChar, re)
	      stateChar = false
	    }
	  }

	  for (var i = 0, len = pattern.length, c
	    ; (i < len) && (c = pattern.charAt(i))
	    ; i++) {
	    this.debug('%s\t%s %s %j', pattern, i, re, c)

	    // skip over any that are escaped.
	    if (escaping && reSpecials[c]) {
	      re += '\\' + c
	      escaping = false
	      continue
	    }

	    switch (c) {
	      case '/':
	        // completely not allowed, even escaped.
	        // Should already be path-split by now.
	        return false

	      case '\\':
	        clearStateChar()
	        escaping = true
	      continue

	      // the various stateChar values
	      // for the "extglob" stuff.
	      case '?':
	      case '*':
	      case '+':
	      case '@':
	      case '!':
	        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

	        // all of those are literals inside a class, except that
	        // the glob [!a] means [^a] in regexp
	        if (inClass) {
	          this.debug('  in class')
	          if (c === '!' && i === classStart + 1) c = '^'
	          re += c
	          continue
	        }

	        // if we already have a stateChar, then it means
	        // that there was something like ** or +? in there.
	        // Handle the stateChar, then proceed with this one.
	        self.debug('call clearStateChar %j', stateChar)
	        clearStateChar()
	        stateChar = c
	        // if extglob is disabled, then +(asdf|foo) isn't a thing.
	        // just clear the statechar *now*, rather than even diving into
	        // the patternList stuff.
	        if (options.noext) clearStateChar()
	      continue

	      case '(':
	        if (inClass) {
	          re += '('
	          continue
	        }

	        if (!stateChar) {
	          re += '\\('
	          continue
	        }

	        patternListStack.push({
	          type: stateChar,
	          start: i - 1,
	          reStart: re.length,
	          open: plTypes[stateChar].open,
	          close: plTypes[stateChar].close
	        })
	        // negation is (?:(?!js)[^/]*)
	        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
	        this.debug('plType %j %j', stateChar, re)
	        stateChar = false
	      continue

	      case ')':
	        if (inClass || !patternListStack.length) {
	          re += '\\)'
	          continue
	        }

	        clearStateChar()
	        hasMagic = true
	        var pl = patternListStack.pop()
	        // negation is (?:(?!js)[^/]*)
	        // The others are (?:<pattern>)<type>
	        re += pl.close
	        if (pl.type === '!') {
	          negativeLists.push(pl)
	        }
	        pl.reEnd = re.length
	      continue

	      case '|':
	        if (inClass || !patternListStack.length || escaping) {
	          re += '\\|'
	          escaping = false
	          continue
	        }

	        clearStateChar()
	        re += '|'
	      continue

	      // these are mostly the same in regexp and glob
	      case '[':
	        // swallow any state-tracking char before the [
	        clearStateChar()

	        if (inClass) {
	          re += '\\' + c
	          continue
	        }

	        inClass = true
	        classStart = i
	        reClassStart = re.length
	        re += c
	      continue

	      case ']':
	        //  a right bracket shall lose its special
	        //  meaning and represent itself in
	        //  a bracket expression if it occurs
	        //  first in the list.  -- POSIX.2 2.8.3.2
	        if (i === classStart + 1 || !inClass) {
	          re += '\\' + c
	          escaping = false
	          continue
	        }

	        // handle the case where we left a class open.
	        // "[z-a]" is valid, equivalent to "\[z-a\]"
	        if (inClass) {
	          // split where the last [ was, make sure we don't have
	          // an invalid re. if so, re-walk the contents of the
	          // would-be class to re-translate any characters that
	          // were passed through as-is
	          // TODO: It would probably be faster to determine this
	          // without a try/catch and a new RegExp, but it's tricky
	          // to do safely.  For now, this is safe and works.
	          var cs = pattern.substring(classStart + 1, i)
	          try {
	            RegExp('[' + cs + ']')
	          } catch (er) {
	            // not a valid class!
	            var sp = this.parse(cs, SUBPARSE)
	            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
	            hasMagic = hasMagic || sp[1]
	            inClass = false
	            continue
	          }
	        }

	        // finish up the class.
	        hasMagic = true
	        inClass = false
	        re += c
	      continue

	      default:
	        // swallow any state char that wasn't consumed
	        clearStateChar()

	        if (escaping) {
	          // no need
	          escaping = false
	        } else if (reSpecials[c]
	          && !(c === '^' && inClass)) {
	          re += '\\'
	        }

	        re += c

	    } // switch
	  } // for

	  // handle the case where we left a class open.
	  // "[abc" is valid, equivalent to "\[abc"
	  if (inClass) {
	    // split where the last [ was, and escape it
	    // this is a huge pita.  We now have to re-walk
	    // the contents of the would-be class to re-translate
	    // any characters that were passed through as-is
	    cs = pattern.substr(classStart + 1)
	    sp = this.parse(cs, SUBPARSE)
	    re = re.substr(0, reClassStart) + '\\[' + sp[0]
	    hasMagic = hasMagic || sp[1]
	  }

	  // handle the case where we had a +( thing at the *end*
	  // of the pattern.
	  // each pattern list stack adds 3 chars, and we need to go through
	  // and escape any | chars that were passed through as-is for the regexp.
	  // Go through and escape them, taking care not to double-escape any
	  // | chars that were already escaped.
	  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
	    var tail = re.slice(pl.reStart + pl.open.length)
	    this.debug('setting tail', re, pl)
	    // maybe some even number of \, then maybe 1 \, followed by a |
	    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
	      if (!$2) {
	        // the | isn't already escaped, so escape it.
	        $2 = '\\'
	      }

	      // need to escape all those slashes *again*, without escaping the
	      // one that we need for escaping the | character.  As it works out,
	      // escaping an even number of slashes can be done by simply repeating
	      // it exactly after itself.  That's why this trick works.
	      //
	      // I am sorry that you have to see this.
	      return $1 + $1 + $2 + '|'
	    })

	    this.debug('tail=%j\n   %s', tail, tail, pl, re)
	    var t = pl.type === '*' ? star
	      : pl.type === '?' ? qmark
	      : '\\' + pl.type

	    hasMagic = true
	    re = re.slice(0, pl.reStart) + t + '\\(' + tail
	  }

	  // handle trailing things that only matter at the very end.
	  clearStateChar()
	  if (escaping) {
	    // trailing \\
	    re += '\\\\'
	  }

	  // only need to apply the nodot start if the re starts with
	  // something that could conceivably capture a dot
	  var addPatternStart = false
	  switch (re.charAt(0)) {
	    case '.':
	    case '[':
	    case '(': addPatternStart = true
	  }

	  // Hack to work around lack of negative lookbehind in JS
	  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
	  // like 'a.xyz.yz' doesn't match.  So, the first negative
	  // lookahead, has to look ALL the way ahead, to the end of
	  // the pattern.
	  for (var n = negativeLists.length - 1; n > -1; n--) {
	    var nl = negativeLists[n]

	    var nlBefore = re.slice(0, nl.reStart)
	    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
	    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
	    var nlAfter = re.slice(nl.reEnd)

	    nlLast += nlAfter

	    // Handle nested stuff like *(*.js|!(*.json)), where open parens
	    // mean that we should *not* include the ) in the bit that is considered
	    // "after" the negated section.
	    var openParensBefore = nlBefore.split('(').length - 1
	    var cleanAfter = nlAfter
	    for (i = 0; i < openParensBefore; i++) {
	      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
	    }
	    nlAfter = cleanAfter

	    var dollar = ''
	    if (nlAfter === '' && isSub !== SUBPARSE) {
	      dollar = '$'
	    }
	    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
	    re = newRe
	  }

	  // if the re is not "" at this point, then we need to make sure
	  // it doesn't match against an empty path part.
	  // Otherwise a/* will match a/, which it should not.
	  if (re !== '' && hasMagic) {
	    re = '(?=.)' + re
	  }

	  if (addPatternStart) {
	    re = patternStart + re
	  }

	  // parsing just a piece of a larger pattern.
	  if (isSub === SUBPARSE) {
	    return [re, hasMagic]
	  }

	  // skip the regexp for non-magical patterns
	  // unescape anything in it, though, so that it'll be
	  // an exact match against a file etc.
	  if (!hasMagic) {
	    return globUnescape(pattern)
	  }

	  var flags = options.nocase ? 'i' : ''
	  try {
	    var regExp = new RegExp('^' + re + '$', flags)
	  } catch (er) {
	    // If it was an invalid regular expression, then it can't match
	    // anything.  This trick looks for a character after the end of
	    // the string, which is of course impossible, except in multi-line
	    // mode, but it's not a /m regex.
	    return new RegExp('$.')
	  }

	  regExp._glob = pattern
	  regExp._src = re

	  return regExp
	}

	minimatch.makeRe = function (pattern, options) {
	  return new Minimatch(pattern, options || {}).makeRe()
	}

	Minimatch.prototype.makeRe = makeRe
	function makeRe () {
	  if (this.regexp || this.regexp === false) return this.regexp

	  // at this point, this.set is a 2d array of partial
	  // pattern strings, or "**".
	  //
	  // It's better to use .match().  This function shouldn't
	  // be used, really, but it's pretty convenient sometimes,
	  // when you just want to work with a regex.
	  var set = this.set

	  if (!set.length) {
	    this.regexp = false
	    return this.regexp
	  }
	  var options = this.options

	  var twoStar = options.noglobstar ? star
	    : options.dot ? twoStarDot
	    : twoStarNoDot
	  var flags = options.nocase ? 'i' : ''

	  var re = set.map(function (pattern) {
	    return pattern.map(function (p) {
	      return (p === GLOBSTAR) ? twoStar
	      : (typeof p === 'string') ? regExpEscape(p)
	      : p._src
	    }).join('\\\/')
	  }).join('|')

	  // must match entire pattern
	  // ending in a * or ** will make it less strict.
	  re = '^(?:' + re + ')$'

	  // can match anything, as long as it's not this.
	  if (this.negate) re = '^(?!' + re + ').*$'

	  try {
	    this.regexp = new RegExp(re, flags)
	  } catch (ex) {
	    this.regexp = false
	  }
	  return this.regexp
	}

	minimatch.match = function (list, pattern, options) {
	  options = options || {}
	  var mm = new Minimatch(pattern, options)
	  list = list.filter(function (f) {
	    return mm.match(f)
	  })
	  if (mm.options.nonull && !list.length) {
	    list.push(pattern)
	  }
	  return list
	}

	Minimatch.prototype.match = match
	function match (f, partial) {
	  this.debug('match', f, this.pattern)
	  // short-circuit in the case of busted things.
	  // comments, etc.
	  if (this.comment) return false
	  if (this.empty) return f === ''

	  if (f === '/' && partial) return true

	  var options = this.options

	  // windows: need to use /, not \
	  if (path.sep !== '/') {
	    f = f.split(path.sep).join('/')
	  }

	  // treat the test path as a set of pathparts.
	  f = f.split(slashSplit)
	  this.debug(this.pattern, 'split', f)

	  // just ONE of the pattern sets in this.set needs to match
	  // in order for it to be valid.  If negating, then just one
	  // match means that we have failed.
	  // Either way, return on the first hit.

	  var set = this.set
	  this.debug(this.pattern, 'set', set)

	  // Find the basename of the path by looking for the last non-empty segment
	  var filename
	  var i
	  for (i = f.length - 1; i >= 0; i--) {
	    filename = f[i]
	    if (filename) break
	  }

	  for (i = 0; i < set.length; i++) {
	    var pattern = set[i]
	    var file = f
	    if (options.matchBase && pattern.length === 1) {
	      file = [filename]
	    }
	    var hit = this.matchOne(file, pattern, partial)
	    if (hit) {
	      if (options.flipNegate) return true
	      return !this.negate
	    }
	  }

	  // didn't get any hits.  this is success if it's a negative
	  // pattern, failure otherwise.
	  if (options.flipNegate) return false
	  return this.negate
	}

	// set partial to true to test if, for example,
	// "/a/b" matches the start of "/*/b/*/d"
	// Partial means, if you run out of file before you run
	// out of pattern, then that's fine, as long as all
	// the parts match.
	Minimatch.prototype.matchOne = function (file, pattern, partial) {
	  var options = this.options

	  this.debug('matchOne',
	    { 'this': this, file: file, pattern: pattern })

	  this.debug('matchOne', file.length, pattern.length)

	  for (var fi = 0,
	      pi = 0,
	      fl = file.length,
	      pl = pattern.length
	      ; (fi < fl) && (pi < pl)
	      ; fi++, pi++) {
	    this.debug('matchOne loop')
	    var p = pattern[pi]
	    var f = file[fi]

	    this.debug(pattern, p, f)

	    // should be impossible.
	    // some invalid regexp stuff in the set.
	    if (p === false) return false

	    if (p === GLOBSTAR) {
	      this.debug('GLOBSTAR', [pattern, p, f])

	      // "**"
	      // a/**/b/**/c would match the following:
	      // a/b/x/y/z/c
	      // a/x/y/z/b/c
	      // a/b/x/b/x/c
	      // a/b/c
	      // To do this, take the rest of the pattern after
	      // the **, and see if it would match the file remainder.
	      // If so, return success.
	      // If not, the ** "swallows" a segment, and try again.
	      // This is recursively awful.
	      //
	      // a/**/b/**/c matching a/b/x/y/z/c
	      // - a matches a
	      // - doublestar
	      //   - matchOne(b/x/y/z/c, b/**/c)
	      //     - b matches b
	      //     - doublestar
	      //       - matchOne(x/y/z/c, c) -> no
	      //       - matchOne(y/z/c, c) -> no
	      //       - matchOne(z/c, c) -> no
	      //       - matchOne(c, c) yes, hit
	      var fr = fi
	      var pr = pi + 1
	      if (pr === pl) {
	        this.debug('** at the end')
	        // a ** at the end will just swallow the rest.
	        // We have found a match.
	        // however, it will not swallow /.x, unless
	        // options.dot is set.
	        // . and .. are *never* matched by **, for explosively
	        // exponential reasons.
	        for (; fi < fl; fi++) {
	          if (file[fi] === '.' || file[fi] === '..' ||
	            (!options.dot && file[fi].charAt(0) === '.')) return false
	        }
	        return true
	      }

	      // ok, let's see if we can swallow whatever we can.
	      while (fr < fl) {
	        var swallowee = file[fr]

	        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

	        // XXX remove this slice.  Just pass the start index.
	        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
	          this.debug('globstar found match!', fr, fl, swallowee)
	          // found a match.
	          return true
	        } else {
	          // can't swallow "." or ".." ever.
	          // can only swallow ".foo" when explicitly asked.
	          if (swallowee === '.' || swallowee === '..' ||
	            (!options.dot && swallowee.charAt(0) === '.')) {
	            this.debug('dot detected!', file, fr, pattern, pr)
	            break
	          }

	          // ** swallows a segment, and continue.
	          this.debug('globstar swallow a segment, and continue')
	          fr++
	        }
	      }

	      // no match was found.
	      // However, in partial mode, we can't say this is necessarily over.
	      // If there's more *pattern* left, then
	      if (partial) {
	        // ran out of file
	        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
	        if (fr === fl) return true
	      }
	      return false
	    }

	    // something other than **
	    // non-magic patterns just have to match exactly
	    // patterns with magic have been turned into regexps.
	    var hit
	    if (typeof p === 'string') {
	      if (options.nocase) {
	        hit = f.toLowerCase() === p.toLowerCase()
	      } else {
	        hit = f === p
	      }
	      this.debug('string match', p, f, hit)
	    } else {
	      hit = f.match(p)
	      this.debug('pattern match', p, f, hit)
	    }

	    if (!hit) return false
	  }

	  // Note: ending in / means that we'll get a final ""
	  // at the end of the pattern.  This can only match a
	  // corresponding "" at the end of the file.
	  // If the file ends in /, then it can only match a
	  // a pattern that ends in /, unless the pattern just
	  // doesn't have any more for it. But, a/b/ should *not*
	  // match "a/b/*", even though "" matches against the
	  // [^/]*? pattern, except in partial mode, where it might
	  // simply not be reached yet.
	  // However, a/b/ should still satisfy a/*

	  // now either we fell off the end of the pattern, or we're done.
	  if (fi === fl && pi === pl) {
	    // ran out of pattern and filename at the same time.
	    // an exact hit!
	    return true
	  } else if (fi === fl) {
	    // ran out of file, but still had pattern left.
	    // this is ok if we're doing the match as part of
	    // a glob fs traversal.
	    return partial
	  } else if (pi === pl) {
	    // ran out of pattern, still have file left.
	    // this is only acceptable if we're on the very last
	    // empty segment of a file with a trailing slash.
	    // a/* should match a/b/
	    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
	    return emptyFileEnd
	  }

	  // should be unreachable.
	  throw new Error('wtf?')
	}

	// replace stuff like \* with *
	function globUnescape (s) {
	  return s.replace(/\\(.)/g, '$1')
	}

	function regExpEscape (s) {
	  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
	}


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var concatMap = __webpack_require__(37);
	var balanced = __webpack_require__(38);

	module.exports = expandTop;

	var escSlash = '\0SLASH'+Math.random()+'\0';
	var escOpen = '\0OPEN'+Math.random()+'\0';
	var escClose = '\0CLOSE'+Math.random()+'\0';
	var escComma = '\0COMMA'+Math.random()+'\0';
	var escPeriod = '\0PERIOD'+Math.random()+'\0';

	function numeric(str) {
	  return parseInt(str, 10) == str
	    ? parseInt(str, 10)
	    : str.charCodeAt(0);
	}

	function escapeBraces(str) {
	  return str.split('\\\\').join(escSlash)
	            .split('\\{').join(escOpen)
	            .split('\\}').join(escClose)
	            .split('\\,').join(escComma)
	            .split('\\.').join(escPeriod);
	}

	function unescapeBraces(str) {
	  return str.split(escSlash).join('\\')
	            .split(escOpen).join('{')
	            .split(escClose).join('}')
	            .split(escComma).join(',')
	            .split(escPeriod).join('.');
	}


	// Basically just str.split(","), but handling cases
	// where we have nested braced sections, which should be
	// treated as individual members, like {a,{b,c},d}
	function parseCommaParts(str) {
	  if (!str)
	    return [''];

	  var parts = [];
	  var m = balanced('{', '}', str);

	  if (!m)
	    return str.split(',');

	  var pre = m.pre;
	  var body = m.body;
	  var post = m.post;
	  var p = pre.split(',');

	  p[p.length-1] += '{' + body + '}';
	  var postParts = parseCommaParts(post);
	  if (post.length) {
	    p[p.length-1] += postParts.shift();
	    p.push.apply(p, postParts);
	  }

	  parts.push.apply(parts, p);

	  return parts;
	}

	function expandTop(str) {
	  if (!str)
	    return [];

	  // I don't know why Bash 4.3 does this, but it does.
	  // Anything starting with {} will have the first two bytes preserved
	  // but *only* at the top level, so {},a}b will not expand to anything,
	  // but a{},b}c will be expanded to [a}c,abc].
	  // One could argue that this is a bug in Bash, but since the goal of
	  // this module is to match Bash's rules, we escape a leading {}
	  if (str.substr(0, 2) === '{}') {
	    str = '\\{\\}' + str.substr(2);
	  }

	  return expand(escapeBraces(str), true).map(unescapeBraces);
	}

	function identity(e) {
	  return e;
	}

	function embrace(str) {
	  return '{' + str + '}';
	}
	function isPadded(el) {
	  return /^-?0\d/.test(el);
	}

	function lte(i, y) {
	  return i <= y;
	}
	function gte(i, y) {
	  return i >= y;
	}

	function expand(str, isTop) {
	  var expansions = [];

	  var m = balanced('{', '}', str);
	  if (!m || /\$$/.test(m.pre)) return [str];

	  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
	  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
	  var isSequence = isNumericSequence || isAlphaSequence;
	  var isOptions = /^(.*,)+(.+)?$/.test(m.body);
	  if (!isSequence && !isOptions) {
	    // {a},b}
	    if (m.post.match(/,.*\}/)) {
	      str = m.pre + '{' + m.body + escClose + m.post;
	      return expand(str);
	    }
	    return [str];
	  }

	  var n;
	  if (isSequence) {
	    n = m.body.split(/\.\./);
	  } else {
	    n = parseCommaParts(m.body);
	    if (n.length === 1) {
	      // x{{a,b}}y ==> x{a}y x{b}y
	      n = expand(n[0], false).map(embrace);
	      if (n.length === 1) {
	        var post = m.post.length
	          ? expand(m.post, false)
	          : [''];
	        return post.map(function(p) {
	          return m.pre + n[0] + p;
	        });
	      }
	    }
	  }

	  // at this point, n is the parts, and we know it's not a comma set
	  // with a single entry.

	  // no need to expand pre, since it is guaranteed to be free of brace-sets
	  var pre = m.pre;
	  var post = m.post.length
	    ? expand(m.post, false)
	    : [''];

	  var N;

	  if (isSequence) {
	    var x = numeric(n[0]);
	    var y = numeric(n[1]);
	    var width = Math.max(n[0].length, n[1].length)
	    var incr = n.length == 3
	      ? Math.abs(numeric(n[2]))
	      : 1;
	    var test = lte;
	    var reverse = y < x;
	    if (reverse) {
	      incr *= -1;
	      test = gte;
	    }
	    var pad = n.some(isPadded);

	    N = [];

	    for (var i = x; test(i, y); i += incr) {
	      var c;
	      if (isAlphaSequence) {
	        c = String.fromCharCode(i);
	        if (c === '\\')
	          c = '';
	      } else {
	        c = String(i);
	        if (pad) {
	          var need = width - c.length;
	          if (need > 0) {
	            var z = new Array(need + 1).join('0');
	            if (i < 0)
	              c = '-' + z + c.slice(1);
	            else
	              c = z + c;
	          }
	        }
	      }
	      N.push(c);
	    }
	  } else {
	    N = concatMap(n, function(el) { return expand(el, false) });
	  }

	  for (var j = 0; j < N.length; j++) {
	    for (var k = 0; k < post.length; k++) {
	      var expansion = pre + N[j] + post[k];
	      if (!isTop || isSequence || expansion)
	        expansions.push(expansion);
	    }
	  }

	  return expansions;
	}



/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = function (xs, fn) {
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        var x = fn(xs[i], i);
	        if (isArray(x)) res.push.apply(res, x);
	        else res.push(x);
	    }
	    return res;
	};

	var isArray = Array.isArray || function (xs) {
	    return Object.prototype.toString.call(xs) === '[object Array]';
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = balanced;
	function balanced(a, b, str) {
	  if (a instanceof RegExp) a = maybeMatch(a, str);
	  if (b instanceof RegExp) b = maybeMatch(b, str);

	  var r = range(a, b, str);

	  return r && {
	    start: r[0],
	    end: r[1],
	    pre: str.slice(0, r[0]),
	    body: str.slice(r[0] + a.length, r[1]),
	    post: str.slice(r[1] + b.length)
	  };
	}

	function maybeMatch(reg, str) {
	  var m = str.match(reg);
	  return m ? m[0] : null;
	}

	balanced.range = range;
	function range(a, b, str) {
	  var begs, beg, left, right, result;
	  var ai = str.indexOf(a);
	  var bi = str.indexOf(b, ai + 1);
	  var i = ai;

	  if (ai >= 0 && bi > 0) {
	    begs = [];
	    left = str.length;

	    while (i >= 0 && !result) {
	      if (i == ai) {
	        begs.push(i);
	        ai = str.indexOf(a, i + 1);
	      } else if (begs.length == 1) {
	        result = [ begs.pop(), bi ];
	      } else {
	        beg = begs.pop();
	        if (beg < left) {
	          left = beg;
	          right = bi;
	        }

	        bi = str.indexOf(b, i + 1);
	      }

	      i = ai < bi && ai >= 0 ? ai : bi;
	    }

	    if (begs.length) {
	      result = [ left, right ];
	    }
	  }

	  return result;
	}


/***/ },
/* 39 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	function posix(path) {
		return path.charAt(0) === '/';
	}

	function win32(path) {
		// https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
		var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
		var result = splitDeviceRe.exec(path);
		var device = result[1] || '';
		var isUnc = Boolean(device && device.charAt(1) !== ':');

		// UNC paths are always absolute
		return Boolean(result[2] || isUnc);
	}

	module.exports = process.platform === 'win32' ? win32 : posix;
	module.exports.posix = posix;
	module.exports.win32 = win32;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {module.exports = globSync
	globSync.GlobSync = GlobSync

	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	var rp = __webpack_require__(33)
	var minimatch = __webpack_require__(35)
	var Minimatch = minimatch.Minimatch
	var Glob = __webpack_require__(32).Glob
	var util = __webpack_require__(10)
	var path = __webpack_require__(17)
	var assert = __webpack_require__(31)
	var isAbsolute = __webpack_require__(40)
	var common = __webpack_require__(42)
	var alphasort = common.alphasort
	var alphasorti = common.alphasorti
	var setopts = common.setopts
	var ownProp = common.ownProp
	var childrenIgnored = common.childrenIgnored
	var isIgnored = common.isIgnored

	function globSync (pattern, options) {
	  if (typeof options === 'function' || arguments.length === 3)
	    throw new TypeError('callback provided to sync glob\n'+
	                        'See: https://github.com/isaacs/node-glob/issues/167')

	  return new GlobSync(pattern, options).found
	}

	function GlobSync (pattern, options) {
	  if (!pattern)
	    throw new Error('must provide pattern')

	  if (typeof options === 'function' || arguments.length === 3)
	    throw new TypeError('callback provided to sync glob\n'+
	                        'See: https://github.com/isaacs/node-glob/issues/167')

	  if (!(this instanceof GlobSync))
	    return new GlobSync(pattern, options)

	  setopts(this, pattern, options)

	  if (this.noprocess)
	    return this

	  var n = this.minimatch.set.length
	  this.matches = new Array(n)
	  for (var i = 0; i < n; i ++) {
	    this._process(this.minimatch.set[i], i, false)
	  }
	  this._finish()
	}

	GlobSync.prototype._finish = function () {
	  assert(this instanceof GlobSync)
	  if (this.realpath) {
	    var self = this
	    this.matches.forEach(function (matchset, index) {
	      var set = self.matches[index] = Object.create(null)
	      for (var p in matchset) {
	        try {
	          p = self._makeAbs(p)
	          var real = rp.realpathSync(p, self.realpathCache)
	          set[real] = true
	        } catch (er) {
	          if (er.syscall === 'stat')
	            set[self._makeAbs(p)] = true
	          else
	            throw er
	        }
	      }
	    })
	  }
	  common.finish(this)
	}


	GlobSync.prototype._process = function (pattern, index, inGlobStar) {
	  assert(this instanceof GlobSync)

	  // Get the first [n] parts of pattern that are all strings.
	  var n = 0
	  while (typeof pattern[n] === 'string') {
	    n ++
	  }
	  // now n is the index of the first one that is *not* a string.

	  // See if there's anything else
	  var prefix
	  switch (n) {
	    // if not, then this is rather simple
	    case pattern.length:
	      this._processSimple(pattern.join('/'), index)
	      return

	    case 0:
	      // pattern *starts* with some non-trivial item.
	      // going to readdir(cwd), but not include the prefix in matches.
	      prefix = null
	      break

	    default:
	      // pattern has some string bits in the front.
	      // whatever it starts with, whether that's 'absolute' like /foo/bar,
	      // or 'relative' like '../baz'
	      prefix = pattern.slice(0, n).join('/')
	      break
	  }

	  var remain = pattern.slice(n)

	  // get the list of entries.
	  var read
	  if (prefix === null)
	    read = '.'
	  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
	    if (!prefix || !isAbsolute(prefix))
	      prefix = '/' + prefix
	    read = prefix
	  } else
	    read = prefix

	  var abs = this._makeAbs(read)

	  //if ignored, skip processing
	  if (childrenIgnored(this, read))
	    return

	  var isGlobStar = remain[0] === minimatch.GLOBSTAR
	  if (isGlobStar)
	    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
	  else
	    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
	}


	GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
	  var entries = this._readdir(abs, inGlobStar)

	  // if the abs isn't a dir, then nothing can match!
	  if (!entries)
	    return

	  // It will only match dot entries if it starts with a dot, or if
	  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
	  var pn = remain[0]
	  var negate = !!this.minimatch.negate
	  var rawGlob = pn._glob
	  var dotOk = this.dot || rawGlob.charAt(0) === '.'

	  var matchedEntries = []
	  for (var i = 0; i < entries.length; i++) {
	    var e = entries[i]
	    if (e.charAt(0) !== '.' || dotOk) {
	      var m
	      if (negate && !prefix) {
	        m = !e.match(pn)
	      } else {
	        m = e.match(pn)
	      }
	      if (m)
	        matchedEntries.push(e)
	    }
	  }

	  var len = matchedEntries.length
	  // If there are no matched entries, then nothing matches.
	  if (len === 0)
	    return

	  // if this is the last remaining pattern bit, then no need for
	  // an additional stat *unless* the user has specified mark or
	  // stat explicitly.  We know they exist, since readdir returned
	  // them.

	  if (remain.length === 1 && !this.mark && !this.stat) {
	    if (!this.matches[index])
	      this.matches[index] = Object.create(null)

	    for (var i = 0; i < len; i ++) {
	      var e = matchedEntries[i]
	      if (prefix) {
	        if (prefix.slice(-1) !== '/')
	          e = prefix + '/' + e
	        else
	          e = prefix + e
	      }

	      if (e.charAt(0) === '/' && !this.nomount) {
	        e = path.join(this.root, e)
	      }
	      this._emitMatch(index, e)
	    }
	    // This was the last one, and no stats were needed
	    return
	  }

	  // now test all matched entries as stand-ins for that part
	  // of the pattern.
	  remain.shift()
	  for (var i = 0; i < len; i ++) {
	    var e = matchedEntries[i]
	    var newPattern
	    if (prefix)
	      newPattern = [prefix, e]
	    else
	      newPattern = [e]
	    this._process(newPattern.concat(remain), index, inGlobStar)
	  }
	}


	GlobSync.prototype._emitMatch = function (index, e) {
	  if (isIgnored(this, e))
	    return

	  var abs = this._makeAbs(e)

	  if (this.mark)
	    e = this._mark(e)

	  if (this.absolute) {
	    e = abs
	  }

	  if (this.matches[index][e])
	    return

	  if (this.nodir) {
	    var c = this.cache[abs]
	    if (c === 'DIR' || Array.isArray(c))
	      return
	  }

	  this.matches[index][e] = true

	  if (this.stat)
	    this._stat(e)
	}


	GlobSync.prototype._readdirInGlobStar = function (abs) {
	  // follow all symlinked directories forever
	  // just proceed as if this is a non-globstar situation
	  if (this.follow)
	    return this._readdir(abs, false)

	  var entries
	  var lstat
	  var stat
	  try {
	    lstat = fs.lstatSync(abs)
	  } catch (er) {
	    if (er.code === 'ENOENT') {
	      // lstat failed, doesn't exist
	      return null
	    }
	  }

	  var isSym = lstat && lstat.isSymbolicLink()
	  this.symlinks[abs] = isSym

	  // If it's not a symlink or a dir, then it's definitely a regular file.
	  // don't bother doing a readdir in that case.
	  if (!isSym && lstat && !lstat.isDirectory())
	    this.cache[abs] = 'FILE'
	  else
	    entries = this._readdir(abs, false)

	  return entries
	}

	GlobSync.prototype._readdir = function (abs, inGlobStar) {
	  var entries

	  if (inGlobStar && !ownProp(this.symlinks, abs))
	    return this._readdirInGlobStar(abs)

	  if (ownProp(this.cache, abs)) {
	    var c = this.cache[abs]
	    if (!c || c === 'FILE')
	      return null

	    if (Array.isArray(c))
	      return c
	  }

	  try {
	    return this._readdirEntries(abs, fs.readdirSync(abs))
	  } catch (er) {
	    this._readdirError(abs, er)
	    return null
	  }
	}

	GlobSync.prototype._readdirEntries = function (abs, entries) {
	  // if we haven't asked to stat everything, then just
	  // assume that everything in there exists, so we can avoid
	  // having to stat it a second time.
	  if (!this.mark && !this.stat) {
	    for (var i = 0; i < entries.length; i ++) {
	      var e = entries[i]
	      if (abs === '/')
	        e = abs + e
	      else
	        e = abs + '/' + e
	      this.cache[e] = true
	    }
	  }

	  this.cache[abs] = entries

	  // mark and cache dir-ness
	  return entries
	}

	GlobSync.prototype._readdirError = function (f, er) {
	  // handle errors, and cache the information
	  switch (er.code) {
	    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
	    case 'ENOTDIR': // totally normal. means it *does* exist.
	      var abs = this._makeAbs(f)
	      this.cache[abs] = 'FILE'
	      if (abs === this.cwdAbs) {
	        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
	        error.path = this.cwd
	        error.code = er.code
	        throw error
	      }
	      break

	    case 'ENOENT': // not terribly unusual
	    case 'ELOOP':
	    case 'ENAMETOOLONG':
	    case 'UNKNOWN':
	      this.cache[this._makeAbs(f)] = false
	      break

	    default: // some unusual error.  Treat as failure.
	      this.cache[this._makeAbs(f)] = false
	      if (this.strict)
	        throw er
	      if (!this.silent)
	        console.error('glob error', er)
	      break
	  }
	}

	GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

	  var entries = this._readdir(abs, inGlobStar)

	  // no entries means not a dir, so it can never have matches
	  // foo.txt/** doesn't match foo.txt
	  if (!entries)
	    return

	  // test without the globstar, and with every child both below
	  // and replacing the globstar.
	  var remainWithoutGlobStar = remain.slice(1)
	  var gspref = prefix ? [ prefix ] : []
	  var noGlobStar = gspref.concat(remainWithoutGlobStar)

	  // the noGlobStar pattern exits the inGlobStar state
	  this._process(noGlobStar, index, false)

	  var len = entries.length
	  var isSym = this.symlinks[abs]

	  // If it's a symlink, and we're in a globstar, then stop
	  if (isSym && inGlobStar)
	    return

	  for (var i = 0; i < len; i++) {
	    var e = entries[i]
	    if (e.charAt(0) === '.' && !this.dot)
	      continue

	    // these two cases enter the inGlobStar state
	    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
	    this._process(instead, index, true)

	    var below = gspref.concat(entries[i], remain)
	    this._process(below, index, true)
	  }
	}

	GlobSync.prototype._processSimple = function (prefix, index) {
	  // XXX review this.  Shouldn't it be doing the mounting etc
	  // before doing stat?  kinda weird?
	  var exists = this._stat(prefix)

	  if (!this.matches[index])
	    this.matches[index] = Object.create(null)

	  // If it doesn't exist, then just mark the lack of results
	  if (!exists)
	    return

	  if (prefix && isAbsolute(prefix) && !this.nomount) {
	    var trail = /[\/\\]$/.test(prefix)
	    if (prefix.charAt(0) === '/') {
	      prefix = path.join(this.root, prefix)
	    } else {
	      prefix = path.resolve(this.root, prefix)
	      if (trail)
	        prefix += '/'
	    }
	  }

	  if (process.platform === 'win32')
	    prefix = prefix.replace(/\\/g, '/')

	  // Mark this as a match
	  this._emitMatch(index, prefix)
	}

	// Returns either 'DIR', 'FILE', or false
	GlobSync.prototype._stat = function (f) {
	  var abs = this._makeAbs(f)
	  var needDir = f.slice(-1) === '/'

	  if (f.length > this.maxLength)
	    return false

	  if (!this.stat && ownProp(this.cache, abs)) {
	    var c = this.cache[abs]

	    if (Array.isArray(c))
	      c = 'DIR'

	    // It exists, but maybe not how we need it
	    if (!needDir || c === 'DIR')
	      return c

	    if (needDir && c === 'FILE')
	      return false

	    // otherwise we have to stat, because maybe c=true
	    // if we know it exists, but not what it is.
	  }

	  var exists
	  var stat = this.statCache[abs]
	  if (!stat) {
	    var lstat
	    try {
	      lstat = fs.lstatSync(abs)
	    } catch (er) {
	      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
	        this.statCache[abs] = false
	        return false
	      }
	    }

	    if (lstat && lstat.isSymbolicLink()) {
	      try {
	        stat = fs.statSync(abs)
	      } catch (er) {
	        stat = lstat
	      }
	    } else {
	      stat = lstat
	    }
	  }

	  this.statCache[abs] = stat

	  var c = true
	  if (stat)
	    c = stat.isDirectory() ? 'DIR' : 'FILE'

	  this.cache[abs] = this.cache[abs] || c

	  if (needDir && c === 'FILE')
	    return false

	  return c
	}

	GlobSync.prototype._mark = function (p) {
	  return common.mark(this, p)
	}

	GlobSync.prototype._makeAbs = function (f) {
	  return common.makeAbs(this, f)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {exports.alphasort = alphasort
	exports.alphasorti = alphasorti
	exports.setopts = setopts
	exports.ownProp = ownProp
	exports.makeAbs = makeAbs
	exports.finish = finish
	exports.mark = mark
	exports.isIgnored = isIgnored
	exports.childrenIgnored = childrenIgnored

	function ownProp (obj, field) {
	  return Object.prototype.hasOwnProperty.call(obj, field)
	}

	var path = __webpack_require__(17)
	var minimatch = __webpack_require__(35)
	var isAbsolute = __webpack_require__(40)
	var Minimatch = minimatch.Minimatch

	function alphasorti (a, b) {
	  return a.toLowerCase().localeCompare(b.toLowerCase())
	}

	function alphasort (a, b) {
	  return a.localeCompare(b)
	}

	function setupIgnores (self, options) {
	  self.ignore = options.ignore || []

	  if (!Array.isArray(self.ignore))
	    self.ignore = [self.ignore]

	  if (self.ignore.length) {
	    self.ignore = self.ignore.map(ignoreMap)
	  }
	}

	// ignore patterns are always in dot:true mode.
	function ignoreMap (pattern) {
	  var gmatcher = null
	  if (pattern.slice(-3) === '/**') {
	    var gpattern = pattern.replace(/(\/\*\*)+$/, '')
	    gmatcher = new Minimatch(gpattern, { dot: true })
	  }

	  return {
	    matcher: new Minimatch(pattern, { dot: true }),
	    gmatcher: gmatcher
	  }
	}

	function setopts (self, pattern, options) {
	  if (!options)
	    options = {}

	  // base-matching: just use globstar for that.
	  if (options.matchBase && -1 === pattern.indexOf("/")) {
	    if (options.noglobstar) {
	      throw new Error("base matching requires globstar")
	    }
	    pattern = "**/" + pattern
	  }

	  self.silent = !!options.silent
	  self.pattern = pattern
	  self.strict = options.strict !== false
	  self.realpath = !!options.realpath
	  self.realpathCache = options.realpathCache || Object.create(null)
	  self.follow = !!options.follow
	  self.dot = !!options.dot
	  self.mark = !!options.mark
	  self.nodir = !!options.nodir
	  if (self.nodir)
	    self.mark = true
	  self.sync = !!options.sync
	  self.nounique = !!options.nounique
	  self.nonull = !!options.nonull
	  self.nosort = !!options.nosort
	  self.nocase = !!options.nocase
	  self.stat = !!options.stat
	  self.noprocess = !!options.noprocess
	  self.absolute = !!options.absolute

	  self.maxLength = options.maxLength || Infinity
	  self.cache = options.cache || Object.create(null)
	  self.statCache = options.statCache || Object.create(null)
	  self.symlinks = options.symlinks || Object.create(null)

	  setupIgnores(self, options)

	  self.changedCwd = false
	  var cwd = process.cwd()
	  if (!ownProp(options, "cwd"))
	    self.cwd = cwd
	  else {
	    self.cwd = path.resolve(options.cwd)
	    self.changedCwd = self.cwd !== cwd
	  }

	  self.root = options.root || path.resolve(self.cwd, "/")
	  self.root = path.resolve(self.root)
	  if (process.platform === "win32")
	    self.root = self.root.replace(/\\/g, "/")

	  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
	  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
	  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd)
	  if (process.platform === "win32")
	    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/")
	  self.nomount = !!options.nomount

	  // disable comments and negation in Minimatch.
	  // Note that they are not supported in Glob itself anyway.
	  options.nonegate = true
	  options.nocomment = true

	  self.minimatch = new Minimatch(pattern, options)
	  self.options = self.minimatch.options
	}

	function finish (self) {
	  var nou = self.nounique
	  var all = nou ? [] : Object.create(null)

	  for (var i = 0, l = self.matches.length; i < l; i ++) {
	    var matches = self.matches[i]
	    if (!matches || Object.keys(matches).length === 0) {
	      if (self.nonull) {
	        // do like the shell, and spit out the literal glob
	        var literal = self.minimatch.globSet[i]
	        if (nou)
	          all.push(literal)
	        else
	          all[literal] = true
	      }
	    } else {
	      // had matches
	      var m = Object.keys(matches)
	      if (nou)
	        all.push.apply(all, m)
	      else
	        m.forEach(function (m) {
	          all[m] = true
	        })
	    }
	  }

	  if (!nou)
	    all = Object.keys(all)

	  if (!self.nosort)
	    all = all.sort(self.nocase ? alphasorti : alphasort)

	  // at *some* point we statted all of these
	  if (self.mark) {
	    for (var i = 0; i < all.length; i++) {
	      all[i] = self._mark(all[i])
	    }
	    if (self.nodir) {
	      all = all.filter(function (e) {
	        var notDir = !(/\/$/.test(e))
	        var c = self.cache[e] || self.cache[makeAbs(self, e)]
	        if (notDir && c)
	          notDir = c !== 'DIR' && !Array.isArray(c)
	        return notDir
	      })
	    }
	  }

	  if (self.ignore.length)
	    all = all.filter(function(m) {
	      return !isIgnored(self, m)
	    })

	  self.found = all
	}

	function mark (self, p) {
	  var abs = makeAbs(self, p)
	  var c = self.cache[abs]
	  var m = p
	  if (c) {
	    var isDir = c === 'DIR' || Array.isArray(c)
	    var slash = p.slice(-1) === '/'

	    if (isDir && !slash)
	      m += '/'
	    else if (!isDir && slash)
	      m = m.slice(0, -1)

	    if (m !== p) {
	      var mabs = makeAbs(self, m)
	      self.statCache[mabs] = self.statCache[abs]
	      self.cache[mabs] = self.cache[abs]
	    }
	  }

	  return m
	}

	// lotta situps...
	function makeAbs (self, f) {
	  var abs = f
	  if (f.charAt(0) === '/') {
	    abs = path.join(self.root, f)
	  } else if (isAbsolute(f) || f === '') {
	    abs = f
	  } else if (self.changedCwd) {
	    abs = path.resolve(self.cwd, f)
	  } else {
	    abs = path.resolve(f)
	  }

	  if (process.platform === 'win32')
	    abs = abs.replace(/\\/g, '/')

	  return abs
	}


	// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
	// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
	function isIgnored (self, path) {
	  if (!self.ignore.length)
	    return false

	  return self.ignore.some(function(item) {
	    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
	  })
	}

	function childrenIgnored (self, path) {
	  if (!self.ignore.length)
	    return false

	  return self.ignore.some(function(item) {
	    return !!(item.gmatcher && item.gmatcher.match(path))
	  })
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var wrappy = __webpack_require__(44)
	var reqs = Object.create(null)
	var once = __webpack_require__(45)

	module.exports = wrappy(inflight)

	function inflight (key, cb) {
	  if (reqs[key]) {
	    reqs[key].push(cb)
	    return null
	  } else {
	    reqs[key] = [cb]
	    return makeres(key)
	  }
	}

	function makeres (key) {
	  return once(function RES () {
	    var cbs = reqs[key]
	    var len = cbs.length
	    var args = slice(arguments)

	    // XXX It's somewhat ambiguous whether a new callback added in this
	    // pass should be queued for later execution if something in the
	    // list of callbacks throws, or if it should just be discarded.
	    // However, it's such an edge case that it hardly matters, and either
	    // choice is likely as surprising as the other.
	    // As it happens, we do go ahead and schedule it for later execution.
	    try {
	      for (var i = 0; i < len; i++) {
	        cbs[i].apply(null, args)
	      }
	    } finally {
	      if (cbs.length > len) {
	        // added more in the interim.
	        // de-zalgo, just in case, but don't call again.
	        cbs.splice(0, len)
	        process.nextTick(function () {
	          RES.apply(null, args)
	        })
	      } else {
	        delete reqs[key]
	      }
	    }
	  })
	}

	function slice (args) {
	  var length = args.length
	  var array = []

	  for (var i = 0; i < length; i++) array[i] = args[i]
	  return array
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 44 */
/***/ function(module, exports) {

	// Returns a wrapper function that returns a wrapped callback
	// The wrapper function should do some stuff, and return a
	// presumably different callback function.
	// This makes sure that own properties are retained, so that
	// decorations and such are not lost along the way.
	module.exports = wrappy
	function wrappy (fn, cb) {
	  if (fn && cb) return wrappy(fn)(cb)

	  if (typeof fn !== 'function')
	    throw new TypeError('need wrapper function')

	  Object.keys(fn).forEach(function (k) {
	    wrapper[k] = fn[k]
	  })

	  return wrapper

	  function wrapper() {
	    var args = new Array(arguments.length)
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i]
	    }
	    var ret = fn.apply(this, args)
	    var cb = args[args.length-1]
	    if (typeof ret === 'function' && ret !== cb) {
	      Object.keys(cb).forEach(function (k) {
	        ret[k] = cb[k]
	      })
	    }
	    return ret
	  }
	}


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var wrappy = __webpack_require__(46)
	module.exports = wrappy(once)
	module.exports.strict = wrappy(onceStrict)

	once.proto = once(function () {
	  Object.defineProperty(Function.prototype, 'once', {
	    value: function () {
	      return once(this)
	    },
	    configurable: true
	  })

	  Object.defineProperty(Function.prototype, 'onceStrict', {
	    value: function () {
	      return onceStrict(this)
	    },
	    configurable: true
	  })
	})

	function once (fn) {
	  var f = function () {
	    if (f.called) return f.value
	    f.called = true
	    return f.value = fn.apply(this, arguments)
	  }
	  f.called = false
	  return f
	}

	function onceStrict (fn) {
	  var f = function () {
	    if (f.called)
	      throw new Error(f.onceError)
	    f.called = true
	    return f.value = fn.apply(this, arguments)
	  }
	  var name = fn.name || 'Function wrapped with `once`'
	  f.onceError = name + " shouldn't be called more than once"
	  f.called = false
	  return f
	}


/***/ },
/* 46 */
/***/ function(module, exports) {

	// Returns a wrapper function that returns a wrapped callback
	// The wrapper function should do some stuff, and return a
	// presumably different callback function.
	// This makes sure that own properties are retained, so that
	// decorations and such are not lost along the way.
	module.exports = wrappy
	function wrappy (fn, cb) {
	  if (fn && cb) return wrappy(fn)(cb)

	  if (typeof fn !== 'function')
	    throw new TypeError('need wrapper function')

	  Object.keys(fn).forEach(function (k) {
	    wrapper[k] = fn[k]
	  })

	  return wrapper

	  function wrapper() {
	    var args = new Array(arguments.length)
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i]
	    }
	    var ret = fn.apply(this, args)
	    var cb = args[args.length-1]
	    if (typeof ret === 'function' && ret !== cb) {
	      Object.keys(cb).forEach(function (k) {
	        ret[k] = cb[k]
	      })
	    }
	    return ret
	  }
	}


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, setImmediate) {var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    path = __webpack_require__(17),
	    util = __webpack_require__(10);

	const modern = /^v0\.1\d\.\d+/.test(process.version);

	module.exports = ncp;
	ncp.ncp = ncp;

	function ncp (source, dest, options, callback) {
	  var cback = callback;

	  if (!callback) {
	    cback = options;
	    options = {};
	  }

	  var basePath = process.cwd(),
	      currentPath = path.resolve(basePath, source),
	      targetPath = path.resolve(basePath, dest),
	      filter = options.filter,
	      rename = options.rename,
	      transform = options.transform,
	      clobber = options.clobber !== false,
	      modified = options.modified,
	      dereference = options.dereference,
	      errs = null,
	      eventName = modern ? 'finish' : 'close',
	      defer = modern ? setImmediate : process.nextTick,
	      started = 0,
	      finished = 0,
	      running = 0,
	      limit = options.limit || ncp.limit || 16;

	  limit = (limit < 1) ? 1 : (limit > 512) ? 512 : limit;

	  startCopy(currentPath);
	  
	  function startCopy(source) {
	    started++;
	    if (filter) {
	      if (filter instanceof RegExp) {
	        if (!filter.test(source)) {
	          return cb(true);
	        }
	      }
	      else if (typeof filter === 'function') {
	        if (!filter(source)) {
	          return cb(true);
	        }
	      }
	    }
	    return getStats(source);
	  }

	  function getStats(source) {
	    var stat = dereference ? fs.stat : fs.lstat;
	    if (running >= limit) {
	      return defer(function () {
	        getStats(source);
	      });
	    }
	    running++;
	    stat(source, function (err, stats) {
	      var item = {};
	      if (err) {
	        return onError(err);
	      }

	      // We need to get the mode from the stats object and preserve it.
	      item.name = source;
	      item.mode = stats.mode;
	      item.mtime = stats.mtime; //modified time
	      item.atime = stats.atime; //access time

	      if (stats.isDirectory()) {
	        return onDir(item);
	      }
	      else if (stats.isFile()) {
	        return onFile(item);
	      }
	      else if (stats.isSymbolicLink()) {
	        // Symlinks don't really need to know about the mode.
	        return onLink(source);
	      }
	    });
	  }

	  function onFile(file) {
	    var target = file.name.replace(currentPath, targetPath);
	    if(rename) {
	      target =  rename(target);
	    }
	    isWritable(target, function (writable) {
	      if (writable) {
	        return copyFile(file, target);
	      }
	      if(clobber) {
	        rmFile(target, function () {
	          copyFile(file, target);
	        });
	      }
	      if (modified) {
	        var stat = dereference ? fs.stat : fs.lstat;
	        stat(target, function(err, stats) {
	            //if souce modified time greater to target modified time copy file
	            if (file.mtime.getTime()>stats.mtime.getTime())
	                copyFile(file, target);
	            else return cb();
	        });
	      }
	      else {
	        return cb();
	      }
	    });
	  }

	  function copyFile(file, target) {
	    var readStream = fs.createReadStream(file.name),
	        writeStream = fs.createWriteStream(target, { mode: file.mode });
	    
	    readStream.on('error', onError);
	    writeStream.on('error', onError);
	    
	    if(transform) {
	      transform(readStream, writeStream, file);
	    } else {
	      writeStream.on('open', function() {
	        readStream.pipe(writeStream);
	      });
	    }
	    writeStream.once(eventName, function() {
	        if (modified) {
	            //target file modified date sync.
	            fs.utimesSync(target, file.atime, file.mtime);
	            cb();
	        }
	        else cb();
	    });
	  }

	  function rmFile(file, done) {
	    fs.unlink(file, function (err) {
	      if (err) {
	        return onError(err);
	      }
	      return done();
	    });
	  }

	  function onDir(dir) {
	    var target = dir.name.replace(currentPath, targetPath);
	    isWritable(target, function (writable) {
	      if (writable) {
	        return mkDir(dir, target);
	      }
	      copyDir(dir.name);
	    });
	  }

	  function mkDir(dir, target) {
	    fs.mkdir(target, dir.mode, function (err) {
	      if (err) {
	        return onError(err);
	      }
	      copyDir(dir.name);
	    });
	  }

	  function copyDir(dir) {
	    fs.readdir(dir, function (err, items) {
	      if (err) {
	        return onError(err);
	      }
	      items.forEach(function (item) {
	        startCopy(dir + '/' + item);
	      });
	      return cb();
	    });
	  }

	  function onLink(link) {
	    var target = link.replace(currentPath, targetPath);
	    fs.readlink(link, function (err, resolvedPath) {
	      if (err) {
	        return onError(err);
	      }
	      checkLink(resolvedPath, target);
	    });
	  }

	  function checkLink(resolvedPath, target) {
	    if (dereference) {
	      resolvedPath = path.resolve(basePath, resolvedPath);
	    }
	    isWritable(target, function (writable) {
	      if (writable) {
	        return makeLink(resolvedPath, target);
	      }
	      fs.readlink(target, function (err, targetDest) {
	        if (err) {
	          return onError(err);
	        }
	        if (dereference) {
	          targetDest = path.resolve(basePath, targetDest);
	        }
	        if (targetDest === resolvedPath) {
	          return cb();
	        }
	        return rmFile(target, function () {
	          makeLink(resolvedPath, target);
	        });
	      });
	    });
	  }

	  function makeLink(linkPath, target) {
	    fs.symlink(linkPath, target, function (err) {
	      if (err) {
	        return onError(err);
	      }
	      return cb();
	    });
	  }

	  function isWritable(path, done) {
	    fs.lstat(path, function (err) {
	      if (err) {
	        if (err.code === 'ENOENT') return done(true);
	        return done(false);
	      }
	      return done(false);
	    });
	  }

	  function onError(err) {
	    if (options.stopOnError) {
	      return cback(err);
	    }
	    else if (!errs && options.errs) {
	      errs = fs.createWriteStream(options.errs);
	    }
	    else if (!errs) {
	      errs = [];
	    }
	    if (typeof errs.write === 'undefined') {
	      errs.push(err);
	    }
	    else { 
	      errs.write(err.stack + '\n\n');
	    }
	    return cb();
	  }

	  function cb(skipped) {
	    if (!skipped) running--;
	    finished++;
	    if ((started === finished) && (running === 0)) {
	      if (cback !== undefined ) {
	        return errs ? cback(errs) : cback(null);
	      }
	    }
	  }
	}



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11), __webpack_require__(19).setImmediate))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * file.js: Simple utilities for working with the file system.
	 *
	 * (C) 2011, Charlie Robbins & the Contributors
	 * MIT LICENSE
	 *
	 */

	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	exports.readJson = exports.readJSON = function (file, callback) {
	  if (typeof callback !== 'function') {
	    throw new Error('utile.file.readJson needs a callback');
	  }

	  fs.readFile(file, 'utf-8', function (err, data) {
	    if (err) {
	      return callback(err);
	    }

	    try {
	      var json = JSON.parse(data);
	      callback(null, json);
	    }
	    catch (err) {
	      return callback(err);
	    }
	  });
	};

	exports.readJsonSync = exports.readJSONSync = function (file) {
	  return JSON.parse(fs.readFileSync(file, 'utf-8'));
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * args.js: function argument parsing helper utility
	 *
	 * (C) 2011, Charlie Robbins & the Contributors
	 * MIT LICENSE
	 *
	 */

	var utile = __webpack_require__(16);

	//
	// ### function args(_args)
	// #### _args {Arguments} Original function arguments
	//
	// Top-level method will accept a javascript "arguments" object (the actual keyword
	// "arguments" inside any scope), and attempt to return back an intelligent object
	// representing the functions arguments
	//
	module.exports = function (_args) {
	  var args = utile.rargs(_args),
	      _cb;

	  //
	  // Find and define the first argument
	  //
	  Object.defineProperty(args, 'first', { value: args[0] });

	  //
	  // Find and define any callback
	  //
	  _cb = args[args.length - 1] || args[args.length];
	  if (typeof _cb === "function") {
	    Object.defineProperty(args, 'callback', { value: _cb });
	    Object.defineProperty(args, 'cb', { value: _cb });
	    args.pop();
	  }

	  //
	  // Find and define the last argument
	  //
	  if (args.length) {
	    Object.defineProperty(args, 'last', { value: args[args.length - 1] });
	  }

	  return args;
	};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	 * base64.js: An extremely simple implementation of base64 encoding / decoding using node.js Buffers
	 *
	 * (C) 2010, Charlie Robbins & the Contributors.
	 *
	 */

	var base64 = exports;

	//
	// ### function encode (unencoded)
	// #### @unencoded {string} The string to base64 encode
	// Encodes the specified string to base64 using node.js Buffers.
	//
	base64.encode = function (unencoded) {
	  var encoded;

	  try {
	    encoded = new Buffer(unencoded || '').toString('base64');
	  }
	  catch (ex) {
	    return null;
	  }

	  return encoded;
	};

	//
	// ### function decode (encoded)
	// #### @encoded {string} The string to base64 decode
	// Decodes the specified string from base64 using node.js Buffers.
	//
	base64.decode = function (encoded) {
	  var decoded;

	  try {
	    decoded = new Buffer(encoded || '', 'base64').toString('utf8');
	  }
	  catch (ex) {
	    return null;
	  }

	  return decoded;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * format.js: `util.format` enhancement to allow custom formatting parameters.
	 *
	 * (C) 2011, Charlie Robbins & the Contributors
	 * MIT LICENSE
	 *
	 */

	var util = __webpack_require__(10);

	exports = module.exports = function(str) {
	  var formats = [].slice.call(arguments, 1, 3);

	  if (!(formats[0] instanceof Array && formats[1] instanceof Array) || arguments.length > 3)
	    return util.format.apply(null, arguments);

	  var replacements = formats.pop(),
	      formats = formats.shift();

	  formats.forEach(function(format, id) {
	    str = str.replace(new RegExp(format), replacements[id]);
	  });

	  return str;
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./args": 49,
		"./args.js": 49,
		"./base64": 50,
		"./base64.js": 50,
		"./file": 48,
		"./file.js": 48,
		"./format": 51,
		"./format.js": 51,
		"./index": 16,
		"./index.js": 16
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 52;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	module.exports = read

	var readline = __webpack_require__(4)
	var Mute = __webpack_require__(54)

	function read (opts, cb) {
	  if (opts.num) {
	    throw new Error('read() no longer accepts a char number limit')
	  }

	  if (typeof opts.default !== 'undefined' &&
	      typeof opts.default !== 'string' &&
	      typeof opts.default !== 'number') {
	    throw new Error('default value must be string or number')
	  }

	  var input = opts.input || process.stdin
	  var output = opts.output || process.stdout
	  var prompt = (opts.prompt || '').trim() + ' '
	  var silent = opts.silent
	  var editDef = false
	  var timeout = opts.timeout

	  var def = opts.default || ''
	  if (def) {
	    if (silent) {
	      prompt += '(<default hidden>) '
	    } else if (opts.edit) {
	      editDef = true
	    } else {
	      prompt += '(' + def + ') '
	    }
	  }
	  var terminal = !!(opts.terminal || output.isTTY)

	  var m = new Mute({ replace: opts.replace, prompt: prompt })
	  m.pipe(output, {end: false})
	  output = m
	  var rlOpts = { input: input, output: output, terminal: terminal }

	  if (process.version.match(/^v0\.6/)) {
	    var rl = readline.createInterface(rlOpts.input, rlOpts.output)
	  } else {
	    var rl = readline.createInterface(rlOpts)
	  }


	  output.unmute()
	  rl.setPrompt(prompt)
	  rl.prompt()
	  if (silent) {
	    output.mute()
	  } else if (editDef) {
	    rl.line = def
	    rl.cursor = def.length
	    rl._refreshLine()
	  }

	  var called = false
	  rl.on('line', onLine)
	  rl.on('error', onError)

	  rl.on('SIGINT', function () {
	    rl.close()
	    onError(new Error('canceled'))
	  })

	  var timer
	  if (timeout) {
	    timer = setTimeout(function () {
	      onError(new Error('timed out'))
	    }, timeout)
	  }

	  function done () {
	    called = true
	    rl.close()

	    if (process.version.match(/^v0\.6/)) {
	      rl.input.removeAllListeners('data')
	      rl.input.removeAllListeners('keypress')
	      rl.input.pause()
	    }

	    clearTimeout(timer)
	    output.mute()
	    output.end()
	  }

	  function onError (er) {
	    if (called) return
	    done()
	    return cb(er)
	  }

	  function onLine (line) {
	    if (called) return
	    if (silent && terminal) {
	      output.unmute()
	      output.write('\r\n')
	    }
	    done()
	    // truncate the \n at the end.
	    line = line.replace(/\r?\n$/, '')
	    var isDefault = !!(editDef && line === def)
	    if (def && !line) {
	      isDefault = true
	      line = def
	    }
	    cb(null, line, isDefault)
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(55)

	module.exports = MuteStream

	// var out = new MuteStream(process.stdout)
	// argument auto-pipes
	function MuteStream (opts) {
	  Stream.apply(this)
	  opts = opts || {}
	  this.writable = this.readable = true
	  this.muted = false
	  this.on('pipe', this._onpipe)
	  this.replace = opts.replace

	  // For readline-type situations
	  // This much at the start of a line being redrawn after a ctrl char
	  // is seen (such as backspace) won't be redrawn as the replacement
	  this._prompt = opts.prompt || null
	  this._hadControl = false
	}

	MuteStream.prototype = Object.create(Stream.prototype)

	Object.defineProperty(MuteStream.prototype, 'constructor', {
	  value: MuteStream,
	  enumerable: false
	})

	MuteStream.prototype.mute = function () {
	  this.muted = true
	}

	MuteStream.prototype.unmute = function () {
	  this.muted = false
	}

	Object.defineProperty(MuteStream.prototype, '_onpipe', {
	  value: onPipe,
	  enumerable: false,
	  writable: true,
	  configurable: true
	})

	function onPipe (src) {
	  this._src = src
	}

	Object.defineProperty(MuteStream.prototype, 'isTTY', {
	  get: getIsTTY,
	  set: setIsTTY,
	  enumerable: true,
	  configurable: true
	})

	function getIsTTY () {
	  return( (this._dest) ? this._dest.isTTY
	        : (this._src) ? this._src.isTTY
	        : false
	        )
	}

	// basically just get replace the getter/setter with a regular value
	function setIsTTY (isTTY) {
	  Object.defineProperty(this, 'isTTY', {
	    value: isTTY,
	    enumerable: true,
	    writable: true,
	    configurable: true
	  })
	}

	Object.defineProperty(MuteStream.prototype, 'rows', {
	  get: function () {
	    return( this._dest ? this._dest.rows
	          : this._src ? this._src.rows
	          : undefined )
	  }, enumerable: true, configurable: true })

	Object.defineProperty(MuteStream.prototype, 'columns', {
	  get: function () {
	    return( this._dest ? this._dest.columns
	          : this._src ? this._src.columns
	          : undefined )
	  }, enumerable: true, configurable: true })


	MuteStream.prototype.pipe = function (dest, options) {
	  this._dest = dest
	  return Stream.prototype.pipe.call(this, dest, options)
	}

	MuteStream.prototype.pause = function () {
	  if (this._src) return this._src.pause()
	}

	MuteStream.prototype.resume = function () {
	  if (this._src) return this._src.resume()
	}

	MuteStream.prototype.write = function (c) {
	  if (this.muted) {
	    if (!this.replace) return true
	    if (c.match(/^\u001b/)) {
	      if(c.indexOf(this._prompt) === 0) {
	        c = c.substr(this._prompt.length);
	        c = c.replace(/./g, this.replace);
	        c = this._prompt + c;
	      }
	      this._hadControl = true
	      return this.emit('data', c)
	    } else {
	      if (this._prompt && this._hadControl &&
	          c.indexOf(this._prompt) === 0) {
	        this._hadControl = false
	        this.emit('data', this._prompt)
	        c = c.substr(this._prompt.length)
	      }
	      c = c.toString().replace(/./g, this.replace)
	    }
	  }
	  this.emit('data', c)
	}

	MuteStream.prototype.end = function (c) {
	  if (this.muted) {
	    if (c && this.replace) {
	      c = c.toString().replace(/./g, this.replace)
	    } else {
	      c = null
	    }
	  }
	  if (c) this.emit('data', c)
	  this.emit('end')
	}

	function proxy (fn) { return function () {
	  var d = this._dest
	  var s = this._src
	  if (d && d[fn]) d[fn].apply(d, arguments)
	  if (s && s[fn]) s[fn].apply(s, arguments)
	}}

	MuteStream.prototype.destroy = proxy('destroy')
	MuteStream.prototype.destroySoon = proxy('destroySoon')
	MuteStream.prototype.close = proxy('close')


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Stream;

	var EE = __webpack_require__(9).EventEmitter;
	var inherits = __webpack_require__(56);

	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(57);
	Stream.Writable = __webpack_require__(68);
	Stream.Duplex = __webpack_require__(69);
	Stream.Transform = __webpack_require__(70);
	Stream.PassThrough = __webpack_require__(71);

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;



	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EE.call(this);
	}

	Stream.prototype.pipe = function(dest, options) {
	  var source = this;

	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }

	  source.on('data', ondata);

	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }

	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }

	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    dest.end();
	  }


	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    if (typeof dest.destroy === 'function') dest.destroy();
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);

	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);

	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);

	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);

	    dest.removeListener('close', cleanup);
	  }

	  source.on('end', cleanup);
	  source.on('close', cleanup);

	  dest.on('close', cleanup);

	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ },
/* 56 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {exports = module.exports = __webpack_require__(58);
	exports.Stream = __webpack_require__(55);
	exports.Readable = exports;
	exports.Writable = __webpack_require__(64);
	exports.Duplex = __webpack_require__(63);
	exports.Transform = __webpack_require__(66);
	exports.PassThrough = __webpack_require__(67);
	if (!process.browser && process.env.READABLE_STREAM === 'disable') {
	  module.exports = __webpack_require__(55);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(59);
	/*</replacement>*/


	/*<replacement>*/
	var Buffer = __webpack_require__(5).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(9).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(55);

	/*<replacement>*/
	var util = __webpack_require__(60);
	util.inherits = __webpack_require__(61);
	/*</replacement>*/

	var StringDecoder;


	/*<replacement>*/
	var debug = __webpack_require__(62);
	if (debug && debug.debuglog) {
	  debug = debug.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/


	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  var Duplex = __webpack_require__(63);

	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;


	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(65).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  var Duplex = __webpack_require__(63);

	  if (!(this instanceof Readable))
	    return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;

	  if (util.isString(chunk) && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (util.isNullOrUndefined(chunk)) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);

	      if (!addToFront)
	        state.reading = false;

	      // if we want the data now, just emit it.
	      if (state.flowing && state.length === 0 && !state.sync) {
	        stream.emit('data', chunk);
	        stream.read(0);
	      } else {
	        // update the buffer info.
	        state.length += state.objectMode ? 1 : chunk.length;
	        if (addToFront)
	          state.buffer.unshift(chunk);
	        else
	          state.buffer.push(chunk);

	        if (state.needReadable)
	          emitReadable(stream);
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}



	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(65).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;

	  if (state.objectMode)
	    return n === 0 ? 0 : 1;

	  if (isNaN(n) || util.isNull(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }

	  if (n <= 0)
	    return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;

	  if (!util.isNumber(n) || n > 0)
	    state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended)
	      endReadable(this);
	    else
	      emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0)
	      endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }

	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);

	  var ret;
	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;

	  if (util.isNull(ret)) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;

	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0)
	    endReadable(this);

	  if (!util.isNull(ret))
	    this.emit('data', ret);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}


	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync)
	      process.nextTick(function() {
	        emitReadable_(stream);
	      });
	    else
	      emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}


	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain &&
	        (!dest._writableState || dest._writableState.needDrain))
	      ondrain();
	  }

	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      debug('false write response, pause',
	            src._readableState.awaitDrain);
	      src._readableState.awaitDrain++;
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];



	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain)
	      state.awaitDrain--;
	    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}


	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;

	    if (!dest)
	      dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        var self = this;
	        process.nextTick(function() {
	          debug('readable nexttick read 0');
	          self.read(0);
	        });
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    if (!state.reading) {
	      debug('resume read 0');
	      this.read(0);
	    }
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(function() {
	      resume_(stream, state);
	    });
	  }
	}

	function resume_(stream, state) {
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading)
	    stream.read(0);
	}

	Readable.prototype.pause = function() {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function() {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function(chunk) {
	    debug('wrapped data');
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length)
	      return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};



	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;

	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.

	function isArray(arg) {
	  if (Array.isArray) {
	    return Array.isArray(arg);
	  }
	  return objectToString(arg) === '[object Array]';
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = Buffer.isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 61 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 62 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/


	/*<replacement>*/
	var util = __webpack_require__(60);
	util.inherits = __webpack_require__(61);
	/*</replacement>*/

	var Readable = __webpack_require__(58);
	var Writable = __webpack_require__(64);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false)
	    this.readable = false;

	  if (options && options.writable === false)
	    this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(5).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;


	/*<replacement>*/
	var util = __webpack_require__(60);
	util.inherits = __webpack_require__(61);
	/*</replacement>*/

	var Stream = __webpack_require__(55);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  var Duplex = __webpack_require__(63);

	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(63);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};


	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;

	  if (!util.isFunction(cb))
	    cb = function() {};

	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function() {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function() {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing &&
	        !state.corked &&
	        !state.finished &&
	        !state.bufferProcessing &&
	        state.buffer.length)
	      clearBuffer(this, state);
	  }
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      util.isString(chunk)) {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;

	  if (state.writing || state.corked)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, false, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev)
	    stream._writev(chunk, state.onwrite);
	  else
	    stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      state.pendingcb--;
	      cb(er);
	    });
	  else {
	    state.pendingcb--;
	    cb(er);
	  }

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished &&
	        !state.corked &&
	        !state.bufferProcessing &&
	        state.buffer.length) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}


	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  if (stream._writev && state.buffer.length > 1) {
	    // Fast case, write everything using _writev()
	    var cbs = [];
	    for (var c = 0; c < state.buffer.length; c++)
	      cbs.push(state.buffer[c].callback);

	    // count the one we are adding, as well.
	    // TODO(isaacs) clean this up
	    state.pendingcb++;
	    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
	      for (var i = 0; i < cbs.length; i++) {
	        state.pendingcb--;
	        cbs[i](err);
	      }
	    });

	    // Clear buffer
	    state.buffer = [];
	  } else {
	    // Slow case, write chunks one-by-one
	    for (var c = 0; c < state.buffer.length; c++) {
	      var entry = state.buffer[c];
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);

	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        c++;
	        break;
	      }
	    }

	    if (c < state.buffer.length)
	      state.buffer = state.buffer.slice(c);
	    else
	      state.buffer.length = 0;
	  }

	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));

	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;

	  if (util.isFunction(chunk)) {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (!util.isNullOrUndefined(chunk))
	    this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};


	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else
	      prefinish(stream, state);
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Buffer = __webpack_require__(5).Buffer;

	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};


	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.


	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(63);

	/*<replacement>*/
	var util = __webpack_require__(60);
	util.inherits = __webpack_require__(61);
	/*</replacement>*/

	util.inherits(Transform, Duplex);


	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (!util.isNullOrUndefined(data))
	    stream.push(data);

	  if (cb)
	    cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}


	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);

	  Duplex.call(this, options);

	  this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('prefinish', function() {
	    if (util.isFunction(this._flush))
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}

	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;

	  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};


	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;

	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	module.exports = PassThrough;

	var Transform = __webpack_require__(66);

	/*<replacement>*/
	var util = __webpack_require__(60);
	util.inherits = __webpack_require__(61);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(64)


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(63)


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(66)


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(67)


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {(function (exports) {
	  exports.validate = validate;
	  exports.mixin = mixin;

	  //
	  // ### function validate (object, schema, options)
	  // #### {Object} object the object to validate.
	  // #### {Object} schema (optional) the JSON Schema to validate against.
	  // #### {Object} options (optional) options controlling the validation
	  //      process. See {@link #validate.defaults) for details.
	  // Validate <code>object</code> against a JSON Schema.
	  // If <code>object</code> is self-describing (i.e. has a
	  // <code>$schema</code> property), it will also be validated
	  // against the referenced schema. [TODO]: This behaviour bay be
	  // suppressed by setting the {@link #validate.options.???}
	  // option to <code>???</code>.[/TODO]
	  //
	  // If <code>schema</code> is not specified, and <code>object</code>
	  // is not self-describing, validation always passes.
	  //
	  // <strong>Note:</strong> in order to pass options but no schema,
	  // <code>schema</code> <em>must</em> be specified in the call to
	  // <code>validate()</code>; otherwise, <code>options</code> will
	  // be interpreted as the schema. <code>schema</code> may be passed
	  // as <code>null</code>, <code>undefinded</code>, or the empty object
	  // (<code>{}</code>) in this case.
	  //
	  function validate(object, schema, options) {
	    options = mixin({}, options, validate.defaults);
	    var errors = [];

	    validateObject(object, schema, options, errors);

	    //
	    // TODO: self-described validation
	    // if (! options.selfDescribing) { ... }
	    //

	    return {
	      valid: !(errors.length),
	      errors: errors
	    };
	  };

	  /**
	   * Default validation options. Defaults can be overridden by
	   * passing an 'options' hash to {@link #validate}. They can
	   * also be set globally be changing the values in
	   * <code>validate.defaults</code> directly.
	   */
	  validate.defaults = {
	      /**
	       * <p>
	       * Enforce 'format' constraints.
	       * </p><p>
	       * <em>Default: <code>true</code></em>
	       * </p>
	       */
	      validateFormats: true,
	      /**
	       * <p>
	       * When {@link #validateFormats} is <code>true</code>,
	       * treat unrecognized formats as validation errors.
	       * </p><p>
	       * <em>Default: <code>false</code></em>
	       * </p>
	       *
	       * @see validation.formats for default supported formats.
	       */
	      validateFormatsStrict: false,
	      /**
	       * <p>
	       * When {@link #validateFormats} is <code>true</code>,
	       * also validate formats defined in {@link #validate.formatExtensions}.
	       * </p><p>
	       * <em>Default: <code>true</code></em>
	       * </p>
	       */
	      validateFormatExtensions: true
	  };

	  /**
	   * Default messages to include with validation errors.
	   */
	  validate.messages = {
	      required:         "is required",
	      allowEmpty:       "must not be empty",
	      minLength:        "is too short (minimum is %{expected} characters)",
	      maxLength:        "is too long (maximum is %{expected} characters)",
	      pattern:          "invalid input",
	      minimum:          "must be greater than or equal to %{expected}",
	      maximum:          "must be less than or equal to %{expected}",
	      exclusiveMinimum: "must be greater than %{expected}",
	      exclusiveMaximum: "must be less than %{expected}",
	      divisibleBy:      "must be divisible by %{expected}",
	      minItems:         "must contain more than %{expected} items",
	      maxItems:         "must contain less than %{expected} items",
	      uniqueItems:      "must hold a unique set of values",
	      format:           "is not a valid %{expected}",
	      conform:          "must conform to given constraint",
	      type:             "must be of %{expected} type"
	  };
	  validate.messages['enum'] = "must be present in given enumerator";

	  /**
	   *
	   */
	  validate.formats = {
	    'email':          /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
	    'ip-address':     /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i,
	    'ipv6':           /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/,
	    'date-time':      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:.\d{1,3})?Z$/,
	    'date':           /^\d{4}-\d{2}-\d{2}$/,
	    'time':           /^\d{2}:\d{2}:\d{2}$/,
	    'color':          /^#[a-z0-9]{6}|#[a-z0-9]{3}|(?:rgb\(\s*(?:[+-]?\d+%?)\s*,\s*(?:[+-]?\d+%?)\s*,\s*(?:[+-]?\d+%?)\s*\))aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow$/i,
	    //'style':        (not supported)
	    //'phone':        (not supported)
	    //'uri':          (not supported)
	    'host-name':      /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])/,
	    'utc-millisec':   {
	      test: function (value) {
	        return typeof(value) === 'number' && value >= 0;
	      }
	    },
	    'regex':          {
	      test: function (value) {
	        try { new RegExp(value) }
	        catch (e) { return false }

	        return true;
	      }
	    }
	  };

	  /**
	   *
	   */
	  validate.formatExtensions = {
	    'url': /^(https?|ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
	  };

	  function mixin(obj) {
	    var sources = Array.prototype.slice.call(arguments, 1);
	    while (sources.length) {
	      var source = sources.shift();
	      if (!source) { continue }

	      if (typeof(source) !== 'object') {
	        throw new TypeError('mixin non-object');
	      }

	      for (var p in source) {
	        if (source.hasOwnProperty(p)) {
	          obj[p] = source[p];
	        }
	      }
	    }

	    return obj;
	  };

	  function validateObject(object, schema, options, errors) {
	    var props, allProps = Object.keys(object),
	        visitedProps = [];

	    // see 5.2
	    if (schema.properties) {
	      props = schema.properties;
	      for (var p in props) {
	        if (props.hasOwnProperty(p)) {
	          visitedProps.push(p);
	          validateProperty(object, object[p], p, props[p], options, errors);
	        }
	      }
	    }

	    // see 5.3
	    if (schema.patternProperties) {
	      props = schema.patternProperties;
	      for (var p in props) {
	        if (props.hasOwnProperty(p)) {
	          var re = new RegExp(p);

	          // Find all object properties that are matching `re`
	          for (var k in object) {
	            if (object.hasOwnProperty(k)) {
	              visitedProps.push(k);
	              if (re.exec(k) !== null) {
	                validateProperty(object, object[k], p, props[p], options, errors);
	              }
	            }
	          }
	        }
	      }
	    }

	    // see 5.4
	    if (undefined !== schema.additionalProperties) {
	      var i, l;

	      var unvisitedProps = allProps.filter(function(k){
	        return -1 === visitedProps.indexOf(k);
	      });

	      // Prevent additional properties; each unvisited property is therefore an error
	      if (schema.additionalProperties === false && unvisitedProps.length > 0) {
	        for (i = 0, l = unvisitedProps.length; i < l; i++) {
	          error("additionalProperties", unvisitedProps[i], object[unvisitedProps[i]], false, errors);
	        }
	      }
	      // additionalProperties is a schema and validate unvisited properties against that schema
	      else if (typeof schema.additionalProperties == "object" && unvisitedProps.length > 0) {
	        for (i = 0, l = unvisitedProps.length; i < l; i++) {
	          validateProperty(object, object[unvisitedProps[i]], unvisitedProps[i], schema.unvisitedProperties, options, errors);
	        }
	      }
	    }

	  };

	  function validateProperty(object, value, property, schema, options, errors) {
	    var format,
	        valid,
	        spec,
	        type;

	    function constrain(name, value, assert) {
	      if (schema[name] !== undefined && !assert(value, schema[name])) {
	        error(name, property, value, schema, errors);
	      }
	    }

	    if (value === undefined) {
	      if (schema.required && schema.type !== 'any') {
	        return error('required', property, undefined, schema, errors);
	      } else {
	        return;
	      }
	    }

	    if (options.cast) {
	      if (('integer' === schema.type || 'number' === schema.type) && value == +value) {
	        value = +value;
	        object[property] = value;
	      }

	      if ('boolean' === schema.type) {
	        if ('true' === value || '1' === value || 1 === value) {
	          value = true;
	          object[property] = value;
	        }

	        if ('false' === value || '0' === value || 0 === value) {
	          value = false;
	          object[property] = value;
	        }
	      }
	    }

	    if (schema.format && options.validateFormats) {
	      format = schema.format;

	      if (options.validateFormatExtensions) { spec = validate.formatExtensions[format] }
	      if (!spec) { spec = validate.formats[format] }
	      if (!spec) {
	        if (options.validateFormatsStrict) {
	          return error('format', property, value, schema, errors);
	        }
	      }
	      else {
	        if (!spec.test(value)) {
	          return error('format', property, value, schema, errors);
	        }
	      }
	    }

	    if (schema['enum'] && schema['enum'].indexOf(value) === -1) {
	      error('enum', property, value, schema, errors);
	    }

	    // Dependencies (see 5.8)
	    if (typeof schema.dependencies === 'string' &&
	        object[schema.dependencies] === undefined) {
	      error('dependencies', property, null, schema, errors);
	    }

	    if (isArray(schema.dependencies)) {
	      for (var i = 0, l = schema.dependencies.length; i < l; i++) {
	        if (object[schema.dependencies[i]] === undefined) {
	          error('dependencies', property, null, schema, errors);
	        }
	      }
	    }

	    if (typeof schema.dependencies === 'object') {
	      validateObject(object, schema.dependencies, options, errors);
	    }

	    checkType(value, schema.type, function(err, type) {
	      if (err) return error('type', property, typeof value, schema, errors);

	      constrain('conform', value, function (a, e) { return e(a, object) });

	      switch (type || (isArray(value) ? 'array' : typeof value)) {
	        case 'string':
	          constrain('allowEmpty', value,        function (a, e) { return e ? e : a !== '' });
	          constrain('minLength',  value.length, function (a, e) { return a >= e });
	          constrain('maxLength',  value.length, function (a, e) { return a <= e });
	          constrain('pattern',    value,        function (a, e) {
	            e = typeof e === 'string'
	              ? e = new RegExp(e)
	              : e;
	            return e.test(a)
	          });
	          break;
	        case 'integer':
	        case 'number':
	          constrain('minimum',     value, function (a, e) { return a >= e });
	          constrain('maximum',     value, function (a, e) { return a <= e });
	          constrain('exclusiveMinimum', value, function (a, e) { return a > e });
	          constrain('exclusiveMaximum', value, function (a, e) { return a < e });
	          constrain('divisibleBy', value, function (a, e) {
	            var multiplier = Math.max((a - Math.floor(a)).toString().length - 2, (e - Math.floor(e)).toString().length - 2);
	            multiplier = multiplier > 0 ? Math.pow(10, multiplier) : 1;
	            return (a * multiplier) % (e * multiplier) === 0
	          });
	          break;
	        case 'array':
	          constrain('items', value, function (a, e) {
	            for (var i = 0, l = a.length; i < l; i++) {
	              validateProperty(object, a[i], property, e, options, errors);
	            }
	            return true;
	          });
	          constrain('minItems', value, function (a, e) { return a.length >= e });
	          constrain('maxItems', value, function (a, e) { return a.length <= e });
	          constrain('uniqueItems', value, function (a) {
	            var h = {};

	            for (var i = 0, l = a.length; i < l; i++) {
	              var key = JSON.stringify(a[i]);
	              if (h[key]) return false;
	              h[key] = true;
	            }

	            return true;
	          });
	          break;
	        case 'object':
	          // Recursive validation
	          if (schema.properties || schema.patternProperties || schema.additionalProperties) {
	            validateObject(value, schema, options, errors);
	          }
	          break;
	      }
	    });
	  };

	  function checkType(val, type, callback) {
	    var result = false,
	        types = isArray(type) ? type : [type];

	    // No type - no check
	    if (type === undefined) return callback(null, type);

	    // Go through available types
	    // And fine first matching
	    for (var i = 0, l = types.length; i < l; i++) {
	      type = types[i].toLowerCase().trim();
	      if (type === 'string' ? typeof val === 'string' :
	          type === 'array' ? isArray(val) :
	          type === 'object' ? val && typeof val === 'object' &&
	                             !isArray(val) :
	          type === 'number' ? typeof val === 'number' :
	          type === 'integer' ? typeof val === 'number' && ~~val === val :
	          type === 'null' ? val === null :
	          type === 'boolean'? typeof val === 'boolean' :
	          type === 'date' ? isDate(val) :
	          type === 'any' ? typeof val !== 'undefined' : false) {
	        return callback(null, type);
	      }
	    };

	    callback(true);
	  };

	  function error(attribute, property, actual, schema, errors) {
	    var lookup = { expected: schema[attribute], actual: actual, attribute: attribute, property: property };
	    var message = schema.messages && schema.messages[attribute] || schema.message || validate.messages[attribute] || "no default message";
	    message = message.replace(/%\{([a-z]+)\}/ig, function (_, match) { return lookup[match.toLowerCase()] || ''; });
	    errors.push({
	      attribute: attribute,
	      property:  property,
	      expected:  schema[attribute],
	      actual:    actual,
	      message:   message
	    });
	  };

	  function isArray(value) {
	    var s = typeof value;
	    if (s === 'object') {
	      if (value) {
	        if (typeof value.length === 'number' &&
	           !(value.propertyIsEnumerable('length')) &&
	           typeof value.splice === 'function') {
	           return true;
	        }
	      }
	    }
	    return false;
	  }

	  function isDate(value) {
	    var s = typeof value;
	    if (s === 'object') {
	      if (value) {
	        if (typeof value.getTime === 'function') {
	          return true;
	        }
	      }
	    }

	    return false;
	  }

	})(typeof module === 'object' && module && module.exports ? module.exports : window);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*
	 * winston.js: Top-level include defining Winston.
	 *
	 * (C) 2010 Charlie Robbins
	 * MIT LICENCE
	 *
	 */

	var winston = exports;

	//
	// Expose version using `pkginfo`
	//
	__webpack_require__(74)(module, 'version');

	//
	// Include transports defined by default by winston
	//
	winston.transports = __webpack_require__(75);

	//
	// Expose utility methods
	//
	var common             = __webpack_require__(77);
	winston.hash           = common.hash;
	winston.clone          = common.clone;
	winston.longestElement = common.longestElement;
	winston.exception      = __webpack_require__(112);
	winston.config         = __webpack_require__(94);
	winston.addColors      = winston.config.addColors;

	//
	// Expose core Logging-related prototypes.
	//
	winston.Container      = __webpack_require__(111).Container;
	winston.Logger         = __webpack_require__(115).Logger;
	winston.Transport      = __webpack_require__(118).Transport;

	//
	// We create and expose a default `Container` to `winston.loggers` so that the
	// programmer may manage multiple `winston.Logger` instances without any additional overhead.
	//
	// ### some-file1.js
	//
	//     var logger = require('winston').loggers.get('something');
	//
	// ### some-file2.js
	//
	//     var logger = require('winston').loggers.get('something');
	//
	winston.loggers = new winston.Container();

	//
	// We create and expose a 'defaultLogger' so that the programmer may do the
	// following without the need to create an instance of winston.Logger directly:
	//
	//     var winston = require('winston');
	//     winston.log('info', 'some message');
	//     winston.error('some error');
	//
	var defaultLogger = new winston.Logger({
	  transports: [new winston.transports.Console()]
	});

	//
	// Pass through the target methods onto `winston.
	//
	var methods = [
	  'log',
	  'query',
	  'stream',
	  'add',
	  'remove',
	  'clear',
	  'profile',
	  'startTimer',
	  'extend',
	  'cli',
	  'handleExceptions',
	  'unhandleExceptions',
	  'addRewriter',
	  'addFilter'
	];
	common.setLevels(winston, null, defaultLogger.levels);
	methods.forEach(function (method) {
	  winston[method] = function () {
	    return defaultLogger[method].apply(defaultLogger, arguments);
	  };
	});

	//
	// ### function cli ()
	// Configures the default winston logger to have the
	// settings for command-line interfaces: no timestamp,
	// colors enabled, padded output, and additional levels.
	//
	winston.cli = function () {
	  winston.padLevels = true;
	  common.setLevels(winston, defaultLogger.levels, winston.config.cli.levels);
	  defaultLogger.setLevels(winston.config.cli.levels);
	  winston.config.addColors(winston.config.cli.colors);

	  if (defaultLogger.transports.console) {
	    defaultLogger.transports.console.colorize = true;
	    defaultLogger.transports.console.timestamp = false;
	  }

	  return winston;
	};

	//
	// ### function setLevels (target)
	// #### @target {Object} Target levels to use
	// Sets the `target` levels specified on the default winston logger.
	//
	winston.setLevels = function (target) {
	  common.setLevels(winston, defaultLogger.levels, target);
	  defaultLogger.setLevels(target);
	};

	//
	// Define getter / setter for the default logger level
	// which need to be exposed by winston.
	//
	Object.defineProperty(winston, 'level', {
	  get: function () {
	    return defaultLogger.level;
	  },
	  set: function (val) {
	    defaultLogger.level = val;

	    Object.keys(defaultLogger.transports).forEach(function(key) {
	      defaultLogger.transports[key].level = val;
	    });
	  }
	});

	//
	// Define getters / setters for appropriate properties of the
	// default logger which need to be exposed by winston.
	//
	['emitErrs', 'exitOnError', 'padLevels', 'levelLength', 'stripColors'].forEach(function (prop) {
	  Object.defineProperty(winston, prop, {
	    get: function () {
	      return defaultLogger[prop];
	    },
	    set: function (val) {
	      defaultLogger[prop] = val;
	    }
	  });
	});

	//
	// @default {Object}
	// The default transports and exceptionHandlers for
	// the default winston logger.
	//
	Object.defineProperty(winston, 'default', {
	  get: function () {
	    return {
	      transports: defaultLogger.transports,
	      exceptionHandlers: defaultLogger.exceptionHandlers
	    };
	  }
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, __dirname) {/*
	 * pkginfo.js: Top-level include for the pkginfo module
	 *
	 * (C) 2011, Charlie Robbins
	 *
	 */
	 
	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    path = __webpack_require__(17);

	//
	// ### function pkginfo ([options, 'property', 'property' ..])
	// #### @pmodule {Module} Parent module to read from.
	// #### @options {Object|Array|string} **Optional** Options used when exposing properties.
	// #### @arguments {string...} **Optional** Specified properties to expose.
	// Exposes properties from the package.json file for the parent module on 
	// it's exports. Valid usage:
	//
	// `require('pkginfo')()`
	//
	// `require('pkginfo')('version', 'author');`
	//
	// `require('pkginfo')(['version', 'author']);`
	//
	// `require('pkginfo')({ include: ['version', 'author'] });`
	//
	var pkginfo = module.exports = function (pmodule, options) {
	  var args = [].slice.call(arguments, 2).filter(function (arg) {
	    return typeof arg === 'string';
	  });
	  
	  //
	  // **Parse variable arguments**
	  //
	  if (Array.isArray(options)) {
	    //
	    // If the options passed in is an Array assume that
	    // it is the Array of properties to expose from the
	    // on the package.json file on the parent module.
	    //
	    options = { include: options };
	  }
	  else if (typeof options === 'string') {
	    //
	    // Otherwise if the first argument is a string, then
	    // assume that it is the first property to expose from
	    // the package.json file on the parent module.
	    //
	    options = { include: [options] };
	  }
	  
	  //
	  // **Setup default options**
	  //
	  options = options || {};
	  
	  // ensure that includes have been defined
	  options.include = options.include || [];
	  
	  if (args.length > 0) {
	    //
	    // If additional string arguments have been passed in
	    // then add them to the properties to expose on the 
	    // parent module. 
	    //
	    options.include = options.include.concat(args);
	  }
	  
	  var pkg = pkginfo.read(pmodule, options.dir).package;
	  Object.keys(pkg).forEach(function (key) {
	    if (options.include.length > 0 && !~options.include.indexOf(key)) {
	      return;
	    }
	    
	    if (!pmodule.exports[key]) {
	      pmodule.exports[key] = pkg[key];
	    }
	  });
	  
	  return pkginfo;
	};

	//
	// ### function find (dir)
	// #### @pmodule {Module} Parent module to read from.
	// #### @dir {string} **Optional** Directory to start search from.
	// Searches up the directory tree from `dir` until it finds a directory
	// which contains a `package.json` file. 
	//
	pkginfo.find = function (pmodule, dir) {
	  if (! dir) {
	    dir = path.dirname(pmodule.filename);
	  }
	  
	  var files = fs.readdirSync(dir);
	  
	  if (~files.indexOf('package.json')) {
	    return path.join(dir, 'package.json');
	  }
	  
	  if (dir === '/') {
	    throw new Error('Could not find package.json up from: ' + dir);
	  }
	  else if (!dir || dir === '.') {
	    throw new Error('Cannot find package.json from unspecified directory');
	  }
	  
	  return pkginfo.find(pmodule, path.dirname(dir));
	};

	//
	// ### function read (pmodule, dir)
	// #### @pmodule {Module} Parent module to read from.
	// #### @dir {string} **Optional** Directory to start search from.
	// Searches up the directory tree from `dir` until it finds a directory
	// which contains a `package.json` file and returns the package information.
	//
	pkginfo.read = function (pmodule, dir) { 
	  dir = pkginfo.find(pmodule, dir);
	  
	  var data = fs.readFileSync(dir).toString();
	      
	  return {
	    dir: dir, 
	    package: JSON.parse(data)
	  };
	};

	//
	// Call `pkginfo` on this module and expose version.
	//
	pkginfo(module, {
	  dir: __dirname,
	  include: ['version'],
	  target: pkginfo
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module), "/"))

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {/*
	 * transports.js: Set of all transports Winston knows about
	 *
	 * (C) 2010 Charlie Robbins
	 * MIT LICENCE
	 *
	 */

	var path = __webpack_require__(17);

	//
	// Setup all transports as lazy-loaded getters.
	//
	Object.defineProperties(
	  exports,
	  ['Console', 'File', 'Http', 'Memory']
	    .reduce(function (acc, name) {
	      acc[name] = {
	        configurable: true,
	        enumerable: true,
	        get: function () {
	          var fullpath = path.join(__dirname, 'transports', name.toLowerCase());
	          return exports[name] = __webpack_require__(76)(fullpath)[name];
	        }
	      };

	      return acc;
	    }, {})
	);

	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./common": 77,
		"./common.js": 77,
		"./config": 94,
		"./config.js": 94,
		"./config/cli-config": 108,
		"./config/cli-config.js": 108,
		"./config/npm-config": 109,
		"./config/npm-config.js": 109,
		"./config/syslog-config": 110,
		"./config/syslog-config.js": 110,
		"./container": 111,
		"./container.js": 111,
		"./exception": 112,
		"./exception.js": 112,
		"./logger": 115,
		"./logger.js": 115,
		"./transports": 75,
		"./transports.js": 75,
		"./transports/console": 117,
		"./transports/console.js": 117,
		"./transports/file": 119,
		"./transports/file.js": 119,
		"./transports/http": 134,
		"./transports/http.js": 134,
		"./transports/memory": 146,
		"./transports/memory.js": 146,
		"./transports/transport": 118,
		"./transports/transport.js": 118
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 76;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	 * common.js: Internal helper and utility functions for winston
	 *
	 * (C) 2010 Charlie Robbins
	 * MIT LICENCE
	 *
	 */

	var util = __webpack_require__(10),
	    crypto = __webpack_require__(78),
	    cycle = __webpack_require__(93),
	    fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    StringDecoder = __webpack_require__(65).StringDecoder,
	    Stream = __webpack_require__(55).Stream,
	    config = __webpack_require__(94);

	//
	// ### function setLevels (target, past, current)
	// #### @target {Object} Object on which to set levels.
	// #### @past {Object} Previous levels set on target.
	// #### @current {Object} Current levels to set on target.
	// Create functions on the target objects for each level
	// in current.levels. If past is defined, remove functions
	// for each of those levels.
	//
	exports.setLevels = function (target, past, current, isDefault) {
	  var self = this;
	  if (past) {
	    Object.keys(past).forEach(function (level) {
	      delete target[level];
	    });
	  }

	  target.levels = current || config.npm.levels;
	  if (target.padLevels) {
	    target.levelLength = exports.longestElement(Object.keys(target.levels));
	  }

	  //
	  //  Define prototype methods for each log level
	  //  e.g. target.log('info', msg) <=> target.info(msg)
	  //
	  Object.keys(target.levels).forEach(function (level) {

	    // TODO Refactor logging methods into a different object to avoid name clashes
	    if (level === 'log') {
	      console.warn('Log level named "log" will clash with the method "log". Consider using a different name.');
	      return;
	    }

	    target[level] = function (msg) {
	      // build argument list (level, msg, ... [string interpolate], [{metadata}], [callback])
	      var args = [level].concat(Array.prototype.slice.call(arguments));
	      target.log.apply(target, args);
	    };
	  });

	  return target;
	};

	//
	// ### function longestElement
	// #### @xs {Array} Array to calculate against
	// Returns the longest element in the `xs` array.
	//
	exports.longestElement = function (xs) {
	  return Math.max.apply(
	    null,
	    xs.map(function (x) { return x.length; })
	  );
	};

	//
	// ### function clone (obj)
	// #### @obj {Object} Object to clone.
	// Helper method for deep cloning pure JSON objects
	// i.e. JSON objects that are either literals or objects (no Arrays, etc)
	//
	exports.clone = function (obj) {
	  //
	  // We only need to clone reference types (Object)
	  //
	  var copy = {};

	  if (obj instanceof Error) {
	    // With potential custom Error objects, this might not be exactly correct,
	    // but probably close-enough for purposes of this lib.
	    copy = new Error(obj.message);
	    Object.getOwnPropertyNames(obj).forEach(function (key) {
	      copy[key] = obj[key];
	    });

	    return copy;
	  }
	  else if (!(obj instanceof Object)) {
	    return obj;
	  }
	  else if (obj instanceof Date) {
	    return new Date(obj.getTime());
	  }

	  for (var i in obj) {
	    if (Array.isArray(obj[i])) {
	      copy[i] = obj[i].slice(0);
	    }
	    else if (obj[i] instanceof Buffer) {
	        copy[i] = obj[i].slice(0);
	    }
	    else if (typeof obj[i] != 'function') {
	      copy[i] = obj[i] instanceof Object ? exports.clone(obj[i]) : obj[i];
	    }
	    else if (typeof obj[i] === 'function') {
	      copy[i] = obj[i];
	    }
	  }

	  return copy;
	};

	//
	// ### function log (options)
	// #### @options {Object} All information about the log serialization.
	// Generic logging function for returning timestamped strings
	// with the following options:
	//
	//    {
	//      level:     'level to add to serialized message',
	//      message:   'message to serialize',
	//      meta:      'additional logging metadata to serialize',
	//      colorize:  false, // Colorizes output (only if `.json` is false)
	//      align:     false  // Align message level.
	//      timestamp: true   // Adds a timestamp to the serialized message
	//      label:     'label to prepend the message'
	//    }
	//
	exports.log = function (options) {
	  var timestampFn = typeof options.timestamp === 'function'
	        ? options.timestamp
	        : exports.timestamp,
	      timestamp   = options.timestamp ? timestampFn() : null,
	      showLevel   = options.showLevel === undefined ? true : options.showLevel,
	      meta        = options.meta !== null && options.meta !== undefined && !(options.meta instanceof Error)
	        ? exports.clone(cycle.decycle(options.meta))
	        : options.meta || null,
	      output;

	  //
	  // raw mode is intended for outputing winston as streaming JSON to STDOUT
	  //
	  if (options.raw) {
	    if (typeof meta !== 'object' && meta != null) {
	      meta = { meta: meta };
	    }
	    output         = exports.clone(meta) || {};
	    output.level   = options.level;
	    //
	    // Remark (jcrugzz): This used to be output.message = options.message.stripColors.
	    // I do not know why this is, it does not make sense but im handling that
	    // case here as well as handling the case that does make sense which is to
	    // make the `output.message = options.message`
	    //
	    output.message = options.message.stripColors
	      ? options.message.stripColors
	      : options.message;

	    return JSON.stringify(output);
	  }

	  //
	  // json mode is intended for pretty printing multi-line json to the terminal
	  //
	  if (options.json || true === options.logstash) {
	    if (typeof meta !== 'object' && meta != null) {
	      meta = { meta: meta };
	    }

	    output         = exports.clone(meta) || {};
	    output.level   = options.level;
	    output.message = output.message || '';

	    if (options.label) { output.label = options.label; }
	    if (options.message) { output.message = options.message; }
	    if (timestamp) { output.timestamp = timestamp; }

	    if (options.logstash === true) {
	      // use logstash format
	      var logstashOutput = {};
	      if (output.message !== undefined) {
	        logstashOutput['@message'] = output.message;
	        delete output.message;
	      }

	      if (output.timestamp !== undefined) {
	        logstashOutput['@timestamp'] = output.timestamp;
	        delete output.timestamp;
	      }

	      logstashOutput['@fields'] = exports.clone(output);
	      output = logstashOutput;
	    }

	    if (typeof options.stringify === 'function') {
	      return options.stringify(output);
	    }

	    return JSON.stringify(output, function (key, value) {
	      return value instanceof Buffer
	        ? value.toString('base64')
	        : value;
	    });
	  }

	  //
	  // Remark: this should really be a call to `util.format`.
	  //
	  if (typeof options.formatter == 'function') {
	    return String(options.formatter(exports.clone(options)));
	  }

	  output = timestamp ? timestamp + ' - ' : '';
	  if (showLevel) {
	    output += options.colorize === 'all' || options.colorize === 'level' || options.colorize === true
	      ? config.colorize(options.level)
	      : options.level;
	  }

	  output += (options.align) ? '\t' : '';
	  output += (timestamp || showLevel) ? ': ' : '';
	  output += options.label ? ('[' + options.label + '] ') : '';
	  output += options.colorize === 'all' || options.colorize === 'message'
	    ? config.colorize(options.level, options.message)
	    : options.message;

	  if (meta !== null && meta !== undefined) {
	    if (meta && meta instanceof Error && meta.stack) {
	      meta = meta.stack;
	    }

	    if (typeof meta !== 'object') {
	      output += ' ' + meta;
	    }
	    else if (Object.keys(meta).length > 0) {
	      if (typeof options.prettyPrint === 'function') {
	        output += ' ' + options.prettyPrint(meta);
	      } else if (options.prettyPrint) {
	        output += ' ' + '\n' + util.inspect(meta, false, options.depth || null, options.colorize);
	      } else if (
	        options.humanReadableUnhandledException
	          && Object.keys(meta).length === 5
	          && meta.hasOwnProperty('date')
	          && meta.hasOwnProperty('process')
	          && meta.hasOwnProperty('os')
	          && meta.hasOwnProperty('trace')
	          && meta.hasOwnProperty('stack')) {

	        //
	        // If meta carries unhandled exception data serialize the stack nicely
	        //
	        var stack = meta.stack;
	        delete meta.stack;
	        delete meta.trace;
	        output += ' ' + exports.serialize(meta);
	        output += '\n' + stack.join('\n');
	      } else {
	        output += ' ' + exports.serialize(meta);
	      }
	    }
	  }

	  return output;
	};

	exports.capitalize = function (str) {
	  return str && str[0].toUpperCase() + str.slice(1);
	};

	//
	// ### function hash (str)
	// #### @str {string} String to hash.
	// Utility function for creating unique ids
	// e.g. Profiling incoming HTTP requests on the same tick
	//
	exports.hash = function (str) {
	  return crypto.createHash('sha1').update(str).digest('hex');
	};

	//
	// ### function pad (n)
	// Returns a padded string if `n < 10`.
	//
	exports.pad = function (n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	};

	//
	// ### function timestamp ()
	// Returns a timestamp string for the current time.
	//
	exports.timestamp = function () {
	  return new Date().toISOString();
	};

	//
	// ### function serialize (obj, key)
	// #### @obj {Object|literal} Object to serialize
	// #### @key {string} **Optional** Optional key represented by obj in a larger object
	// Performs simple comma-separated, `key=value` serialization for Loggly when
	// logging to non-JSON inputs.
	//
	exports.serialize = function (obj, key) {
	  if (obj === null) {
	    obj = 'null';
	  }
	  else if (obj === undefined) {
	    obj = 'undefined';
	  }
	  else if (obj === false) {
	    obj = 'false';
	  }

	  if (typeof obj !== 'object') {
	    return key ? key + '=' + obj : obj;
	  }

	  if (obj instanceof Buffer) {
	    return key ? key + '=' + obj.toString('base64') : obj.toString('base64');
	  }

	  var msg = '',
	      keys = Object.keys(obj),
	      length = keys.length;

	  for (var i = 0; i < length; i++) {
	    if (Array.isArray(obj[keys[i]])) {
	      msg += keys[i] + '=[';

	      for (var j = 0, l = obj[keys[i]].length; j < l; j++) {
	        msg += exports.serialize(obj[keys[i]][j]);
	        if (j < l - 1) {
	          msg += ', ';
	        }
	      }

	      msg += ']';
	    }
	    else if (obj[keys[i]] instanceof Date) {
	      msg += keys[i] + '=' + obj[keys[i]];
	    }
	    else {
	      msg += exports.serialize(obj[keys[i]], keys[i]);
	    }

	    if (i < length - 1) {
	      msg += ', ';
	    }
	  }

	  return msg;
	};

	//
	// ### function tailFile (options, callback)
	// #### @options {Object} Options for tail.
	// #### @callback {function} Callback to execute on every line.
	// `tail -f` a file. Options must include file.
	//
	exports.tailFile = function(options, callback) {
	  var buffer = new Buffer(64 * 1024)
	    , decode = new StringDecoder('utf8')
	    , stream = new Stream
	    , buff = ''
	    , pos = 0
	    , row = 0;

	  if (options.start === -1) {
	    delete options.start;
	  }

	  stream.readable = true;
	  stream.destroy = function() {
	    stream.destroyed = true;
	    stream.emit('end');
	    stream.emit('close');
	  };

	  fs.open(options.file, 'a+', '0644', function(err, fd) {
	    if (err) {
	      if (!callback) {
	        stream.emit('error', err);
	      } else {
	        callback(err);
	      }
	      stream.destroy();
	      return;
	    }

	    (function read() {
	      if (stream.destroyed) {
	        fs.close(fd);
	        return;
	      }

	      return fs.read(fd, buffer, 0, buffer.length, pos, function(err, bytes) {
	        if (err) {
	          if (!callback) {
	            stream.emit('error', err);
	          } else {
	            callback(err);
	          }
	          stream.destroy();
	          return;
	        }

	        if (!bytes) {
	          if (buff) {
	            if (options.start == null || row > options.start) {
	              if (!callback) {
	                stream.emit('line', buff);
	              } else {
	                callback(null, buff);
	              }
	            }
	            row++;
	            buff = '';
	          }
	          return setTimeout(read, 1000);
	        }

	        var data = decode.write(buffer.slice(0, bytes));

	        if (!callback) {
	          stream.emit('data', data);
	        }

	        var data = (buff + data).split(/\n+/)
	          , l = data.length - 1
	          , i = 0;

	        for (; i < l; i++) {
	          if (options.start == null || row > options.start) {
	            if (!callback) {
	              stream.emit('line', data[i]);
	            } else {
	              callback(null, data[i]);
	            }
	          }
	          row++;
	        }

	        buff = data[l];

	        pos += bytes;

	        return read();
	      });
	    })();
	  });

	  if (!callback) {
	    return stream;
	  }

	  return stream.destroy;
	};

	//
	// ### function stringArrayToSet (array)
	// #### @strArray {Array} Array of Set-elements as strings.
	// #### @errMsg {string} **Optional** Custom error message thrown on invalid input.
	// Returns a Set-like object with strArray's elements as keys (each with the value true).
	//
	exports.stringArrayToSet = function (strArray, errMsg) {
	  if (typeof errMsg === 'undefined') {
	    errMsg = 'Cannot make set from Array with non-string elements';
	  }
	  return strArray.reduce(function (set, el) {
	    if (!(typeof el === 'string' || el instanceof String)) {
	      throw new Error(errMsg);
	    }
	    set[el] = true;
	    return set;
	  }, Object.create(null));
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var rng = __webpack_require__(79)

	function error () {
	  var m = [].slice.call(arguments).join(' ')
	  throw new Error([
	    m,
	    'we accept pull requests',
	    'http://github.com/dominictarr/crypto-browserify'
	    ].join('\n'))
	}

	exports.createHash = __webpack_require__(81)

	exports.createHmac = __webpack_require__(90)

	exports.randomBytes = function(size, callback) {
	  if (callback && callback.call) {
	    try {
	      callback.call(this, undefined, new Buffer(rng(size)))
	    } catch (err) { callback(err) }
	  } else {
	    return new Buffer(rng(size))
	  }
	}

	function each(a, f) {
	  for(var i in a)
	    f(a[i], i)
	}

	exports.getHashes = function () {
	  return ['sha1', 'sha256', 'sha512', 'md5', 'rmd160']
	}

	var p = __webpack_require__(91)(exports)
	exports.pbkdf2 = p.pbkdf2
	exports.pbkdf2Sync = p.pbkdf2Sync


	// the least I can do is make error messages for the rest of the node.js/crypto api.
	each(['createCredentials'
	, 'createCipher'
	, 'createCipheriv'
	, 'createDecipher'
	, 'createDecipheriv'
	, 'createSign'
	, 'createVerify'
	, 'createDiffieHellman'
	], function (name) {
	  exports[name] = function () {
	    error('sorry,', name, 'is not implemented yet')
	  }
	})

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {(function() {
	  var g = ('undefined' === typeof window ? global : window) || {}
	  _crypto = (
	    g.crypto || g.msCrypto || __webpack_require__(80)
	  )
	  module.exports = function(size) {
	    // Modern Browsers
	    if(_crypto.getRandomValues) {
	      var bytes = new Buffer(size); //in browserify, this is an extended Uint8Array
	      /* This will not work in older browsers.
	       * See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
	       */
	    
	      _crypto.getRandomValues(bytes);
	      return bytes;
	    }
	    else if (_crypto.randomBytes) {
	      return _crypto.randomBytes(size)
	    }
	    else
	      throw new Error(
	        'secure random number generation not supported by this browser\n'+
	        'use chrome, FireFox or Internet Explorer 11'
	      )
	  }
	}())

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(5).Buffer))

/***/ },
/* 80 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(82)

	var md5 = toConstructor(__webpack_require__(87))
	var rmd160 = toConstructor(__webpack_require__(89))

	function toConstructor (fn) {
	  return function () {
	    var buffers = []
	    var m= {
	      update: function (data, enc) {
	        if(!Buffer.isBuffer(data)) data = new Buffer(data, enc)
	        buffers.push(data)
	        return this
	      },
	      digest: function (enc) {
	        var buf = Buffer.concat(buffers)
	        var r = fn(buf)
	        buffers = null
	        return enc ? r.toString(enc) : r
	      }
	    }
	    return m
	  }
	}

	module.exports = function (alg) {
	  if('md5' === alg) return new md5()
	  if('rmd160' === alg) return new rmd160()
	  return createHash(alg)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var exports = module.exports = function (alg) {
	  var Alg = exports[alg]
	  if(!Alg) throw new Error(alg + ' is not supported (we accept pull requests)')
	  return new Alg()
	}

	var Buffer = __webpack_require__(5).Buffer
	var Hash   = __webpack_require__(83)(Buffer)

	exports.sha1 = __webpack_require__(84)(Buffer, Hash)
	exports.sha256 = __webpack_require__(85)(Buffer, Hash)
	exports.sha512 = __webpack_require__(86)(Buffer, Hash)


/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = function (Buffer) {

	  //prototype class for hash functions
	  function Hash (blockSize, finalSize) {
	    this._block = new Buffer(blockSize) //new Uint32Array(blockSize/4)
	    this._finalSize = finalSize
	    this._blockSize = blockSize
	    this._len = 0
	    this._s = 0
	  }

	  Hash.prototype.init = function () {
	    this._s = 0
	    this._len = 0
	  }

	  Hash.prototype.update = function (data, enc) {
	    if ("string" === typeof data) {
	      enc = enc || "utf8"
	      data = new Buffer(data, enc)
	    }

	    var l = this._len += data.length
	    var s = this._s = (this._s || 0)
	    var f = 0
	    var buffer = this._block

	    while (s < l) {
	      var t = Math.min(data.length, f + this._blockSize - (s % this._blockSize))
	      var ch = (t - f)

	      for (var i = 0; i < ch; i++) {
	        buffer[(s % this._blockSize) + i] = data[i + f]
	      }

	      s += ch
	      f += ch

	      if ((s % this._blockSize) === 0) {
	        this._update(buffer)
	      }
	    }
	    this._s = s

	    return this
	  }

	  Hash.prototype.digest = function (enc) {
	    // Suppose the length of the message M, in bits, is l
	    var l = this._len * 8

	    // Append the bit 1 to the end of the message
	    this._block[this._len % this._blockSize] = 0x80

	    // and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
	    this._block.fill(0, this._len % this._blockSize + 1)

	    if (l % (this._blockSize * 8) >= this._finalSize * 8) {
	      this._update(this._block)
	      this._block.fill(0)
	    }

	    // to this append the block which is equal to the number l written in binary
	    // TODO: handle case where l is > Math.pow(2, 29)
	    this._block.writeInt32BE(l, this._blockSize - 4)

	    var hash = this._update(this._block) || this._hash()

	    return enc ? hash.toString(enc) : hash
	  }

	  Hash.prototype._update = function () {
	    throw new Error('_update must be implemented by subclass')
	  }

	  return Hash
	}


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */

	var inherits = __webpack_require__(10).inherits

	module.exports = function (Buffer, Hash) {

	  var A = 0|0
	  var B = 4|0
	  var C = 8|0
	  var D = 12|0
	  var E = 16|0

	  var W = new (typeof Int32Array === 'undefined' ? Array : Int32Array)(80)

	  var POOL = []

	  function Sha1 () {
	    if(POOL.length)
	      return POOL.pop().init()

	    if(!(this instanceof Sha1)) return new Sha1()
	    this._w = W
	    Hash.call(this, 16*4, 14*4)

	    this._h = null
	    this.init()
	  }

	  inherits(Sha1, Hash)

	  Sha1.prototype.init = function () {
	    this._a = 0x67452301
	    this._b = 0xefcdab89
	    this._c = 0x98badcfe
	    this._d = 0x10325476
	    this._e = 0xc3d2e1f0

	    Hash.prototype.init.call(this)
	    return this
	  }

	  Sha1.prototype._POOL = POOL
	  Sha1.prototype._update = function (X) {

	    var a, b, c, d, e, _a, _b, _c, _d, _e

	    a = _a = this._a
	    b = _b = this._b
	    c = _c = this._c
	    d = _d = this._d
	    e = _e = this._e

	    var w = this._w

	    for(var j = 0; j < 80; j++) {
	      var W = w[j] = j < 16 ? X.readInt32BE(j*4)
	        : rol(w[j - 3] ^ w[j -  8] ^ w[j - 14] ^ w[j - 16], 1)

	      var t = add(
	        add(rol(a, 5), sha1_ft(j, b, c, d)),
	        add(add(e, W), sha1_kt(j))
	      )

	      e = d
	      d = c
	      c = rol(b, 30)
	      b = a
	      a = t
	    }

	    this._a = add(a, _a)
	    this._b = add(b, _b)
	    this._c = add(c, _c)
	    this._d = add(d, _d)
	    this._e = add(e, _e)
	  }

	  Sha1.prototype._hash = function () {
	    if(POOL.length < 100) POOL.push(this)
	    var H = new Buffer(20)
	    //console.log(this._a|0, this._b|0, this._c|0, this._d|0, this._e|0)
	    H.writeInt32BE(this._a|0, A)
	    H.writeInt32BE(this._b|0, B)
	    H.writeInt32BE(this._c|0, C)
	    H.writeInt32BE(this._d|0, D)
	    H.writeInt32BE(this._e|0, E)
	    return H
	  }

	  /*
	   * Perform the appropriate triplet combination function for the current
	   * iteration
	   */
	  function sha1_ft(t, b, c, d) {
	    if(t < 20) return (b & c) | ((~b) & d);
	    if(t < 40) return b ^ c ^ d;
	    if(t < 60) return (b & c) | (b & d) | (c & d);
	    return b ^ c ^ d;
	  }

	  /*
	   * Determine the appropriate additive constant for the current iteration
	   */
	  function sha1_kt(t) {
	    return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
	           (t < 60) ? -1894007588 : -899497514;
	  }

	  /*
	   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	   * to work around bugs in some JS interpreters.
	   * //dominictarr: this is 10 years old, so maybe this can be dropped?)
	   *
	   */
	  function add(x, y) {
	    return (x + y ) | 0
	  //lets see how this goes on testling.
	  //  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  //  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  //  return (msw << 16) | (lsw & 0xFFFF);
	  }

	  /*
	   * Bitwise rotate a 32-bit number to the left.
	   */
	  function rol(num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt));
	  }

	  return Sha1
	}


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */

	var inherits = __webpack_require__(10).inherits

	module.exports = function (Buffer, Hash) {

	  var K = [
	      0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
	      0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
	      0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
	      0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
	      0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
	      0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
	      0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
	      0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
	      0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
	      0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
	      0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
	      0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
	      0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
	      0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
	      0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
	      0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
	    ]

	  var W = new Array(64)

	  function Sha256() {
	    this.init()

	    this._w = W //new Array(64)

	    Hash.call(this, 16*4, 14*4)
	  }

	  inherits(Sha256, Hash)

	  Sha256.prototype.init = function () {

	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0

	    this._len = this._s = 0

	    return this
	  }

	  function S (X, n) {
	    return (X >>> n) | (X << (32 - n));
	  }

	  function R (X, n) {
	    return (X >>> n);
	  }

	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }

	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }

	  function Sigma0256 (x) {
	    return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
	  }

	  function Sigma1256 (x) {
	    return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
	  }

	  function Gamma0256 (x) {
	    return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
	  }

	  function Gamma1256 (x) {
	    return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
	  }

	  Sha256.prototype._update = function(M) {

	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var T1, T2

	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0

	    for (var j = 0; j < 64; j++) {
	      var w = W[j] = j < 16
	        ? M.readInt32BE(j * 4)
	        : Gamma1256(W[j - 2]) + W[j - 7] + Gamma0256(W[j - 15]) + W[j - 16]

	      T1 = h + Sigma1256(e) + Ch(e, f, g) + K[j] + w

	      T2 = Sigma0256(a) + Maj(a, b, c);
	      h = g; g = f; f = e; e = d + T1; d = c; c = b; b = a; a = T1 + T2;
	    }

	    this._a = (a + this._a) | 0
	    this._b = (b + this._b) | 0
	    this._c = (c + this._c) | 0
	    this._d = (d + this._d) | 0
	    this._e = (e + this._e) | 0
	    this._f = (f + this._f) | 0
	    this._g = (g + this._g) | 0
	    this._h = (h + this._h) | 0

	  };

	  Sha256.prototype._hash = function () {
	    var H = new Buffer(32)

	    H.writeInt32BE(this._a,  0)
	    H.writeInt32BE(this._b,  4)
	    H.writeInt32BE(this._c,  8)
	    H.writeInt32BE(this._d, 12)
	    H.writeInt32BE(this._e, 16)
	    H.writeInt32BE(this._f, 20)
	    H.writeInt32BE(this._g, 24)
	    H.writeInt32BE(this._h, 28)

	    return H
	  }

	  return Sha256

	}


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(10).inherits

	module.exports = function (Buffer, Hash) {
	  var K = [
	    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	    0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	    0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	    0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	    0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	    0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	    0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	    0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	    0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	    0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	    0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	    0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	    0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	    0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	    0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	    0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	    0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	  ]

	  var W = new Array(160)

	  function Sha512() {
	    this.init()
	    this._w = W

	    Hash.call(this, 128, 112)
	  }

	  inherits(Sha512, Hash)

	  Sha512.prototype.init = function () {

	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0

	    this._al = 0xf3bcc908|0
	    this._bl = 0x84caa73b|0
	    this._cl = 0xfe94f82b|0
	    this._dl = 0x5f1d36f1|0
	    this._el = 0xade682d1|0
	    this._fl = 0x2b3e6c1f|0
	    this._gl = 0xfb41bd6b|0
	    this._hl = 0x137e2179|0

	    this._len = this._s = 0

	    return this
	  }

	  function S (X, Xl, n) {
	    return (X >>> n) | (Xl << (32 - n))
	  }

	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }

	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }

	  Sha512.prototype._update = function(M) {

	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var al, bl, cl, dl, el, fl, gl, hl

	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0

	    al = this._al | 0
	    bl = this._bl | 0
	    cl = this._cl | 0
	    dl = this._dl | 0
	    el = this._el | 0
	    fl = this._fl | 0
	    gl = this._gl | 0
	    hl = this._hl | 0

	    for (var i = 0; i < 80; i++) {
	      var j = i * 2

	      var Wi, Wil

	      if (i < 16) {
	        Wi = W[j] = M.readInt32BE(j * 4)
	        Wil = W[j + 1] = M.readInt32BE(j * 4 + 4)

	      } else {
	        var x  = W[j - 15*2]
	        var xl = W[j - 15*2 + 1]
	        var gamma0  = S(x, xl, 1) ^ S(x, xl, 8) ^ (x >>> 7)
	        var gamma0l = S(xl, x, 1) ^ S(xl, x, 8) ^ S(xl, x, 7)

	        x  = W[j - 2*2]
	        xl = W[j - 2*2 + 1]
	        var gamma1  = S(x, xl, 19) ^ S(xl, x, 29) ^ (x >>> 6)
	        var gamma1l = S(xl, x, 19) ^ S(x, xl, 29) ^ S(xl, x, 6)

	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7  = W[j - 7*2]
	        var Wi7l = W[j - 7*2 + 1]

	        var Wi16  = W[j - 16*2]
	        var Wi16l = W[j - 16*2 + 1]

	        Wil = gamma0l + Wi7l
	        Wi  = gamma0  + Wi7 + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0)
	        Wil = Wil + gamma1l
	        Wi  = Wi  + gamma1  + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0)
	        Wil = Wil + Wi16l
	        Wi  = Wi  + Wi16 + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0)

	        W[j] = Wi
	        W[j + 1] = Wil
	      }

	      var maj = Maj(a, b, c)
	      var majl = Maj(al, bl, cl)

	      var sigma0h = S(a, al, 28) ^ S(al, a, 2) ^ S(al, a, 7)
	      var sigma0l = S(al, a, 28) ^ S(a, al, 2) ^ S(a, al, 7)
	      var sigma1h = S(e, el, 14) ^ S(e, el, 18) ^ S(el, e, 9)
	      var sigma1l = S(el, e, 14) ^ S(el, e, 18) ^ S(e, el, 9)

	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki = K[j]
	      var Kil = K[j + 1]

	      var ch = Ch(e, f, g)
	      var chl = Ch(el, fl, gl)

	      var t1l = hl + sigma1l
	      var t1 = h + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0)
	      t1l = t1l + chl
	      t1 = t1 + ch + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0)
	      t1l = t1l + Kil
	      t1 = t1 + Ki + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0)
	      t1l = t1l + Wil
	      t1 = t1 + Wi + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0)

	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl
	      var t2 = sigma0h + maj + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0)

	      h  = g
	      hl = gl
	      g  = f
	      gl = fl
	      f  = e
	      fl = el
	      el = (dl + t1l) | 0
	      e  = (d + t1 + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	      d  = c
	      dl = cl
	      c  = b
	      cl = bl
	      b  = a
	      bl = al
	      al = (t1l + t2l) | 0
	      a  = (t1 + t2 + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0
	    }

	    this._al = (this._al + al) | 0
	    this._bl = (this._bl + bl) | 0
	    this._cl = (this._cl + cl) | 0
	    this._dl = (this._dl + dl) | 0
	    this._el = (this._el + el) | 0
	    this._fl = (this._fl + fl) | 0
	    this._gl = (this._gl + gl) | 0
	    this._hl = (this._hl + hl) | 0

	    this._a = (this._a + a + ((this._al >>> 0) < (al >>> 0) ? 1 : 0)) | 0
	    this._b = (this._b + b + ((this._bl >>> 0) < (bl >>> 0) ? 1 : 0)) | 0
	    this._c = (this._c + c + ((this._cl >>> 0) < (cl >>> 0) ? 1 : 0)) | 0
	    this._d = (this._d + d + ((this._dl >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	    this._e = (this._e + e + ((this._el >>> 0) < (el >>> 0) ? 1 : 0)) | 0
	    this._f = (this._f + f + ((this._fl >>> 0) < (fl >>> 0) ? 1 : 0)) | 0
	    this._g = (this._g + g + ((this._gl >>> 0) < (gl >>> 0) ? 1 : 0)) | 0
	    this._h = (this._h + h + ((this._hl >>> 0) < (hl >>> 0) ? 1 : 0)) | 0
	  }

	  Sha512.prototype._hash = function () {
	    var H = new Buffer(64)

	    function writeInt64BE(h, l, offset) {
	      H.writeInt32BE(h, offset)
	      H.writeInt32BE(l, offset + 4)
	    }

	    writeInt64BE(this._a, this._al, 0)
	    writeInt64BE(this._b, this._bl, 8)
	    writeInt64BE(this._c, this._cl, 16)
	    writeInt64BE(this._d, this._dl, 24)
	    writeInt64BE(this._e, this._el, 32)
	    writeInt64BE(this._f, this._fl, 40)
	    writeInt64BE(this._g, this._gl, 48)
	    writeInt64BE(this._h, this._hl, 56)

	    return H
	  }

	  return Sha512

	}


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */

	var helpers = __webpack_require__(88);

	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len)
	{
	  /* append padding */
	  x[len >> 5] |= 0x80 << ((len) % 32);
	  x[(((len + 64) >>> 9) << 4) + 14] = len;

	  var a =  1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d =  271733878;

	  for(var i = 0; i < x.length; i += 16)
	  {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;

	    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
	    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
	    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
	    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
	    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
	    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
	    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
	    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
	    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
	    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
	    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
	    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
	    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
	    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
	    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
	    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

	    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
	    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
	    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
	    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
	    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
	    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
	    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
	    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
	    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
	    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
	    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
	    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
	    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
	    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
	    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
	    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

	    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
	    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
	    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
	    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
	    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
	    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
	    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
	    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
	    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
	    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
	    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
	    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
	    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
	    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
	    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
	    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

	    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
	    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
	    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
	    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
	    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
	    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
	    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
	    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
	    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
	    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
	    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
	    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
	    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
	    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
	    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
	    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

	    a = safe_add(a, olda);
	    b = safe_add(b, oldb);
	    c = safe_add(c, oldc);
	    d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);

	}

	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t)
	{
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t)
	{
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t)
	{
	  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y)
	{
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return (msw << 16) | (lsw & 0xFFFF);
	}

	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt)
	{
	  return (num << cnt) | (num >>> (32 - cnt));
	}

	module.exports = function md5(buf) {
	  return helpers.hash(buf, core_md5, 16);
	};


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var intSize = 4;
	var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
	var chrsz = 8;

	function toArray(buf, bigEndian) {
	  if ((buf.length % intSize) !== 0) {
	    var len = buf.length + (intSize - (buf.length % intSize));
	    buf = Buffer.concat([buf, zeroBuffer], len);
	  }

	  var arr = [];
	  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
	  for (var i = 0; i < buf.length; i += intSize) {
	    arr.push(fn.call(buf, i));
	  }
	  return arr;
	}

	function toBuffer(arr, size, bigEndian) {
	  var buf = new Buffer(size);
	  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
	  for (var i = 0; i < arr.length; i++) {
	    fn.call(buf, arr[i], i * 4, true);
	  }
	  return buf;
	}

	function hash(buf, fn, hashSize, bigEndian) {
	  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
	  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
	  return toBuffer(arr, hashSize, bigEndian);
	}

	module.exports = { hash: hash };

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = ripemd160



	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	// Constants table
	var zl = [
	    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	    7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	    3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	    1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	    4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13];
	var zr = [
	    5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	    6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	    15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	    8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	    12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11];
	var sl = [
	     11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	    7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	    11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	      11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	    9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ];
	var sr = [
	    8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	    9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	    9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	    15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	    8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ];

	var hl =  [ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
	var hr =  [ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];

	var bytesToWords = function (bytes) {
	  var words = [];
	  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
	    words[b >>> 5] |= bytes[i] << (24 - b % 32);
	  }
	  return words;
	};

	var wordsToBytes = function (words) {
	  var bytes = [];
	  for (var b = 0; b < words.length * 32; b += 8) {
	    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	  }
	  return bytes;
	};

	var processBlock = function (H, M, offset) {

	  // Swap endian
	  for (var i = 0; i < 16; i++) {
	    var offset_i = offset + i;
	    var M_offset_i = M[offset_i];

	    // Swap
	    M[offset_i] = (
	        (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	        (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	    );
	  }

	  // Working variables
	  var al, bl, cl, dl, el;
	  var ar, br, cr, dr, er;

	  ar = al = H[0];
	  br = bl = H[1];
	  cr = cl = H[2];
	  dr = dl = H[3];
	  er = el = H[4];
	  // Computation
	  var t;
	  for (var i = 0; i < 80; i += 1) {
	    t = (al +  M[offset+zl[i]])|0;
	    if (i<16){
	        t +=  f1(bl,cl,dl) + hl[0];
	    } else if (i<32) {
	        t +=  f2(bl,cl,dl) + hl[1];
	    } else if (i<48) {
	        t +=  f3(bl,cl,dl) + hl[2];
	    } else if (i<64) {
	        t +=  f4(bl,cl,dl) + hl[3];
	    } else {// if (i<80) {
	        t +=  f5(bl,cl,dl) + hl[4];
	    }
	    t = t|0;
	    t =  rotl(t,sl[i]);
	    t = (t+el)|0;
	    al = el;
	    el = dl;
	    dl = rotl(cl, 10);
	    cl = bl;
	    bl = t;

	    t = (ar + M[offset+zr[i]])|0;
	    if (i<16){
	        t +=  f5(br,cr,dr) + hr[0];
	    } else if (i<32) {
	        t +=  f4(br,cr,dr) + hr[1];
	    } else if (i<48) {
	        t +=  f3(br,cr,dr) + hr[2];
	    } else if (i<64) {
	        t +=  f2(br,cr,dr) + hr[3];
	    } else {// if (i<80) {
	        t +=  f1(br,cr,dr) + hr[4];
	    }
	    t = t|0;
	    t =  rotl(t,sr[i]) ;
	    t = (t+er)|0;
	    ar = er;
	    er = dr;
	    dr = rotl(cr, 10);
	    cr = br;
	    br = t;
	  }
	  // Intermediate hash value
	  t    = (H[1] + cl + dr)|0;
	  H[1] = (H[2] + dl + er)|0;
	  H[2] = (H[3] + el + ar)|0;
	  H[3] = (H[4] + al + br)|0;
	  H[4] = (H[0] + bl + cr)|0;
	  H[0] =  t;
	};

	function f1(x, y, z) {
	  return ((x) ^ (y) ^ (z));
	}

	function f2(x, y, z) {
	  return (((x)&(y)) | ((~x)&(z)));
	}

	function f3(x, y, z) {
	  return (((x) | (~(y))) ^ (z));
	}

	function f4(x, y, z) {
	  return (((x) & (z)) | ((y)&(~(z))));
	}

	function f5(x, y, z) {
	  return ((x) ^ ((y) |(~(z))));
	}

	function rotl(x,n) {
	  return (x<<n) | (x>>>(32-n));
	}

	function ripemd160(message) {
	  var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];

	  if (typeof message == 'string')
	    message = new Buffer(message, 'utf8');

	  var m = bytesToWords(message);

	  var nBitsLeft = message.length * 8;
	  var nBitsTotal = message.length * 8;

	  // Add padding
	  m[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	  m[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	      (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	      (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	  );

	  for (var i=0 ; i<m.length; i += 16) {
	    processBlock(H, m, i);
	  }

	  // Swap endian
	  for (var i = 0; i < 5; i++) {
	      // Shortcut
	    var H_i = H[i];

	    // Swap
	    H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	          (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	  }

	  var digestbytes = wordsToBytes(H);
	  return new Buffer(digestbytes);
	}



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(81)

	var zeroBuffer = new Buffer(128)
	zeroBuffer.fill(0)

	module.exports = Hmac

	function Hmac (alg, key) {
	  if(!(this instanceof Hmac)) return new Hmac(alg, key)
	  this._opad = opad
	  this._alg = alg

	  var blocksize = (alg === 'sha512') ? 128 : 64

	  key = this._key = !Buffer.isBuffer(key) ? new Buffer(key) : key

	  if(key.length > blocksize) {
	    key = createHash(alg).update(key).digest()
	  } else if(key.length < blocksize) {
	    key = Buffer.concat([key, zeroBuffer], blocksize)
	  }

	  var ipad = this._ipad = new Buffer(blocksize)
	  var opad = this._opad = new Buffer(blocksize)

	  for(var i = 0; i < blocksize; i++) {
	    ipad[i] = key[i] ^ 0x36
	    opad[i] = key[i] ^ 0x5C
	  }

	  this._hash = createHash(alg).update(ipad)
	}

	Hmac.prototype.update = function (data, enc) {
	  this._hash.update(data, enc)
	  return this
	}

	Hmac.prototype.digest = function (enc) {
	  var h = this._hash.digest()
	  return createHash(this._alg).update(this._opad).update(h).digest(enc)
	}


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var pbkdf2Export = __webpack_require__(92)

	module.exports = function (crypto, exports) {
	  exports = exports || {}

	  var exported = pbkdf2Export(crypto)

	  exports.pbkdf2 = exported.pbkdf2
	  exports.pbkdf2Sync = exported.pbkdf2Sync

	  return exports
	}


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function(crypto) {
	  function pbkdf2(password, salt, iterations, keylen, digest, callback) {
	    if ('function' === typeof digest) {
	      callback = digest
	      digest = undefined
	    }

	    if ('function' !== typeof callback)
	      throw new Error('No callback provided to pbkdf2')

	    setTimeout(function() {
	      var result

	      try {
	        result = pbkdf2Sync(password, salt, iterations, keylen, digest)
	      } catch (e) {
	        return callback(e)
	      }

	      callback(undefined, result)
	    })
	  }

	  function pbkdf2Sync(password, salt, iterations, keylen, digest) {
	    if ('number' !== typeof iterations)
	      throw new TypeError('Iterations not a number')

	    if (iterations < 0)
	      throw new TypeError('Bad iterations')

	    if ('number' !== typeof keylen)
	      throw new TypeError('Key length not a number')

	    if (keylen < 0)
	      throw new TypeError('Bad key length')

	    digest = digest || 'sha1'

	    if (!Buffer.isBuffer(password)) password = new Buffer(password)
	    if (!Buffer.isBuffer(salt)) salt = new Buffer(salt)

	    var hLen, l = 1, r, T
	    var DK = new Buffer(keylen)
	    var block1 = new Buffer(salt.length + 4)
	    salt.copy(block1, 0, 0, salt.length)

	    for (var i = 1; i <= l; i++) {
	      block1.writeUInt32BE(i, salt.length)

	      var U = crypto.createHmac(digest, password).update(block1).digest()

	      if (!hLen) {
	        hLen = U.length
	        T = new Buffer(hLen)
	        l = Math.ceil(keylen / hLen)
	        r = keylen - (l - 1) * hLen

	        if (keylen > (Math.pow(2, 32) - 1) * hLen)
	          throw new TypeError('keylen exceeds maximum length')
	      }

	      U.copy(T, 0, 0, hLen)

	      for (var j = 1; j < iterations; j++) {
	        U = crypto.createHmac(digest, password).update(U).digest()

	        for (var k = 0; k < hLen; k++) {
	          T[k] ^= U[k]
	        }
	      }

	      var destPos = (i - 1) * hLen
	      var len = (i == l ? r : hLen)
	      T.copy(DK, destPos, 0, len)
	    }

	    return DK
	  }

	  return {
	    pbkdf2: pbkdf2,
	    pbkdf2Sync: pbkdf2Sync
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 93 */
/***/ function(module, exports) {

	/*
	    cycle.js
	    2013-02-19

	    Public Domain.

	    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

	    This code should be minified before deployment.
	    See http://javascript.crockford.com/jsmin.html

	    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
	    NOT CONTROL.
	*/

	/*jslint evil: true, regexp: true */

	/*members $ref, apply, call, decycle, hasOwnProperty, length, prototype, push,
	    retrocycle, stringify, test, toString
	*/

	var cycle = exports;

	cycle.decycle = function decycle(object) {
	    'use strict';

	// Make a deep copy of an object or array, assuring that there is at most
	// one instance of each object or array in the resulting structure. The
	// duplicate references (which might be forming cycles) are replaced with
	// an object of the form
	//      {$ref: PATH}
	// where the PATH is a JSONPath string that locates the first occurance.
	// So,
	//      var a = [];
	//      a[0] = a;
	//      return JSON.stringify(JSON.decycle(a));
	// produces the string '[{"$ref":"$"}]'.

	// JSONPath is used to locate the unique object. $ indicates the top level of
	// the object or array. [NUMBER] or [STRING] indicates a child member or
	// property.

	    var objects = [],   // Keep a reference to each unique object or array
	        paths = [];     // Keep the path to each unique object or array

	    return (function derez(value, path) {

	// The derez recurses through the object, producing the deep copy.

	        var i,          // The loop counter
	            name,       // Property name
	            nu;         // The new object or array

	// typeof null === 'object', so go on if this value is really an object but not
	// one of the weird builtin objects.

	        if (typeof value === 'object' && value !== null &&
	                !(value instanceof Boolean) &&
	                !(value instanceof Date)    &&
	                !(value instanceof Number)  &&
	                !(value instanceof RegExp)  &&
	                !(value instanceof String)) {

	// If the value is an object or array, look to see if we have already
	// encountered it. If so, return a $ref/path object. This is a hard way,
	// linear search that will get slower as the number of unique objects grows.

	            for (i = 0; i < objects.length; i += 1) {
	                if (objects[i] === value) {
	                    return {$ref: paths[i]};
	                }
	            }

	// Otherwise, accumulate the unique value and its path.

	            objects.push(value);
	            paths.push(path);

	// If it is an array, replicate the array.

	            if (Object.prototype.toString.apply(value) === '[object Array]') {
	                nu = [];
	                for (i = 0; i < value.length; i += 1) {
	                    nu[i] = derez(value[i], path + '[' + i + ']');
	                }
	            } else {

	// If it is an object, replicate the object.

	                nu = {};
	                for (name in value) {
	                    if (Object.prototype.hasOwnProperty.call(value, name)) {
	                        nu[name] = derez(value[name],
	                            path + '[' + JSON.stringify(name) + ']');
	                    }
	                }
	            }
	            return nu;
	        }
	        return value;
	    }(object, '$'));
	};


	cycle.retrocycle = function retrocycle($) {
	    'use strict';

	// Restore an object that was reduced by decycle. Members whose values are
	// objects of the form
	//      {$ref: PATH}
	// are replaced with references to the value found by the PATH. This will
	// restore cycles. The object will be mutated.

	// The eval function is used to locate the values described by a PATH. The
	// root object is kept in a $ variable. A regular expression is used to
	// assure that the PATH is extremely well formed. The regexp contains nested
	// * quantifiers. That has been known to have extremely bad performance
	// problems on some browsers for very long strings. A PATH is expected to be
	// reasonably short. A PATH is allowed to belong to a very restricted subset of
	// Goessner's JSONPath.

	// So,
	//      var s = '[{"$ref":"$"}]';
	//      return JSON.retrocycle(JSON.parse(s));
	// produces an array containing a single element which is the array itself.

	    var px =
	        /^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;

	    (function rez(value) {

	// The rez function walks recursively through the object looking for $ref
	// properties. When it finds one that has a value that is a path, then it
	// replaces the $ref object with a reference to the value that is found by
	// the path.

	        var i, item, name, path;

	        if (value && typeof value === 'object') {
	            if (Object.prototype.toString.apply(value) === '[object Array]') {
	                for (i = 0; i < value.length; i += 1) {
	                    item = value[i];
	                    if (item && typeof item === 'object') {
	                        path = item.$ref;
	                        if (typeof path === 'string' && px.test(path)) {
	                            value[i] = eval(path);
	                        } else {
	                            rez(item);
	                        }
	                    }
	                }
	            } else {
	                for (name in value) {
	                    if (typeof value[name] === 'object') {
	                        item = value[name];
	                        if (item) {
	                            path = item.$ref;
	                            if (typeof path === 'string' && px.test(path)) {
	                                value[name] = eval(path);
	                            } else {
	                                rez(item);
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    }($));
	    return $;
	};


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * config.js: Default settings for all levels that winston knows about
	 *
	 * (C) 2010 Charlie Robbins
	 * MIT LICENCE
	 *
	 */

	var colors = __webpack_require__(95);

	// Fix colors not appearing in non-tty environments
	colors.enabled = true;

	var config = exports,
	    allColors = exports.allColors = {};

	config.addColors = function (colors) {
	  mixin(allColors, colors);
	};

	config.colorize = function (level, message) {
	  if (typeof message === 'undefined') message = level;

	  var colorized = message;
	  if (allColors[level] instanceof Array) {
	    for (var i = 0, l = allColors[level].length; i < l; ++i) {
	      colorized = colors[allColors[level][i]](colorized);
	    }
	  }
	  else if (allColors[level].match(/\s/)) {
	    var colorArr = allColors[level].split(/\s+/);
	    for (var i = 0; i < colorArr.length; ++i) {
	      colorized = colors[colorArr[i]](colorized);
	    }
	    allColors[level] = colorArr;
	  }
	  else {
	    colorized = colors[allColors[level]](colorized);
	  }

	  return colorized;
	};

	//
	// Export config sets
	//
	config.cli    = __webpack_require__(108);
	config.npm    = __webpack_require__(109);
	config.syslog = __webpack_require__(110);

	//
	// Add colors for pre-defined config sets
	//
	config.addColors(config.cli.colors);
	config.addColors(config.npm.colors);
	config.addColors(config.syslog.colors);

	function mixin (target) {
	  var args = Array.prototype.slice.call(arguments, 1);

	  args.forEach(function (a) {
	    var keys = Object.keys(a);
	    for (var i = 0; i < keys.length; i++) {
	      target[keys[i]] = a[keys[i]];
	    }
	  });
	  return target;
	};


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//
	// Remark: Requiring this file will use the "safe" colors API which will not touch String.prototype
	//
	//   var colors = require('colors/safe);
	//   colors.red("foo")
	//
	//
	var colors = __webpack_require__(96);
	module['exports'] = colors;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*

	The MIT License (MIT)

	Original Library 
	  - Copyright (c) Marak Squires

	Additional functionality
	 - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

	*/

	var colors = {};
	module['exports'] = colors;

	colors.themes = {};

	var ansiStyles = colors.styles = __webpack_require__(97);
	var defineProps = Object.defineProperties;

	colors.supportsColor = __webpack_require__(98);

	if (typeof colors.enabled === "undefined") {
	  colors.enabled = colors.supportsColor;
	}

	colors.stripColors = colors.strip = function(str){
	  return ("" + str).replace(/\x1B\[\d+m/g, '');
	};


	var stylize = colors.stylize = function stylize (str, style) {
	  return ansiStyles[style].open + str + ansiStyles[style].close;
	}

	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
	var escapeStringRegexp = function (str) {
	  if (typeof str !== 'string') {
	    throw new TypeError('Expected a string');
	  }
	  return str.replace(matchOperatorsRe,  '\\$&');
	}

	function build(_styles) {
	  var builder = function builder() {
	    return applyStyle.apply(builder, arguments);
	  };
	  builder._styles = _styles;
	  // __proto__ is used because we must return a function, but there is
	  // no way to create a function with a different prototype.
	  builder.__proto__ = proto;
	  return builder;
	}

	var styles = (function () {
	  var ret = {};
	  ansiStyles.grey = ansiStyles.gray;
	  Object.keys(ansiStyles).forEach(function (key) {
	    ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
	    ret[key] = {
	      get: function () {
	        return build(this._styles.concat(key));
	      }
	    };
	  });
	  return ret;
	})();

	var proto = defineProps(function colors() {}, styles);

	function applyStyle() {
	  var args = arguments;
	  var argsLen = args.length;
	  var str = argsLen !== 0 && String(arguments[0]);
	  if (argsLen > 1) {
	    for (var a = 1; a < argsLen; a++) {
	      str += ' ' + args[a];
	    }
	  }

	  if (!colors.enabled || !str) {
	    return str;
	  }

	  var nestedStyles = this._styles;

	  var i = nestedStyles.length;
	  while (i--) {
	    var code = ansiStyles[nestedStyles[i]];
	    str = code.open + str.replace(code.closeRe, code.open) + code.close;
	  }

	  return str;
	}

	function applyTheme (theme) {
	  for (var style in theme) {
	    (function(style){
	      colors[style] = function(str){
	        return colors[theme[style]](str);
	      };
	    })(style)
	  }
	}

	colors.setTheme = function (theme) {
	  if (typeof theme === 'string') {
	    try {
	      colors.themes[theme] = __webpack_require__(99)(theme);
	      applyTheme(colors.themes[theme]);
	      return colors.themes[theme];
	    } catch (err) {
	      console.log(err);
	      return err;
	    }
	  } else {
	    applyTheme(theme);
	  }
	};

	function init() {
	  var ret = {};
	  Object.keys(styles).forEach(function (name) {
	    ret[name] = {
	      get: function () {
	        return build([name]);
	      }
	    };
	  });
	  return ret;
	}

	var sequencer = function sequencer (map, str) {
	  var exploded = str.split(""), i = 0;
	  exploded = exploded.map(map);
	  return exploded.join("");
	};

	// custom formatter methods
	colors.trap = __webpack_require__(100);
	colors.zalgo = __webpack_require__(101);

	// maps
	colors.maps = {};
	colors.maps.america = __webpack_require__(104);
	colors.maps.zebra = __webpack_require__(107);
	colors.maps.rainbow = __webpack_require__(105);
	colors.maps.random = __webpack_require__(106)

	for (var map in colors.maps) {
	  (function(map){
	    colors[map] = function (str) {
	      return sequencer(colors.maps[map], str);
	    }
	  })(map)
	}

	defineProps(colors, init());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*
	The MIT License (MIT)

	Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

	*/

	var styles = {};
	module['exports'] = styles;

	var codes = {
	  reset: [0, 0],

	  bold: [1, 22],
	  dim: [2, 22],
	  italic: [3, 23],
	  underline: [4, 24],
	  inverse: [7, 27],
	  hidden: [8, 28],
	  strikethrough: [9, 29],

	  black: [30, 39],
	  red: [31, 39],
	  green: [32, 39],
	  yellow: [33, 39],
	  blue: [34, 39],
	  magenta: [35, 39],
	  cyan: [36, 39],
	  white: [37, 39],
	  gray: [90, 39],
	  grey: [90, 39],

	  bgBlack: [40, 49],
	  bgRed: [41, 49],
	  bgGreen: [42, 49],
	  bgYellow: [43, 49],
	  bgBlue: [44, 49],
	  bgMagenta: [45, 49],
	  bgCyan: [46, 49],
	  bgWhite: [47, 49],

	  // legacy styles for colors pre v1.0.0
	  blackBG: [40, 49],
	  redBG: [41, 49],
	  greenBG: [42, 49],
	  yellowBG: [43, 49],
	  blueBG: [44, 49],
	  magentaBG: [45, 49],
	  cyanBG: [46, 49],
	  whiteBG: [47, 49]

	};

	Object.keys(codes).forEach(function (key) {
	  var val = codes[key];
	  var style = styles[key] = [];
	  style.open = '\u001b[' + val[0] + 'm';
	  style.close = '\u001b[' + val[1] + 'm';
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*
	The MIT License (MIT)

	Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

	*/

	var argv = process.argv;

	module.exports = (function () {
	  if (argv.indexOf('--no-color') !== -1 ||
	    argv.indexOf('--color=false') !== -1) {
	    return false;
	  }

	  if (argv.indexOf('--color') !== -1 ||
	    argv.indexOf('--color=true') !== -1 ||
	    argv.indexOf('--color=always') !== -1) {
	    return true;
	  }

	  if (process.stdout && !process.stdout.isTTY) {
	    return false;
	  }

	  if (process.platform === 'win32') {
	    return true;
	  }

	  if ('COLORTERM' in process.env) {
	    return true;
	  }

	  if (process.env.TERM === 'dumb') {
	    return false;
	  }

	  if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
	    return true;
	  }

	  return false;
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./colors": 96,
		"./colors.js": 96,
		"./custom/trap": 100,
		"./custom/trap.js": 100,
		"./custom/zalgo": 101,
		"./custom/zalgo.js": 101,
		"./extendStringPrototype": 102,
		"./extendStringPrototype.js": 102,
		"./index": 103,
		"./index.js": 103,
		"./maps/america": 104,
		"./maps/america.js": 104,
		"./maps/rainbow": 105,
		"./maps/rainbow.js": 105,
		"./maps/random": 106,
		"./maps/random.js": 106,
		"./maps/zebra": 107,
		"./maps/zebra.js": 107,
		"./styles": 97,
		"./styles.js": 97,
		"./system/supports-colors": 98,
		"./system/supports-colors.js": 98
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 99;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {module['exports'] = function runTheTrap (text, options) {
	  var result = "";
	  text = text || "Run the trap, drop the bass";
	  text = text.split('');
	  var trap = {
	    a: ["\u0040", "\u0104", "\u023a", "\u0245", "\u0394", "\u039b", "\u0414"],
	    b: ["\u00df", "\u0181", "\u0243", "\u026e", "\u03b2", "\u0e3f"],
	    c: ["\u00a9", "\u023b", "\u03fe"],
	    d: ["\u00d0", "\u018a", "\u0500" , "\u0501" ,"\u0502", "\u0503"],
	    e: ["\u00cb", "\u0115", "\u018e", "\u0258", "\u03a3", "\u03be", "\u04bc", "\u0a6c"],
	    f: ["\u04fa"],
	    g: ["\u0262"],
	    h: ["\u0126", "\u0195", "\u04a2", "\u04ba", "\u04c7", "\u050a"],
	    i: ["\u0f0f"],
	    j: ["\u0134"],
	    k: ["\u0138", "\u04a0", "\u04c3", "\u051e"],
	    l: ["\u0139"],
	    m: ["\u028d", "\u04cd", "\u04ce", "\u0520", "\u0521", "\u0d69"],
	    n: ["\u00d1", "\u014b", "\u019d", "\u0376", "\u03a0", "\u048a"],
	    o: ["\u00d8", "\u00f5", "\u00f8", "\u01fe", "\u0298", "\u047a", "\u05dd", "\u06dd", "\u0e4f"],
	    p: ["\u01f7", "\u048e"],
	    q: ["\u09cd"],
	    r: ["\u00ae", "\u01a6", "\u0210", "\u024c", "\u0280", "\u042f"],
	    s: ["\u00a7", "\u03de", "\u03df", "\u03e8"],
	    t: ["\u0141", "\u0166", "\u0373"],
	    u: ["\u01b1", "\u054d"],
	    v: ["\u05d8"],
	    w: ["\u0428", "\u0460", "\u047c", "\u0d70"],
	    x: ["\u04b2", "\u04fe", "\u04fc", "\u04fd"],
	    y: ["\u00a5", "\u04b0", "\u04cb"],
	    z: ["\u01b5", "\u0240"]
	  }
	  text.forEach(function(c){
	    c = c.toLowerCase();
	    var chars = trap[c] || [" "];
	    var rand = Math.floor(Math.random() * chars.length);
	    if (typeof trap[c] !== "undefined") {
	      result += trap[c][rand];
	    } else {
	      result += c;
	    }
	  });
	  return result;

	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {// please no
	module['exports'] = function zalgo(text, options) {
	  text = text || "   he is here   ";
	  var soul = {
	    "up" : [
	      '̍', '̎', '̄', '̅',
	      '̿', '̑', '̆', '̐',
	      '͒', '͗', '͑', '̇',
	      '̈', '̊', '͂', '̓',
	      '̈', '͊', '͋', '͌',
	      '̃', '̂', '̌', '͐',
	      '̀', '́', '̋', '̏',
	      '̒', '̓', '̔', '̽',
	      '̉', 'ͣ', 'ͤ', 'ͥ',
	      'ͦ', 'ͧ', 'ͨ', 'ͩ',
	      'ͪ', 'ͫ', 'ͬ', 'ͭ',
	      'ͮ', 'ͯ', '̾', '͛',
	      '͆', '̚'
	    ],
	    "down" : [
	      '̖', '̗', '̘', '̙',
	      '̜', '̝', '̞', '̟',
	      '̠', '̤', '̥', '̦',
	      '̩', '̪', '̫', '̬',
	      '̭', '̮', '̯', '̰',
	      '̱', '̲', '̳', '̹',
	      '̺', '̻', '̼', 'ͅ',
	      '͇', '͈', '͉', '͍',
	      '͎', '͓', '͔', '͕',
	      '͖', '͙', '͚', '̣'
	    ],
	    "mid" : [
	      '̕', '̛', '̀', '́',
	      '͘', '̡', '̢', '̧',
	      '̨', '̴', '̵', '̶',
	      '͜', '͝', '͞',
	      '͟', '͠', '͢', '̸',
	      '̷', '͡', ' ҉'
	    ]
	  },
	  all = [].concat(soul.up, soul.down, soul.mid),
	  zalgo = {};

	  function randomNumber(range) {
	    var r = Math.floor(Math.random() * range);
	    return r;
	  }

	  function is_char(character) {
	    var bool = false;
	    all.filter(function (i) {
	      bool = (i === character);
	    });
	    return bool;
	  }
	  

	  function heComes(text, options) {
	    var result = '', counts, l;
	    options = options || {};
	    options["up"] = options["up"] || true;
	    options["mid"] = options["mid"] || true;
	    options["down"] = options["down"] || true;
	    options["size"] = options["size"] || "maxi";
	    text = text.split('');
	    for (l in text) {
	      if (is_char(l)) {
	        continue;
	      }
	      result = result + text[l];
	      counts = {"up" : 0, "down" : 0, "mid" : 0};
	      switch (options.size) {
	      case 'mini':
	        counts.up = randomNumber(8);
	        counts.min = randomNumber(2);
	        counts.down = randomNumber(8);
	        break;
	      case 'maxi':
	        counts.up = randomNumber(16) + 3;
	        counts.min = randomNumber(4) + 1;
	        counts.down = randomNumber(64) + 3;
	        break;
	      default:
	        counts.up = randomNumber(8) + 1;
	        counts.mid = randomNumber(6) / 2;
	        counts.down = randomNumber(8) + 1;
	        break;
	      }

	      var arr = ["up", "mid", "down"];
	      for (var d in arr) {
	        var index = arr[d];
	        for (var i = 0 ; i <= counts[index]; i++) {
	          if (options[index]) {
	            result = result + soul[index][randomNumber(soul[index].length)];
	          }
	        }
	      }
	    }
	    return result;
	  }
	  // don't summon him
	  return heComes(text);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var colors = __webpack_require__(96),
	    styles = __webpack_require__(97);

	module['exports'] = function () {

	  //
	  // Extends prototype of native string object to allow for "foo".red syntax
	  //
	  var addProperty = function (color, func) {
	    String.prototype.__defineGetter__(color, func);
	  };

	  var sequencer = function sequencer (map, str) {
	      return function () {
	        var exploded = this.split(""), i = 0;
	        exploded = exploded.map(map);
	        return exploded.join("");
	      }
	  };

	  var stylize = function stylize (str, style) {
	    return styles[style].open + str + styles[style].close;
	  }

	  addProperty('strip', function () {
	    return colors.strip(this);
	  });

	  addProperty('stripColors', function () {
	    return colors.strip(this);
	  });

	  addProperty("trap", function(){
	    return colors.trap(this);
	  });

	  addProperty("zalgo", function(){
	    return colors.zalgo(this);
	  });

	  addProperty("zebra", function(){
	    return colors.zebra(this);
	  });

	  addProperty("rainbow", function(){
	    return colors.rainbow(this);
	  });

	  addProperty("random", function(){
	    return colors.random(this);
	  });

	  addProperty("america", function(){
	    return colors.america(this);
	  });

	  //
	  // Iterate through all default styles and colors
	  //
	  var x = Object.keys(colors.styles);
	  x.forEach(function (style) {
	    addProperty(style, function () {
	      return stylize(this, style);
	    });
	  });

	  function applyTheme(theme) {
	    //
	    // Remark: This is a list of methods that exist
	    // on String that you should not overwrite.
	    //
	    var stringPrototypeBlacklist = [
	      '__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'charAt', 'constructor',
	      'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'charCodeAt',
	      'indexOf', 'lastIndexof', 'length', 'localeCompare', 'match', 'replace', 'search', 'slice', 'split', 'substring',
	      'toLocaleLowerCase', 'toLocaleUpperCase', 'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight'
	    ];

	    Object.keys(theme).forEach(function (prop) {
	      if (stringPrototypeBlacklist.indexOf(prop) !== -1) {
	        console.log('warn: '.red + ('String.prototype' + prop).magenta + ' is probably something you don\'t want to override. Ignoring style name');
	      }
	      else {
	        if (typeof(theme[prop]) === 'string') {
	          colors[prop] = colors[theme[prop]];
	          addProperty(prop, function () {
	            return colors[theme[prop]](this);
	          });
	        }
	        else {
	          addProperty(prop, function () {
	            var ret = this;
	            for (var t = 0; t < theme[prop].length; t++) {
	              ret = exports[theme[prop][t]](ret);
	            }
	            return ret;
	          });
	        }
	      }
	    });
	  }

	  colors.setTheme = function (theme) {
	    if (typeof theme === 'string') {
	      try {
	        colors.themes[theme] = __webpack_require__(99)(theme);
	        applyTheme(colors.themes[theme]);
	        return colors.themes[theme];
	      } catch (err) {
	        console.log(err);
	        return err;
	      }
	    } else {
	      applyTheme(theme);
	    }
	  };

	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var colors = __webpack_require__(96);
	module['exports'] = colors;

	// Remark: By default, colors will add style properties to String.prototype
	//
	// If you don't wish to extend String.prototype you can do this instead and native String will not be touched
	//
	//   var colors = require('colors/safe);
	//   colors.red("foo")
	//
	//
	var extendStringPrototype = __webpack_require__(102)();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var colors = __webpack_require__(96);

	module['exports'] = (function() {
	  return function (letter, i, exploded) {
	    if(letter === " ") return letter;
	    switch(i%3) {
	      case 0: return colors.red(letter);
	      case 1: return colors.white(letter)
	      case 2: return colors.blue(letter)
	    }
	  }
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var colors = __webpack_require__(96);

	module['exports'] = (function () {
	  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta']; //RoY G BiV
	  return function (letter, i, exploded) {
	    if (letter === " ") {
	      return letter;
	    } else {
	      return colors[rainbowColors[i++ % rainbowColors.length]](letter);
	    }
	  };
	})();


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var colors = __webpack_require__(96);

	module['exports'] = (function () {
	  var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta'];
	  return function(letter, i, exploded) {
	    return letter === " " ? letter : colors[available[Math.round(Math.random() * (available.length - 1))]](letter);
	  };
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var colors = __webpack_require__(96);

	module['exports'] = function (letter, i, exploded) {
	  return i % 2 === 0 ? letter : colors.inverse(letter);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 108 */
/***/ function(module, exports) {

	/*
	 * cli-config.js: Config that conform to commonly used CLI logging levels.
	 *
	 * (C) 2010 Charlie Robbins
	 * MIT LICENCE
	 *
	 */

	var cliConfig = exports;

	cliConfig.levels = {
	  error: 0,
	  warn: 1,
	  help: 2,
	  data: 3,
	  info: 4,
	  debug: 5,
	  prompt: 6,
	  verbose: 7,
	  input: 8,
	  silly: 9,
	};

	cliConfig.colors = {
	  error: 'red',
	  warn: 'yellow',
	  help: 'cyan',
	  data: 'grey',
	  info: 'green',
	  debug: 'blue',
	  prompt: 'grey',
	  verbose: 'cyan',
	  input: 'grey',
	  silly: 'magenta'
	};


/***/ },
/* 109 */
/***/ function(module, exports) {

	/*
	 * npm-config.js: Config that conform to npm logging levels.
	 *
	 * (C) 2010 Charlie Robbins
	 * MIT LICENCE
	 *
	 */

	var npmConfig = exports;

	npmConfig.levels = {
	  error: 0,
	  warn: 1,
	  info: 2,
	  verbose: 3,
	  debug: 4,
	  silly: 5
	};

	npmConfig.colors = {
	  error: 'red',
	  warn: 'yellow',
	  info: 'green',
	  verbose: 'cyan',
	  debug: 'blue',
	  silly: 'magenta'
	};


/***/ },
/* 110 */
/***/ function(module, exports) {

	/*
	 * syslog-config.js: Config that conform to syslog logging levels.
	 *
	 * (C) 2010 Charlie Robbins
	 * MIT LICENCE
	 *
	 */

	var syslogConfig = exports;

	syslogConfig.levels = {
	  emerg: 0,
	  alert: 1,
	  crit: 2,
	  error: 3,
	  warning: 4,
	  notice: 5,
	  info: 6,
	  debug: 7
	};

	syslogConfig.colors = {
	  emerg: 'red',
	  alert: 'yellow',
	  crit: 'red',
	  error: 'red',
	  warning: 'red',
	  notice: 'yellow',
	  info: 'green',
	  debug: 'blue'
	};


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * container.js: Inversion of control container for winston logger instances
	 *
	 * (C) 2010 Charlie Robbins
	 * MIT LICENCE
	 *
	 */

	var common = __webpack_require__(77),
	    winston = __webpack_require__(73),
	    extend = __webpack_require__(10)._extend;

	//
	// ### function Container (options)
	// #### @options {Object} Default pass-thru options for Loggers
	// Constructor function for the Container object responsible for managing
	// a set of `winston.Logger` instances based on string ids.
	//
	var Container = exports.Container = function (options) {
	  this.loggers = {};
	  this.options = options || {};
	  this.default = {
	    transports: [
	      new winston.transports.Console({
	        level: 'silly',
	        colorize: false
	      })
	    ]
	  }
	};

	//
	// ### function get / add (id, options)
	// #### @id {string} Id of the Logger to get
	// #### @options {Object} **Optional** Options for the Logger instance
	// Retreives a `winston.Logger` instance for the specified `id`. If
	// an instance does not exist, one is created.
	//
	Container.prototype.get = Container.prototype.add = function (id, options) {
	  var self = this,
	      existing;

	  if (!this.loggers[id]) {
	    //
	    // Remark: Simple shallow clone for configuration options in case we pass in
	    // instantiated protoypal objects
	    //
	    options = extend({}, options || this.options || this.default);
	    existing = options.transports || this.options.transports;
	    //
	    // Remark: Make sure if we have an array of transports we slice it to make copies
	    // of those references.
	    //
	    options.transports = existing ? existing.slice() : [];

	    if (options.transports.length === 0 && (!options || !options['console'])) {
	      options.transports.push(this.default.transports[0]);
	    }

	    Object.keys(options).forEach(function (key) {
	      if (key === 'transports') {
	        return;
	      }

	      var name = common.capitalize(key);

	      if (!winston.transports[name]) {
	        throw new Error('Cannot add unknown transport: ' + name);
	      }

	      var namedOptions = options[key];
	      namedOptions.id = id;
	      options.transports.push(new (winston.transports[name])(namedOptions));
	    });

	    this.loggers[id] = new winston.Logger(options);

	    this.loggers[id].on('close', function () {
	        self._delete(id);
	    });
	  }

	  return this.loggers[id];
	};

	//
	// ### function close (id)
	// #### @id {string} **Optional** Id of the Logger instance to find
	// Returns a boolean value indicating if this instance
	// has a logger with the specified `id`.
	//
	Container.prototype.has = function (id) {
	  return !!this.loggers[id];
	};

	//
	// ### function close (id)
	// #### @id {string} **Optional** Id of the Logger instance to close
	// Closes a `Logger` instance with the specified `id` if it exists.
	// If no `id` is supplied then all Loggers are closed.
	//
	Container.prototype.close = function (id) {
	  var self = this;

	  function _close (id) {
	    if (!self.loggers[id]) {
	      return;
	    }

	    self.loggers[id].close();
	    self._delete(id);
	  }

	  return id ? _close(id) : Object.keys(this.loggers).forEach(function (id) {
	    _close(id);
	  });
	};

	//
	// ### @private function _delete (id)
	// #### @id {string} Id of the Logger instance to delete from container
	// Deletes a `Logger` instance with the specified `id`.
	//
	Container.prototype._delete = function (id) {
	    delete this.loggers[id];
	}



/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*
	 * exception.js: Utility methods for gathing information about uncaughtExceptions.
	 *
	 * (C) 2010 Charlie Robbins
	 * MIT LICENCE
	 *
	 */

	var os = __webpack_require__(113),
	    stackTrace = __webpack_require__(114);

	var exception = exports;

	exception.getAllInfo = function (err) {
	  return {
	    date:    new Date().toString(),
	    process: exception.getProcessInfo(),
	    os:      exception.getOsInfo(),
	    trace:   exception.getTrace(err),
	    stack:   err.stack && err.stack.split('\n')
	  };
	};

	exception.getProcessInfo = function () {
	  return {
	    pid:         process.pid,
	    uid:         process.getuid ? process.getuid() : null,
	    gid:         process.getgid ? process.getgid() : null,
	    cwd:         process.cwd(),
	    execPath:    process.execPath,
	    version:     process.version,
	    argv:        process.argv,
	    memoryUsage: process.memoryUsage()
	  };
	};

	exception.getOsInfo = function () {
	  return {
	    loadavg: os.loadavg(),
	    uptime:  os.uptime()
	  };
	};

	exception.getTrace = function (err) {
	  var trace = err ? stackTrace.parse(err) : stackTrace.get();
	  return trace.map(function (site) {
	    return {
	      column:   site.getColumnNumber(),
	      file:     site.getFileName(),
	      function: site.getFunctionName(),
	      line:     site.getLineNumber(),
	      method:   site.getMethodName(),
	      native:   site.isNative(),
	    }
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 113 */
/***/ function(module, exports) {

	exports.endianness = function () { return 'LE' };

	exports.hostname = function () {
	    if (typeof location !== 'undefined') {
	        return location.hostname
	    }
	    else return '';
	};

	exports.loadavg = function () { return [] };

	exports.uptime = function () { return 0 };

	exports.freemem = function () {
	    return Number.MAX_VALUE;
	};

	exports.totalmem = function () {
	    return Number.MAX_VALUE;
	};

	exports.cpus = function () { return [] };

	exports.type = function () { return 'Browser' };

	exports.release = function () {
	    if (typeof navigator !== 'undefined') {
	        return navigator.appVersion;
	    }
	    return '';
	};

	exports.networkInterfaces
	= exports.getNetworkInterfaces
	= function () { return {} };

	exports.arch = function () { return 'javascript' };

	exports.platform = function () { return 'browser' };

	exports.tmpdir = exports.tmpDir = function () {
	    return '/tmp';
	};

	exports.EOL = '\n';


/***/ },
/* 114 */
/***/ function(module, exports) {

	exports.get = function(belowFn) {
	  var oldLimit = Error.stackTraceLimit;
	  Error.stackTraceLimit = Infinity;

	  var dummyObject = {};

	  var v8Handler = Error.prepareStackTrace;
	  Error.prepareStackTrace = function(dummyObject, v8StackTrace) {
	    return v8StackTrace;
	  };
	  Error.captureStackTrace(dummyObject, belowFn || exports.get);

	  var v8StackTrace = dummyObject.stack;
	  Error.prepareStackTrace = v8Handler;
	  Error.stackTraceLimit = oldLimit;

	  return v8StackTrace;
	};

	exports.parse = function(err) {
	  if (!err.stack) {
	    return [];
	  }

	  var self = this;
	  var lines = err.stack.split('\n').slice(1);

	  return lines
	    .map(function(line) {
	      if (line.match(/^\s*[-]{4,}$/)) {
	        return self._createParsedCallSite({
	          fileName: line,
	          lineNumber: null,
	          functionName: null,
	          typeName: null,
	          methodName: null,
	          columnNumber: null,
	          'native': null,
	        });
	      }

	      var lineMatch = line.match(/at (?:(.+)\s+)?\(?(?:(.+?):(\d+):(\d+)|([^)]+))\)?/);
	      if (!lineMatch) {
	        return;
	      }

	      var object = null;
	      var method = null;
	      var functionName = null;
	      var typeName = null;
	      var methodName = null;
	      var isNative = (lineMatch[5] === 'native');

	      if (lineMatch[1]) {
	        var methodMatch = lineMatch[1].match(/([^\.]+)(?:\.(.+))?/);
	        object = methodMatch[1];
	        method = methodMatch[2];
	        functionName = lineMatch[1];
	        typeName = 'Object';
	      }

	      if (method) {
	        typeName = object;
	        methodName = method;
	      }

	      if (method === '<anonymous>') {
	        methodName = null;
	        functionName = '';
	      }

	      var properties = {
	        fileName: lineMatch[2] || null,
	        lineNumber: parseInt(lineMatch[3], 10) || null,
	        functionName: functionName,
	        typeName: typeName,
	        methodName: methodName,
	        columnNumber: parseInt(lineMatch[4], 10) || null,
	        'native': isNative,
	      };

	      return self._createParsedCallSite(properties);
	    })
	    .filter(function(callSite) {
	      return !!callSite;
	    });
	};

	exports._createParsedCallSite = function(properties) {
	  var methods = {};
	  for (var property in properties) {
	    var prefix = 'get';
	    if (property === 'native') {
	      prefix = 'is';
	    }
	    var method = prefix + property.substr(0, 1).toUpperCase() + property.substr(1);

	    (function(property) {
	      methods[method] = function() {
	        return properties[property];
	      }
	    })(property);
	  }

	  var callSite = Object.create(methods);
	  for (var property in properties) {
	    callSite[property] = properties[property];
	  }

	  return callSite;
	};


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*
	 * logger.js: Core logger object used by winston.
	 *
	 * (C) 2010 Charlie Robbins
	 * MIT LICENCE
	 *
	 */

	var events = __webpack_require__(9),
	    util = __webpack_require__(10),
	    async = __webpack_require__(116),
	    config = __webpack_require__(94),
	    common = __webpack_require__(77),
	    exception = __webpack_require__(112),
	    Stream = __webpack_require__(55).Stream;

	const formatRegExp = /%[sdj%]/g;

	//
	// ### function Logger (options)
	// #### @options {Object} Options for this instance.
	// Constructor function for the Logger object responsible
	// for persisting log messages and metadata to one or more transports.
	//
	var Logger = exports.Logger = function (options) {
	  events.EventEmitter.call(this);
	  this.configure(options);
	};

	//
	// Inherit from `events.EventEmitter`.
	//
	util.inherits(Logger, events.EventEmitter);

	//
	// ### function configure (options)
	// This will wholesale reconfigure this instance by:
	// 1. Resetting all transports. Older transports will be removed implicitly.
	// 2. Set all other options including levels, colors, rewriters, filters,
	//    exceptionHandlers, etc.
	//
	Logger.prototype.configure = function (options) {
	  var self = this;

	  //
	  // If we have already been setup with transports
	  // then remove them before proceeding.
	  //
	  if (Array.isArray(this._names) && this._names.length) {
	    this.clear();
	  }

	  options = options || {};
	  this.transports = {};
	  this._names     = [];

	  if (options.transports) {
	    options.transports.forEach(function (transport) {
	      self.add(transport, null, true);
	    });
	  }

	  //
	  // Set Levels and default logging level
	  //
	  this.padLevels = options.padLevels || false;
	  this.setLevels(options.levels);
	  if (options.colors) {
	    config.addColors(options.colors);
	  }

	  //
	  // Hoist other options onto this instance.
	  //
	  this.level       = options.level || 'info';
	  this.emitErrs    = options.emitErrs || false;
	  this.stripColors = options.stripColors || false;
	  this.exitOnError = typeof options.exitOnError !== 'undefined'
	    ? options.exitOnError
	    : true;

	  //
	  // Setup internal state as empty Objects even though it is
	  // defined lazily later to ensure a strong existential API contract.
	  //
	  this.exceptionHandlers = {};
	  this.profilers         = {};

	  ['rewriters', 'filters'].forEach(function (kind) {
	    self[kind] = Array.isArray(options[kind])
	      ? options[kind]
	      : [];
	  });

	  if (options.exceptionHandlers) {
	    this.handleExceptions(options.exceptionHandlers);
	  }
	};

	//
	// ### function log (level, msg, [meta], callback)
	// #### @level {string} Level at which to log the message.
	// #### @msg {string} Message to log
	// #### @meta {Object} **Optional** Additional metadata to attach
	// #### @callback {function} Continuation to respond to when complete.
	// Core logging method exposed to Winston. Metadata is optional.
	//
	Logger.prototype.log = function (level) {
	  var args = Array.prototype.slice.call(arguments, 1),
	      self = this,
	      transports;

	  while (args[args.length - 1] === null) {
	    args.pop();
	  }

	  //
	  // Determining what is `meta` and what are arguments for string interpolation
	  // turns out to be VERY tricky. e.g. in the cases like this:
	  //
	  //    logger.info('No interpolation symbols', 'ok', 'why', { meta: 'is-this' });
	  //
	  var callback  = typeof args[args.length - 1] === 'function'
	    ? args.pop()
	    : null;

	  //
	  // Handle errors appropriately.
	  //
	  function onError(err) {
	    if (callback) {
	      callback(err);
	    }
	    else if (self.emitErrs) {
	      self.emit('error', err);
	    }
	  }

	  if (this._names.length === 0) {
	    return onError(new Error('Cannot log with no transports.'));
	  }
	  else if (typeof self.levels[level] === 'undefined') {
	    return onError(new Error('Unknown log level: ' + level));
	  }

	  //
	  // If there are no transports that match the level
	  // then be eager and return. This could potentially be calculated
	  // during `setLevels` for more performance gains.
	  //
	  var targets = this._names.filter(function (name) {
	    var transport = self.transports[name];
	    return (transport.level && self.levels[transport.level] >= self.levels[level])
	      || (!transport.level && self.levels[self.level] >= self.levels[level]);
	  });

	  if (!targets.length) {
	    if (callback) { callback(); }
	    return;
	  }

	  //
	  // Determining what is `meta` and what are arguments for string interpolation
	  // turns out to be VERY tricky. e.g. in the cases like this:
	  //
	  //    logger.info('No interpolation symbols', 'ok', 'why', { meta: 'is-this' });
	  //
	  var metaType  = Object.prototype.toString.call(args[args.length - 1]),
	      fmtMatch  = args[0] && args[0].match && args[0].match(formatRegExp),
	      isFormat  = fmtMatch && fmtMatch.length,
	      validMeta = !isFormat
	        ? metaType === '[object Object]' || metaType === '[object Error]' || metaType === '[object Array]'
	        : metaType === '[object Object]',
	      meta = validMeta ? args.pop() : {},
	      msg  = util.format.apply(null, args);

	  //
	  // Respond to the callback.
	  //
	  function finish(err) {
	    if (callback) {
	      if (err) return callback(err);
	      callback(null, level, msg, meta);
	    }

	    callback = null;
	    if (!err) {
	      self.emit('logged', level, msg, meta);
	    }
	  }

	  // If we should pad for levels, do so
	  if (this.padLevels) {
	    msg = new Array(this.levelLength - level.length + 1).join(' ') + msg;
	  }

	  this.rewriters.forEach(function (rewriter) {
	    meta = rewriter(level, msg, meta, self);
	  });

	  this.filters.forEach(function(filter) {
	    var filtered = filter(level, msg, meta, self);
	    if (typeof filtered === 'string')
	      msg = filtered;
	    else {
	      msg = filtered.msg;
	      meta = filtered.meta;
	    }
	  });

	  //
	  // For consideration of terminal 'color" programs like colors.js,
	  // which can add ANSI escape color codes to strings, we destyle the
	  // ANSI color escape codes when `this.stripColors` is set.
	  //
	  // see: http://en.wikipedia.org/wiki/ANSI_escape_code
	  //
	  if (this.stripColors) {
	    var code = /\u001b\[(\d+(;\d+)*)?m/g;
	    msg = ('' + msg).replace(code, '');
	  }

	  //
	  // Log for each transport and emit 'logging' event
	  //
	  function transportLog(name, next) {
	    var transport = self.transports[name];
	    transport.log(level, msg, meta, function (err) {
	      if (err) {
	        err.transport = transport;
	        finish(err);
	        return next();
	      }

	      self.emit('logging', transport, level, msg, meta);
	      next();
	    });
	  }

	  async.forEach(targets, transportLog, finish);
	  return this;
	};

	//
	// ### function query (options, callback)
	// #### @options {Object} Query options for this instance.
	// #### @callback {function} Continuation to respond to when complete.
	// Queries the all transports for this instance with the specified `options`.
	// This will aggregate each transport's results into one object containing
	// a property per transport.
	//
	Logger.prototype.query = function (options, callback) {
	  if (typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  var self = this,
	      options = options || {},
	      results = {},
	      query = common.clone(options.query) || {},
	      transports;

	  //
	  // Helper function to query a single transport
	  //
	  function queryTransport(transport, next) {
	    if (options.query) {
	      options.query = transport.formatQuery(query);
	    }

	    transport.query(options, function (err, results) {
	      if (err) {
	        return next(err);
	      }

	      next(null, transport.formatResults(results, options.format));
	    });
	  }

	  //
	  // Helper function to accumulate the results from
	  // `queryTransport` into the `results`.
	  //
	  function addResults(transport, next) {
	    queryTransport(transport, function (err, result) {
	      //
	      // queryTransport could potentially invoke the callback
	      // multiple times since Transport code can be unpredictable.
	      //
	      if (next) {
	        result = err || result;
	        if (result) {
	          results[transport.name] = result;
	        }

	        next();
	      }

	      next = null;
	    });
	  }

	  //
	  // If an explicit transport is being queried then
	  // respond with the results from only that transport
	  //
	  if (options.transport) {
	    options.transport = options.transport.toLowerCase();
	    return queryTransport(this.transports[options.transport], callback);
	  }

	  //
	  // Create a list of all transports for this instance.
	  //
	  transports = this._names.map(function (name) {
	    return self.transports[name];
	  }).filter(function (transport) {
	    return !!transport.query;
	  });

	  //
	  // Iterate over the transports in parallel setting the
	  // appropriate key in the `results`
	  //
	  async.forEach(transports, addResults, function () {
	    callback(null, results);
	  });
	};

	//
	// ### function stream (options)
	// #### @options {Object} Stream options for this instance.
	// Returns a log stream for all transports. Options object is optional.
	//
	Logger.prototype.stream = function (options) {
	  var self = this,
	      options = options || {},
	      out = new Stream,
	      streams = [],
	      transports;

	  if (options.transport) {
	    var transport = this.transports[options.transport];
	    delete options.transport;
	    if (transport && transport.stream) {
	      return transport.stream(options);
	    }
	  }

	  out._streams = streams;
	  out.destroy = function () {
	    var i = streams.length;
	    while (i--) streams[i].destroy();
	  };

	  //
	  // Create a list of all transports for this instance.
	  //
	  transports = this._names.map(function (name) {
	    return self.transports[name];
	  }).filter(function (transport) {
	    return !!transport.stream;
	  });

	  transports.forEach(function (transport) {
	    var stream = transport.stream(options);
	    if (!stream) return;

	    streams.push(stream);

	    stream.on('log', function (log) {
	      log.transport = log.transport || [];
	      log.transport.push(transport.name);
	      out.emit('log', log);
	    });

	    stream.on('error', function (err) {
	      err.transport = err.transport || [];
	      err.transport.push(transport.name);
	      out.emit('error', err);
	    });
	  });

	  return out;
	};

	//
	// ### function close ()
	// Cleans up resources (streams, event listeners) for all
	// transports associated with this instance (if necessary).
	//
	Logger.prototype.close = function () {
	  var self = this;

	  this._names.forEach(function (name) {
	    var transport = self.transports[name];
	    if (transport && transport.close) {
	      transport.close();
	    }
	  });

	  this.emit('close');
	};

	//
	// ### function handleExceptions ([tr0, tr1...] || tr0, tr1, ...)
	// Handles `uncaughtException` events for the current process by
	// ADDING any handlers passed in.
	//
	Logger.prototype.handleExceptions = function () {
	  var args = Array.prototype.slice.call(arguments),
	      handlers = [],
	      self = this;

	  args.forEach(function (a) {
	    if (Array.isArray(a)) {
	      handlers = handlers.concat(a);
	    }
	    else {
	      handlers.push(a);
	    }
	  });

	  this.exceptionHandlers = this.exceptionHandlers || {};
	  handlers.forEach(function (handler) {
	    self.exceptionHandlers[handler.name] = handler;
	  });

	  this._hnames = Object.keys(self.exceptionHandlers);

	  if (!this.catchExceptions) {
	    this.catchExceptions = this._uncaughtException.bind(this);
	    process.on('uncaughtException', this.catchExceptions);
	  }
	};

	//
	// ### function unhandleExceptions ()
	// Removes any handlers to `uncaughtException` events
	// for the current process
	//
	Logger.prototype.unhandleExceptions = function () {
	  var self = this;

	  if (this.catchExceptions) {
	    Object.keys(this.exceptionHandlers).forEach(function (name) {
	      var handler = self.exceptionHandlers[name];
	      if (handler.close) {
	        handler.close();
	      }
	    });

	    this.exceptionHandlers = {};
	    Object.keys(this.transports).forEach(function (name) {
	      var transport = self.transports[name];
	      if (transport.handleExceptions) {
	        transport.handleExceptions = false;
	      }
	    })

	    process.removeListener('uncaughtException', this.catchExceptions);
	    this.catchExceptions = false;
	  }
	};

	//
	// ### function add (transport, [options])
	// #### @transport {Transport} Prototype of the Transport object to add.
	// #### @options {Object} **Optional** Options for the Transport to add.
	// #### @instance {Boolean} **Optional** Value indicating if `transport` is already instantiated.
	// Adds a transport of the specified type to this instance.
	//
	Logger.prototype.add = function (transport, options, created) {
	  var instance = created ? transport : (new (transport)(options));

	  if (!instance.name && !instance.log) {
	    throw new Error('Unknown transport with no log() method');
	  }
	  else if (this.transports[instance.name]) {
	    throw new Error('Transport already attached: ' + instance.name);
	  }

	  this.transports[instance.name] = instance;
	  this._names = Object.keys(this.transports);

	  //
	  // Listen for the `error` event on the new Transport
	  //
	  instance._onError = this._onError.bind(this, instance)
	  if (!created) {
	    instance.on('error', instance._onError);
	  }

	  //
	  // If this transport has `handleExceptions` set to `true`
	  // and we are not already handling exceptions, do so.
	  //
	  if (instance.handleExceptions && !this.catchExceptions) {
	    this.handleExceptions();
	  }

	  return this;
	};

	//
	// ### function clear ()
	// Remove all transports from this instance
	//
	Logger.prototype.clear = function () {
	  Object.keys(this.transports).forEach(function (name) {
	    this.remove({ name: name });
	  }, this);
	};

	//
	// ### function remove (transport)
	// #### @transport {Transport|String} Transport or Name to remove.
	// Removes a transport of the specified type from this instance.
	//
	Logger.prototype.remove = function (transport) {
	  var name = typeof transport !== 'string'
	    ? transport.name || transport.prototype.name
	    : transport;

	  if (!this.transports[name]) {
	    throw new Error('Transport ' + name + ' not attached to this instance');
	  }

	  var instance = this.transports[name];
	  delete this.transports[name];
	  this._names = Object.keys(this.transports);

	  if (instance.close) {
	    instance.close();
	  }

	  if (instance._onError) {
	    instance.removeListener('error', instance._onError);
	  }
	  return this;
	};

	//
	// ### function startTimer ()
	// Returns an object corresponding to a specific timing. When done
	// is called the timer will finish and log the duration. e.g.:
	//
	//    timer = winston.startTimer()
	//    setTimeout(function(){
	//      timer.done("Logging message");
	//    }, 1000);
	//
	Logger.prototype.startTimer = function () {
	  return new ProfileHandler(this);
	};

	//
	// ### function profile (id, [msg, meta, callback])
	// #### @id {string} Unique id of the profiler
	// #### @msg {string} **Optional** Message to log
	// #### @meta {Object} **Optional** Additional metadata to attach
	// #### @callback {function} **Optional** Continuation to respond to when complete.
	// Tracks the time inbetween subsequent calls to this method
	// with the same `id` parameter. The second call to this method
	// will log the difference in milliseconds along with the message.
	//
	Logger.prototype.profile = function (id) {
	  var now = Date.now(), then, args,
	      msg, meta, callback;

	  if (this.profilers[id]) {
	    then = this.profilers[id];
	    delete this.profilers[id];

	    // Support variable arguments: msg, meta, callback
	    args     = Array.prototype.slice.call(arguments);
	    callback = typeof args[args.length - 1] === 'function' ? args.pop() : null;
	    meta     = typeof args[args.length - 1] === 'object' ? args.pop() : {};
	    msg      = args.length === 2 ? args[1] : id;

	    // Set the duration property of the metadata
	    meta.durationMs = now - then;
	    return this.info(msg, meta, callback);
	  }
	  else {
	    this.profilers[id] = now;
	  }

	  return this;
	};

	//
	// ### function setLevels (target)
	// #### @target {Object} Target levels to use on this instance
	// Sets the `target` levels specified on this instance.
	//
	Logger.prototype.setLevels = function (target) {
	  return common.setLevels(this, this.levels, target);
	};

	//
	// ### function cli ()
	// Configures this instance to have the default
	// settings for command-line interfaces: no timestamp,
	// colors enabled, padded output, and additional levels.
	//
	Logger.prototype.cli = function () {
	  this.padLevels = true;
	  this.setLevels(config.cli.levels);
	  config.addColors(config.cli.colors);

	  if (this.transports.console) {
	    this.transports.console.colorize = this.transports.console.colorize || true;
	    this.transports.console.timestamp = this.transports.console.timestamp || false;
	  }

	  return this;
	};

	//
	// ### @private function _uncaughtException (err)
	// #### @err {Error} Error to handle
	// Logs all relevant information around the `err` and
	// exits the current process.
	//
	Logger.prototype._uncaughtException = function (err) {
	  var self = this,
	      responded = false,
	      info = exception.getAllInfo(err),
	      handlers = this._getExceptionHandlers(),
	      timeout,
	      doExit;

	  //
	  // Calculate if we should exit on this error
	  //
	  doExit = typeof this.exitOnError === 'function'
	    ? this.exitOnError(err)
	    : this.exitOnError;

	  function logAndWait(transport, next) {
	    transport.logException('uncaughtException: ' + (err.message || err), info, next, err);
	  }

	  function gracefulExit() {
	    if (doExit && !responded) {
	      //
	      // Remark: Currently ignoring any exceptions from transports
	      //         when catching uncaught exceptions.
	      //
	      clearTimeout(timeout);
	      responded = true;
	      process.exit(1);
	    }
	  }

	  if (!handlers || handlers.length === 0) {
	    return gracefulExit();
	  }

	  //
	  // Log to all transports and allow the operation to take
	  // only up to `3000ms`.
	  //
	  async.forEach(handlers, logAndWait, gracefulExit);
	  if (doExit) {
	    timeout = setTimeout(gracefulExit, 3000);
	  }
	};

	//
	// ### @private function _getExceptionHandlers ()
	// Returns the list of transports and exceptionHandlers
	// for this instance.
	//
	Logger.prototype._getExceptionHandlers = function () {
	  var self = this;

	  return this._hnames.map(function (name) {
	    return self.exceptionHandlers[name];
	  }).concat(this._names.map(function (name) {
	    return self.transports[name].handleExceptions && self.transports[name];
	  })).filter(Boolean);
	};

	//
	// ### @private function _onError (transport, err)
	// #### @transport {Object} Transport on which the error occured
	// #### @err {Error} Error that occurred on the transport
	// Bubbles the error, `err`, that occured on the specified `transport`
	// up from this instance if `emitErrs` has been set.
	//
	Logger.prototype._onError = function (transport, err) {
	  if (this.emitErrs) {
	    this.emit('error', err, transport);
	  }
	};

	//
	// ### @private ProfileHandler
	// Constructor function for the ProfileHandler instance used by
	// `Logger.prototype.startTimer`. When done is called the timer
	// will finish and log the duration.
	//
	function ProfileHandler(logger) {
	  this.logger = logger;
	  this.start = Date.now();
	}

	//
	// ### function done (msg)
	// Ends the current timer (i.e. ProfileHandler) instance and
	// logs the `msg` along with the duration since creation.
	//
	ProfileHandler.prototype.done = function (msg) {
	  var args     = Array.prototype.slice.call(arguments),
	      callback = typeof args[args.length - 1] === 'function' ? args.pop() : null,
	      meta     = typeof args[args.length - 1] === 'object' ? args.pop() : {};

	  meta.duration = (Date.now()) - this.start + 'ms';
	  return this.logger.info(msg, meta, callback);
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, setImmediate, process) {/*!
	 * async
	 * https://github.com/caolan/async
	 *
	 * Copyright 2010-2014 Caolan McMahon
	 * Released under the MIT license
	 */
	(function () {

	    var async = {};
	    var noop = function () {};

	    // global on the server, window in the browser
	    var root, previous_async;

	    if (typeof window == 'object' && this === window) {
	        root = window;
	    }
	    else if (typeof global == 'object' && this === global) {
	        root = global;
	    }
	    else {
	        root = this;
	    }

	    if (root != null) {
	      previous_async = root.async;
	    }

	    async.noConflict = function () {
	        root.async = previous_async;
	        return async;
	    };

	    function only_once(fn) {
	        var called = false;
	        return function() {
	            if (called) throw new Error("Callback was already called.");
	            called = true;
	            fn.apply(root, arguments);
	        };
	    }

	    //// cross-browser compatiblity functions ////

	    var _toString = Object.prototype.toString;

	    var _isArray = Array.isArray || function (obj) {
	        return _toString.call(obj) === '[object Array]';
	    };

	    var _each = function (arr, iterator) {
	      var index = -1,
	          length = arr.length;

	      while (++index < length) {
	        iterator(arr[index], index, arr);
	      }
	    };

	    var _map = function (arr, iterator) {
	      var index = -1,
	          length = arr.length,
	          result = Array(length);

	      while (++index < length) {
	        result[index] = iterator(arr[index], index, arr);
	      }
	      return result;
	    };

	    var _reduce = function (arr, iterator, memo) {
	        _each(arr, function (x, i, a) {
	            memo = iterator(memo, x, i, a);
	        });
	        return memo;
	    };

	    var _forEachOf = function (object, iterator) {
	        _each(_keys(object), function (key) {
	            iterator(object[key], key);
	        });
	    };

	    var _keys = Object.keys || function (obj) {
	        var keys = [];
	        for (var k in obj) {
	            if (obj.hasOwnProperty(k)) {
	                keys.push(k);
	            }
	        }
	        return keys;
	    };

	    var _baseSlice = function (arr, start) {
	        start = start || 0;
	        var index = -1;
	        var length = arr.length;

	        if (start) {
	          length -= start;
	          length = length < 0 ? 0 : length;
	        }
	        var result = Array(length);

	        while (++index < length) {
	          result[index] = arr[index + start];
	        }
	        return result;
	    };

	    //// exported async module functions ////

	    //// nextTick implementation with browser-compatible fallback ////

	    // capture the global reference to guard against fakeTimer mocks
	    var _setImmediate;
	    if (typeof setImmediate === 'function') {
	        _setImmediate = setImmediate;
	    }

	    if (typeof process === 'undefined' || !(process.nextTick)) {
	        if (_setImmediate) {
	            async.nextTick = function (fn) {
	                // not a direct alias for IE10 compatibility
	                _setImmediate(fn);
	            };
	            async.setImmediate = async.nextTick;
	        }
	        else {
	            async.nextTick = function (fn) {
	                setTimeout(fn, 0);
	            };
	            async.setImmediate = async.nextTick;
	        }
	    }
	    else {
	        async.nextTick = process.nextTick;
	        if (_setImmediate) {
	            async.setImmediate = function (fn) {
	              // not a direct alias for IE10 compatibility
	              _setImmediate(fn);
	            };
	        }
	        else {
	            async.setImmediate = async.nextTick;
	        }
	    }

	    async.each = function (arr, iterator, callback) {
	        callback = callback || noop;
	        if (!arr.length) {
	            return callback();
	        }
	        var completed = 0;
	        _each(arr, function (x) {
	            iterator(x, only_once(done) );
	        });
	        function done(err) {
	          if (err) {
	              callback(err);
	              callback = noop;
	          }
	          else {
	              completed += 1;
	              if (completed >= arr.length) {
	                  callback();
	              }
	          }
	        }
	    };
	    async.forEach = async.each;

	    async.eachSeries = function (arr, iterator, callback) {
	        callback = callback || noop;
	        if (!arr.length) {
	            return callback();
	        }
	        var completed = 0;
	        var iterate = function () {
	            iterator(arr[completed], function (err) {
	                if (err) {
	                    callback(err);
	                    callback = noop;
	                }
	                else {
	                    completed += 1;
	                    if (completed >= arr.length) {
	                        callback();
	                    }
	                    else {
	                        iterate();
	                    }
	                }
	            });
	        };
	        iterate();
	    };
	    async.forEachSeries = async.eachSeries;


	    async.eachLimit = function (arr, limit, iterator, callback) {
	        var fn = _eachLimit(limit);
	        fn.apply(null, [arr, iterator, callback]);
	    };
	    async.forEachLimit = async.eachLimit;

	    var _eachLimit = function (limit) {

	        return function (arr, iterator, callback) {
	            callback = callback || noop;
	            if (!arr.length || limit <= 0) {
	                return callback();
	            }
	            var completed = 0;
	            var started = 0;
	            var running = 0;

	            (function replenish () {
	                if (completed >= arr.length) {
	                    return callback();
	                }

	                while (running < limit && started < arr.length) {
	                    started += 1;
	                    running += 1;
	                    iterator(arr[started - 1], function (err) {
	                        if (err) {
	                            callback(err);
	                            callback = noop;
	                        }
	                        else {
	                            completed += 1;
	                            running -= 1;
	                            if (completed >= arr.length) {
	                                callback();
	                            }
	                            else {
	                                replenish();
	                            }
	                        }
	                    });
	                }
	            })();
	        };
	    };



	    async.forEachOf = async.eachOf = function (object, iterator, callback) {
	        callback = callback || function () {};
	        var size = object.length || _keys(object).length;
	        var completed = 0;
	        if (!size) {
	            return callback();
	        }
	        _forEachOf(object, function (value, key) {
	            iterator(object[key], key, function (err) {
	                if (err) {
	                    callback(err);
	                    callback = function () {};
	                } else {
	                    completed += 1;
	                    if (completed === size) {
	                        callback(null);
	                    }
	                }
	            });
	        });
	    };

	    async.forEachOfSeries = async.eachOfSeries = function (obj, iterator, callback) {
	        callback = callback || function () {};
	        var keys = _keys(obj);
	        var size = keys.length;
	        if (!size) {
	            return callback();
	        }
	        var completed = 0;
	        var iterate = function () {
	            var sync = true;
	            var key = keys[completed];
	            iterator(obj[key], key, function (err) {
	                if (err) {
	                    callback(err);
	                    callback = function () {};
	                }
	                else {
	                    completed += 1;
	                    if (completed >= size) {
	                        callback(null);
	                    }
	                    else {
	                        if (sync) {
	                            async.nextTick(iterate);
	                        }
	                        else {
	                            iterate();
	                        }
	                    }
	                }
	            });
	            sync = false;
	        };
	        iterate();
	    };



	    async.forEachOfLimit = async.eachOfLimit = function (obj, limit, iterator, callback) {
	        _forEachOfLimit(limit)(obj, iterator, callback);
	    };

	    var _forEachOfLimit = function (limit) {

	        return function (obj, iterator, callback) {
	            callback = callback || function () {};
	            var keys = _keys(obj);
	            var size = keys.length;
	            if (!size || limit <= 0) {
	                return callback();
	            }
	            var completed = 0;
	            var started = 0;
	            var running = 0;

	            (function replenish () {
	                if (completed >= size) {
	                    return callback();
	                }

	                while (running < limit && started < size) {
	                    started += 1;
	                    running += 1;
	                    var key = keys[started - 1];
	                    iterator(obj[key], key, function (err) {
	                        if (err) {
	                            callback(err);
	                            callback = function () {};
	                        }
	                        else {
	                            completed += 1;
	                            running -= 1;
	                            if (completed >= size) {
	                                callback();
	                            }
	                            else {
	                                replenish();
	                            }
	                        }
	                    });
	                }
	            })();
	        };
	    };


	    var doParallel = function (fn) {
	        return function () {
	            var args = _baseSlice(arguments);
	            return fn.apply(null, [async.each].concat(args));
	        };
	    };
	    var doParallelLimit = function(limit, fn) {
	        return function () {
	            var args = _baseSlice(arguments);
	            return fn.apply(null, [_eachLimit(limit)].concat(args));
	        };
	    };
	    var doSeries = function (fn) {
	        return function () {
	            var args = _baseSlice(arguments);
	            return fn.apply(null, [async.eachSeries].concat(args));
	        };
	    };


	    var _asyncMap = function (eachfn, arr, iterator, callback) {
	        arr = _map(arr, function (x, i) {
	            return {index: i, value: x};
	        });
	        if (!callback) {
	            eachfn(arr, function (x, callback) {
	                iterator(x.value, function (err) {
	                    callback(err);
	                });
	            });
	        } else {
	            var results = [];
	            eachfn(arr, function (x, callback) {
	                iterator(x.value, function (err, v) {
	                    results[x.index] = v;
	                    callback(err);
	                });
	            }, function (err) {
	                callback(err, results);
	            });
	        }
	    };
	    async.map = doParallel(_asyncMap);
	    async.mapSeries = doSeries(_asyncMap);
	    async.mapLimit = function (arr, limit, iterator, callback) {
	        return _mapLimit(limit)(arr, iterator, callback);
	    };

	    var _mapLimit = function(limit) {
	        return doParallelLimit(limit, _asyncMap);
	    };

	    // reduce only has a series version, as doing reduce in parallel won't
	    // work in many situations.
	    async.reduce = function (arr, memo, iterator, callback) {
	        async.eachSeries(arr, function (x, callback) {
	            iterator(memo, x, function (err, v) {
	                memo = v;
	                callback(err);
	            });
	        }, function (err) {
	            callback(err, memo);
	        });
	    };
	    // inject alias
	    async.inject = async.reduce;
	    // foldl alias
	    async.foldl = async.reduce;

	    async.reduceRight = function (arr, memo, iterator, callback) {
	        var reversed = _map(arr, function (x) {
	            return x;
	        }).reverse();
	        async.reduce(reversed, memo, iterator, callback);
	    };
	    // foldr alias
	    async.foldr = async.reduceRight;

	    var _filter = function (eachfn, arr, iterator, callback) {
	        var results = [];
	        arr = _map(arr, function (x, i) {
	            return {index: i, value: x};
	        });
	        eachfn(arr, function (x, callback) {
	            iterator(x.value, function (v) {
	                if (v) {
	                    results.push(x);
	                }
	                callback();
	            });
	        }, function (err) {
	            callback(_map(results.sort(function (a, b) {
	                return a.index - b.index;
	            }), function (x) {
	                return x.value;
	            }));
	        });
	    };
	    async.filter = doParallel(_filter);
	    async.filterSeries = doSeries(_filter);
	    // select alias
	    async.select = async.filter;
	    async.selectSeries = async.filterSeries;

	    var _reject = function (eachfn, arr, iterator, callback) {
	        var results = [];
	        arr = _map(arr, function (x, i) {
	            return {index: i, value: x};
	        });
	        eachfn(arr, function (x, callback) {
	            iterator(x.value, function (v) {
	                if (!v) {
	                    results.push(x);
	                }
	                callback();
	            });
	        }, function (err) {
	            callback(_map(results.sort(function (a, b) {
	                return a.index - b.index;
	            }), function (x) {
	                return x.value;
	            }));
	        });
	    };
	    async.reject = doParallel(_reject);
	    async.rejectSeries = doSeries(_reject);

	    var _detect = function (eachfn, arr, iterator, main_callback) {
	        eachfn(arr, function (x, callback) {
	            iterator(x, function (result) {
	                if (result) {
	                    main_callback(x);
	                    main_callback = noop;
	                }
	                else {
	                    callback();
	                }
	            });
	        }, function (err) {
	            main_callback();
	        });
	    };
	    async.detect = doParallel(_detect);
	    async.detectSeries = doSeries(_detect);

	    async.some = function (arr, iterator, main_callback) {
	        async.each(arr, function (x, callback) {
	            iterator(x, function (v) {
	                if (v) {
	                    main_callback(true);
	                    main_callback = noop;
	                }
	                callback();
	            });
	        }, function (err) {
	            main_callback(false);
	        });
	    };
	    // any alias
	    async.any = async.some;

	    async.every = function (arr, iterator, main_callback) {
	        async.each(arr, function (x, callback) {
	            iterator(x, function (v) {
	                if (!v) {
	                    main_callback(false);
	                    main_callback = noop;
	                }
	                callback();
	            });
	        }, function (err) {
	            main_callback(true);
	        });
	    };
	    // all alias
	    async.all = async.every;

	    async.sortBy = function (arr, iterator, callback) {
	        async.map(arr, function (x, callback) {
	            iterator(x, function (err, criteria) {
	                if (err) {
	                    callback(err);
	                }
	                else {
	                    callback(null, {value: x, criteria: criteria});
	                }
	            });
	        }, function (err, results) {
	            if (err) {
	                return callback(err);
	            }
	            else {
	                var fn = function (left, right) {
	                    var a = left.criteria, b = right.criteria;
	                    return a < b ? -1 : a > b ? 1 : 0;
	                };
	                callback(null, _map(results.sort(fn), function (x) {
	                    return x.value;
	                }));
	            }
	        });
	    };

	    async.auto = function (tasks, callback) {
	        callback = callback || noop;
	        var keys = _keys(tasks);
	        var remainingTasks = keys.length;
	        if (!remainingTasks) {
	            return callback();
	        }

	        var results = {};

	        var listeners = [];
	        var addListener = function (fn) {
	            listeners.unshift(fn);
	        };
	        var removeListener = function (fn) {
	            for (var i = 0; i < listeners.length; i += 1) {
	                if (listeners[i] === fn) {
	                    listeners.splice(i, 1);
	                    return;
	                }
	            }
	        };
	        var taskComplete = function () {
	            remainingTasks--;
	            _each(listeners.slice(0), function (fn) {
	                fn();
	            });
	        };

	        addListener(function () {
	            if (!remainingTasks) {
	                var theCallback = callback;
	                // prevent final callback from calling itself if it errors
	                callback = noop;

	                theCallback(null, results);
	            }
	        });

	        _each(keys, function (k) {
	            var task = _isArray(tasks[k]) ? tasks[k]: [tasks[k]];
	            var taskCallback = function (err) {
	                var args = _baseSlice(arguments, 1);
	                if (args.length <= 1) {
	                    args = args[0];
	                }
	                if (err) {
	                    var safeResults = {};
	                    _each(_keys(results), function(rkey) {
	                        safeResults[rkey] = results[rkey];
	                    });
	                    safeResults[k] = args;
	                    callback(err, safeResults);
	                    // stop subsequent errors hitting callback multiple times
	                    callback = noop;
	                }
	                else {
	                    results[k] = args;
	                    async.setImmediate(taskComplete);
	                }
	            };
	            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
	            // prevent dead-locks
	            var len = requires.length;
	            var dep;
	            while (len--) {
	                if (!(dep = tasks[requires[len]])) {
	                    throw new Error('Has inexistant dependency');
	                }
	                if (_isArray(dep) && !!~dep.indexOf(k)) {
	                    throw new Error('Has cyclic dependencies');
	                }
	            }
	            var ready = function () {
	                return _reduce(requires, function (a, x) {
	                    return (a && results.hasOwnProperty(x));
	                }, true) && !results.hasOwnProperty(k);
	            };
	            if (ready()) {
	                task[task.length - 1](taskCallback, results);
	            }
	            else {
	                var listener = function () {
	                    if (ready()) {
	                        removeListener(listener);
	                        task[task.length - 1](taskCallback, results);
	                    }
	                };
	                addListener(listener);
	            }
	        });
	    };

	    async.retry = function(times, task, callback) {
	        var DEFAULT_TIMES = 5;
	        var attempts = [];
	        // Use defaults if times not passed
	        if (typeof times === 'function') {
	            callback = task;
	            task = times;
	            times = DEFAULT_TIMES;
	        }
	        // Make sure times is a number
	        times = parseInt(times, 10) || DEFAULT_TIMES;
	        var wrappedTask = function(wrappedCallback, wrappedResults) {
	            var retryAttempt = function(task, finalAttempt) {
	                return function(seriesCallback) {
	                    task(function(err, result){
	                        seriesCallback(!err || finalAttempt, {err: err, result: result});
	                    }, wrappedResults);
	                };
	            };
	            while (times) {
	                attempts.push(retryAttempt(task, !(times-=1)));
	            }
	            async.series(attempts, function(done, data){
	                data = data[data.length - 1];
	                (wrappedCallback || callback)(data.err, data.result);
	            });
	        };
	        // If a callback is passed, run this as a controll flow
	        return callback ? wrappedTask() : wrappedTask;
	    };

	    async.waterfall = function (tasks, callback) {
	        callback = callback || noop;
	        if (!_isArray(tasks)) {
	          var err = new Error('First argument to waterfall must be an array of functions');
	          return callback(err);
	        }
	        if (!tasks.length) {
	            return callback();
	        }
	        var wrapIterator = function (iterator) {
	            return function (err) {
	                if (err) {
	                    callback.apply(null, arguments);
	                    callback = noop;
	                }
	                else {
	                    var args = _baseSlice(arguments, 1);
	                    var next = iterator.next();
	                    if (next) {
	                        args.push(wrapIterator(next));
	                    }
	                    else {
	                        args.push(callback);
	                    }
	                    async.setImmediate(function () {
	                        iterator.apply(null, args);
	                    });
	                }
	            };
	        };
	        wrapIterator(async.iterator(tasks))();
	    };

	    var _parallel = function(eachfn, tasks, callback) {
	        callback = callback || noop;
	        if (_isArray(tasks)) {
	            eachfn.map(tasks, function (fn, callback) {
	                if (fn) {
	                    fn(function (err) {
	                        var args = _baseSlice(arguments, 1);
	                        if (args.length <= 1) {
	                            args = args[0];
	                        }
	                        callback.call(null, err, args);
	                    });
	                }
	            }, callback);
	        }
	        else {
	            var results = {};
	            eachfn.each(_keys(tasks), function (k, callback) {
	                tasks[k](function (err) {
	                    var args = _baseSlice(arguments, 1);
	                    if (args.length <= 1) {
	                        args = args[0];
	                    }
	                    results[k] = args;
	                    callback(err);
	                });
	            }, function (err) {
	                callback(err, results);
	            });
	        }
	    };

	    async.parallel = function (tasks, callback) {
	        _parallel({ map: async.map, each: async.each }, tasks, callback);
	    };

	    async.parallelLimit = function(tasks, limit, callback) {
	        _parallel({ map: _mapLimit(limit), each: _eachLimit(limit) }, tasks, callback);
	    };

	    async.series = function (tasks, callback) {
	        callback = callback || noop;
	        if (_isArray(tasks)) {
	            async.mapSeries(tasks, function (fn, callback) {
	                if (fn) {
	                    fn(function (err) {
	                        var args = _baseSlice(arguments, 1);
	                        if (args.length <= 1) {
	                            args = args[0];
	                        }
	                        callback.call(null, err, args);
	                    });
	                }
	            }, callback);
	        }
	        else {
	            var results = {};
	            async.eachSeries(_keys(tasks), function (k, callback) {
	                tasks[k](function (err) {
	                    var args = _baseSlice(arguments, 1);
	                    if (args.length <= 1) {
	                        args = args[0];
	                    }
	                    results[k] = args;
	                    callback(err);
	                });
	            }, function (err) {
	                callback(err, results);
	            });
	        }
	    };

	    async.iterator = function (tasks) {
	        var makeCallback = function (index) {
	            var fn = function () {
	                if (tasks.length) {
	                    tasks[index].apply(null, arguments);
	                }
	                return fn.next();
	            };
	            fn.next = function () {
	                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
	            };
	            return fn;
	        };
	        return makeCallback(0);
	    };

	    async.apply = function (fn) {
	        var args = _baseSlice(arguments, 1);
	        return function () {
	            return fn.apply(
	                null, args.concat(_baseSlice(arguments))
	            );
	        };
	    };

	    var _concat = function (eachfn, arr, fn, callback) {
	        var r = [];
	        eachfn(arr, function (x, cb) {
	            fn(x, function (err, y) {
	                r = r.concat(y || []);
	                cb(err);
	            });
	        }, function (err) {
	            callback(err, r);
	        });
	    };
	    async.concat = doParallel(_concat);
	    async.concatSeries = doSeries(_concat);

	    async.whilst = function (test, iterator, callback) {
	        if (test()) {
	            iterator(function (err) {
	                if (err) {
	                    return callback(err);
	                }
	                async.whilst(test, iterator, callback);
	            });
	        }
	        else {
	            callback();
	        }
	    };

	    async.doWhilst = function (iterator, test, callback) {
	        iterator(function (err) {
	            if (err) {
	                return callback(err);
	            }
	            var args = _baseSlice(arguments, 1);
	            if (test.apply(null, args)) {
	                async.doWhilst(iterator, test, callback);
	            }
	            else {
	                callback();
	            }
	        });
	    };

	    async.until = function (test, iterator, callback) {
	        if (!test()) {
	            iterator(function (err) {
	                if (err) {
	                    return callback(err);
	                }
	                async.until(test, iterator, callback);
	            });
	        }
	        else {
	            callback();
	        }
	    };

	    async.doUntil = function (iterator, test, callback) {
	        iterator(function (err) {
	            if (err) {
	                return callback(err);
	            }
	            var args = _baseSlice(arguments, 1);
	            if (!test.apply(null, args)) {
	                async.doUntil(iterator, test, callback);
	            }
	            else {
	                callback();
	            }
	        });
	    };

	    async.queue = function (worker, concurrency) {
	        if (concurrency === undefined) {
	            concurrency = 1;
	        }
	        else if(concurrency === 0) {
	            throw new Error('Concurrency must not be zero');
	        }
	        function _insert(q, data, pos, callback) {
	          if (!q.started){
	            q.started = true;
	          }
	          if (!_isArray(data)) {
	              data = [data];
	          }
	          if(data.length === 0) {
	             // call drain immediately if there are no tasks
	             return async.setImmediate(function() {
	                 if (q.drain) {
	                     q.drain();
	                 }
	             });
	          }
	          _each(data, function(task) {
	              var item = {
	                  data: task,
	                  callback: typeof callback === 'function' ? callback : null
	              };

	              if (pos) {
	                q.tasks.unshift(item);
	              } else {
	                q.tasks.push(item);
	              }

	              if (q.saturated && q.tasks.length === q.concurrency) {
	                  q.saturated();
	              }
	              async.setImmediate(q.process);
	          });
	        }

	        var workers = 0;
	        var q = {
	            tasks: [],
	            concurrency: concurrency,
	            saturated: null,
	            empty: null,
	            drain: null,
	            started: false,
	            paused: false,
	            push: function (data, callback) {
	              _insert(q, data, false, callback);
	            },
	            kill: function () {
	              q.drain = null;
	              q.tasks = [];
	            },
	            unshift: function (data, callback) {
	              _insert(q, data, true, callback);
	            },
	            process: function () {
	                if (!q.paused && workers < q.concurrency && q.tasks.length) {
	                    var task = q.tasks.shift();
	                    if (q.empty && q.tasks.length === 0) {
	                        q.empty();
	                    }
	                    workers += 1;
	                    var next = function () {
	                        workers -= 1;
	                        if (task.callback) {
	                            task.callback.apply(task, arguments);
	                        }
	                        if (q.drain && q.tasks.length + workers === 0) {
	                            q.drain();
	                        }
	                        q.process();
	                    };
	                    var cb = only_once(next);
	                    worker(task.data, cb);
	                }
	            },
	            length: function () {
	                return q.tasks.length;
	            },
	            running: function () {
	                return workers;
	            },
	            idle: function() {
	                return q.tasks.length + workers === 0;
	            },
	            pause: function () {
	                if (q.paused === true) { return; }
	                q.paused = true;
	            },
	            resume: function () {
	                if (q.paused === false) { return; }
	                q.paused = false;
	                var resumeCount = Math.min(q.concurrency, q.tasks.length);
	                // Need to call q.process once per concurrent
	                // worker to preserve full concurrency after pause
	                for (var w = 1; w <= resumeCount; w++) {
	                    async.setImmediate(q.process);
	                }
	            }
	        };
	        return q;
	    };

	    async.priorityQueue = function (worker, concurrency) {

	        function _compareTasks(a, b){
	          return a.priority - b.priority;
	        }

	        function _binarySearch(sequence, item, compare) {
	          var beg = -1,
	              end = sequence.length - 1;
	          while (beg < end) {
	            var mid = beg + ((end - beg + 1) >>> 1);
	            if (compare(item, sequence[mid]) >= 0) {
	              beg = mid;
	            } else {
	              end = mid - 1;
	            }
	          }
	          return beg;
	        }

	        function _insert(q, data, priority, callback) {
	          if (!q.started){
	            q.started = true;
	          }
	          if (!_isArray(data)) {
	              data = [data];
	          }
	          if(data.length === 0) {
	             // call drain immediately if there are no tasks
	             return async.setImmediate(function() {
	                 if (q.drain) {
	                     q.drain();
	                 }
	             });
	          }
	          _each(data, function(task) {
	              var item = {
	                  data: task,
	                  priority: priority,
	                  callback: typeof callback === 'function' ? callback : null
	              };

	              q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);

	              if (q.saturated && q.tasks.length === q.concurrency) {
	                  q.saturated();
	              }
	              async.setImmediate(q.process);
	          });
	        }

	        // Start with a normal queue
	        var q = async.queue(worker, concurrency);

	        // Override push to accept second parameter representing priority
	        q.push = function (data, priority, callback) {
	          _insert(q, data, priority, callback);
	        };

	        // Remove unshift function
	        delete q.unshift;

	        return q;
	    };

	    async.cargo = function (worker, payload) {
	        var working     = false,
	            tasks       = [];

	        var cargo = {
	            tasks: tasks,
	            payload: payload,
	            saturated: null,
	            empty: null,
	            drain: null,
	            drained: true,
	            push: function (data, callback) {
	                if (!_isArray(data)) {
	                    data = [data];
	                }
	                _each(data, function(task) {
	                    tasks.push({
	                        data: task,
	                        callback: typeof callback === 'function' ? callback : null
	                    });
	                    cargo.drained = false;
	                    if (cargo.saturated && tasks.length === payload) {
	                        cargo.saturated();
	                    }
	                });
	                async.setImmediate(cargo.process);
	            },
	            process: function process() {
	                if (working) return;
	                if (tasks.length === 0) {
	                    if(cargo.drain && !cargo.drained) cargo.drain();
	                    cargo.drained = true;
	                    return;
	                }

	                var ts = typeof payload === 'number' ?
	                    tasks.splice(0, payload) :
	                    tasks.splice(0, tasks.length);

	                var ds = _map(ts, function (task) {
	                    return task.data;
	                });

	                if(cargo.empty) cargo.empty();
	                working = true;
	                worker(ds, function () {
	                    working = false;

	                    var args = arguments;
	                    _each(ts, function (data) {
	                        if (data.callback) {
	                            data.callback.apply(null, args);
	                        }
	                    });

	                    process();
	                });
	            },
	            length: function () {
	                return tasks.length;
	            },
	            running: function () {
	                return working;
	            }
	        };
	        return cargo;
	    };

	    var _console_fn = function (name) {
	        return function (fn) {
	            var args = _baseSlice(arguments, 1);
	            fn.apply(null, args.concat([function (err) {
	                var args = _baseSlice(arguments, 1);
	                if (typeof console !== 'undefined') {
	                    if (err) {
	                        if (console.error) {
	                            console.error(err);
	                        }
	                    }
	                    else if (console[name]) {
	                        _each(args, function (x) {
	                            console[name](x);
	                        });
	                    }
	                }
	            }]));
	        };
	    };
	    async.log = _console_fn('log');
	    async.dir = _console_fn('dir');
	    /*async.info = _console_fn('info');
	    async.warn = _console_fn('warn');
	    async.error = _console_fn('error');*/

	    async.memoize = function (fn, hasher) {
	        var memo = {};
	        var queues = {};
	        hasher = hasher || function (x) {
	            return x;
	        };
	        var memoized = function () {
	            var args = _baseSlice(arguments);
	            var callback = args.pop();
	            var key = hasher.apply(null, args);
	            if (key in memo) {
	                async.nextTick(function () {
	                    callback.apply(null, memo[key]);
	                });
	            }
	            else if (key in queues) {
	                queues[key].push(callback);
	            }
	            else {
	                queues[key] = [callback];
	                fn.apply(null, args.concat([function () {
	                    memo[key] = _baseSlice(arguments);
	                    var q = queues[key];
	                    delete queues[key];
	                    for (var i = 0, l = q.length; i < l; i++) {
	                      q[i].apply(null, arguments);
	                    }
	                }]));
	            }
	        };
	        memoized.memo = memo;
	        memoized.unmemoized = fn;
	        return memoized;
	    };

	    async.unmemoize = function (fn) {
	      return function () {
	        return (fn.unmemoized || fn).apply(null, arguments);
	      };
	    };

	    async.times = function (count, iterator, callback) {
	        var counter = [];
	        for (var i = 0; i < count; i++) {
	            counter.push(i);
	        }
	        return async.map(counter, iterator, callback);
	    };

	    async.timesSeries = function (count, iterator, callback) {
	        var counter = [];
	        for (var i = 0; i < count; i++) {
	            counter.push(i);
	        }
	        return async.mapSeries(counter, iterator, callback);
	    };

	    async.seq = function (/* functions... */) {
	        var fns = arguments;
	        return function () {
	            var that = this;
	            var args = _baseSlice(arguments);
	            var callback = args.pop();
	            async.reduce(fns, args, function (newargs, fn, cb) {
	                fn.apply(that, newargs.concat([function () {
	                    var err = arguments[0];
	                    var nextargs = _baseSlice(arguments, 1);
	                    cb(err, nextargs);
	                }]));
	            },
	            function (err, results) {
	                callback.apply(that, [err].concat(results));
	            });
	        };
	    };

	    async.compose = function (/* functions... */) {
	      return async.seq.apply(null, Array.prototype.reverse.call(arguments));
	    };

	    var _applyEach = function (eachfn, fns /*args...*/) {
	        var go = function () {
	            var that = this;
	            var args = _baseSlice(arguments);
	            var callback = args.pop();
	            return eachfn(fns, function (fn, cb) {
	                fn.apply(that, args.concat([cb]));
	            },
	            callback);
	        };
	        if (arguments.length > 2) {
	            var args = _baseSlice(arguments, 2);
	            return go.apply(this, args);
	        }
	        else {
	            return go;
	        }
	    };
	    async.applyEach = doParallel(_applyEach);
	    async.applyEachSeries = doSeries(_applyEach);

	    async.forever = function (fn, callback) {
	        function next(err) {
	            if (err) {
	                if (callback) {
	                    return callback(err);
	                }
	                throw err;
	            }
	            fn(next);
	        }
	        next();
	    };

	    // Node.js
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = async;
	    }
	    // AMD / RequireJS
	    else if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return async;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	    // included directly via <script> tag
	    else {
	        root.async = async;
	    }

	}());

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(19).setImmediate, __webpack_require__(11)))

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*
	 * console.js: Transport for outputting to the console
	 *
	 * (C) 2010 Charlie Robbins
	 * MIT LICENCE
	 *
	 */

	var events = __webpack_require__(9),
	    os = __webpack_require__(113),
	    util = __webpack_require__(10),
	    common = __webpack_require__(77),
	    Transport = __webpack_require__(118).Transport;

	//
	// ### function Console (options)
	// #### @options {Object} Options for this instance.
	// Constructor function for the Console transport object responsible
	// for persisting log messages and metadata to a terminal or TTY.
	//
	var Console = exports.Console = function (options) {
	  Transport.call(this, options);
	  options = options || {};

	  this.json         = options.json        || false;
	  this.colorize     = options.colorize    || false;
	  this.prettyPrint  = options.prettyPrint || false;
	  this.timestamp    = typeof options.timestamp !== 'undefined' ? options.timestamp : false;
	  this.showLevel    = options.showLevel === undefined ? true : options.showLevel;
	  this.label        = options.label       || null;
	  this.logstash     = options.logstash    || false;
	  this.depth        = options.depth       || null;
	  this.align        = options.align       || false;
	  this.stderrLevels = setStderrLevels(options.stderrLevels, options.debugStdout);
	  this.eol          = options.eol   || os.EOL;

	  if (this.json) {
	    this.stringify = options.stringify || function (obj) {
	      return JSON.stringify(obj, null, 2);
	    };
	  }

	  //
	  // Convert stderrLevels into an Object for faster key-lookup times than an Array.
	  //
	  // For backwards compatibility, stderrLevels defaults to ['error', 'debug']
	  // or ['error'] depending on whether options.debugStdout is true.
	  //
	  function setStderrLevels (levels, debugStdout) {
	    var defaultMsg = 'Cannot have non-string elements in stderrLevels Array';
	    if (debugStdout) {
	      if (levels) {
	        //
	        // Don't allow setting both debugStdout and stderrLevels together,
	        // since this could cause behaviour a programmer might not expect.
	        //
	        throw new Error('Cannot set debugStdout and stderrLevels together');
	      }

	      return common.stringArrayToSet(['error'], defaultMsg);
	    }

	    if (!levels) {
	      return common.stringArrayToSet(['error', 'debug'], defaultMsg);
	    } else if (!(Array.isArray(levels))) {
	      throw new Error('Cannot set stderrLevels to type other than Array');
	    }

	    return common.stringArrayToSet(levels, defaultMsg);
	  };
	};

	//
	// Inherit from `winston.Transport`.
	//
	util.inherits(Console, Transport);

	//
	// Expose the name of this Transport on the prototype
	//
	Console.prototype.name = 'console';

	//
	// ### function log (level, msg, [meta], callback)
	// #### @level {string} Level at which to log the message.
	// #### @msg {string} Message to log
	// #### @meta {Object} **Optional** Additional metadata to attach
	// #### @callback {function} Continuation to respond to when complete.
	// Core logging method exposed to Winston. Metadata is optional.
	//
	Console.prototype.log = function (level, msg, meta, callback) {
	  if (this.silent) {
	    return callback(null, true);
	  }

	  var self = this,
	      output;

	  output = common.log({
	    colorize:    this.colorize,
	    json:        this.json,
	    level:       level,
	    message:     msg,
	    meta:        meta,
	    stringify:   this.stringify,
	    timestamp:   this.timestamp,
	    showLevel:   this.showLevel,
	    prettyPrint: this.prettyPrint,
	    raw:         this.raw,
	    label:       this.label,
	    logstash:    this.logstash,
	    depth:       this.depth,
	    formatter:   this.formatter,
	    align:       this.align,
	    humanReadableUnhandledException: this.humanReadableUnhandledException
	  });

	  if (this.stderrLevels[level]) {
	    process.stderr.write(output + '\n');
	  } else {
	    process.stdout.write(output + this.eol);
	  }

	  //
	  // Emit the `logged` event immediately because the event loop
	  // will not exit until `process.stdout` has drained anyway.
	  //
	  self.emit('logged');
	  callback(null, true);
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * transport.js: Base Transport object for all Winston transports.
	 *
	 * (C) 2010 Charlie Robbins
	 * MIT LICENCE
	 *
	 */

	var events = __webpack_require__(9),
	    util = __webpack_require__(10);

	//
	// ### function Transport (options)
	// #### @options {Object} Options for this instance.
	// Constructor function for the Tranport object responsible
	// base functionality for all winston transports.
	//
	var Transport = exports.Transport = function (options) {
	  events.EventEmitter.call(this);

	  options        = options        || {};
	  this.silent    = options.silent || false;
	  this.raw       = options.raw    || false;
	  this.name      = options.name   || this.name;
	  this.formatter = options.formatter;

	  //
	  // Do not set a default level. When `level` is falsey on any
	  // `Transport` instance, any `Logger` instance uses the
	  // configured level (instead of the Transport level)
	  //
	  this.level = options.level;

	  this.handleExceptions = options.handleExceptions || false;
	  this.exceptionsLevel  = options.exceptionsLevel || 'error';
	  this.humanReadableUnhandledException = options.humanReadableUnhandledException || false;
	};

	//
	// Inherit from `events.EventEmitter`.
	//
	util.inherits(Transport, events.EventEmitter);

	//
	// ### function formatQuery (query)
	// #### @query {string|Object} Query to format
	// Formats the specified `query` Object (or string) to conform
	// with the underlying implementation of this transport.
	//
	Transport.prototype.formatQuery = function (query) {
	  return query;
	};

	//
	// ### function normalizeQuery (query)
	// #### @options {string|Object} Query to normalize
	// Normalize options for query
	//
	Transport.prototype.normalizeQuery = function (options) {
	  //
	  // Use options similar to loggly.
	  // [See Loggly Search API](http://wiki.loggly.com/retrieve_events#optional)
	  //

	  options = options || {};

	  // limit
	  options.rows = options.rows || options.limit || 10;

	  // starting row offset
	  options.start = options.start || 0;

	  // now
	  options.until = options.until || new Date;
	  if (typeof options.until !== 'object') {
	    options.until = new Date(options.until);
	  }

	  // now - 24
	  options.from = options.from || (options.until - (24 * 60 * 60 * 1000));
	  if (typeof options.from !== 'object') {
	    options.from = new Date(options.from);
	  }


	  // 'asc' or 'desc'
	  options.order = options.order || 'desc';

	  // which fields to select
	  options.fields = options.fields;

	  return options;
	};

	//
	// ### function formatResults (results, options)
	// #### @results {Object|Array} Results returned from `.query`.
	// #### @options {Object} **Optional** Formatting options
	// Formats the specified `results` with the given `options` accordinging
	// to the implementation of this transport.
	//
	Transport.prototype.formatResults = function (results, options) {
	  return results;
	};

	//
	// ### function logException (msg, meta, callback)
	// #### @msg {string} Message to log
	// #### @meta {Object} **Optional** Additional metadata to attach
	// #### @callback {function} Continuation to respond to when complete.
	// Logs the specified `msg`, `meta` and responds to the callback once the log
	// operation is complete to ensure that the event loop will not exit before
	// all logging has completed.
	//
	Transport.prototype.logException = function (msg, meta, callback) {
	  var self = this,
	      called;

	  if (this.silent) {
	    return callback();
	  }

	  function onComplete () {
	    if (!called) {
	      called = true;
	      self.removeListener('logged', onComplete);
	      self.removeListener('error', onComplete);
	      callback();
	    }
	  }

	  this.once('logged', onComplete);
	  this.once('error', onComplete);
	  this.log(self.exceptionsLevel, msg, meta, function () { });
	};


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*
	 * file.js: Transport for outputting to a local log file
	 *
	 * (C) 2010 Charlie Robbins
	 * MIT LICENCE
	 *
	 */

	var events = __webpack_require__(9),
	    fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    path = __webpack_require__(17),
	    util = __webpack_require__(10),
	    async = __webpack_require__(116),
	    zlib = __webpack_require__(120),
	    common = __webpack_require__(77),
	    Transport = __webpack_require__(118).Transport,
	    isWritable = __webpack_require__(133).isWritable,
	    Stream = __webpack_require__(55).Stream,
	    os = __webpack_require__(113);

	//
	// ### function File (options)
	// #### @options {Object} Options for this instance.
	// Constructor function for the File transport object responsible
	// for persisting log messages and metadata to one or more files.
	//
	var File = exports.File = function (options) {
	  var self = this;
	  Transport.call(this, options);

	  //
	  // Helper function which throws an `Error` in the event
	  // that any of the rest of the arguments is present in `options`.
	  //
	  function throwIf (target /*, illegal... */) {
	    Array.prototype.slice.call(arguments, 1).forEach(function (name) {
	      if (options[name]) {
	        throw new Error('Cannot set ' + name + ' and ' + target + 'together');
	      }
	    });
	  }

	  if (options.filename || options.dirname) {
	    throwIf('filename or dirname', 'stream');
	    this._basename = this.filename = options.filename
	      ? path.basename(options.filename)
	      : 'winston.log';

	    this.dirname = options.dirname || path.dirname(options.filename);
	    this.options = options.options || { flags: 'a' };

	    //
	    // "24 bytes" is maybe a good value for logging lines.
	    //
	    this.options.highWaterMark = this.options.highWaterMark || 24;
	  }
	  else if (options.stream) {
	    throwIf('stream', 'filename', 'maxsize');
	    this._stream = options.stream;
	    this._isStreams2 = isWritable(this._stream);
	    this._stream.on('error', function(error){
	      self.emit('error', error);
	    });
	    //
	    // We need to listen for drain events when
	    // write() returns false. This can make node
	    // mad at times.
	    //
	    this._stream.setMaxListeners(Infinity);
	  }
	  else {
	    throw new Error('Cannot log to file without filename or stream.');
	  }

	  this.json        = options.json !== false;
	  this.logstash    = options.logstash    || false;
	  this.colorize    = options.colorize    || false;
	  this.maxsize     = options.maxsize     || null;
	  this.rotationFormat = options.rotationFormat || false;
	  this.zippedArchive = options.zippedArchive || false;
	  this.maxFiles    = options.maxFiles    || null;
	  this.prettyPrint = options.prettyPrint || false;
	  this.label       = options.label       || null;
	  this.timestamp   = options.timestamp != null ? options.timestamp : true;
	  this.eol         = options.eol || os.EOL;
	  this.tailable    = options.tailable    || false;
	  this.depth       = options.depth       || null;
	  this.showLevel   = options.showLevel === undefined ? true : options.showLevel;
	  this.maxRetries  = options.maxRetries || 2;

	  if (this.json) {
	    this.stringify = options.stringify;
	  }

	  //
	  // Internal state variables representing the number
	  // of files this instance has created and the current
	  // size (in bytes) of the current logfile.
	  //
	  this._size     = 0;
	  this._created  = 0;
	  this._buffer   = [];
	  this._draining = false;
	  this._opening  = false;
	  this._failures = 0;
	  this._archive = null;
	};

	//
	// Inherit from `winston.Transport`.
	//
	util.inherits(File, Transport);

	//
	// Expose the name of this Transport on the prototype
	//
	File.prototype.name = 'file';

	//
	// ### function log (level, msg, [meta], callback)
	// #### @level {string} Level at which to log the message.
	// #### @msg {string} Message to log
	// #### @meta {Object} **Optional** Additional metadata to attach
	// #### @callback {function} Continuation to respond to when complete.
	// Core logging method exposed to Winston. Metadata is optional.
	//
	File.prototype.log = function (level, msg, meta, callback) {
	  if (this.silent) {
	    return callback(null, true);
	  }

	  //
	  // If failures exceeds maxRetries then we can't access the
	  // stream. In this case we need to perform a noop and return
	  // an error.
	  //
	  if (this._failures >= this.maxRetries) {
	    return callback(new Error('Transport is in a failed state.'));
	  }

	  var self = this;

	  if (typeof msg !== 'string') {
	    msg = '' + msg;
	  }

	  var output = common.log({
	    level:       level,
	    message:     msg,
	    meta:        meta,
	    json:        this.json,
	    logstash:    this.logstash,
	    colorize:    this.colorize,
	    prettyPrint: this.prettyPrint,
	    timestamp:   this.timestamp,
	    showLevel:   this.showLevel,
	    stringify:   this.stringify,
	    label:       this.label,
	    depth:       this.depth,
	    formatter:   this.formatter,
	    humanReadableUnhandledException: this.humanReadableUnhandledException
	  });

	  if (typeof output === 'string') {
	    output += this.eol;
	  }

	  if (!this.filename) {
	    //
	    // If there is no `filename` on this instance then it was configured
	    // with a raw `WriteableStream` instance and we should not perform any
	    // size restrictions.
	    //
	    this._write(output, callback);
	    this._size += output.length;
	    this._lazyDrain();
	  }
	  else {
	    this.open(function (err) {
	      if (err) {
	        //
	        // If there was an error enqueue the message
	        //
	        return self._buffer.push([output, callback]);
	      }

	      self._write(output, callback);
	      self._size += output.length;
	      self._lazyDrain();
	    });
	  }
	};

	//
	// ### function _write (data, cb)
	// #### @data {String|Buffer} Data to write to the instance's stream.
	// #### @cb {function} Continuation to respond to when complete.
	// Write to the stream, ensure execution of a callback on completion.
	//
	File.prototype._write = function(data, callback) {
	  if (this._isStreams2) {
	    this._stream.write(data);
	    return callback && process.nextTick(function () {
	      callback(null, true);
	    });
	  }

	  // If this is a file write stream, we could use the builtin
	  // callback functionality, however, the stream is not guaranteed
	  // to be an fs.WriteStream.
	  var ret = this._stream.write(data);
	  if (!callback) return;
	  if (ret === false) {
	    return this._stream.once('drain', function() {
	      callback(null, true);
	    });
	  }
	  process.nextTick(function () {
	    callback(null, true);
	  });
	};

	//
	// ### function query (options, callback)
	// #### @options {Object} Loggly-like query options for this instance.
	// #### @callback {function} Continuation to respond to when complete.
	// Query the transport. Options object is optional.
	//
	File.prototype.query = function (options, callback) {
	  if (typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  var file = path.join(this.dirname, this.filename),
	      options = this.normalizeQuery(options),
	      buff = '',
	      results = [],
	      row = 0;

	  var stream = fs.createReadStream(file, {
	    encoding: 'utf8'
	  });

	  stream.on('error', function (err) {
	    if (stream.readable) {
	      stream.destroy();
	    }
	    if (!callback) return;
	    return err.code !== 'ENOENT'
	      ? callback(err)
	      : callback(null, results);
	  });

	  stream.on('data', function (data) {
	    var data = (buff + data).split(/\n+/),
	        l = data.length - 1,
	        i = 0;

	    for (; i < l; i++) {
	      if (!options.start || row >= options.start) {
	        add(data[i]);
	      }
	      row++;
	    }

	    buff = data[l];
	  });

	  stream.on('close', function () {
	    if (buff) add(buff, true);
	    if (options.order === 'desc') {
	      results = results.reverse();
	    }
	    if (callback) callback(null, results);
	  });

	  function add(buff, attempt) {
	    try {
	      var log = JSON.parse(buff);
	      if (check(log)) push(log);
	    } catch (e) {
	      if (!attempt) {
	        stream.emit('error', e);
	      }
	    }
	  }

	  function push(log) {
	    if (options.rows && results.length >= options.rows) {
	      if (stream.readable) {
	        stream.destroy();
	      }
	      return;
	    }

	    if (options.fields) {
	      var obj = {};
	      options.fields.forEach(function (key) {
	        obj[key] = log[key];
	      });
	      log = obj;
	    }

	    results.push(log);
	  }

	  function check(log) {
	    if (!log) return;

	    if (typeof log !== 'object') return;

	    var time = new Date(log.timestamp);
	    if ((options.from && time < options.from)
	        || (options.until && time > options.until)) {
	      return;
	    }

	    return true;
	  }
	};

	//
	// ### function stream (options)
	// #### @options {Object} Stream options for this instance.
	// Returns a log stream for this transport. Options object is optional.
	//
	File.prototype.stream = function (options) {
	  var file = path.join(this.dirname, this.filename),
	      options = options || {},
	      stream = new Stream;

	  var tail = {
	    file: file,
	    start: options.start
	  };

	  stream.destroy = common.tailFile(tail, function (err, line) {

	    if(err){
	      return stream.emit('error',err);
	    }

	    try {
	      stream.emit('data', line);
	      line = JSON.parse(line);
	      stream.emit('log', line);
	    } catch (e) {
	      stream.emit('error', e);
	    }
	  });

	  return stream;
	};

	//
	// ### function open (callback)
	// #### @callback {function} Continuation to respond to when complete
	// Checks to see if a new file needs to be created based on the `maxsize`
	// (if any) and the current size of the file used.
	//
	File.prototype.open = function (callback) {
	  if (this.opening) {
	    //
	    // If we are already attempting to open the next
	    // available file then respond with a value indicating
	    // that the message should be buffered.
	    //
	    return callback(true);
	  }
	  else if (!this._stream || (this.maxsize && this._size >= this.maxsize)) {
	    //
	    // If we dont have a stream or have exceeded our size, then create
	    // the next stream and respond with a value indicating that
	    // the message should be buffered.
	    //
	    callback(true);
	    return this._createStream();
	  }

	  this._archive = this.zippedArchive ? this._stream.path : null;

	  //
	  // Otherwise we have a valid (and ready) stream.
	  //
	  callback();
	};

	//
	// ### function close ()
	// Closes the stream associated with this instance.
	//
	File.prototype.close = function () {
	  var self = this;

	  if (this._stream) {
	    this._stream.end();
	    this._stream.destroySoon();

	    this._stream.once('finish', function () {
	      self.emit('flush');
	      self.emit('closed');
	    });
	  }
	};

	//
	// ### function flush ()
	// Flushes any buffered messages to the current `stream`
	// used by this instance.
	//
	File.prototype.flush = function () {
	  var self = this;

	  // If nothing to flush, there will be no "flush" event from native stream
	  // Thus, the "open" event will never be fired (see _createStream.createAndFlush function)
	  // That means, self.opening will never set to false and no logs will be written to disk
	  if (!this._buffer.length) {
	    return self.emit('flush');
	  }

	  //
	  // Iterate over the `_buffer` of enqueued messaged
	  // and then write them to the newly created stream.
	  //
	  this._buffer.forEach(function (item) {
	    var str = item[0],
	        callback = item[1];

	    process.nextTick(function () {
	      self._write(str, callback);
	      self._size += str.length;
	    });
	  });

	  //
	  // Quickly truncate the `_buffer` once the write operations
	  // have been started
	  //
	  self._buffer.length = 0;

	  //
	  // When the stream has drained we have flushed
	  // our buffer.
	  //
	  self._stream.once('drain', function () {
	    self.emit('flush');
	    self.emit('logged');
	  });
	};

	//
	// ### @private function _createStream ()
	// Attempts to open the next appropriate file for this instance
	// based on the common state (such as `maxsize` and `_basename`).
	//
	File.prototype._createStream = function () {
	  var self = this;
	  this.opening = true;

	  (function checkFile (target) {
	    var fullname = path.join(self.dirname, target);

	    //
	    // Creates the `WriteStream` and then flushes any
	    // buffered messages.
	    //
	    function createAndFlush (size) {
	      if (self._stream) {
	        self._stream.end();
	        self._stream.destroySoon();
	      }

	      self._size = size;
	      self.filename = target;
	      self._stream = fs.createWriteStream(fullname, self.options);
	      self._isStreams2 = isWritable(self._stream);
	      self._stream.on('error', function(error){
	        if (self._failures < self.maxRetries) {
	          self._createStream();
	          self._failures++;
	        }
	        else {
	          self.emit('error', error);
	        }
	      });
	      //
	      // We need to listen for drain events when
	      // write() returns false. This can make node
	      // mad at times.
	      //
	      self._stream.setMaxListeners(Infinity);

	      //
	      // When the current stream has finished flushing
	      // then we can be sure we have finished opening
	      // and thus can emit the `open` event.
	      //
	      self.once('flush', function () {
	        // Because "flush" event is based on native stream "drain" event,
	        // logs could be written inbetween "self.flush()" and here
	        // Therefore, we need to flush again to make sure everything is flushed
	        self.flush();

	        self.opening = false;
	        self.emit('open', fullname);
	      });
	      //
	      // Remark: It is possible that in the time it has taken to find the
	      // next logfile to be written more data than `maxsize` has been buffered,
	      // but for sensible limits (10s - 100s of MB) this seems unlikely in less
	      // than one second.
	      //
	      self.flush();
	      compressFile();
	    }

	    function compressFile() {
	      if (self._archive) {
	        var gzip = zlib.createGzip();

	        var inp = fs.createReadStream(String(self._archive));
	        var out = fs.createWriteStream(self._archive + '.gz');

	        inp.pipe(gzip).pipe(out);

	        fs.unlink(String(self._archive));
	        self._archive = '';
	      }
	    }

	    fs.stat(fullname, function (err, stats) {
	      if (err) {
	        if (err.code !== 'ENOENT') {
	          return self.emit('error', err);
	        }
	        return createAndFlush(0);
	      }

	      if (!stats || (self.maxsize && stats.size >= self.maxsize)) {
	        //
	        // If `stats.size` is greater than the `maxsize` for
	        // this instance then try again
	        //
	        return self._incFile(function() {
	          checkFile(self._getFile());
	        });
	      }

	      createAndFlush(stats.size);
	    });
	  })(this._getFile());
	};


	File.prototype._incFile = function (callback) {
	  var ext = path.extname(this._basename),
	      basename = path.basename(this._basename, ext),
	      oldest,
	      target;

	  if (!this.tailable) {
	    this._created += 1;
	    this._checkMaxFilesIncrementing(ext, basename, callback);
	  }
	  else {
	    this._checkMaxFilesTailable(ext, basename, callback);
	  }
	};

	//
	// ### @private function _getFile ()
	// Gets the next filename to use for this instance
	// in the case that log filesizes are being capped.
	//
	File.prototype._getFile = function () {
	  var ext = path.extname(this._basename),
	      basename = path.basename(this._basename, ext);

	  //
	  // Caveat emptor (indexzero): rotationFormat() was broken by design
	  // when combined with max files because the set of files to unlink
	  // is never stored.
	  //
	  return !this.tailable && this._created
	    ? basename + (this.rotationFormat ? this.rotationFormat() : this._created) + ext
	    : basename + ext;
	};

	//
	// ### @private function _checkMaxFilesIncrementing ()
	// Increment the number of files created or
	// checked by this instance.
	//
	File.prototype._checkMaxFilesIncrementing = function (ext, basename, callback) {
	  var oldest, target,
	    self = this;

	  if (self.zippedArchive) {
	    self._archive = path.join(self.dirname, basename +
	        ((self._created === 1) ? '' : self._created-1) +
	        ext);
	  }


	  // Check for maxFiles option and delete file
	  if (!self.maxFiles || self._created < self.maxFiles) {
	    return callback();
	  }

	  oldest = self._created - self.maxFiles;
	  target = path.join(self.dirname, basename + (oldest !== 0 ? oldest : '') + ext +
	    (self.zippedArchive ? '.gz' : ''));
	  fs.unlink(target, callback);
	};

	//
	// ### @private function _checkMaxFilesTailable ()
	//
	// Roll files forward based on integer, up to maxFiles.
	// e.g. if base if file.log and it becomes oversized, roll
	//    to file1.log, and allow file.log to be re-used. If
	//    file is oversized again, roll file1.log to file2.log,
	//    roll file.log to file1.log, and so on.
	File.prototype._checkMaxFilesTailable = function (ext, basename, callback) {
	  var tasks = [],
	      self = this;

	  if (!this.maxFiles)
	    return;

	  for (var x = this.maxFiles - 1; x > 0; x--) {
	    tasks.push(function (i) {
	      return function (cb) {
	        var tmppath = path.join(self.dirname, basename + (i - 1) + ext +
	          (self.zippedArchive ? '.gz' : ''));
	        fs.exists(tmppath, function (exists) {
	          if (!exists) {
	            return cb(null);
	          }

	          fs.rename(tmppath, path.join(self.dirname, basename + i + ext +
	            (self.zippedArchive ? '.gz' : '')), cb);
	        });
	      };
	    }(x));
	  }

	  if (self.zippedArchive) {
	    self._archive = path.join(self.dirname, basename + 1 + ext);
	  }
	  async.series(tasks, function (err) {
	    fs.rename(
	      path.join(self.dirname, basename + ext),
	      path.join(self.dirname, basename + 1 + ext),
	      callback
	    );
	  });
	};

	//
	// ### @private function _lazyDrain ()
	// Lazily attempts to emit the `logged` event when `this.stream` has
	// drained. This is really just a simple mutex that only works because
	// Node.js is single-threaded.
	//
	File.prototype._lazyDrain = function () {
	  var self = this;

	  if (!this._draining && this._stream) {
	    this._draining = true;

	    this._stream.once('drain', function () {
	      this._draining = false;
	      self.emit('logged');
	    });
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Transform = __webpack_require__(70);

	var binding = __webpack_require__(121);
	var util = __webpack_require__(10);
	var assert = __webpack_require__(31).ok;

	// zlib doesn't provide these, so kludge them in following the same
	// const naming scheme zlib uses.
	binding.Z_MIN_WINDOWBITS = 8;
	binding.Z_MAX_WINDOWBITS = 15;
	binding.Z_DEFAULT_WINDOWBITS = 15;

	// fewer than 64 bytes per chunk is stupid.
	// technically it could work with as few as 8, but even 64 bytes
	// is absurdly low.  Usually a MB or more is best.
	binding.Z_MIN_CHUNK = 64;
	binding.Z_MAX_CHUNK = Infinity;
	binding.Z_DEFAULT_CHUNK = (16 * 1024);

	binding.Z_MIN_MEMLEVEL = 1;
	binding.Z_MAX_MEMLEVEL = 9;
	binding.Z_DEFAULT_MEMLEVEL = 8;

	binding.Z_MIN_LEVEL = -1;
	binding.Z_MAX_LEVEL = 9;
	binding.Z_DEFAULT_LEVEL = binding.Z_DEFAULT_COMPRESSION;

	// expose all the zlib constants
	Object.keys(binding).forEach(function(k) {
	  if (k.match(/^Z/)) exports[k] = binding[k];
	});

	// translation table for return codes.
	exports.codes = {
	  Z_OK: binding.Z_OK,
	  Z_STREAM_END: binding.Z_STREAM_END,
	  Z_NEED_DICT: binding.Z_NEED_DICT,
	  Z_ERRNO: binding.Z_ERRNO,
	  Z_STREAM_ERROR: binding.Z_STREAM_ERROR,
	  Z_DATA_ERROR: binding.Z_DATA_ERROR,
	  Z_MEM_ERROR: binding.Z_MEM_ERROR,
	  Z_BUF_ERROR: binding.Z_BUF_ERROR,
	  Z_VERSION_ERROR: binding.Z_VERSION_ERROR
	};

	Object.keys(exports.codes).forEach(function(k) {
	  exports.codes[exports.codes[k]] = k;
	});

	exports.Deflate = Deflate;
	exports.Inflate = Inflate;
	exports.Gzip = Gzip;
	exports.Gunzip = Gunzip;
	exports.DeflateRaw = DeflateRaw;
	exports.InflateRaw = InflateRaw;
	exports.Unzip = Unzip;

	exports.createDeflate = function(o) {
	  return new Deflate(o);
	};

	exports.createInflate = function(o) {
	  return new Inflate(o);
	};

	exports.createDeflateRaw = function(o) {
	  return new DeflateRaw(o);
	};

	exports.createInflateRaw = function(o) {
	  return new InflateRaw(o);
	};

	exports.createGzip = function(o) {
	  return new Gzip(o);
	};

	exports.createGunzip = function(o) {
	  return new Gunzip(o);
	};

	exports.createUnzip = function(o) {
	  return new Unzip(o);
	};


	// Convenience methods.
	// compress/decompress a string or buffer in one step.
	exports.deflate = function(buffer, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  return zlibBuffer(new Deflate(opts), buffer, callback);
	};

	exports.deflateSync = function(buffer, opts) {
	  return zlibBufferSync(new Deflate(opts), buffer);
	};

	exports.gzip = function(buffer, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  return zlibBuffer(new Gzip(opts), buffer, callback);
	};

	exports.gzipSync = function(buffer, opts) {
	  return zlibBufferSync(new Gzip(opts), buffer);
	};

	exports.deflateRaw = function(buffer, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  return zlibBuffer(new DeflateRaw(opts), buffer, callback);
	};

	exports.deflateRawSync = function(buffer, opts) {
	  return zlibBufferSync(new DeflateRaw(opts), buffer);
	};

	exports.unzip = function(buffer, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  return zlibBuffer(new Unzip(opts), buffer, callback);
	};

	exports.unzipSync = function(buffer, opts) {
	  return zlibBufferSync(new Unzip(opts), buffer);
	};

	exports.inflate = function(buffer, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  return zlibBuffer(new Inflate(opts), buffer, callback);
	};

	exports.inflateSync = function(buffer, opts) {
	  return zlibBufferSync(new Inflate(opts), buffer);
	};

	exports.gunzip = function(buffer, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  return zlibBuffer(new Gunzip(opts), buffer, callback);
	};

	exports.gunzipSync = function(buffer, opts) {
	  return zlibBufferSync(new Gunzip(opts), buffer);
	};

	exports.inflateRaw = function(buffer, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  return zlibBuffer(new InflateRaw(opts), buffer, callback);
	};

	exports.inflateRawSync = function(buffer, opts) {
	  return zlibBufferSync(new InflateRaw(opts), buffer);
	};

	function zlibBuffer(engine, buffer, callback) {
	  var buffers = [];
	  var nread = 0;

	  engine.on('error', onError);
	  engine.on('end', onEnd);

	  engine.end(buffer);
	  flow();

	  function flow() {
	    var chunk;
	    while (null !== (chunk = engine.read())) {
	      buffers.push(chunk);
	      nread += chunk.length;
	    }
	    engine.once('readable', flow);
	  }

	  function onError(err) {
	    engine.removeListener('end', onEnd);
	    engine.removeListener('readable', flow);
	    callback(err);
	  }

	  function onEnd() {
	    var buf = Buffer.concat(buffers, nread);
	    buffers = [];
	    callback(null, buf);
	    engine.close();
	  }
	}

	function zlibBufferSync(engine, buffer) {
	  if (typeof buffer === 'string')
	    buffer = new Buffer(buffer);
	  if (!Buffer.isBuffer(buffer))
	    throw new TypeError('Not a string or buffer');

	  var flushFlag = binding.Z_FINISH;

	  return engine._processChunk(buffer, flushFlag);
	}

	// generic zlib
	// minimal 2-byte header
	function Deflate(opts) {
	  if (!(this instanceof Deflate)) return new Deflate(opts);
	  Zlib.call(this, opts, binding.DEFLATE);
	}

	function Inflate(opts) {
	  if (!(this instanceof Inflate)) return new Inflate(opts);
	  Zlib.call(this, opts, binding.INFLATE);
	}



	// gzip - bigger header, same deflate compression
	function Gzip(opts) {
	  if (!(this instanceof Gzip)) return new Gzip(opts);
	  Zlib.call(this, opts, binding.GZIP);
	}

	function Gunzip(opts) {
	  if (!(this instanceof Gunzip)) return new Gunzip(opts);
	  Zlib.call(this, opts, binding.GUNZIP);
	}



	// raw - no header
	function DeflateRaw(opts) {
	  if (!(this instanceof DeflateRaw)) return new DeflateRaw(opts);
	  Zlib.call(this, opts, binding.DEFLATERAW);
	}

	function InflateRaw(opts) {
	  if (!(this instanceof InflateRaw)) return new InflateRaw(opts);
	  Zlib.call(this, opts, binding.INFLATERAW);
	}


	// auto-detect header.
	function Unzip(opts) {
	  if (!(this instanceof Unzip)) return new Unzip(opts);
	  Zlib.call(this, opts, binding.UNZIP);
	}


	// the Zlib class they all inherit from
	// This thing manages the queue of requests, and returns
	// true or false if there is anything in the queue when
	// you call the .write() method.

	function Zlib(opts, mode) {
	  this._opts = opts = opts || {};
	  this._chunkSize = opts.chunkSize || exports.Z_DEFAULT_CHUNK;

	  Transform.call(this, opts);

	  if (opts.flush) {
	    if (opts.flush !== binding.Z_NO_FLUSH &&
	        opts.flush !== binding.Z_PARTIAL_FLUSH &&
	        opts.flush !== binding.Z_SYNC_FLUSH &&
	        opts.flush !== binding.Z_FULL_FLUSH &&
	        opts.flush !== binding.Z_FINISH &&
	        opts.flush !== binding.Z_BLOCK) {
	      throw new Error('Invalid flush flag: ' + opts.flush);
	    }
	  }
	  this._flushFlag = opts.flush || binding.Z_NO_FLUSH;

	  if (opts.chunkSize) {
	    if (opts.chunkSize < exports.Z_MIN_CHUNK ||
	        opts.chunkSize > exports.Z_MAX_CHUNK) {
	      throw new Error('Invalid chunk size: ' + opts.chunkSize);
	    }
	  }

	  if (opts.windowBits) {
	    if (opts.windowBits < exports.Z_MIN_WINDOWBITS ||
	        opts.windowBits > exports.Z_MAX_WINDOWBITS) {
	      throw new Error('Invalid windowBits: ' + opts.windowBits);
	    }
	  }

	  if (opts.level) {
	    if (opts.level < exports.Z_MIN_LEVEL ||
	        opts.level > exports.Z_MAX_LEVEL) {
	      throw new Error('Invalid compression level: ' + opts.level);
	    }
	  }

	  if (opts.memLevel) {
	    if (opts.memLevel < exports.Z_MIN_MEMLEVEL ||
	        opts.memLevel > exports.Z_MAX_MEMLEVEL) {
	      throw new Error('Invalid memLevel: ' + opts.memLevel);
	    }
	  }

	  if (opts.strategy) {
	    if (opts.strategy != exports.Z_FILTERED &&
	        opts.strategy != exports.Z_HUFFMAN_ONLY &&
	        opts.strategy != exports.Z_RLE &&
	        opts.strategy != exports.Z_FIXED &&
	        opts.strategy != exports.Z_DEFAULT_STRATEGY) {
	      throw new Error('Invalid strategy: ' + opts.strategy);
	    }
	  }

	  if (opts.dictionary) {
	    if (!Buffer.isBuffer(opts.dictionary)) {
	      throw new Error('Invalid dictionary: it should be a Buffer instance');
	    }
	  }

	  this._binding = new binding.Zlib(mode);

	  var self = this;
	  this._hadError = false;
	  this._binding.onerror = function(message, errno) {
	    // there is no way to cleanly recover.
	    // continuing only obscures problems.
	    self._binding = null;
	    self._hadError = true;

	    var error = new Error(message);
	    error.errno = errno;
	    error.code = exports.codes[errno];
	    self.emit('error', error);
	  };

	  var level = exports.Z_DEFAULT_COMPRESSION;
	  if (typeof opts.level === 'number') level = opts.level;

	  var strategy = exports.Z_DEFAULT_STRATEGY;
	  if (typeof opts.strategy === 'number') strategy = opts.strategy;

	  this._binding.init(opts.windowBits || exports.Z_DEFAULT_WINDOWBITS,
	                     level,
	                     opts.memLevel || exports.Z_DEFAULT_MEMLEVEL,
	                     strategy,
	                     opts.dictionary);

	  this._buffer = new Buffer(this._chunkSize);
	  this._offset = 0;
	  this._closed = false;
	  this._level = level;
	  this._strategy = strategy;

	  this.once('end', this.close);
	}

	util.inherits(Zlib, Transform);

	Zlib.prototype.params = function(level, strategy, callback) {
	  if (level < exports.Z_MIN_LEVEL ||
	      level > exports.Z_MAX_LEVEL) {
	    throw new RangeError('Invalid compression level: ' + level);
	  }
	  if (strategy != exports.Z_FILTERED &&
	      strategy != exports.Z_HUFFMAN_ONLY &&
	      strategy != exports.Z_RLE &&
	      strategy != exports.Z_FIXED &&
	      strategy != exports.Z_DEFAULT_STRATEGY) {
	    throw new TypeError('Invalid strategy: ' + strategy);
	  }

	  if (this._level !== level || this._strategy !== strategy) {
	    var self = this;
	    this.flush(binding.Z_SYNC_FLUSH, function() {
	      self._binding.params(level, strategy);
	      if (!self._hadError) {
	        self._level = level;
	        self._strategy = strategy;
	        if (callback) callback();
	      }
	    });
	  } else {
	    process.nextTick(callback);
	  }
	};

	Zlib.prototype.reset = function() {
	  return this._binding.reset();
	};

	// This is the _flush function called by the transform class,
	// internally, when the last chunk has been written.
	Zlib.prototype._flush = function(callback) {
	  this._transform(new Buffer(0), '', callback);
	};

	Zlib.prototype.flush = function(kind, callback) {
	  var ws = this._writableState;

	  if (typeof kind === 'function' || (kind === void 0 && !callback)) {
	    callback = kind;
	    kind = binding.Z_FULL_FLUSH;
	  }

	  if (ws.ended) {
	    if (callback)
	      process.nextTick(callback);
	  } else if (ws.ending) {
	    if (callback)
	      this.once('end', callback);
	  } else if (ws.needDrain) {
	    var self = this;
	    this.once('drain', function() {
	      self.flush(callback);
	    });
	  } else {
	    this._flushFlag = kind;
	    this.write(new Buffer(0), '', callback);
	  }
	};

	Zlib.prototype.close = function(callback) {
	  if (callback)
	    process.nextTick(callback);

	  if (this._closed)
	    return;

	  this._closed = true;

	  this._binding.close();

	  var self = this;
	  process.nextTick(function() {
	    self.emit('close');
	  });
	};

	Zlib.prototype._transform = function(chunk, encoding, cb) {
	  var flushFlag;
	  var ws = this._writableState;
	  var ending = ws.ending || ws.ended;
	  var last = ending && (!chunk || ws.length === chunk.length);

	  if (!chunk === null && !Buffer.isBuffer(chunk))
	    return cb(new Error('invalid input'));

	  // If it's the last chunk, or a final flush, we use the Z_FINISH flush flag.
	  // If it's explicitly flushing at some other time, then we use
	  // Z_FULL_FLUSH. Otherwise, use Z_NO_FLUSH for maximum compression
	  // goodness.
	  if (last)
	    flushFlag = binding.Z_FINISH;
	  else {
	    flushFlag = this._flushFlag;
	    // once we've flushed the last of the queue, stop flushing and
	    // go back to the normal behavior.
	    if (chunk.length >= ws.length) {
	      this._flushFlag = this._opts.flush || binding.Z_NO_FLUSH;
	    }
	  }

	  var self = this;
	  this._processChunk(chunk, flushFlag, cb);
	};

	Zlib.prototype._processChunk = function(chunk, flushFlag, cb) {
	  var availInBefore = chunk && chunk.length;
	  var availOutBefore = this._chunkSize - this._offset;
	  var inOff = 0;

	  var self = this;

	  var async = typeof cb === 'function';

	  if (!async) {
	    var buffers = [];
	    var nread = 0;

	    var error;
	    this.on('error', function(er) {
	      error = er;
	    });

	    do {
	      var res = this._binding.writeSync(flushFlag,
	                                        chunk, // in
	                                        inOff, // in_off
	                                        availInBefore, // in_len
	                                        this._buffer, // out
	                                        this._offset, //out_off
	                                        availOutBefore); // out_len
	    } while (!this._hadError && callback(res[0], res[1]));

	    if (this._hadError) {
	      throw error;
	    }

	    var buf = Buffer.concat(buffers, nread);
	    this.close();

	    return buf;
	  }

	  var req = this._binding.write(flushFlag,
	                                chunk, // in
	                                inOff, // in_off
	                                availInBefore, // in_len
	                                this._buffer, // out
	                                this._offset, //out_off
	                                availOutBefore); // out_len

	  req.buffer = chunk;
	  req.callback = callback;

	  function callback(availInAfter, availOutAfter) {
	    if (self._hadError)
	      return;

	    var have = availOutBefore - availOutAfter;
	    assert(have >= 0, 'have should not go down');

	    if (have > 0) {
	      var out = self._buffer.slice(self._offset, self._offset + have);
	      self._offset += have;
	      // serve some output to the consumer.
	      if (async) {
	        self.push(out);
	      } else {
	        buffers.push(out);
	        nread += out.length;
	      }
	    }

	    // exhausted the output buffer, or used all the input create a new one.
	    if (availOutAfter === 0 || self._offset >= self._chunkSize) {
	      availOutBefore = self._chunkSize;
	      self._offset = 0;
	      self._buffer = new Buffer(self._chunkSize);
	    }

	    if (availOutAfter === 0) {
	      // Not actually done.  Need to reprocess.
	      // Also, update the availInBefore to the availInAfter value,
	      // so that if we have to hit it a third (fourth, etc.) time,
	      // it'll have the correct byte counts.
	      inOff += (availInBefore - availInAfter);
	      availInBefore = availInAfter;

	      if (!async)
	        return true;

	      var newReq = self._binding.write(flushFlag,
	                                       chunk,
	                                       inOff,
	                                       availInBefore,
	                                       self._buffer,
	                                       self._offset,
	                                       self._chunkSize);
	      newReq.callback = callback; // this same function
	      newReq.buffer = chunk;
	      return;
	    }

	    if (!async)
	      return false;

	    // finished with the chunk.
	    cb();
	  }
	};

	util.inherits(Deflate, Zlib);
	util.inherits(Inflate, Zlib);
	util.inherits(Gzip, Zlib);
	util.inherits(Gunzip, Zlib);
	util.inherits(DeflateRaw, Zlib);
	util.inherits(InflateRaw, Zlib);
	util.inherits(Unzip, Zlib);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer, __webpack_require__(11)))

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, Buffer) {var msg = __webpack_require__(122);
	var zstream = __webpack_require__(123);
	var zlib_deflate = __webpack_require__(124);
	var zlib_inflate = __webpack_require__(129);
	var constants = __webpack_require__(132);

	for (var key in constants) {
	  exports[key] = constants[key];
	}

	// zlib modes
	exports.NONE = 0;
	exports.DEFLATE = 1;
	exports.INFLATE = 2;
	exports.GZIP = 3;
	exports.GUNZIP = 4;
	exports.DEFLATERAW = 5;
	exports.INFLATERAW = 6;
	exports.UNZIP = 7;

	/**
	 * Emulate Node's zlib C++ layer for use by the JS layer in index.js
	 */
	function Zlib(mode) {
	  if (mode < exports.DEFLATE || mode > exports.UNZIP)
	    throw new TypeError("Bad argument");
	    
	  this.mode = mode;
	  this.init_done = false;
	  this.write_in_progress = false;
	  this.pending_close = false;
	  this.windowBits = 0;
	  this.level = 0;
	  this.memLevel = 0;
	  this.strategy = 0;
	  this.dictionary = null;
	}

	Zlib.prototype.init = function(windowBits, level, memLevel, strategy, dictionary) {
	  this.windowBits = windowBits;
	  this.level = level;
	  this.memLevel = memLevel;
	  this.strategy = strategy;
	  // dictionary not supported.
	  
	  if (this.mode === exports.GZIP || this.mode === exports.GUNZIP)
	    this.windowBits += 16;
	    
	  if (this.mode === exports.UNZIP)
	    this.windowBits += 32;
	    
	  if (this.mode === exports.DEFLATERAW || this.mode === exports.INFLATERAW)
	    this.windowBits = -this.windowBits;
	    
	  this.strm = new zstream();
	  
	  switch (this.mode) {
	    case exports.DEFLATE:
	    case exports.GZIP:
	    case exports.DEFLATERAW:
	      var status = zlib_deflate.deflateInit2(
	        this.strm,
	        this.level,
	        exports.Z_DEFLATED,
	        this.windowBits,
	        this.memLevel,
	        this.strategy
	      );
	      break;
	    case exports.INFLATE:
	    case exports.GUNZIP:
	    case exports.INFLATERAW:
	    case exports.UNZIP:
	      var status  = zlib_inflate.inflateInit2(
	        this.strm,
	        this.windowBits
	      );
	      break;
	    default:
	      throw new Error("Unknown mode " + this.mode);
	  }
	  
	  if (status !== exports.Z_OK) {
	    this._error(status);
	    return;
	  }
	  
	  this.write_in_progress = false;
	  this.init_done = true;
	};

	Zlib.prototype.params = function() {
	  throw new Error("deflateParams Not supported");
	};

	Zlib.prototype._writeCheck = function() {
	  if (!this.init_done)
	    throw new Error("write before init");
	    
	  if (this.mode === exports.NONE)
	    throw new Error("already finalized");
	    
	  if (this.write_in_progress)
	    throw new Error("write already in progress");
	    
	  if (this.pending_close)
	    throw new Error("close is pending");
	};

	Zlib.prototype.write = function(flush, input, in_off, in_len, out, out_off, out_len) {    
	  this._writeCheck();
	  this.write_in_progress = true;
	  
	  var self = this;
	  process.nextTick(function() {
	    self.write_in_progress = false;
	    var res = self._write(flush, input, in_off, in_len, out, out_off, out_len);
	    self.callback(res[0], res[1]);
	    
	    if (self.pending_close)
	      self.close();
	  });
	  
	  return this;
	};

	// set method for Node buffers, used by pako
	function bufferSet(data, offset) {
	  for (var i = 0; i < data.length; i++) {
	    this[offset + i] = data[i];
	  }
	}

	Zlib.prototype.writeSync = function(flush, input, in_off, in_len, out, out_off, out_len) {
	  this._writeCheck();
	  return this._write(flush, input, in_off, in_len, out, out_off, out_len);
	};

	Zlib.prototype._write = function(flush, input, in_off, in_len, out, out_off, out_len) {
	  this.write_in_progress = true;
	  
	  if (flush !== exports.Z_NO_FLUSH &&
	      flush !== exports.Z_PARTIAL_FLUSH &&
	      flush !== exports.Z_SYNC_FLUSH &&
	      flush !== exports.Z_FULL_FLUSH &&
	      flush !== exports.Z_FINISH &&
	      flush !== exports.Z_BLOCK) {
	    throw new Error("Invalid flush value");
	  }
	  
	  if (input == null) {
	    input = new Buffer(0);
	    in_len = 0;
	    in_off = 0;
	  }
	  
	  if (out._set)
	    out.set = out._set;
	  else
	    out.set = bufferSet;
	  
	  var strm = this.strm;
	  strm.avail_in = in_len;
	  strm.input = input;
	  strm.next_in = in_off;
	  strm.avail_out = out_len;
	  strm.output = out;
	  strm.next_out = out_off;
	  
	  switch (this.mode) {
	    case exports.DEFLATE:
	    case exports.GZIP:
	    case exports.DEFLATERAW:
	      var status = zlib_deflate.deflate(strm, flush);
	      break;
	    case exports.UNZIP:
	    case exports.INFLATE:
	    case exports.GUNZIP:
	    case exports.INFLATERAW:
	      var status = zlib_inflate.inflate(strm, flush);
	      break;
	    default:
	      throw new Error("Unknown mode " + this.mode);
	  }
	  
	  if (status !== exports.Z_STREAM_END && status !== exports.Z_OK) {
	    this._error(status);
	  }
	  
	  this.write_in_progress = false;
	  return [strm.avail_in, strm.avail_out];
	};

	Zlib.prototype.close = function() {
	  if (this.write_in_progress) {
	    this.pending_close = true;
	    return;
	  }
	  
	  this.pending_close = false;
	  
	  if (this.mode === exports.DEFLATE || this.mode === exports.GZIP || this.mode === exports.DEFLATERAW) {
	    zlib_deflate.deflateEnd(this.strm);
	  } else {
	    zlib_inflate.inflateEnd(this.strm);
	  }
	  
	  this.mode = exports.NONE;
	};

	Zlib.prototype.reset = function() {
	  switch (this.mode) {
	    case exports.DEFLATE:
	    case exports.DEFLATERAW:
	      var status = zlib_deflate.deflateReset(this.strm);
	      break;
	    case exports.INFLATE:
	    case exports.INFLATERAW:
	      var status = zlib_inflate.inflateReset(this.strm);
	      break;
	  }
	  
	  if (status !== exports.Z_OK) {
	    this._error(status);
	  }
	};

	Zlib.prototype._error = function(status) {
	  this.onerror(msg[status] + ': ' + this.strm.msg, status);
	  
	  this.write_in_progress = false;
	  if (this.pending_close)
	    this.close();
	};

	exports.Zlib = Zlib;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11), __webpack_require__(5).Buffer))

/***/ },
/* 122 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  2:      'need dictionary',     /* Z_NEED_DICT       2  */
	  1:      'stream end',          /* Z_STREAM_END      1  */
	  0:      '',                    /* Z_OK              0  */
	  '-1':   'file error',          /* Z_ERRNO         (-1) */
	  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
	  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
	  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
	  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
	  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
	};


/***/ },
/* 123 */
/***/ function(module, exports) {

	'use strict';


	function ZStream() {
	  /* next input byte */
	  this.input = null; // JS specific, because we have no pointers
	  this.next_in = 0;
	  /* number of bytes available at input */
	  this.avail_in = 0;
	  /* total number of input bytes read so far */
	  this.total_in = 0;
	  /* next output byte should be put there */
	  this.output = null; // JS specific, because we have no pointers
	  this.next_out = 0;
	  /* remaining free space at output */
	  this.avail_out = 0;
	  /* total number of bytes output so far */
	  this.total_out = 0;
	  /* last error message, NULL if no error */
	  this.msg = ''/*Z_NULL*/;
	  /* not visible by applications */
	  this.state = null;
	  /* best guess about the data type: binary or text */
	  this.data_type = 2/*Z_UNKNOWN*/;
	  /* adler32 value of the uncompressed data */
	  this.adler = 0;
	}

	module.exports = ZStream;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils   = __webpack_require__(125);
	var trees   = __webpack_require__(126);
	var adler32 = __webpack_require__(127);
	var crc32   = __webpack_require__(128);
	var msg     = __webpack_require__(122);

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	/* Allowed flush values; see deflate() and inflate() below for details */
	var Z_NO_FLUSH      = 0;
	var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	var Z_FULL_FLUSH    = 3;
	var Z_FINISH        = 4;
	var Z_BLOCK         = 5;
	//var Z_TREES         = 6;


	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	//var Z_NEED_DICT     = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR  = -2;
	var Z_DATA_ERROR    = -3;
	//var Z_MEM_ERROR     = -4;
	var Z_BUF_ERROR     = -5;
	//var Z_VERSION_ERROR = -6;


	/* compression levels */
	//var Z_NO_COMPRESSION      = 0;
	//var Z_BEST_SPEED          = 1;
	//var Z_BEST_COMPRESSION    = 9;
	var Z_DEFAULT_COMPRESSION = -1;


	var Z_FILTERED            = 1;
	var Z_HUFFMAN_ONLY        = 2;
	var Z_RLE                 = 3;
	var Z_FIXED               = 4;
	var Z_DEFAULT_STRATEGY    = 0;

	/* Possible values of the data_type field (though see inflate()) */
	//var Z_BINARY              = 0;
	//var Z_TEXT                = 1;
	//var Z_ASCII               = 1; // = Z_TEXT
	var Z_UNKNOWN             = 2;


	/* The deflate compression method */
	var Z_DEFLATED  = 8;

	/*============================================================================*/


	var MAX_MEM_LEVEL = 9;
	/* Maximum value for memLevel in deflateInit2 */
	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_MEM_LEVEL = 8;


	var LENGTH_CODES  = 29;
	/* number of length codes, not counting the special END_BLOCK code */
	var LITERALS      = 256;
	/* number of literal bytes 0..255 */
	var L_CODES       = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */
	var D_CODES       = 30;
	/* number of distance codes */
	var BL_CODES      = 19;
	/* number of codes used to transfer the bit lengths */
	var HEAP_SIZE     = 2 * L_CODES + 1;
	/* maximum heap size */
	var MAX_BITS  = 15;
	/* All codes must not exceed MAX_BITS bits */

	var MIN_MATCH = 3;
	var MAX_MATCH = 258;
	var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

	var PRESET_DICT = 0x20;

	var INIT_STATE = 42;
	var EXTRA_STATE = 69;
	var NAME_STATE = 73;
	var COMMENT_STATE = 91;
	var HCRC_STATE = 103;
	var BUSY_STATE = 113;
	var FINISH_STATE = 666;

	var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
	var BS_BLOCK_DONE     = 2; /* block flush performed */
	var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
	var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

	var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

	function err(strm, errorCode) {
	  strm.msg = msg[errorCode];
	  return errorCode;
	}

	function rank(f) {
	  return ((f) << 1) - ((f) > 4 ? 9 : 0);
	}

	function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


	/* =========================================================================
	 * Flush as much pending output as possible. All deflate() output goes
	 * through this function so some applications may wish to modify it
	 * to avoid allocating a large strm->output buffer and copying into it.
	 * (See also read_buf()).
	 */
	function flush_pending(strm) {
	  var s = strm.state;

	  //_tr_flush_bits(s);
	  var len = s.pending;
	  if (len > strm.avail_out) {
	    len = strm.avail_out;
	  }
	  if (len === 0) { return; }

	  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
	  strm.next_out += len;
	  s.pending_out += len;
	  strm.total_out += len;
	  strm.avail_out -= len;
	  s.pending -= len;
	  if (s.pending === 0) {
	    s.pending_out = 0;
	  }
	}


	function flush_block_only(s, last) {
	  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
	  s.block_start = s.strstart;
	  flush_pending(s.strm);
	}


	function put_byte(s, b) {
	  s.pending_buf[s.pending++] = b;
	}


	/* =========================================================================
	 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
	 * IN assertion: the stream state is correct and there is enough room in
	 * pending_buf.
	 */
	function putShortMSB(s, b) {
	//  put_byte(s, (Byte)(b >> 8));
	//  put_byte(s, (Byte)(b & 0xff));
	  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
	  s.pending_buf[s.pending++] = b & 0xff;
	}


	/* ===========================================================================
	 * Read a new buffer from the current input stream, update the adler32
	 * and total number of bytes read.  All deflate() input goes through
	 * this function so some applications may wish to modify it to avoid
	 * allocating a large strm->input buffer and copying from it.
	 * (See also flush_pending()).
	 */
	function read_buf(strm, buf, start, size) {
	  var len = strm.avail_in;

	  if (len > size) { len = size; }
	  if (len === 0) { return 0; }

	  strm.avail_in -= len;

	  // zmemcpy(buf, strm->next_in, len);
	  utils.arraySet(buf, strm.input, strm.next_in, len, start);
	  if (strm.state.wrap === 1) {
	    strm.adler = adler32(strm.adler, buf, len, start);
	  }

	  else if (strm.state.wrap === 2) {
	    strm.adler = crc32(strm.adler, buf, len, start);
	  }

	  strm.next_in += len;
	  strm.total_in += len;

	  return len;
	}


	/* ===========================================================================
	 * Set match_start to the longest match starting at the given string and
	 * return its length. Matches shorter or equal to prev_length are discarded,
	 * in which case the result is equal to prev_length and match_start is
	 * garbage.
	 * IN assertions: cur_match is the head of the hash chain for the current
	 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
	 * OUT assertion: the match length is not greater than s->lookahead.
	 */
	function longest_match(s, cur_match) {
	  var chain_length = s.max_chain_length;      /* max hash chain length */
	  var scan = s.strstart; /* current string */
	  var match;                       /* matched string */
	  var len;                           /* length of current match */
	  var best_len = s.prev_length;              /* best match length so far */
	  var nice_match = s.nice_match;             /* stop if match long enough */
	  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
	      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

	  var _win = s.window; // shortcut

	  var wmask = s.w_mask;
	  var prev  = s.prev;

	  /* Stop when cur_match becomes <= limit. To simplify the code,
	   * we prevent matches with the string of window index 0.
	   */

	  var strend = s.strstart + MAX_MATCH;
	  var scan_end1  = _win[scan + best_len - 1];
	  var scan_end   = _win[scan + best_len];

	  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
	   * It is easy to get rid of this optimization if necessary.
	   */
	  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

	  /* Do not waste too much time if we already have a good match: */
	  if (s.prev_length >= s.good_match) {
	    chain_length >>= 2;
	  }
	  /* Do not look for matches beyond the end of the input. This is necessary
	   * to make deflate deterministic.
	   */
	  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

	  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

	  do {
	    // Assert(cur_match < s->strstart, "no future");
	    match = cur_match;

	    /* Skip to next match if the match length cannot increase
	     * or if the match length is less than 2.  Note that the checks below
	     * for insufficient lookahead only occur occasionally for performance
	     * reasons.  Therefore uninitialized memory will be accessed, and
	     * conditional jumps will be made that depend on those values.
	     * However the length of the match is limited to the lookahead, so
	     * the output of deflate is not affected by the uninitialized values.
	     */

	    if (_win[match + best_len]     !== scan_end  ||
	        _win[match + best_len - 1] !== scan_end1 ||
	        _win[match]                !== _win[scan] ||
	        _win[++match]              !== _win[scan + 1]) {
	      continue;
	    }

	    /* The check at best_len-1 can be removed because it will be made
	     * again later. (This heuristic is not always a win.)
	     * It is not necessary to compare scan[2] and match[2] since they
	     * are always equal when the other bytes match, given that
	     * the hash keys are equal and that HASH_BITS >= 8.
	     */
	    scan += 2;
	    match++;
	    // Assert(*scan == *match, "match[2]?");

	    /* We check for insufficient lookahead only every 8th comparison;
	     * the 256th check will be made at strstart+258.
	     */
	    do {
	      /*jshint noempty:false*/
	    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             scan < strend);

	    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

	    len = MAX_MATCH - (strend - scan);
	    scan = strend - MAX_MATCH;

	    if (len > best_len) {
	      s.match_start = cur_match;
	      best_len = len;
	      if (len >= nice_match) {
	        break;
	      }
	      scan_end1  = _win[scan + best_len - 1];
	      scan_end   = _win[scan + best_len];
	    }
	  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

	  if (best_len <= s.lookahead) {
	    return best_len;
	  }
	  return s.lookahead;
	}


	/* ===========================================================================
	 * Fill the window when the lookahead becomes insufficient.
	 * Updates strstart and lookahead.
	 *
	 * IN assertion: lookahead < MIN_LOOKAHEAD
	 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
	 *    At least one byte has been read, or avail_in == 0; reads are
	 *    performed for at least two bytes (required for the zip translate_eol
	 *    option -- not supported here).
	 */
	function fill_window(s) {
	  var _w_size = s.w_size;
	  var p, n, m, more, str;

	  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

	  do {
	    more = s.window_size - s.lookahead - s.strstart;

	    // JS ints have 32 bit, block below not needed
	    /* Deal with !@#$% 64K limit: */
	    //if (sizeof(int) <= 2) {
	    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
	    //        more = wsize;
	    //
	    //  } else if (more == (unsigned)(-1)) {
	    //        /* Very unlikely, but possible on 16 bit machine if
	    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
	    //         */
	    //        more--;
	    //    }
	    //}


	    /* If the window is almost full and there is insufficient lookahead,
	     * move the upper half to the lower one to make room in the upper half.
	     */
	    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

	      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
	      s.match_start -= _w_size;
	      s.strstart -= _w_size;
	      /* we now have strstart >= MAX_DIST */
	      s.block_start -= _w_size;

	      /* Slide the hash table (could be avoided with 32 bit values
	       at the expense of memory usage). We slide even when level == 0
	       to keep the hash table consistent if we switch back to level > 0
	       later. (Using level 0 permanently is not an optimal usage of
	       zlib, so we don't care about this pathological case.)
	       */

	      n = s.hash_size;
	      p = n;
	      do {
	        m = s.head[--p];
	        s.head[p] = (m >= _w_size ? m - _w_size : 0);
	      } while (--n);

	      n = _w_size;
	      p = n;
	      do {
	        m = s.prev[--p];
	        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
	        /* If n is not on any hash chain, prev[n] is garbage but
	         * its value will never be used.
	         */
	      } while (--n);

	      more += _w_size;
	    }
	    if (s.strm.avail_in === 0) {
	      break;
	    }

	    /* If there was no sliding:
	     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
	     *    more == window_size - lookahead - strstart
	     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
	     * => more >= window_size - 2*WSIZE + 2
	     * In the BIG_MEM or MMAP case (not yet supported),
	     *   window_size == input_size + MIN_LOOKAHEAD  &&
	     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
	     * Otherwise, window_size == 2*WSIZE so more >= 2.
	     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
	     */
	    //Assert(more >= 2, "more < 2");
	    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
	    s.lookahead += n;

	    /* Initialize the hash value now that we have some input: */
	    if (s.lookahead + s.insert >= MIN_MATCH) {
	      str = s.strstart - s.insert;
	      s.ins_h = s.window[str];

	      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
	//#if MIN_MATCH != 3
	//        Call update_hash() MIN_MATCH-3 more times
	//#endif
	      while (s.insert) {
	        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
	        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

	        s.prev[str & s.w_mask] = s.head[s.ins_h];
	        s.head[s.ins_h] = str;
	        str++;
	        s.insert--;
	        if (s.lookahead + s.insert < MIN_MATCH) {
	          break;
	        }
	      }
	    }
	    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
	     * but this is not important since only literal bytes will be emitted.
	     */

	  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

	  /* If the WIN_INIT bytes after the end of the current data have never been
	   * written, then zero those bytes in order to avoid memory check reports of
	   * the use of uninitialized (or uninitialised as Julian writes) bytes by
	   * the longest match routines.  Update the high water mark for the next
	   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
	   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
	   */
	//  if (s.high_water < s.window_size) {
	//    var curr = s.strstart + s.lookahead;
	//    var init = 0;
	//
	//    if (s.high_water < curr) {
	//      /* Previous high water mark below current data -- zero WIN_INIT
	//       * bytes or up to end of window, whichever is less.
	//       */
	//      init = s.window_size - curr;
	//      if (init > WIN_INIT)
	//        init = WIN_INIT;
	//      zmemzero(s->window + curr, (unsigned)init);
	//      s->high_water = curr + init;
	//    }
	//    else if (s->high_water < (ulg)curr + WIN_INIT) {
	//      /* High water mark at or above current data, but below current data
	//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
	//       * to end of window, whichever is less.
	//       */
	//      init = (ulg)curr + WIN_INIT - s->high_water;
	//      if (init > s->window_size - s->high_water)
	//        init = s->window_size - s->high_water;
	//      zmemzero(s->window + s->high_water, (unsigned)init);
	//      s->high_water += init;
	//    }
	//  }
	//
	//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
	//    "not enough room for search");
	}

	/* ===========================================================================
	 * Copy without compression as much as possible from the input stream, return
	 * the current block state.
	 * This function does not insert new strings in the dictionary since
	 * uncompressible data is probably not useful. This function is used
	 * only for the level=0 compression option.
	 * NOTE: this function should be optimized to avoid extra copying from
	 * window to pending_buf.
	 */
	function deflate_stored(s, flush) {
	  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
	   * to pending_buf_size, and each stored block has a 5 byte header:
	   */
	  var max_block_size = 0xffff;

	  if (max_block_size > s.pending_buf_size - 5) {
	    max_block_size = s.pending_buf_size - 5;
	  }

	  /* Copy as much as possible from input to output: */
	  for (;;) {
	    /* Fill the window as much as possible: */
	    if (s.lookahead <= 1) {

	      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
	      //  s->block_start >= (long)s->w_size, "slide too late");
	//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
	//        s.block_start >= s.w_size)) {
	//        throw  new Error("slide too late");
	//      }

	      fill_window(s);
	      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }

	      if (s.lookahead === 0) {
	        break;
	      }
	      /* flush the current block */
	    }
	    //Assert(s->block_start >= 0L, "block gone");
	//    if (s.block_start < 0) throw new Error("block gone");

	    s.strstart += s.lookahead;
	    s.lookahead = 0;

	    /* Emit a stored block if pending_buf will be full: */
	    var max_start = s.block_start + max_block_size;

	    if (s.strstart === 0 || s.strstart >= max_start) {
	      /* strstart == 0 is possible when wraparound on 16-bit machine */
	      s.lookahead = s.strstart - max_start;
	      s.strstart = max_start;
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/


	    }
	    /* Flush if we may have to slide, otherwise block_start may become
	     * negative and the data will be gone:
	     */
	    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }

	  s.insert = 0;

	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }

	  if (s.strstart > s.block_start) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }

	  return BS_NEED_MORE;
	}

	/* ===========================================================================
	 * Compress as much as possible from the input stream, return the current
	 * block state.
	 * This function does not perform lazy evaluation of matches and inserts
	 * new strings in the dictionary only for unmatched strings or for short
	 * matches. It is used only for the fast compression options.
	 */
	function deflate_fast(s, flush) {
	  var hash_head;        /* head of the hash chain */
	  var bflush;           /* set if current block must be flushed */

	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) {
	        break; /* flush the current block */
	      }
	    }

	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0/*NIL*/;
	    if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }

	    /* Find the longest match, discarding those <= prev_length.
	     * At this point we have always match_length < MIN_MATCH
	     */
	    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
	      /* To simplify the code, we prevent matches with the string
	       * of window index 0 (in particular we have to avoid a match
	       * of the string with itself at the start of the input file).
	       */
	      s.match_length = longest_match(s, hash_head);
	      /* longest_match() sets match_start */
	    }
	    if (s.match_length >= MIN_MATCH) {
	      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

	      /*** _tr_tally_dist(s, s.strstart - s.match_start,
	                     s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

	      s.lookahead -= s.match_length;

	      /* Insert new strings in the hash table only if the match length
	       * is not too large. This saves time but degrades compression.
	       */
	      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
	        s.match_length--; /* string at strstart already in table */
	        do {
	          s.strstart++;
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
	           * always MIN_MATCH bytes ahead.
	           */
	        } while (--s.match_length !== 0);
	        s.strstart++;
	      } else
	      {
	        s.strstart += s.match_length;
	        s.match_length = 0;
	        s.ins_h = s.window[s.strstart];
	        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
	        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

	//#if MIN_MATCH != 3
	//                Call UPDATE_HASH() MIN_MATCH-3 more times
	//#endif
	        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
	         * matter since it will be recomputed at next deflate call.
	         */
	      }
	    } else {
	      /* No match, output a literal byte */
	      //Tracevv((stderr,"%c", s.window[s.strstart]));
	      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

	      s.lookahead--;
	      s.strstart++;
	    }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* ===========================================================================
	 * Same as above, but achieves better compression. We use a lazy
	 * evaluation for matches: a match is finally adopted only if there is
	 * no better match at the next window position.
	 */
	function deflate_slow(s, flush) {
	  var hash_head;          /* head of hash chain */
	  var bflush;              /* set if current block must be flushed */

	  var max_insert;

	  /* Process the input block. */
	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) { break; } /* flush the current block */
	    }

	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0/*NIL*/;
	    if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }

	    /* Find the longest match, discarding those <= prev_length.
	     */
	    s.prev_length = s.match_length;
	    s.prev_match = s.match_start;
	    s.match_length = MIN_MATCH - 1;

	    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
	        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
	      /* To simplify the code, we prevent matches with the string
	       * of window index 0 (in particular we have to avoid a match
	       * of the string with itself at the start of the input file).
	       */
	      s.match_length = longest_match(s, hash_head);
	      /* longest_match() sets match_start */

	      if (s.match_length <= 5 &&
	         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

	        /* If prev_match is also MIN_MATCH, match_start is garbage
	         * but we will ignore the current match anyway.
	         */
	        s.match_length = MIN_MATCH - 1;
	      }
	    }
	    /* If there was a match at the previous step and the current
	     * match is not better, output the previous match:
	     */
	    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
	      max_insert = s.strstart + s.lookahead - MIN_MATCH;
	      /* Do not insert strings in hash table beyond this. */

	      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

	      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
	                     s.prev_length - MIN_MATCH, bflush);***/
	      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
	      /* Insert in hash table all strings up to the end of the match.
	       * strstart-1 and strstart are already inserted. If there is not
	       * enough lookahead, the last two strings are not inserted in
	       * the hash table.
	       */
	      s.lookahead -= s.prev_length - 1;
	      s.prev_length -= 2;
	      do {
	        if (++s.strstart <= max_insert) {
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	        }
	      } while (--s.prev_length !== 0);
	      s.match_available = 0;
	      s.match_length = MIN_MATCH - 1;
	      s.strstart++;

	      if (bflush) {
	        /*** FLUSH_BLOCK(s, 0); ***/
	        flush_block_only(s, false);
	        if (s.strm.avail_out === 0) {
	          return BS_NEED_MORE;
	        }
	        /***/
	      }

	    } else if (s.match_available) {
	      /* If there was no match at the previous position, output a
	       * single literal. If there was a match but the current match
	       * is longer, truncate the previous match to a single literal.
	       */
	      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

	      if (bflush) {
	        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
	        flush_block_only(s, false);
	        /***/
	      }
	      s.strstart++;
	      s.lookahead--;
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	    } else {
	      /* There is no previous match to compare with, wait for
	       * the next step to decide.
	       */
	      s.match_available = 1;
	      s.strstart++;
	      s.lookahead--;
	    }
	  }
	  //Assert (flush != Z_NO_FLUSH, "no flush?");
	  if (s.match_available) {
	    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

	    s.match_available = 0;
	  }
	  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }

	  return BS_BLOCK_DONE;
	}


	/* ===========================================================================
	 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
	 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
	 * deflate switches away from Z_RLE.)
	 */
	function deflate_rle(s, flush) {
	  var bflush;            /* set if current block must be flushed */
	  var prev;              /* byte at distance one to match */
	  var scan, strend;      /* scan goes up to strend for length of run */

	  var _win = s.window;

	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the longest run, plus one for the unrolled loop.
	     */
	    if (s.lookahead <= MAX_MATCH) {
	      fill_window(s);
	      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) { break; } /* flush the current block */
	    }

	    /* See how many times the previous byte repeats */
	    s.match_length = 0;
	    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
	      scan = s.strstart - 1;
	      prev = _win[scan];
	      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
	        strend = s.strstart + MAX_MATCH;
	        do {
	          /*jshint noempty:false*/
	        } while (prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 scan < strend);
	        s.match_length = MAX_MATCH - (strend - scan);
	        if (s.match_length > s.lookahead) {
	          s.match_length = s.lookahead;
	        }
	      }
	      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
	    }

	    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
	    if (s.match_length >= MIN_MATCH) {
	      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

	      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

	      s.lookahead -= s.match_length;
	      s.strstart += s.match_length;
	      s.match_length = 0;
	    } else {
	      /* No match, output a literal byte */
	      //Tracevv((stderr,"%c", s->window[s->strstart]));
	      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

	      s.lookahead--;
	      s.strstart++;
	    }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* ===========================================================================
	 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
	 * (It will be regenerated if this run of deflate switches away from Huffman.)
	 */
	function deflate_huff(s, flush) {
	  var bflush;             /* set if current block must be flushed */

	  for (;;) {
	    /* Make sure that we have a literal to write. */
	    if (s.lookahead === 0) {
	      fill_window(s);
	      if (s.lookahead === 0) {
	        if (flush === Z_NO_FLUSH) {
	          return BS_NEED_MORE;
	        }
	        break;      /* flush the current block */
	      }
	    }

	    /* Output a literal byte */
	    s.match_length = 0;
	    //Tracevv((stderr,"%c", s->window[s->strstart]));
	    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
	    s.lookahead--;
	    s.strstart++;
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* Values for max_lazy_match, good_match and max_chain_length, depending on
	 * the desired pack level (0..9). The values given below have been tuned to
	 * exclude worst case performance for pathological files. Better values may be
	 * found for specific files.
	 */
	function Config(good_length, max_lazy, nice_length, max_chain, func) {
	  this.good_length = good_length;
	  this.max_lazy = max_lazy;
	  this.nice_length = nice_length;
	  this.max_chain = max_chain;
	  this.func = func;
	}

	var configuration_table;

	configuration_table = [
	  /*      good lazy nice chain */
	  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
	  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
	  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
	  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

	  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
	  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
	  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
	  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
	  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
	  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
	];


	/* ===========================================================================
	 * Initialize the "longest match" routines for a new zlib stream
	 */
	function lm_init(s) {
	  s.window_size = 2 * s.w_size;

	  /*** CLEAR_HASH(s); ***/
	  zero(s.head); // Fill with NIL (= 0);

	  /* Set the default configuration parameters:
	   */
	  s.max_lazy_match = configuration_table[s.level].max_lazy;
	  s.good_match = configuration_table[s.level].good_length;
	  s.nice_match = configuration_table[s.level].nice_length;
	  s.max_chain_length = configuration_table[s.level].max_chain;

	  s.strstart = 0;
	  s.block_start = 0;
	  s.lookahead = 0;
	  s.insert = 0;
	  s.match_length = s.prev_length = MIN_MATCH - 1;
	  s.match_available = 0;
	  s.ins_h = 0;
	}


	function DeflateState() {
	  this.strm = null;            /* pointer back to this zlib stream */
	  this.status = 0;            /* as the name implies */
	  this.pending_buf = null;      /* output still pending */
	  this.pending_buf_size = 0;  /* size of pending_buf */
	  this.pending_out = 0;       /* next pending byte to output to the stream */
	  this.pending = 0;           /* nb of bytes in the pending buffer */
	  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
	  this.gzhead = null;         /* gzip header information to write */
	  this.gzindex = 0;           /* where in extra, name, or comment */
	  this.method = Z_DEFLATED; /* can only be DEFLATED */
	  this.last_flush = -1;   /* value of flush param for previous deflate call */

	  this.w_size = 0;  /* LZ77 window size (32K by default) */
	  this.w_bits = 0;  /* log2(w_size)  (8..16) */
	  this.w_mask = 0;  /* w_size - 1 */

	  this.window = null;
	  /* Sliding window. Input bytes are read into the second half of the window,
	   * and move to the first half later to keep a dictionary of at least wSize
	   * bytes. With this organization, matches are limited to a distance of
	   * wSize-MAX_MATCH bytes, but this ensures that IO is always
	   * performed with a length multiple of the block size.
	   */

	  this.window_size = 0;
	  /* Actual size of window: 2*wSize, except when the user input buffer
	   * is directly used as sliding window.
	   */

	  this.prev = null;
	  /* Link to older string with same hash index. To limit the size of this
	   * array to 64K, this link is maintained only for the last 32K strings.
	   * An index in this array is thus a window index modulo 32K.
	   */

	  this.head = null;   /* Heads of the hash chains or NIL. */

	  this.ins_h = 0;       /* hash index of string to be inserted */
	  this.hash_size = 0;   /* number of elements in hash table */
	  this.hash_bits = 0;   /* log2(hash_size) */
	  this.hash_mask = 0;   /* hash_size-1 */

	  this.hash_shift = 0;
	  /* Number of bits by which ins_h must be shifted at each input
	   * step. It must be such that after MIN_MATCH steps, the oldest
	   * byte no longer takes part in the hash key, that is:
	   *   hash_shift * MIN_MATCH >= hash_bits
	   */

	  this.block_start = 0;
	  /* Window position at the beginning of the current output block. Gets
	   * negative when the window is moved backwards.
	   */

	  this.match_length = 0;      /* length of best match */
	  this.prev_match = 0;        /* previous match */
	  this.match_available = 0;   /* set if previous match exists */
	  this.strstart = 0;          /* start of string to insert */
	  this.match_start = 0;       /* start of matching string */
	  this.lookahead = 0;         /* number of valid bytes ahead in window */

	  this.prev_length = 0;
	  /* Length of the best match at previous step. Matches not greater than this
	   * are discarded. This is used in the lazy match evaluation.
	   */

	  this.max_chain_length = 0;
	  /* To speed up deflation, hash chains are never searched beyond this
	   * length.  A higher limit improves compression ratio but degrades the
	   * speed.
	   */

	  this.max_lazy_match = 0;
	  /* Attempt to find a better match only when the current match is strictly
	   * smaller than this value. This mechanism is used only for compression
	   * levels >= 4.
	   */
	  // That's alias to max_lazy_match, don't use directly
	  //this.max_insert_length = 0;
	  /* Insert new strings in the hash table only if the match length is not
	   * greater than this length. This saves time but degrades compression.
	   * max_insert_length is used only for compression levels <= 3.
	   */

	  this.level = 0;     /* compression level (1..9) */
	  this.strategy = 0;  /* favor or force Huffman coding*/

	  this.good_match = 0;
	  /* Use a faster search when the previous match is longer than this */

	  this.nice_match = 0; /* Stop searching when current match exceeds this */

	              /* used by trees.c: */

	  /* Didn't use ct_data typedef below to suppress compiler warning */

	  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
	  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
	  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

	  // Use flat array of DOUBLE size, with interleaved fata,
	  // because JS does not support effective
	  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
	  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
	  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
	  zero(this.dyn_ltree);
	  zero(this.dyn_dtree);
	  zero(this.bl_tree);

	  this.l_desc   = null;         /* desc. for literal tree */
	  this.d_desc   = null;         /* desc. for distance tree */
	  this.bl_desc  = null;         /* desc. for bit length tree */

	  //ush bl_count[MAX_BITS+1];
	  this.bl_count = new utils.Buf16(MAX_BITS + 1);
	  /* number of codes at each bit length for an optimal tree */

	  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
	  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
	  zero(this.heap);

	  this.heap_len = 0;               /* number of elements in the heap */
	  this.heap_max = 0;               /* element of largest frequency */
	  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
	   * The same heap array is used to build all trees.
	   */

	  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
	  zero(this.depth);
	  /* Depth of each subtree used as tie breaker for trees of equal frequency
	   */

	  this.l_buf = 0;          /* buffer index for literals or lengths */

	  this.lit_bufsize = 0;
	  /* Size of match buffer for literals/lengths.  There are 4 reasons for
	   * limiting lit_bufsize to 64K:
	   *   - frequencies can be kept in 16 bit counters
	   *   - if compression is not successful for the first block, all input
	   *     data is still in the window so we can still emit a stored block even
	   *     when input comes from standard input.  (This can also be done for
	   *     all blocks if lit_bufsize is not greater than 32K.)
	   *   - if compression is not successful for a file smaller than 64K, we can
	   *     even emit a stored file instead of a stored block (saving 5 bytes).
	   *     This is applicable only for zip (not gzip or zlib).
	   *   - creating new Huffman trees less frequently may not provide fast
	   *     adaptation to changes in the input data statistics. (Take for
	   *     example a binary file with poorly compressible code followed by
	   *     a highly compressible string table.) Smaller buffer sizes give
	   *     fast adaptation but have of course the overhead of transmitting
	   *     trees more frequently.
	   *   - I can't count above 4
	   */

	  this.last_lit = 0;      /* running index in l_buf */

	  this.d_buf = 0;
	  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
	   * the same number of elements. To use different lengths, an extra flag
	   * array would be necessary.
	   */

	  this.opt_len = 0;       /* bit length of current block with optimal trees */
	  this.static_len = 0;    /* bit length of current block with static trees */
	  this.matches = 0;       /* number of string matches in current block */
	  this.insert = 0;        /* bytes at end of window left to insert */


	  this.bi_buf = 0;
	  /* Output buffer. bits are inserted starting at the bottom (least
	   * significant bits).
	   */
	  this.bi_valid = 0;
	  /* Number of valid bits in bi_buf.  All bits above the last valid bit
	   * are always zero.
	   */

	  // Used for window memory init. We safely ignore it for JS. That makes
	  // sense only for pointers and memory check tools.
	  //this.high_water = 0;
	  /* High water mark offset in window for initialized bytes -- bytes above
	   * this are set to zero in order to avoid memory check warnings when
	   * longest match routines access bytes past the input.  This is then
	   * updated to the new high water mark.
	   */
	}


	function deflateResetKeep(strm) {
	  var s;

	  if (!strm || !strm.state) {
	    return err(strm, Z_STREAM_ERROR);
	  }

	  strm.total_in = strm.total_out = 0;
	  strm.data_type = Z_UNKNOWN;

	  s = strm.state;
	  s.pending = 0;
	  s.pending_out = 0;

	  if (s.wrap < 0) {
	    s.wrap = -s.wrap;
	    /* was made negative by deflate(..., Z_FINISH); */
	  }
	  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
	  strm.adler = (s.wrap === 2) ?
	    0  // crc32(0, Z_NULL, 0)
	  :
	    1; // adler32(0, Z_NULL, 0)
	  s.last_flush = Z_NO_FLUSH;
	  trees._tr_init(s);
	  return Z_OK;
	}


	function deflateReset(strm) {
	  var ret = deflateResetKeep(strm);
	  if (ret === Z_OK) {
	    lm_init(strm.state);
	  }
	  return ret;
	}


	function deflateSetHeader(strm, head) {
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
	  strm.state.gzhead = head;
	  return Z_OK;
	}


	function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
	  if (!strm) { // === Z_NULL
	    return Z_STREAM_ERROR;
	  }
	  var wrap = 1;

	  if (level === Z_DEFAULT_COMPRESSION) {
	    level = 6;
	  }

	  if (windowBits < 0) { /* suppress zlib wrapper */
	    wrap = 0;
	    windowBits = -windowBits;
	  }

	  else if (windowBits > 15) {
	    wrap = 2;           /* write gzip wrapper instead */
	    windowBits -= 16;
	  }


	  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
	    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
	    strategy < 0 || strategy > Z_FIXED) {
	    return err(strm, Z_STREAM_ERROR);
	  }


	  if (windowBits === 8) {
	    windowBits = 9;
	  }
	  /* until 256-byte window bug fixed */

	  var s = new DeflateState();

	  strm.state = s;
	  s.strm = strm;

	  s.wrap = wrap;
	  s.gzhead = null;
	  s.w_bits = windowBits;
	  s.w_size = 1 << s.w_bits;
	  s.w_mask = s.w_size - 1;

	  s.hash_bits = memLevel + 7;
	  s.hash_size = 1 << s.hash_bits;
	  s.hash_mask = s.hash_size - 1;
	  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

	  s.window = new utils.Buf8(s.w_size * 2);
	  s.head = new utils.Buf16(s.hash_size);
	  s.prev = new utils.Buf16(s.w_size);

	  // Don't need mem init magic for JS.
	  //s.high_water = 0;  /* nothing written to s->window yet */

	  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

	  s.pending_buf_size = s.lit_bufsize * 4;

	  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
	  //s->pending_buf = (uchf *) overlay;
	  s.pending_buf = new utils.Buf8(s.pending_buf_size);

	  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
	  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
	  s.d_buf = 1 * s.lit_bufsize;

	  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
	  s.l_buf = (1 + 2) * s.lit_bufsize;

	  s.level = level;
	  s.strategy = strategy;
	  s.method = method;

	  return deflateReset(strm);
	}

	function deflateInit(strm, level) {
	  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
	}


	function deflate(strm, flush) {
	  var old_flush, s;
	  var beg, val; // for gzip header write only

	  if (!strm || !strm.state ||
	    flush > Z_BLOCK || flush < 0) {
	    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
	  }

	  s = strm.state;

	  if (!strm.output ||
	      (!strm.input && strm.avail_in !== 0) ||
	      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
	    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
	  }

	  s.strm = strm; /* just in case */
	  old_flush = s.last_flush;
	  s.last_flush = flush;

	  /* Write the header */
	  if (s.status === INIT_STATE) {

	    if (s.wrap === 2) { // GZIP header
	      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
	      put_byte(s, 31);
	      put_byte(s, 139);
	      put_byte(s, 8);
	      if (!s.gzhead) { // s->gzhead == Z_NULL
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, s.level === 9 ? 2 :
	                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
	                     4 : 0));
	        put_byte(s, OS_CODE);
	        s.status = BUSY_STATE;
	      }
	      else {
	        put_byte(s, (s.gzhead.text ? 1 : 0) +
	                    (s.gzhead.hcrc ? 2 : 0) +
	                    (!s.gzhead.extra ? 0 : 4) +
	                    (!s.gzhead.name ? 0 : 8) +
	                    (!s.gzhead.comment ? 0 : 16)
	                );
	        put_byte(s, s.gzhead.time & 0xff);
	        put_byte(s, (s.gzhead.time >> 8) & 0xff);
	        put_byte(s, (s.gzhead.time >> 16) & 0xff);
	        put_byte(s, (s.gzhead.time >> 24) & 0xff);
	        put_byte(s, s.level === 9 ? 2 :
	                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
	                     4 : 0));
	        put_byte(s, s.gzhead.os & 0xff);
	        if (s.gzhead.extra && s.gzhead.extra.length) {
	          put_byte(s, s.gzhead.extra.length & 0xff);
	          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
	        }
	        if (s.gzhead.hcrc) {
	          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
	        }
	        s.gzindex = 0;
	        s.status = EXTRA_STATE;
	      }
	    }
	    else // DEFLATE header
	    {
	      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
	      var level_flags = -1;

	      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
	        level_flags = 0;
	      } else if (s.level < 6) {
	        level_flags = 1;
	      } else if (s.level === 6) {
	        level_flags = 2;
	      } else {
	        level_flags = 3;
	      }
	      header |= (level_flags << 6);
	      if (s.strstart !== 0) { header |= PRESET_DICT; }
	      header += 31 - (header % 31);

	      s.status = BUSY_STATE;
	      putShortMSB(s, header);

	      /* Save the adler32 of the preset dictionary: */
	      if (s.strstart !== 0) {
	        putShortMSB(s, strm.adler >>> 16);
	        putShortMSB(s, strm.adler & 0xffff);
	      }
	      strm.adler = 1; // adler32(0L, Z_NULL, 0);
	    }
	  }

	//#ifdef GZIP
	  if (s.status === EXTRA_STATE) {
	    if (s.gzhead.extra/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */

	      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            break;
	          }
	        }
	        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
	        s.gzindex++;
	      }
	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (s.gzindex === s.gzhead.extra.length) {
	        s.gzindex = 0;
	        s.status = NAME_STATE;
	      }
	    }
	    else {
	      s.status = NAME_STATE;
	    }
	  }
	  if (s.status === NAME_STATE) {
	    if (s.gzhead.name/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */
	      //int val;

	      do {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            val = 1;
	            break;
	          }
	        }
	        // JS specific: little magic to add zero terminator to end of string
	        if (s.gzindex < s.gzhead.name.length) {
	          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
	        } else {
	          val = 0;
	        }
	        put_byte(s, val);
	      } while (val !== 0);

	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (val === 0) {
	        s.gzindex = 0;
	        s.status = COMMENT_STATE;
	      }
	    }
	    else {
	      s.status = COMMENT_STATE;
	    }
	  }
	  if (s.status === COMMENT_STATE) {
	    if (s.gzhead.comment/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */
	      //int val;

	      do {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            val = 1;
	            break;
	          }
	        }
	        // JS specific: little magic to add zero terminator to end of string
	        if (s.gzindex < s.gzhead.comment.length) {
	          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
	        } else {
	          val = 0;
	        }
	        put_byte(s, val);
	      } while (val !== 0);

	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (val === 0) {
	        s.status = HCRC_STATE;
	      }
	    }
	    else {
	      s.status = HCRC_STATE;
	    }
	  }
	  if (s.status === HCRC_STATE) {
	    if (s.gzhead.hcrc) {
	      if (s.pending + 2 > s.pending_buf_size) {
	        flush_pending(strm);
	      }
	      if (s.pending + 2 <= s.pending_buf_size) {
	        put_byte(s, strm.adler & 0xff);
	        put_byte(s, (strm.adler >> 8) & 0xff);
	        strm.adler = 0; //crc32(0L, Z_NULL, 0);
	        s.status = BUSY_STATE;
	      }
	    }
	    else {
	      s.status = BUSY_STATE;
	    }
	  }
	//#endif

	  /* Flush as much pending output as possible */
	  if (s.pending !== 0) {
	    flush_pending(strm);
	    if (strm.avail_out === 0) {
	      /* Since avail_out is 0, deflate will be called again with
	       * more output space, but possibly with both pending and
	       * avail_in equal to zero. There won't be anything to do,
	       * but this is not an error situation so make sure we
	       * return OK instead of BUF_ERROR at next call of deflate:
	       */
	      s.last_flush = -1;
	      return Z_OK;
	    }

	    /* Make sure there is something to do and avoid duplicate consecutive
	     * flushes. For repeated and useless calls with Z_FINISH, we keep
	     * returning Z_STREAM_END instead of Z_BUF_ERROR.
	     */
	  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
	    flush !== Z_FINISH) {
	    return err(strm, Z_BUF_ERROR);
	  }

	  /* User must not provide more input after the first FINISH: */
	  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
	    return err(strm, Z_BUF_ERROR);
	  }

	  /* Start a new block or continue the current one.
	   */
	  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
	    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
	    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
	      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
	        configuration_table[s.level].func(s, flush));

	    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
	      s.status = FINISH_STATE;
	    }
	    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
	      if (strm.avail_out === 0) {
	        s.last_flush = -1;
	        /* avoid BUF_ERROR next call, see above */
	      }
	      return Z_OK;
	      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
	       * of deflate should use the same flush parameter to make sure
	       * that the flush is complete. So we don't have to output an
	       * empty block here, this will be done at next call. This also
	       * ensures that for a very small output buffer, we emit at most
	       * one empty block.
	       */
	    }
	    if (bstate === BS_BLOCK_DONE) {
	      if (flush === Z_PARTIAL_FLUSH) {
	        trees._tr_align(s);
	      }
	      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

	        trees._tr_stored_block(s, 0, 0, false);
	        /* For a full flush, this empty block will be recognized
	         * as a special marker by inflate_sync().
	         */
	        if (flush === Z_FULL_FLUSH) {
	          /*** CLEAR_HASH(s); ***/             /* forget history */
	          zero(s.head); // Fill with NIL (= 0);

	          if (s.lookahead === 0) {
	            s.strstart = 0;
	            s.block_start = 0;
	            s.insert = 0;
	          }
	        }
	      }
	      flush_pending(strm);
	      if (strm.avail_out === 0) {
	        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
	        return Z_OK;
	      }
	    }
	  }
	  //Assert(strm->avail_out > 0, "bug2");
	  //if (strm.avail_out <= 0) { throw new Error("bug2");}

	  if (flush !== Z_FINISH) { return Z_OK; }
	  if (s.wrap <= 0) { return Z_STREAM_END; }

	  /* Write the trailer */
	  if (s.wrap === 2) {
	    put_byte(s, strm.adler & 0xff);
	    put_byte(s, (strm.adler >> 8) & 0xff);
	    put_byte(s, (strm.adler >> 16) & 0xff);
	    put_byte(s, (strm.adler >> 24) & 0xff);
	    put_byte(s, strm.total_in & 0xff);
	    put_byte(s, (strm.total_in >> 8) & 0xff);
	    put_byte(s, (strm.total_in >> 16) & 0xff);
	    put_byte(s, (strm.total_in >> 24) & 0xff);
	  }
	  else
	  {
	    putShortMSB(s, strm.adler >>> 16);
	    putShortMSB(s, strm.adler & 0xffff);
	  }

	  flush_pending(strm);
	  /* If avail_out is zero, the application will call deflate again
	   * to flush the rest.
	   */
	  if (s.wrap > 0) { s.wrap = -s.wrap; }
	  /* write the trailer only once! */
	  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
	}

	function deflateEnd(strm) {
	  var status;

	  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
	    return Z_STREAM_ERROR;
	  }

	  status = strm.state.status;
	  if (status !== INIT_STATE &&
	    status !== EXTRA_STATE &&
	    status !== NAME_STATE &&
	    status !== COMMENT_STATE &&
	    status !== HCRC_STATE &&
	    status !== BUSY_STATE &&
	    status !== FINISH_STATE
	  ) {
	    return err(strm, Z_STREAM_ERROR);
	  }

	  strm.state = null;

	  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
	}


	/* =========================================================================
	 * Initializes the compression dictionary from the given byte
	 * sequence without producing any compressed output.
	 */
	function deflateSetDictionary(strm, dictionary) {
	  var dictLength = dictionary.length;

	  var s;
	  var str, n;
	  var wrap;
	  var avail;
	  var next;
	  var input;
	  var tmpDict;

	  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
	    return Z_STREAM_ERROR;
	  }

	  s = strm.state;
	  wrap = s.wrap;

	  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
	    return Z_STREAM_ERROR;
	  }

	  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
	  if (wrap === 1) {
	    /* adler32(strm->adler, dictionary, dictLength); */
	    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
	  }

	  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

	  /* if dictionary would fill window, just replace the history */
	  if (dictLength >= s.w_size) {
	    if (wrap === 0) {            /* already empty otherwise */
	      /*** CLEAR_HASH(s); ***/
	      zero(s.head); // Fill with NIL (= 0);
	      s.strstart = 0;
	      s.block_start = 0;
	      s.insert = 0;
	    }
	    /* use the tail */
	    // dictionary = dictionary.slice(dictLength - s.w_size);
	    tmpDict = new utils.Buf8(s.w_size);
	    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
	    dictionary = tmpDict;
	    dictLength = s.w_size;
	  }
	  /* insert dictionary into window and hash */
	  avail = strm.avail_in;
	  next = strm.next_in;
	  input = strm.input;
	  strm.avail_in = dictLength;
	  strm.next_in = 0;
	  strm.input = dictionary;
	  fill_window(s);
	  while (s.lookahead >= MIN_MATCH) {
	    str = s.strstart;
	    n = s.lookahead - (MIN_MATCH - 1);
	    do {
	      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

	      s.prev[str & s.w_mask] = s.head[s.ins_h];

	      s.head[s.ins_h] = str;
	      str++;
	    } while (--n);
	    s.strstart = str;
	    s.lookahead = MIN_MATCH - 1;
	    fill_window(s);
	  }
	  s.strstart += s.lookahead;
	  s.block_start = s.strstart;
	  s.insert = s.lookahead;
	  s.lookahead = 0;
	  s.match_length = s.prev_length = MIN_MATCH - 1;
	  s.match_available = 0;
	  strm.next_in = next;
	  strm.input = input;
	  strm.avail_in = avail;
	  s.wrap = wrap;
	  return Z_OK;
	}


	exports.deflateInit = deflateInit;
	exports.deflateInit2 = deflateInit2;
	exports.deflateReset = deflateReset;
	exports.deflateResetKeep = deflateResetKeep;
	exports.deflateSetHeader = deflateSetHeader;
	exports.deflate = deflate;
	exports.deflateEnd = deflateEnd;
	exports.deflateSetDictionary = deflateSetDictionary;
	exports.deflateInfo = 'pako deflate (from Nodeca project)';

	/* Not implemented
	exports.deflateBound = deflateBound;
	exports.deflateCopy = deflateCopy;
	exports.deflateParams = deflateParams;
	exports.deflatePending = deflatePending;
	exports.deflatePrime = deflatePrime;
	exports.deflateTune = deflateTune;
	*/


/***/ },
/* 125 */
/***/ function(module, exports) {

	'use strict';


	var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
	                (typeof Uint16Array !== 'undefined') &&
	                (typeof Int32Array !== 'undefined');


	exports.assign = function (obj /*from1, from2, from3, ...*/) {
	  var sources = Array.prototype.slice.call(arguments, 1);
	  while (sources.length) {
	    var source = sources.shift();
	    if (!source) { continue; }

	    if (typeof source !== 'object') {
	      throw new TypeError(source + 'must be non-object');
	    }

	    for (var p in source) {
	      if (source.hasOwnProperty(p)) {
	        obj[p] = source[p];
	      }
	    }
	  }

	  return obj;
	};


	// reduce buffer size, avoiding mem copy
	exports.shrinkBuf = function (buf, size) {
	  if (buf.length === size) { return buf; }
	  if (buf.subarray) { return buf.subarray(0, size); }
	  buf.length = size;
	  return buf;
	};


	var fnTyped = {
	  arraySet: function (dest, src, src_offs, len, dest_offs) {
	    if (src.subarray && dest.subarray) {
	      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
	      return;
	    }
	    // Fallback to ordinary array
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function (chunks) {
	    var i, l, len, pos, chunk, result;

	    // calculate data length
	    len = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      len += chunks[i].length;
	    }

	    // join chunks
	    result = new Uint8Array(len);
	    pos = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      chunk = chunks[i];
	      result.set(chunk, pos);
	      pos += chunk.length;
	    }

	    return result;
	  }
	};

	var fnUntyped = {
	  arraySet: function (dest, src, src_offs, len, dest_offs) {
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function (chunks) {
	    return [].concat.apply([], chunks);
	  }
	};


	// Enable/Disable typed arrays use, for testing
	//
	exports.setTyped = function (on) {
	  if (on) {
	    exports.Buf8  = Uint8Array;
	    exports.Buf16 = Uint16Array;
	    exports.Buf32 = Int32Array;
	    exports.assign(exports, fnTyped);
	  } else {
	    exports.Buf8  = Array;
	    exports.Buf16 = Array;
	    exports.Buf32 = Array;
	    exports.assign(exports, fnUntyped);
	  }
	};

	exports.setTyped(TYPED_OK);


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	var utils = __webpack_require__(125);

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	//var Z_FILTERED          = 1;
	//var Z_HUFFMAN_ONLY      = 2;
	//var Z_RLE               = 3;
	var Z_FIXED               = 4;
	//var Z_DEFAULT_STRATEGY  = 0;

	/* Possible values of the data_type field (though see inflate()) */
	var Z_BINARY              = 0;
	var Z_TEXT                = 1;
	//var Z_ASCII             = 1; // = Z_TEXT
	var Z_UNKNOWN             = 2;

	/*============================================================================*/


	function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

	// From zutil.h

	var STORED_BLOCK = 0;
	var STATIC_TREES = 1;
	var DYN_TREES    = 2;
	/* The three kinds of block type */

	var MIN_MATCH    = 3;
	var MAX_MATCH    = 258;
	/* The minimum and maximum match lengths */

	// From deflate.h
	/* ===========================================================================
	 * Internal compression state.
	 */

	var LENGTH_CODES  = 29;
	/* number of length codes, not counting the special END_BLOCK code */

	var LITERALS      = 256;
	/* number of literal bytes 0..255 */

	var L_CODES       = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */

	var D_CODES       = 30;
	/* number of distance codes */

	var BL_CODES      = 19;
	/* number of codes used to transfer the bit lengths */

	var HEAP_SIZE     = 2 * L_CODES + 1;
	/* maximum heap size */

	var MAX_BITS      = 15;
	/* All codes must not exceed MAX_BITS bits */

	var Buf_size      = 16;
	/* size of bit buffer in bi_buf */


	/* ===========================================================================
	 * Constants
	 */

	var MAX_BL_BITS = 7;
	/* Bit length codes must not exceed MAX_BL_BITS bits */

	var END_BLOCK   = 256;
	/* end of block literal code */

	var REP_3_6     = 16;
	/* repeat previous bit length 3-6 times (2 bits of repeat count) */

	var REPZ_3_10   = 17;
	/* repeat a zero length 3-10 times  (3 bits of repeat count) */

	var REPZ_11_138 = 18;
	/* repeat a zero length 11-138 times  (7 bits of repeat count) */

	/* eslint-disable comma-spacing,array-bracket-spacing */
	var extra_lbits =   /* extra bits for each length code */
	  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

	var extra_dbits =   /* extra bits for each distance code */
	  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

	var extra_blbits =  /* extra bits for each bit length code */
	  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

	var bl_order =
	  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
	/* eslint-enable comma-spacing,array-bracket-spacing */

	/* The lengths of the bit length codes are sent in order of decreasing
	 * probability, to avoid transmitting the lengths for unused bit length codes.
	 */

	/* ===========================================================================
	 * Local data. These are initialized only once.
	 */

	// We pre-fill arrays with 0 to avoid uninitialized gaps

	var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

	// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
	var static_ltree  = new Array((L_CODES + 2) * 2);
	zero(static_ltree);
	/* The static literal tree. Since the bit lengths are imposed, there is no
	 * need for the L_CODES extra codes used during heap construction. However
	 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
	 * below).
	 */

	var static_dtree  = new Array(D_CODES * 2);
	zero(static_dtree);
	/* The static distance tree. (Actually a trivial tree since all codes use
	 * 5 bits.)
	 */

	var _dist_code    = new Array(DIST_CODE_LEN);
	zero(_dist_code);
	/* Distance codes. The first 256 values correspond to the distances
	 * 3 .. 258, the last 256 values correspond to the top 8 bits of
	 * the 15 bit distances.
	 */

	var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
	zero(_length_code);
	/* length code for each normalized match length (0 == MIN_MATCH) */

	var base_length   = new Array(LENGTH_CODES);
	zero(base_length);
	/* First normalized length for each code (0 = MIN_MATCH) */

	var base_dist     = new Array(D_CODES);
	zero(base_dist);
	/* First normalized distance for each code (0 = distance of 1) */


	function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

	  this.static_tree  = static_tree;  /* static tree or NULL */
	  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
	  this.extra_base   = extra_base;   /* base index for extra_bits */
	  this.elems        = elems;        /* max number of elements in the tree */
	  this.max_length   = max_length;   /* max bit length for the codes */

	  // show if `static_tree` has data or dummy - needed for monomorphic objects
	  this.has_stree    = static_tree && static_tree.length;
	}


	var static_l_desc;
	var static_d_desc;
	var static_bl_desc;


	function TreeDesc(dyn_tree, stat_desc) {
	  this.dyn_tree = dyn_tree;     /* the dynamic tree */
	  this.max_code = 0;            /* largest code with non zero frequency */
	  this.stat_desc = stat_desc;   /* the corresponding static tree */
	}



	function d_code(dist) {
	  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
	}


	/* ===========================================================================
	 * Output a short LSB first on the stream.
	 * IN assertion: there is enough room in pendingBuf.
	 */
	function put_short(s, w) {
	//    put_byte(s, (uch)((w) & 0xff));
	//    put_byte(s, (uch)((ush)(w) >> 8));
	  s.pending_buf[s.pending++] = (w) & 0xff;
	  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
	}


	/* ===========================================================================
	 * Send a value on a given number of bits.
	 * IN assertion: length <= 16 and value fits in length bits.
	 */
	function send_bits(s, value, length) {
	  if (s.bi_valid > (Buf_size - length)) {
	    s.bi_buf |= (value << s.bi_valid) & 0xffff;
	    put_short(s, s.bi_buf);
	    s.bi_buf = value >> (Buf_size - s.bi_valid);
	    s.bi_valid += length - Buf_size;
	  } else {
	    s.bi_buf |= (value << s.bi_valid) & 0xffff;
	    s.bi_valid += length;
	  }
	}


	function send_code(s, c, tree) {
	  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
	}


	/* ===========================================================================
	 * Reverse the first len bits of a code, using straightforward code (a faster
	 * method would use a table)
	 * IN assertion: 1 <= len <= 15
	 */
	function bi_reverse(code, len) {
	  var res = 0;
	  do {
	    res |= code & 1;
	    code >>>= 1;
	    res <<= 1;
	  } while (--len > 0);
	  return res >>> 1;
	}


	/* ===========================================================================
	 * Flush the bit buffer, keeping at most 7 bits in it.
	 */
	function bi_flush(s) {
	  if (s.bi_valid === 16) {
	    put_short(s, s.bi_buf);
	    s.bi_buf = 0;
	    s.bi_valid = 0;

	  } else if (s.bi_valid >= 8) {
	    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
	    s.bi_buf >>= 8;
	    s.bi_valid -= 8;
	  }
	}


	/* ===========================================================================
	 * Compute the optimal bit lengths for a tree and update the total bit length
	 * for the current block.
	 * IN assertion: the fields freq and dad are set, heap[heap_max] and
	 *    above are the tree nodes sorted by increasing frequency.
	 * OUT assertions: the field len is set to the optimal bit length, the
	 *     array bl_count contains the frequencies for each bit length.
	 *     The length opt_len is updated; static_len is also updated if stree is
	 *     not null.
	 */
	function gen_bitlen(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc;    /* the tree descriptor */
	{
	  var tree            = desc.dyn_tree;
	  var max_code        = desc.max_code;
	  var stree           = desc.stat_desc.static_tree;
	  var has_stree       = desc.stat_desc.has_stree;
	  var extra           = desc.stat_desc.extra_bits;
	  var base            = desc.stat_desc.extra_base;
	  var max_length      = desc.stat_desc.max_length;
	  var h;              /* heap index */
	  var n, m;           /* iterate over the tree elements */
	  var bits;           /* bit length */
	  var xbits;          /* extra bits */
	  var f;              /* frequency */
	  var overflow = 0;   /* number of elements with bit length too large */

	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    s.bl_count[bits] = 0;
	  }

	  /* In a first pass, compute the optimal bit lengths (which may
	   * overflow in the case of the bit length tree).
	   */
	  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

	  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
	    n = s.heap[h];
	    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
	    if (bits > max_length) {
	      bits = max_length;
	      overflow++;
	    }
	    tree[n * 2 + 1]/*.Len*/ = bits;
	    /* We overwrite tree[n].Dad which is no longer needed */

	    if (n > max_code) { continue; } /* not a leaf node */

	    s.bl_count[bits]++;
	    xbits = 0;
	    if (n >= base) {
	      xbits = extra[n - base];
	    }
	    f = tree[n * 2]/*.Freq*/;
	    s.opt_len += f * (bits + xbits);
	    if (has_stree) {
	      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
	    }
	  }
	  if (overflow === 0) { return; }

	  // Trace((stderr,"\nbit length overflow\n"));
	  /* This happens for example on obj2 and pic of the Calgary corpus */

	  /* Find the first bit length which could increase: */
	  do {
	    bits = max_length - 1;
	    while (s.bl_count[bits] === 0) { bits--; }
	    s.bl_count[bits]--;      /* move one leaf down the tree */
	    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
	    s.bl_count[max_length]--;
	    /* The brother of the overflow item also moves one step up,
	     * but this does not affect bl_count[max_length]
	     */
	    overflow -= 2;
	  } while (overflow > 0);

	  /* Now recompute all bit lengths, scanning in increasing frequency.
	   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
	   * lengths instead of fixing only the wrong ones. This idea is taken
	   * from 'ar' written by Haruhiko Okumura.)
	   */
	  for (bits = max_length; bits !== 0; bits--) {
	    n = s.bl_count[bits];
	    while (n !== 0) {
	      m = s.heap[--h];
	      if (m > max_code) { continue; }
	      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
	        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
	        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
	        tree[m * 2 + 1]/*.Len*/ = bits;
	      }
	      n--;
	    }
	  }
	}


	/* ===========================================================================
	 * Generate the codes for a given tree and bit counts (which need not be
	 * optimal).
	 * IN assertion: the array bl_count contains the bit length statistics for
	 * the given tree and the field len is set for all tree elements.
	 * OUT assertion: the field code is set for all tree elements of non
	 *     zero code length.
	 */
	function gen_codes(tree, max_code, bl_count)
	//    ct_data *tree;             /* the tree to decorate */
	//    int max_code;              /* largest code with non zero frequency */
	//    ushf *bl_count;            /* number of codes at each bit length */
	{
	  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
	  var code = 0;              /* running code value */
	  var bits;                  /* bit index */
	  var n;                     /* code index */

	  /* The distribution counts are first used to generate the code values
	   * without bit reversal.
	   */
	  for (bits = 1; bits <= MAX_BITS; bits++) {
	    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
	  }
	  /* Check that the bit counts in bl_count are consistent. The last code
	   * must be all ones.
	   */
	  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
	  //        "inconsistent bit counts");
	  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

	  for (n = 0;  n <= max_code; n++) {
	    var len = tree[n * 2 + 1]/*.Len*/;
	    if (len === 0) { continue; }
	    /* Now reverse the bits */
	    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

	    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
	    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
	  }
	}


	/* ===========================================================================
	 * Initialize the various 'constant' tables.
	 */
	function tr_static_init() {
	  var n;        /* iterates over tree elements */
	  var bits;     /* bit counter */
	  var length;   /* length value */
	  var code;     /* code value */
	  var dist;     /* distance index */
	  var bl_count = new Array(MAX_BITS + 1);
	  /* number of codes at each bit length for an optimal tree */

	  // do check in _tr_init()
	  //if (static_init_done) return;

	  /* For some embedded targets, global variables are not initialized: */
	/*#ifdef NO_INIT_GLOBAL_POINTERS
	  static_l_desc.static_tree = static_ltree;
	  static_l_desc.extra_bits = extra_lbits;
	  static_d_desc.static_tree = static_dtree;
	  static_d_desc.extra_bits = extra_dbits;
	  static_bl_desc.extra_bits = extra_blbits;
	#endif*/

	  /* Initialize the mapping length (0..255) -> length code (0..28) */
	  length = 0;
	  for (code = 0; code < LENGTH_CODES - 1; code++) {
	    base_length[code] = length;
	    for (n = 0; n < (1 << extra_lbits[code]); n++) {
	      _length_code[length++] = code;
	    }
	  }
	  //Assert (length == 256, "tr_static_init: length != 256");
	  /* Note that the length 255 (match length 258) can be represented
	   * in two different ways: code 284 + 5 bits or code 285, so we
	   * overwrite length_code[255] to use the best encoding:
	   */
	  _length_code[length - 1] = code;

	  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
	  dist = 0;
	  for (code = 0; code < 16; code++) {
	    base_dist[code] = dist;
	    for (n = 0; n < (1 << extra_dbits[code]); n++) {
	      _dist_code[dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: dist != 256");
	  dist >>= 7; /* from now on, all distances are divided by 128 */
	  for (; code < D_CODES; code++) {
	    base_dist[code] = dist << 7;
	    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
	      _dist_code[256 + dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

	  /* Construct the codes of the static literal tree */
	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    bl_count[bits] = 0;
	  }

	  n = 0;
	  while (n <= 143) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  while (n <= 255) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 9;
	    n++;
	    bl_count[9]++;
	  }
	  while (n <= 279) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 7;
	    n++;
	    bl_count[7]++;
	  }
	  while (n <= 287) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  /* Codes 286 and 287 do not exist, but we must include them in the
	   * tree construction to get a canonical Huffman tree (longest code
	   * all ones)
	   */
	  gen_codes(static_ltree, L_CODES + 1, bl_count);

	  /* The static distance tree is trivial: */
	  for (n = 0; n < D_CODES; n++) {
	    static_dtree[n * 2 + 1]/*.Len*/ = 5;
	    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
	  }

	  // Now data ready and we can init static trees
	  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
	  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
	  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

	  //static_init_done = true;
	}


	/* ===========================================================================
	 * Initialize a new block.
	 */
	function init_block(s) {
	  var n; /* iterates over tree elements */

	  /* Initialize the trees. */
	  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
	  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
	  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

	  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
	  s.opt_len = s.static_len = 0;
	  s.last_lit = s.matches = 0;
	}


	/* ===========================================================================
	 * Flush the bit buffer and align the output on a byte boundary
	 */
	function bi_windup(s)
	{
	  if (s.bi_valid > 8) {
	    put_short(s, s.bi_buf);
	  } else if (s.bi_valid > 0) {
	    //put_byte(s, (Byte)s->bi_buf);
	    s.pending_buf[s.pending++] = s.bi_buf;
	  }
	  s.bi_buf = 0;
	  s.bi_valid = 0;
	}

	/* ===========================================================================
	 * Copy a stored block, storing first the length and its
	 * one's complement if requested.
	 */
	function copy_block(s, buf, len, header)
	//DeflateState *s;
	//charf    *buf;    /* the input data */
	//unsigned len;     /* its length */
	//int      header;  /* true if block header must be written */
	{
	  bi_windup(s);        /* align on byte boundary */

	  if (header) {
	    put_short(s, len);
	    put_short(s, ~len);
	  }
	//  while (len--) {
	//    put_byte(s, *buf++);
	//  }
	  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
	  s.pending += len;
	}

	/* ===========================================================================
	 * Compares to subtrees, using the tree depth as tie breaker when
	 * the subtrees have equal frequency. This minimizes the worst case length.
	 */
	function smaller(tree, n, m, depth) {
	  var _n2 = n * 2;
	  var _m2 = m * 2;
	  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
	         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
	}

	/* ===========================================================================
	 * Restore the heap property by moving down the tree starting at node k,
	 * exchanging a node with the smallest of its two sons if necessary, stopping
	 * when the heap property is re-established (each father smaller than its
	 * two sons).
	 */
	function pqdownheap(s, tree, k)
	//    deflate_state *s;
	//    ct_data *tree;  /* the tree to restore */
	//    int k;               /* node to move down */
	{
	  var v = s.heap[k];
	  var j = k << 1;  /* left son of k */
	  while (j <= s.heap_len) {
	    /* Set j to the smallest of the two sons: */
	    if (j < s.heap_len &&
	      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
	      j++;
	    }
	    /* Exit if v is smaller than both sons */
	    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

	    /* Exchange v with the smallest son */
	    s.heap[k] = s.heap[j];
	    k = j;

	    /* And continue down the tree, setting j to the left son of k */
	    j <<= 1;
	  }
	  s.heap[k] = v;
	}


	// inlined manually
	// var SMALLEST = 1;

	/* ===========================================================================
	 * Send the block data compressed using the given Huffman trees
	 */
	function compress_block(s, ltree, dtree)
	//    deflate_state *s;
	//    const ct_data *ltree; /* literal tree */
	//    const ct_data *dtree; /* distance tree */
	{
	  var dist;           /* distance of matched string */
	  var lc;             /* match length or unmatched char (if dist == 0) */
	  var lx = 0;         /* running index in l_buf */
	  var code;           /* the code to send */
	  var extra;          /* number of extra bits to send */

	  if (s.last_lit !== 0) {
	    do {
	      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
	      lc = s.pending_buf[s.l_buf + lx];
	      lx++;

	      if (dist === 0) {
	        send_code(s, lc, ltree); /* send a literal byte */
	        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
	      } else {
	        /* Here, lc is the match length - MIN_MATCH */
	        code = _length_code[lc];
	        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
	        extra = extra_lbits[code];
	        if (extra !== 0) {
	          lc -= base_length[code];
	          send_bits(s, lc, extra);       /* send the extra length bits */
	        }
	        dist--; /* dist is now the match distance - 1 */
	        code = d_code(dist);
	        //Assert (code < D_CODES, "bad d_code");

	        send_code(s, code, dtree);       /* send the distance code */
	        extra = extra_dbits[code];
	        if (extra !== 0) {
	          dist -= base_dist[code];
	          send_bits(s, dist, extra);   /* send the extra distance bits */
	        }
	      } /* literal or match pair ? */

	      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
	      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
	      //       "pendingBuf overflow");

	    } while (lx < s.last_lit);
	  }

	  send_code(s, END_BLOCK, ltree);
	}


	/* ===========================================================================
	 * Construct one Huffman tree and assigns the code bit strings and lengths.
	 * Update the total bit length for the current block.
	 * IN assertion: the field freq is set for all tree elements.
	 * OUT assertions: the fields len and code are set to the optimal bit length
	 *     and corresponding code. The length opt_len is updated; static_len is
	 *     also updated if stree is not null. The field max_code is set.
	 */
	function build_tree(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc; /* the tree descriptor */
	{
	  var tree     = desc.dyn_tree;
	  var stree    = desc.stat_desc.static_tree;
	  var has_stree = desc.stat_desc.has_stree;
	  var elems    = desc.stat_desc.elems;
	  var n, m;          /* iterate over heap elements */
	  var max_code = -1; /* largest code with non zero frequency */
	  var node;          /* new node being created */

	  /* Construct the initial heap, with least frequent element in
	   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
	   * heap[0] is not used.
	   */
	  s.heap_len = 0;
	  s.heap_max = HEAP_SIZE;

	  for (n = 0; n < elems; n++) {
	    if (tree[n * 2]/*.Freq*/ !== 0) {
	      s.heap[++s.heap_len] = max_code = n;
	      s.depth[n] = 0;

	    } else {
	      tree[n * 2 + 1]/*.Len*/ = 0;
	    }
	  }

	  /* The pkzip format requires that at least one distance code exists,
	   * and that at least one bit should be sent even if there is only one
	   * possible code. So to avoid special checks later on we force at least
	   * two codes of non zero frequency.
	   */
	  while (s.heap_len < 2) {
	    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
	    tree[node * 2]/*.Freq*/ = 1;
	    s.depth[node] = 0;
	    s.opt_len--;

	    if (has_stree) {
	      s.static_len -= stree[node * 2 + 1]/*.Len*/;
	    }
	    /* node is 0 or 1 so it does not have extra bits */
	  }
	  desc.max_code = max_code;

	  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
	   * establish sub-heaps of increasing lengths:
	   */
	  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

	  /* Construct the Huffman tree by repeatedly combining the least two
	   * frequent nodes.
	   */
	  node = elems;              /* next internal node of the tree */
	  do {
	    //pqremove(s, tree, n);  /* n = node of least frequency */
	    /*** pqremove ***/
	    n = s.heap[1/*SMALLEST*/];
	    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
	    pqdownheap(s, tree, 1/*SMALLEST*/);
	    /***/

	    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

	    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
	    s.heap[--s.heap_max] = m;

	    /* Create a new node father of n and m */
	    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
	    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
	    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

	    /* and insert the new node in the heap */
	    s.heap[1/*SMALLEST*/] = node++;
	    pqdownheap(s, tree, 1/*SMALLEST*/);

	  } while (s.heap_len >= 2);

	  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

	  /* At this point, the fields freq and dad are set. We can now
	   * generate the bit lengths.
	   */
	  gen_bitlen(s, desc);

	  /* The field len is now set, we can generate the bit codes */
	  gen_codes(tree, max_code, s.bl_count);
	}


	/* ===========================================================================
	 * Scan a literal or distance tree to determine the frequencies of the codes
	 * in the bit length tree.
	 */
	function scan_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree;   /* the tree to be scanned */
	//    int max_code;    /* and its largest code of non zero frequency */
	{
	  var n;                     /* iterates over all tree elements */
	  var prevlen = -1;          /* last emitted length */
	  var curlen;                /* length of current code */

	  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

	  var count = 0;             /* repeat count of the current code */
	  var max_count = 7;         /* max repeat count */
	  var min_count = 4;         /* min repeat count */

	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }
	  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

	    if (++count < max_count && curlen === nextlen) {
	      continue;

	    } else if (count < min_count) {
	      s.bl_tree[curlen * 2]/*.Freq*/ += count;

	    } else if (curlen !== 0) {

	      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
	      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

	    } else if (count <= 10) {
	      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

	    } else {
	      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
	    }

	    count = 0;
	    prevlen = curlen;

	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;

	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;

	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}


	/* ===========================================================================
	 * Send a literal or distance tree in compressed form, using the codes in
	 * bl_tree.
	 */
	function send_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree; /* the tree to be scanned */
	//    int max_code;       /* and its largest code of non zero frequency */
	{
	  var n;                     /* iterates over all tree elements */
	  var prevlen = -1;          /* last emitted length */
	  var curlen;                /* length of current code */

	  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

	  var count = 0;             /* repeat count of the current code */
	  var max_count = 7;         /* max repeat count */
	  var min_count = 4;         /* min repeat count */

	  /* tree[max_code+1].Len = -1; */  /* guard already set */
	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }

	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

	    if (++count < max_count && curlen === nextlen) {
	      continue;

	    } else if (count < min_count) {
	      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

	    } else if (curlen !== 0) {
	      if (curlen !== prevlen) {
	        send_code(s, curlen, s.bl_tree);
	        count--;
	      }
	      //Assert(count >= 3 && count <= 6, " 3_6?");
	      send_code(s, REP_3_6, s.bl_tree);
	      send_bits(s, count - 3, 2);

	    } else if (count <= 10) {
	      send_code(s, REPZ_3_10, s.bl_tree);
	      send_bits(s, count - 3, 3);

	    } else {
	      send_code(s, REPZ_11_138, s.bl_tree);
	      send_bits(s, count - 11, 7);
	    }

	    count = 0;
	    prevlen = curlen;
	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;

	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;

	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}


	/* ===========================================================================
	 * Construct the Huffman tree for the bit lengths and return the index in
	 * bl_order of the last bit length code to send.
	 */
	function build_bl_tree(s) {
	  var max_blindex;  /* index of last bit length code of non zero freq */

	  /* Determine the bit length frequencies for literal and distance trees */
	  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
	  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

	  /* Build the bit length tree: */
	  build_tree(s, s.bl_desc);
	  /* opt_len now includes the length of the tree representations, except
	   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
	   */

	  /* Determine the number of bit length codes to send. The pkzip format
	   * requires that at least 4 bit length codes be sent. (appnote.txt says
	   * 3 but the actual value used is 4.)
	   */
	  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
	    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
	      break;
	    }
	  }
	  /* Update opt_len to include the bit length tree and counts */
	  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
	  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
	  //        s->opt_len, s->static_len));

	  return max_blindex;
	}


	/* ===========================================================================
	 * Send the header for a block using dynamic Huffman trees: the counts, the
	 * lengths of the bit length codes, the literal tree and the distance tree.
	 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
	 */
	function send_all_trees(s, lcodes, dcodes, blcodes)
	//    deflate_state *s;
	//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
	{
	  var rank;                    /* index in bl_order */

	  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
	  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
	  //        "too many codes");
	  //Tracev((stderr, "\nbl counts: "));
	  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
	  send_bits(s, dcodes - 1,   5);
	  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
	  for (rank = 0; rank < blcodes; rank++) {
	    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
	    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
	  }
	  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

	  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
	  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

	  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
	  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
	}


	/* ===========================================================================
	 * Check if the data type is TEXT or BINARY, using the following algorithm:
	 * - TEXT if the two conditions below are satisfied:
	 *    a) There are no non-portable control characters belonging to the
	 *       "black list" (0..6, 14..25, 28..31).
	 *    b) There is at least one printable character belonging to the
	 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
	 * - BINARY otherwise.
	 * - The following partially-portable control characters form a
	 *   "gray list" that is ignored in this detection algorithm:
	 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
	 * IN assertion: the fields Freq of dyn_ltree are set.
	 */
	function detect_data_type(s) {
	  /* black_mask is the bit mask of black-listed bytes
	   * set bits 0..6, 14..25, and 28..31
	   * 0xf3ffc07f = binary 11110011111111111100000001111111
	   */
	  var black_mask = 0xf3ffc07f;
	  var n;

	  /* Check for non-textual ("black-listed") bytes. */
	  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
	    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
	      return Z_BINARY;
	    }
	  }

	  /* Check for textual ("white-listed") bytes. */
	  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
	      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
	    return Z_TEXT;
	  }
	  for (n = 32; n < LITERALS; n++) {
	    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
	      return Z_TEXT;
	    }
	  }

	  /* There are no "black-listed" or "white-listed" bytes:
	   * this stream either is empty or has tolerated ("gray-listed") bytes only.
	   */
	  return Z_BINARY;
	}


	var static_init_done = false;

	/* ===========================================================================
	 * Initialize the tree data structures for a new zlib stream.
	 */
	function _tr_init(s)
	{

	  if (!static_init_done) {
	    tr_static_init();
	    static_init_done = true;
	  }

	  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
	  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
	  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

	  s.bi_buf = 0;
	  s.bi_valid = 0;

	  /* Initialize the first block of the first file: */
	  init_block(s);
	}


	/* ===========================================================================
	 * Send a stored block
	 */
	function _tr_stored_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
	  copy_block(s, buf, stored_len, true); /* with header */
	}


	/* ===========================================================================
	 * Send one empty static block to give enough lookahead for inflate.
	 * This takes 10 bits, of which 7 may remain in the bit buffer.
	 */
	function _tr_align(s) {
	  send_bits(s, STATIC_TREES << 1, 3);
	  send_code(s, END_BLOCK, static_ltree);
	  bi_flush(s);
	}


	/* ===========================================================================
	 * Determine the best encoding for the current block: dynamic trees, static
	 * trees or store, and output the encoded block to the zip file.
	 */
	function _tr_flush_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block, or NULL if too old */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
	  var max_blindex = 0;        /* index of last bit length code of non zero freq */

	  /* Build the Huffman trees unless a stored block is forced */
	  if (s.level > 0) {

	    /* Check if the file is binary or text */
	    if (s.strm.data_type === Z_UNKNOWN) {
	      s.strm.data_type = detect_data_type(s);
	    }

	    /* Construct the literal and distance trees */
	    build_tree(s, s.l_desc);
	    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));

	    build_tree(s, s.d_desc);
	    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));
	    /* At this point, opt_len and static_len are the total bit lengths of
	     * the compressed block data, excluding the tree representations.
	     */

	    /* Build the bit length tree for the above two trees, and get the index
	     * in bl_order of the last bit length code to send.
	     */
	    max_blindex = build_bl_tree(s);

	    /* Determine the best encoding. Compute the block lengths in bytes. */
	    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
	    static_lenb = (s.static_len + 3 + 7) >>> 3;

	    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
	    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
	    //        s->last_lit));

	    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

	  } else {
	    // Assert(buf != (char*)0, "lost buf");
	    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
	  }

	  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
	    /* 4: two words for the lengths */

	    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
	     * Otherwise we can't have processed more than WSIZE input bytes since
	     * the last block flush, because compression would have been
	     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
	     * transform a block into a stored block.
	     */
	    _tr_stored_block(s, buf, stored_len, last);

	  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

	    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
	    compress_block(s, static_ltree, static_dtree);

	  } else {
	    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
	    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
	    compress_block(s, s.dyn_ltree, s.dyn_dtree);
	  }
	  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
	  /* The above check is made mod 2^32, for files larger than 512 MB
	   * and uLong implemented on 32 bits.
	   */
	  init_block(s);

	  if (last) {
	    bi_windup(s);
	  }
	  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
	  //       s->compressed_len-7*last));
	}

	/* ===========================================================================
	 * Save the match info and tally the frequency counts. Return true if
	 * the current block must be flushed.
	 */
	function _tr_tally(s, dist, lc)
	//    deflate_state *s;
	//    unsigned dist;  /* distance of matched string */
	//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
	{
	  //var out_length, in_length, dcode;

	  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
	  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

	  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
	  s.last_lit++;

	  if (dist === 0) {
	    /* lc is the unmatched char */
	    s.dyn_ltree[lc * 2]/*.Freq*/++;
	  } else {
	    s.matches++;
	    /* Here, lc is the match length - MIN_MATCH */
	    dist--;             /* dist = match distance - 1 */
	    //Assert((ush)dist < (ush)MAX_DIST(s) &&
	    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
	    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

	    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
	    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
	  }

	// (!) This block is disabled in zlib defailts,
	// don't enable it for binary compatibility

	//#ifdef TRUNCATE_BLOCK
	//  /* Try to guess if it is profitable to stop the current block here */
	//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
	//    /* Compute an upper bound for the compressed length */
	//    out_length = s.last_lit*8;
	//    in_length = s.strstart - s.block_start;
	//
	//    for (dcode = 0; dcode < D_CODES; dcode++) {
	//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
	//    }
	//    out_length >>>= 3;
	//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
	//    //       s->last_lit, in_length, out_length,
	//    //       100L - out_length*100L/in_length));
	//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
	//      return true;
	//    }
	//  }
	//#endif

	  return (s.last_lit === s.lit_bufsize - 1);
	  /* We avoid equality with lit_bufsize because of wraparound at 64K
	   * on 16 bit machines and because stored blocks are restricted to
	   * 64K-1 bytes.
	   */
	}

	exports._tr_init  = _tr_init;
	exports._tr_stored_block = _tr_stored_block;
	exports._tr_flush_block  = _tr_flush_block;
	exports._tr_tally = _tr_tally;
	exports._tr_align = _tr_align;


/***/ },
/* 127 */
/***/ function(module, exports) {

	'use strict';

	// Note: adler32 takes 12% for level 0 and 2% for level 6.
	// It doesn't worth to make additional optimizationa as in original.
	// Small size is preferable.

	function adler32(adler, buf, len, pos) {
	  var s1 = (adler & 0xffff) |0,
	      s2 = ((adler >>> 16) & 0xffff) |0,
	      n = 0;

	  while (len !== 0) {
	    // Set limit ~ twice less than 5552, to keep
	    // s2 in 31-bits, because we force signed ints.
	    // in other case %= will fail.
	    n = len > 2000 ? 2000 : len;
	    len -= n;

	    do {
	      s1 = (s1 + buf[pos++]) |0;
	      s2 = (s2 + s1) |0;
	    } while (--n);

	    s1 %= 65521;
	    s2 %= 65521;
	  }

	  return (s1 | (s2 << 16)) |0;
	}


	module.exports = adler32;


/***/ },
/* 128 */
/***/ function(module, exports) {

	'use strict';

	// Note: we can't get significant speed boost here.
	// So write code to minimize size - no pregenerated tables
	// and array tools dependencies.


	// Use ordinary array, since untyped makes no boost here
	function makeTable() {
	  var c, table = [];

	  for (var n = 0; n < 256; n++) {
	    c = n;
	    for (var k = 0; k < 8; k++) {
	      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
	    }
	    table[n] = c;
	  }

	  return table;
	}

	// Create table on load. Just 255 signed longs. Not a problem.
	var crcTable = makeTable();


	function crc32(crc, buf, len, pos) {
	  var t = crcTable,
	      end = pos + len;

	  crc ^= -1;

	  for (var i = pos; i < end; i++) {
	    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
	  }

	  return (crc ^ (-1)); // >>> 0;
	}


	module.exports = crc32;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	var utils         = __webpack_require__(125);
	var adler32       = __webpack_require__(127);
	var crc32         = __webpack_require__(128);
	var inflate_fast  = __webpack_require__(130);
	var inflate_table = __webpack_require__(131);

	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	/* Allowed flush values; see deflate() and inflate() below for details */
	//var Z_NO_FLUSH      = 0;
	//var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	//var Z_FULL_FLUSH    = 3;
	var Z_FINISH        = 4;
	var Z_BLOCK         = 5;
	var Z_TREES         = 6;


	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	var Z_NEED_DICT     = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR  = -2;
	var Z_DATA_ERROR    = -3;
	var Z_MEM_ERROR     = -4;
	var Z_BUF_ERROR     = -5;
	//var Z_VERSION_ERROR = -6;

	/* The deflate compression method */
	var Z_DEFLATED  = 8;


	/* STATES ====================================================================*/
	/* ===========================================================================*/


	var    HEAD = 1;       /* i: waiting for magic header */
	var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
	var    TIME = 3;       /* i: waiting for modification time (gzip) */
	var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
	var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
	var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
	var    NAME = 7;       /* i: waiting for end of file name (gzip) */
	var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
	var    HCRC = 9;       /* i: waiting for header crc (gzip) */
	var    DICTID = 10;    /* i: waiting for dictionary check value */
	var    DICT = 11;      /* waiting for inflateSetDictionary() call */
	var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
	var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
	var        STORED = 14;    /* i: waiting for stored size (length and complement) */
	var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
	var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
	var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
	var        LENLENS = 18;   /* i: waiting for code length code lengths */
	var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
	var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
	var            LEN = 21;       /* i: waiting for length/lit/eob code */
	var            LENEXT = 22;    /* i: waiting for length extra bits */
	var            DIST = 23;      /* i: waiting for distance code */
	var            DISTEXT = 24;   /* i: waiting for distance extra bits */
	var            MATCH = 25;     /* o: waiting for output space to copy string */
	var            LIT = 26;       /* o: waiting for output space to write literal */
	var    CHECK = 27;     /* i: waiting for 32-bit check value */
	var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
	var    DONE = 29;      /* finished check, done -- remain here until reset */
	var    BAD = 30;       /* got a data error -- remain here until reset */
	var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
	var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

	/* ===========================================================================*/



	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_WBITS = MAX_WBITS;


	function zswap32(q) {
	  return  (((q >>> 24) & 0xff) +
	          ((q >>> 8) & 0xff00) +
	          ((q & 0xff00) << 8) +
	          ((q & 0xff) << 24));
	}


	function InflateState() {
	  this.mode = 0;             /* current inflate mode */
	  this.last = false;          /* true if processing last block */
	  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
	  this.havedict = false;      /* true if dictionary provided */
	  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
	  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
	  this.check = 0;             /* protected copy of check value */
	  this.total = 0;             /* protected copy of output count */
	  // TODO: may be {}
	  this.head = null;           /* where to save gzip header information */

	  /* sliding window */
	  this.wbits = 0;             /* log base 2 of requested window size */
	  this.wsize = 0;             /* window size or zero if not using window */
	  this.whave = 0;             /* valid bytes in the window */
	  this.wnext = 0;             /* window write index */
	  this.window = null;         /* allocated sliding window, if needed */

	  /* bit accumulator */
	  this.hold = 0;              /* input bit accumulator */
	  this.bits = 0;              /* number of bits in "in" */

	  /* for string and stored block copying */
	  this.length = 0;            /* literal or length of data to copy */
	  this.offset = 0;            /* distance back to copy string from */

	  /* for table and code decoding */
	  this.extra = 0;             /* extra bits needed */

	  /* fixed and dynamic code tables */
	  this.lencode = null;          /* starting table for length/literal codes */
	  this.distcode = null;         /* starting table for distance codes */
	  this.lenbits = 0;           /* index bits for lencode */
	  this.distbits = 0;          /* index bits for distcode */

	  /* dynamic table building */
	  this.ncode = 0;             /* number of code length code lengths */
	  this.nlen = 0;              /* number of length code lengths */
	  this.ndist = 0;             /* number of distance code lengths */
	  this.have = 0;              /* number of code lengths in lens[] */
	  this.next = null;              /* next available space in codes[] */

	  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
	  this.work = new utils.Buf16(288); /* work area for code table building */

	  /*
	   because we don't have pointers in js, we use lencode and distcode directly
	   as buffers so we don't need codes
	  */
	  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
	  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
	  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
	  this.sane = 0;                   /* if false, allow invalid distance too far */
	  this.back = 0;                   /* bits back of last unprocessed length/lit */
	  this.was = 0;                    /* initial length of match */
	}

	function inflateResetKeep(strm) {
	  var state;

	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  strm.total_in = strm.total_out = state.total = 0;
	  strm.msg = ''; /*Z_NULL*/
	  if (state.wrap) {       /* to support ill-conceived Java test suite */
	    strm.adler = state.wrap & 1;
	  }
	  state.mode = HEAD;
	  state.last = 0;
	  state.havedict = 0;
	  state.dmax = 32768;
	  state.head = null/*Z_NULL*/;
	  state.hold = 0;
	  state.bits = 0;
	  //state.lencode = state.distcode = state.next = state.codes;
	  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
	  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

	  state.sane = 1;
	  state.back = -1;
	  //Tracev((stderr, "inflate: reset\n"));
	  return Z_OK;
	}

	function inflateReset(strm) {
	  var state;

	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  state.wsize = 0;
	  state.whave = 0;
	  state.wnext = 0;
	  return inflateResetKeep(strm);

	}

	function inflateReset2(strm, windowBits) {
	  var wrap;
	  var state;

	  /* get the state */
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;

	  /* extract wrap request from windowBits parameter */
	  if (windowBits < 0) {
	    wrap = 0;
	    windowBits = -windowBits;
	  }
	  else {
	    wrap = (windowBits >> 4) + 1;
	    if (windowBits < 48) {
	      windowBits &= 15;
	    }
	  }

	  /* set number of window bits, free window if different */
	  if (windowBits && (windowBits < 8 || windowBits > 15)) {
	    return Z_STREAM_ERROR;
	  }
	  if (state.window !== null && state.wbits !== windowBits) {
	    state.window = null;
	  }

	  /* update state and reset the rest of it */
	  state.wrap = wrap;
	  state.wbits = windowBits;
	  return inflateReset(strm);
	}

	function inflateInit2(strm, windowBits) {
	  var ret;
	  var state;

	  if (!strm) { return Z_STREAM_ERROR; }
	  //strm.msg = Z_NULL;                 /* in case we return an error */

	  state = new InflateState();

	  //if (state === Z_NULL) return Z_MEM_ERROR;
	  //Tracev((stderr, "inflate: allocated\n"));
	  strm.state = state;
	  state.window = null/*Z_NULL*/;
	  ret = inflateReset2(strm, windowBits);
	  if (ret !== Z_OK) {
	    strm.state = null/*Z_NULL*/;
	  }
	  return ret;
	}

	function inflateInit(strm) {
	  return inflateInit2(strm, DEF_WBITS);
	}


	/*
	 Return state with length and distance decoding tables and index sizes set to
	 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
	 If BUILDFIXED is defined, then instead this routine builds the tables the
	 first time it's called, and returns those tables the first time and
	 thereafter.  This reduces the size of the code by about 2K bytes, in
	 exchange for a little execution time.  However, BUILDFIXED should not be
	 used for threaded applications, since the rewriting of the tables and virgin
	 may not be thread-safe.
	 */
	var virgin = true;

	var lenfix, distfix; // We have no pointers in JS, so keep tables separate

	function fixedtables(state) {
	  /* build fixed huffman tables if first call (may not be thread safe) */
	  if (virgin) {
	    var sym;

	    lenfix = new utils.Buf32(512);
	    distfix = new utils.Buf32(32);

	    /* literal/length table */
	    sym = 0;
	    while (sym < 144) { state.lens[sym++] = 8; }
	    while (sym < 256) { state.lens[sym++] = 9; }
	    while (sym < 280) { state.lens[sym++] = 7; }
	    while (sym < 288) { state.lens[sym++] = 8; }

	    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

	    /* distance table */
	    sym = 0;
	    while (sym < 32) { state.lens[sym++] = 5; }

	    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

	    /* do this just once */
	    virgin = false;
	  }

	  state.lencode = lenfix;
	  state.lenbits = 9;
	  state.distcode = distfix;
	  state.distbits = 5;
	}


	/*
	 Update the window with the last wsize (normally 32K) bytes written before
	 returning.  If window does not exist yet, create it.  This is only called
	 when a window is already in use, or when output has been written during this
	 inflate call, but the end of the deflate stream has not been reached yet.
	 It is also called to create a window for dictionary data when a dictionary
	 is loaded.

	 Providing output buffers larger than 32K to inflate() should provide a speed
	 advantage, since only the last 32K of output is copied to the sliding window
	 upon return from inflate(), and since all distances after the first 32K of
	 output will fall in the output data, making match copies simpler and faster.
	 The advantage may be dependent on the size of the processor's data caches.
	 */
	function updatewindow(strm, src, end, copy) {
	  var dist;
	  var state = strm.state;

	  /* if it hasn't been done already, allocate space for the window */
	  if (state.window === null) {
	    state.wsize = 1 << state.wbits;
	    state.wnext = 0;
	    state.whave = 0;

	    state.window = new utils.Buf8(state.wsize);
	  }

	  /* copy state->wsize or less output bytes into the circular window */
	  if (copy >= state.wsize) {
	    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
	    state.wnext = 0;
	    state.whave = state.wsize;
	  }
	  else {
	    dist = state.wsize - state.wnext;
	    if (dist > copy) {
	      dist = copy;
	    }
	    //zmemcpy(state->window + state->wnext, end - copy, dist);
	    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
	    copy -= dist;
	    if (copy) {
	      //zmemcpy(state->window, end - copy, copy);
	      utils.arraySet(state.window, src, end - copy, copy, 0);
	      state.wnext = copy;
	      state.whave = state.wsize;
	    }
	    else {
	      state.wnext += dist;
	      if (state.wnext === state.wsize) { state.wnext = 0; }
	      if (state.whave < state.wsize) { state.whave += dist; }
	    }
	  }
	  return 0;
	}

	function inflate(strm, flush) {
	  var state;
	  var input, output;          // input/output buffers
	  var next;                   /* next input INDEX */
	  var put;                    /* next output INDEX */
	  var have, left;             /* available input and output */
	  var hold;                   /* bit buffer */
	  var bits;                   /* bits in bit buffer */
	  var _in, _out;              /* save starting available input and output */
	  var copy;                   /* number of stored or match bytes to copy */
	  var from;                   /* where to copy match bytes from */
	  var from_source;
	  var here = 0;               /* current decoding table entry */
	  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
	  //var last;                   /* parent table entry */
	  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
	  var len;                    /* length to copy for repeats, bits to drop */
	  var ret;                    /* return code */
	  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
	  var opts;

	  var n; // temporary var for NEED_BITS

	  var order = /* permutation of code lengths */
	    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


	  if (!strm || !strm.state || !strm.output ||
	      (!strm.input && strm.avail_in !== 0)) {
	    return Z_STREAM_ERROR;
	  }

	  state = strm.state;
	  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


	  //--- LOAD() ---
	  put = strm.next_out;
	  output = strm.output;
	  left = strm.avail_out;
	  next = strm.next_in;
	  input = strm.input;
	  have = strm.avail_in;
	  hold = state.hold;
	  bits = state.bits;
	  //---

	  _in = have;
	  _out = left;
	  ret = Z_OK;

	  inf_leave: // goto emulation
	  for (;;) {
	    switch (state.mode) {
	    case HEAD:
	      if (state.wrap === 0) {
	        state.mode = TYPEDO;
	        break;
	      }
	      //=== NEEDBITS(16);
	      while (bits < 16) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
	        state.check = 0/*crc32(0L, Z_NULL, 0)*/;
	        //=== CRC2(state.check, hold);
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        state.check = crc32(state.check, hbuf, 2, 0);
	        //===//

	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = FLAGS;
	        break;
	      }
	      state.flags = 0;           /* expect zlib header */
	      if (state.head) {
	        state.head.done = false;
	      }
	      if (!(state.wrap & 1) ||   /* check if zlib header allowed */
	        (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
	        strm.msg = 'incorrect header check';
	        state.mode = BAD;
	        break;
	      }
	      if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
	        strm.msg = 'unknown compression method';
	        state.mode = BAD;
	        break;
	      }
	      //--- DROPBITS(4) ---//
	      hold >>>= 4;
	      bits -= 4;
	      //---//
	      len = (hold & 0x0f)/*BITS(4)*/ + 8;
	      if (state.wbits === 0) {
	        state.wbits = len;
	      }
	      else if (len > state.wbits) {
	        strm.msg = 'invalid window size';
	        state.mode = BAD;
	        break;
	      }
	      state.dmax = 1 << len;
	      //Tracev((stderr, "inflate:   zlib header ok\n"));
	      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
	      state.mode = hold & 0x200 ? DICTID : TYPE;
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      break;
	    case FLAGS:
	      //=== NEEDBITS(16); */
	      while (bits < 16) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      state.flags = hold;
	      if ((state.flags & 0xff) !== Z_DEFLATED) {
	        strm.msg = 'unknown compression method';
	        state.mode = BAD;
	        break;
	      }
	      if (state.flags & 0xe000) {
	        strm.msg = 'unknown header flags set';
	        state.mode = BAD;
	        break;
	      }
	      if (state.head) {
	        state.head.text = ((hold >> 8) & 1);
	      }
	      if (state.flags & 0x0200) {
	        //=== CRC2(state.check, hold);
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        state.check = crc32(state.check, hbuf, 2, 0);
	        //===//
	      }
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = TIME;
	      /* falls through */
	    case TIME:
	      //=== NEEDBITS(32); */
	      while (bits < 32) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if (state.head) {
	        state.head.time = hold;
	      }
	      if (state.flags & 0x0200) {
	        //=== CRC4(state.check, hold)
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        hbuf[2] = (hold >>> 16) & 0xff;
	        hbuf[3] = (hold >>> 24) & 0xff;
	        state.check = crc32(state.check, hbuf, 4, 0);
	        //===
	      }
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = OS;
	      /* falls through */
	    case OS:
	      //=== NEEDBITS(16); */
	      while (bits < 16) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if (state.head) {
	        state.head.xflags = (hold & 0xff);
	        state.head.os = (hold >> 8);
	      }
	      if (state.flags & 0x0200) {
	        //=== CRC2(state.check, hold);
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        state.check = crc32(state.check, hbuf, 2, 0);
	        //===//
	      }
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = EXLEN;
	      /* falls through */
	    case EXLEN:
	      if (state.flags & 0x0400) {
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.length = hold;
	        if (state.head) {
	          state.head.extra_len = hold;
	        }
	        if (state.flags & 0x0200) {
	          //=== CRC2(state.check, hold);
	          hbuf[0] = hold & 0xff;
	          hbuf[1] = (hold >>> 8) & 0xff;
	          state.check = crc32(state.check, hbuf, 2, 0);
	          //===//
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	      }
	      else if (state.head) {
	        state.head.extra = null/*Z_NULL*/;
	      }
	      state.mode = EXTRA;
	      /* falls through */
	    case EXTRA:
	      if (state.flags & 0x0400) {
	        copy = state.length;
	        if (copy > have) { copy = have; }
	        if (copy) {
	          if (state.head) {
	            len = state.head.extra_len - state.length;
	            if (!state.head.extra) {
	              // Use untyped array for more conveniend processing later
	              state.head.extra = new Array(state.head.extra_len);
	            }
	            utils.arraySet(
	              state.head.extra,
	              input,
	              next,
	              // extra field is limited to 65536 bytes
	              // - no need for additional size check
	              copy,
	              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
	              len
	            );
	            //zmemcpy(state.head.extra + len, next,
	            //        len + copy > state.head.extra_max ?
	            //        state.head.extra_max - len : copy);
	          }
	          if (state.flags & 0x0200) {
	            state.check = crc32(state.check, input, copy, next);
	          }
	          have -= copy;
	          next += copy;
	          state.length -= copy;
	        }
	        if (state.length) { break inf_leave; }
	      }
	      state.length = 0;
	      state.mode = NAME;
	      /* falls through */
	    case NAME:
	      if (state.flags & 0x0800) {
	        if (have === 0) { break inf_leave; }
	        copy = 0;
	        do {
	          // TODO: 2 or 1 bytes?
	          len = input[next + copy++];
	          /* use constant limit because in js we should not preallocate memory */
	          if (state.head && len &&
	              (state.length < 65536 /*state.head.name_max*/)) {
	            state.head.name += String.fromCharCode(len);
	          }
	        } while (len && copy < have);

	        if (state.flags & 0x0200) {
	          state.check = crc32(state.check, input, copy, next);
	        }
	        have -= copy;
	        next += copy;
	        if (len) { break inf_leave; }
	      }
	      else if (state.head) {
	        state.head.name = null;
	      }
	      state.length = 0;
	      state.mode = COMMENT;
	      /* falls through */
	    case COMMENT:
	      if (state.flags & 0x1000) {
	        if (have === 0) { break inf_leave; }
	        copy = 0;
	        do {
	          len = input[next + copy++];
	          /* use constant limit because in js we should not preallocate memory */
	          if (state.head && len &&
	              (state.length < 65536 /*state.head.comm_max*/)) {
	            state.head.comment += String.fromCharCode(len);
	          }
	        } while (len && copy < have);
	        if (state.flags & 0x0200) {
	          state.check = crc32(state.check, input, copy, next);
	        }
	        have -= copy;
	        next += copy;
	        if (len) { break inf_leave; }
	      }
	      else if (state.head) {
	        state.head.comment = null;
	      }
	      state.mode = HCRC;
	      /* falls through */
	    case HCRC:
	      if (state.flags & 0x0200) {
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (hold !== (state.check & 0xffff)) {
	          strm.msg = 'header crc mismatch';
	          state.mode = BAD;
	          break;
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	      }
	      if (state.head) {
	        state.head.hcrc = ((state.flags >> 9) & 1);
	        state.head.done = true;
	      }
	      strm.adler = state.check = 0;
	      state.mode = TYPE;
	      break;
	    case DICTID:
	      //=== NEEDBITS(32); */
	      while (bits < 32) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      strm.adler = state.check = zswap32(hold);
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = DICT;
	      /* falls through */
	    case DICT:
	      if (state.havedict === 0) {
	        //--- RESTORE() ---
	        strm.next_out = put;
	        strm.avail_out = left;
	        strm.next_in = next;
	        strm.avail_in = have;
	        state.hold = hold;
	        state.bits = bits;
	        //---
	        return Z_NEED_DICT;
	      }
	      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
	      state.mode = TYPE;
	      /* falls through */
	    case TYPE:
	      if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
	      /* falls through */
	    case TYPEDO:
	      if (state.last) {
	        //--- BYTEBITS() ---//
	        hold >>>= bits & 7;
	        bits -= bits & 7;
	        //---//
	        state.mode = CHECK;
	        break;
	      }
	      //=== NEEDBITS(3); */
	      while (bits < 3) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      state.last = (hold & 0x01)/*BITS(1)*/;
	      //--- DROPBITS(1) ---//
	      hold >>>= 1;
	      bits -= 1;
	      //---//

	      switch ((hold & 0x03)/*BITS(2)*/) {
	      case 0:                             /* stored block */
	        //Tracev((stderr, "inflate:     stored block%s\n",
	        //        state.last ? " (last)" : ""));
	        state.mode = STORED;
	        break;
	      case 1:                             /* fixed block */
	        fixedtables(state);
	        //Tracev((stderr, "inflate:     fixed codes block%s\n",
	        //        state.last ? " (last)" : ""));
	        state.mode = LEN_;             /* decode codes */
	        if (flush === Z_TREES) {
	          //--- DROPBITS(2) ---//
	          hold >>>= 2;
	          bits -= 2;
	          //---//
	          break inf_leave;
	        }
	        break;
	      case 2:                             /* dynamic block */
	        //Tracev((stderr, "inflate:     dynamic codes block%s\n",
	        //        state.last ? " (last)" : ""));
	        state.mode = TABLE;
	        break;
	      case 3:
	        strm.msg = 'invalid block type';
	        state.mode = BAD;
	      }
	      //--- DROPBITS(2) ---//
	      hold >>>= 2;
	      bits -= 2;
	      //---//
	      break;
	    case STORED:
	      //--- BYTEBITS() ---// /* go to byte boundary */
	      hold >>>= bits & 7;
	      bits -= bits & 7;
	      //---//
	      //=== NEEDBITS(32); */
	      while (bits < 32) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
	        strm.msg = 'invalid stored block lengths';
	        state.mode = BAD;
	        break;
	      }
	      state.length = hold & 0xffff;
	      //Tracev((stderr, "inflate:       stored length %u\n",
	      //        state.length));
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = COPY_;
	      if (flush === Z_TREES) { break inf_leave; }
	      /* falls through */
	    case COPY_:
	      state.mode = COPY;
	      /* falls through */
	    case COPY:
	      copy = state.length;
	      if (copy) {
	        if (copy > have) { copy = have; }
	        if (copy > left) { copy = left; }
	        if (copy === 0) { break inf_leave; }
	        //--- zmemcpy(put, next, copy); ---
	        utils.arraySet(output, input, next, copy, put);
	        //---//
	        have -= copy;
	        next += copy;
	        left -= copy;
	        put += copy;
	        state.length -= copy;
	        break;
	      }
	      //Tracev((stderr, "inflate:       stored end\n"));
	      state.mode = TYPE;
	      break;
	    case TABLE:
	      //=== NEEDBITS(14); */
	      while (bits < 14) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
	      //--- DROPBITS(5) ---//
	      hold >>>= 5;
	      bits -= 5;
	      //---//
	      state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
	      //--- DROPBITS(5) ---//
	      hold >>>= 5;
	      bits -= 5;
	      //---//
	      state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
	      //--- DROPBITS(4) ---//
	      hold >>>= 4;
	      bits -= 4;
	      //---//
	//#ifndef PKZIP_BUG_WORKAROUND
	      if (state.nlen > 286 || state.ndist > 30) {
	        strm.msg = 'too many length or distance symbols';
	        state.mode = BAD;
	        break;
	      }
	//#endif
	      //Tracev((stderr, "inflate:       table sizes ok\n"));
	      state.have = 0;
	      state.mode = LENLENS;
	      /* falls through */
	    case LENLENS:
	      while (state.have < state.ncode) {
	        //=== NEEDBITS(3);
	        while (bits < 3) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
	        //--- DROPBITS(3) ---//
	        hold >>>= 3;
	        bits -= 3;
	        //---//
	      }
	      while (state.have < 19) {
	        state.lens[order[state.have++]] = 0;
	      }
	      // We have separate tables & no pointers. 2 commented lines below not needed.
	      //state.next = state.codes;
	      //state.lencode = state.next;
	      // Switch to use dynamic table
	      state.lencode = state.lendyn;
	      state.lenbits = 7;

	      opts = { bits: state.lenbits };
	      ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
	      state.lenbits = opts.bits;

	      if (ret) {
	        strm.msg = 'invalid code lengths set';
	        state.mode = BAD;
	        break;
	      }
	      //Tracev((stderr, "inflate:       code lengths ok\n"));
	      state.have = 0;
	      state.mode = CODELENS;
	      /* falls through */
	    case CODELENS:
	      while (state.have < state.nlen + state.ndist) {
	        for (;;) {
	          here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        if (here_val < 16) {
	          //--- DROPBITS(here.bits) ---//
	          hold >>>= here_bits;
	          bits -= here_bits;
	          //---//
	          state.lens[state.have++] = here_val;
	        }
	        else {
	          if (here_val === 16) {
	            //=== NEEDBITS(here.bits + 2);
	            n = here_bits + 2;
	            while (bits < n) {
	              if (have === 0) { break inf_leave; }
	              have--;
	              hold += input[next++] << bits;
	              bits += 8;
	            }
	            //===//
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            if (state.have === 0) {
	              strm.msg = 'invalid bit length repeat';
	              state.mode = BAD;
	              break;
	            }
	            len = state.lens[state.have - 1];
	            copy = 3 + (hold & 0x03);//BITS(2);
	            //--- DROPBITS(2) ---//
	            hold >>>= 2;
	            bits -= 2;
	            //---//
	          }
	          else if (here_val === 17) {
	            //=== NEEDBITS(here.bits + 3);
	            n = here_bits + 3;
	            while (bits < n) {
	              if (have === 0) { break inf_leave; }
	              have--;
	              hold += input[next++] << bits;
	              bits += 8;
	            }
	            //===//
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            len = 0;
	            copy = 3 + (hold & 0x07);//BITS(3);
	            //--- DROPBITS(3) ---//
	            hold >>>= 3;
	            bits -= 3;
	            //---//
	          }
	          else {
	            //=== NEEDBITS(here.bits + 7);
	            n = here_bits + 7;
	            while (bits < n) {
	              if (have === 0) { break inf_leave; }
	              have--;
	              hold += input[next++] << bits;
	              bits += 8;
	            }
	            //===//
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            len = 0;
	            copy = 11 + (hold & 0x7f);//BITS(7);
	            //--- DROPBITS(7) ---//
	            hold >>>= 7;
	            bits -= 7;
	            //---//
	          }
	          if (state.have + copy > state.nlen + state.ndist) {
	            strm.msg = 'invalid bit length repeat';
	            state.mode = BAD;
	            break;
	          }
	          while (copy--) {
	            state.lens[state.have++] = len;
	          }
	        }
	      }

	      /* handle error breaks in while */
	      if (state.mode === BAD) { break; }

	      /* check for end-of-block code (better have one) */
	      if (state.lens[256] === 0) {
	        strm.msg = 'invalid code -- missing end-of-block';
	        state.mode = BAD;
	        break;
	      }

	      /* build code tables -- note: do not change the lenbits or distbits
	         values here (9 and 6) without reading the comments in inftrees.h
	         concerning the ENOUGH constants, which depend on those values */
	      state.lenbits = 9;

	      opts = { bits: state.lenbits };
	      ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
	      // We have separate tables & no pointers. 2 commented lines below not needed.
	      // state.next_index = opts.table_index;
	      state.lenbits = opts.bits;
	      // state.lencode = state.next;

	      if (ret) {
	        strm.msg = 'invalid literal/lengths set';
	        state.mode = BAD;
	        break;
	      }

	      state.distbits = 6;
	      //state.distcode.copy(state.codes);
	      // Switch to use dynamic table
	      state.distcode = state.distdyn;
	      opts = { bits: state.distbits };
	      ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
	      // We have separate tables & no pointers. 2 commented lines below not needed.
	      // state.next_index = opts.table_index;
	      state.distbits = opts.bits;
	      // state.distcode = state.next;

	      if (ret) {
	        strm.msg = 'invalid distances set';
	        state.mode = BAD;
	        break;
	      }
	      //Tracev((stderr, 'inflate:       codes ok\n'));
	      state.mode = LEN_;
	      if (flush === Z_TREES) { break inf_leave; }
	      /* falls through */
	    case LEN_:
	      state.mode = LEN;
	      /* falls through */
	    case LEN:
	      if (have >= 6 && left >= 258) {
	        //--- RESTORE() ---
	        strm.next_out = put;
	        strm.avail_out = left;
	        strm.next_in = next;
	        strm.avail_in = have;
	        state.hold = hold;
	        state.bits = bits;
	        //---
	        inflate_fast(strm, _out);
	        //--- LOAD() ---
	        put = strm.next_out;
	        output = strm.output;
	        left = strm.avail_out;
	        next = strm.next_in;
	        input = strm.input;
	        have = strm.avail_in;
	        hold = state.hold;
	        bits = state.bits;
	        //---

	        if (state.mode === TYPE) {
	          state.back = -1;
	        }
	        break;
	      }
	      state.back = 0;
	      for (;;) {
	        here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
	        here_bits = here >>> 24;
	        here_op = (here >>> 16) & 0xff;
	        here_val = here & 0xffff;

	        if (here_bits <= bits) { break; }
	        //--- PULLBYTE() ---//
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	        //---//
	      }
	      if (here_op && (here_op & 0xf0) === 0) {
	        last_bits = here_bits;
	        last_op = here_op;
	        last_val = here_val;
	        for (;;) {
	          here = state.lencode[last_val +
	                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((last_bits + here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        //--- DROPBITS(last.bits) ---//
	        hold >>>= last_bits;
	        bits -= last_bits;
	        //---//
	        state.back += last_bits;
	      }
	      //--- DROPBITS(here.bits) ---//
	      hold >>>= here_bits;
	      bits -= here_bits;
	      //---//
	      state.back += here_bits;
	      state.length = here_val;
	      if (here_op === 0) {
	        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	        //        "inflate:         literal '%c'\n" :
	        //        "inflate:         literal 0x%02x\n", here.val));
	        state.mode = LIT;
	        break;
	      }
	      if (here_op & 32) {
	        //Tracevv((stderr, "inflate:         end of block\n"));
	        state.back = -1;
	        state.mode = TYPE;
	        break;
	      }
	      if (here_op & 64) {
	        strm.msg = 'invalid literal/length code';
	        state.mode = BAD;
	        break;
	      }
	      state.extra = here_op & 15;
	      state.mode = LENEXT;
	      /* falls through */
	    case LENEXT:
	      if (state.extra) {
	        //=== NEEDBITS(state.extra);
	        n = state.extra;
	        while (bits < n) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
	        //--- DROPBITS(state.extra) ---//
	        hold >>>= state.extra;
	        bits -= state.extra;
	        //---//
	        state.back += state.extra;
	      }
	      //Tracevv((stderr, "inflate:         length %u\n", state.length));
	      state.was = state.length;
	      state.mode = DIST;
	      /* falls through */
	    case DIST:
	      for (;;) {
	        here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
	        here_bits = here >>> 24;
	        here_op = (here >>> 16) & 0xff;
	        here_val = here & 0xffff;

	        if ((here_bits) <= bits) { break; }
	        //--- PULLBYTE() ---//
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	        //---//
	      }
	      if ((here_op & 0xf0) === 0) {
	        last_bits = here_bits;
	        last_op = here_op;
	        last_val = here_val;
	        for (;;) {
	          here = state.distcode[last_val +
	                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((last_bits + here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        //--- DROPBITS(last.bits) ---//
	        hold >>>= last_bits;
	        bits -= last_bits;
	        //---//
	        state.back += last_bits;
	      }
	      //--- DROPBITS(here.bits) ---//
	      hold >>>= here_bits;
	      bits -= here_bits;
	      //---//
	      state.back += here_bits;
	      if (here_op & 64) {
	        strm.msg = 'invalid distance code';
	        state.mode = BAD;
	        break;
	      }
	      state.offset = here_val;
	      state.extra = (here_op) & 15;
	      state.mode = DISTEXT;
	      /* falls through */
	    case DISTEXT:
	      if (state.extra) {
	        //=== NEEDBITS(state.extra);
	        n = state.extra;
	        while (bits < n) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
	        //--- DROPBITS(state.extra) ---//
	        hold >>>= state.extra;
	        bits -= state.extra;
	        //---//
	        state.back += state.extra;
	      }
	//#ifdef INFLATE_STRICT
	      if (state.offset > state.dmax) {
	        strm.msg = 'invalid distance too far back';
	        state.mode = BAD;
	        break;
	      }
	//#endif
	      //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
	      state.mode = MATCH;
	      /* falls through */
	    case MATCH:
	      if (left === 0) { break inf_leave; }
	      copy = _out - left;
	      if (state.offset > copy) {         /* copy from window */
	        copy = state.offset - copy;
	        if (copy > state.whave) {
	          if (state.sane) {
	            strm.msg = 'invalid distance too far back';
	            state.mode = BAD;
	            break;
	          }
	// (!) This block is disabled in zlib defailts,
	// don't enable it for binary compatibility
	//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	//          Trace((stderr, "inflate.c too far\n"));
	//          copy -= state.whave;
	//          if (copy > state.length) { copy = state.length; }
	//          if (copy > left) { copy = left; }
	//          left -= copy;
	//          state.length -= copy;
	//          do {
	//            output[put++] = 0;
	//          } while (--copy);
	//          if (state.length === 0) { state.mode = LEN; }
	//          break;
	//#endif
	        }
	        if (copy > state.wnext) {
	          copy -= state.wnext;
	          from = state.wsize - copy;
	        }
	        else {
	          from = state.wnext - copy;
	        }
	        if (copy > state.length) { copy = state.length; }
	        from_source = state.window;
	      }
	      else {                              /* copy from output */
	        from_source = output;
	        from = put - state.offset;
	        copy = state.length;
	      }
	      if (copy > left) { copy = left; }
	      left -= copy;
	      state.length -= copy;
	      do {
	        output[put++] = from_source[from++];
	      } while (--copy);
	      if (state.length === 0) { state.mode = LEN; }
	      break;
	    case LIT:
	      if (left === 0) { break inf_leave; }
	      output[put++] = state.length;
	      left--;
	      state.mode = LEN;
	      break;
	    case CHECK:
	      if (state.wrap) {
	        //=== NEEDBITS(32);
	        while (bits < 32) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          // Use '|' insdead of '+' to make sure that result is signed
	          hold |= input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        _out -= left;
	        strm.total_out += _out;
	        state.total += _out;
	        if (_out) {
	          strm.adler = state.check =
	              /*UPDATE(state.check, put - _out, _out);*/
	              (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

	        }
	        _out = left;
	        // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
	        if ((state.flags ? hold : zswap32(hold)) !== state.check) {
	          strm.msg = 'incorrect data check';
	          state.mode = BAD;
	          break;
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        //Tracev((stderr, "inflate:   check matches trailer\n"));
	      }
	      state.mode = LENGTH;
	      /* falls through */
	    case LENGTH:
	      if (state.wrap && state.flags) {
	        //=== NEEDBITS(32);
	        while (bits < 32) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (hold !== (state.total & 0xffffffff)) {
	          strm.msg = 'incorrect length check';
	          state.mode = BAD;
	          break;
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        //Tracev((stderr, "inflate:   length matches trailer\n"));
	      }
	      state.mode = DONE;
	      /* falls through */
	    case DONE:
	      ret = Z_STREAM_END;
	      break inf_leave;
	    case BAD:
	      ret = Z_DATA_ERROR;
	      break inf_leave;
	    case MEM:
	      return Z_MEM_ERROR;
	    case SYNC:
	      /* falls through */
	    default:
	      return Z_STREAM_ERROR;
	    }
	  }

	  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

	  /*
	     Return from inflate(), updating the total counts and the check value.
	     If there was no progress during the inflate() call, return a buffer
	     error.  Call updatewindow() to create and/or update the window state.
	     Note: a memory error from inflate() is non-recoverable.
	   */

	  //--- RESTORE() ---
	  strm.next_out = put;
	  strm.avail_out = left;
	  strm.next_in = next;
	  strm.avail_in = have;
	  state.hold = hold;
	  state.bits = bits;
	  //---

	  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
	                      (state.mode < CHECK || flush !== Z_FINISH))) {
	    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
	      state.mode = MEM;
	      return Z_MEM_ERROR;
	    }
	  }
	  _in -= strm.avail_in;
	  _out -= strm.avail_out;
	  strm.total_in += _in;
	  strm.total_out += _out;
	  state.total += _out;
	  if (state.wrap && _out) {
	    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
	      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
	  }
	  strm.data_type = state.bits + (state.last ? 64 : 0) +
	                    (state.mode === TYPE ? 128 : 0) +
	                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
	  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
	    ret = Z_BUF_ERROR;
	  }
	  return ret;
	}

	function inflateEnd(strm) {

	  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
	    return Z_STREAM_ERROR;
	  }

	  var state = strm.state;
	  if (state.window) {
	    state.window = null;
	  }
	  strm.state = null;
	  return Z_OK;
	}

	function inflateGetHeader(strm, head) {
	  var state;

	  /* check state */
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

	  /* save header structure */
	  state.head = head;
	  head.done = false;
	  return Z_OK;
	}

	function inflateSetDictionary(strm, dictionary) {
	  var dictLength = dictionary.length;

	  var state;
	  var dictid;
	  var ret;

	  /* check state */
	  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
	  state = strm.state;

	  if (state.wrap !== 0 && state.mode !== DICT) {
	    return Z_STREAM_ERROR;
	  }

	  /* check for correct dictionary identifier */
	  if (state.mode === DICT) {
	    dictid = 1; /* adler32(0, null, 0)*/
	    /* dictid = adler32(dictid, dictionary, dictLength); */
	    dictid = adler32(dictid, dictionary, dictLength, 0);
	    if (dictid !== state.check) {
	      return Z_DATA_ERROR;
	    }
	  }
	  /* copy dictionary to window using updatewindow(), which will amend the
	   existing dictionary if appropriate */
	  ret = updatewindow(strm, dictionary, dictLength, dictLength);
	  if (ret) {
	    state.mode = MEM;
	    return Z_MEM_ERROR;
	  }
	  state.havedict = 1;
	  // Tracev((stderr, "inflate:   dictionary set\n"));
	  return Z_OK;
	}

	exports.inflateReset = inflateReset;
	exports.inflateReset2 = inflateReset2;
	exports.inflateResetKeep = inflateResetKeep;
	exports.inflateInit = inflateInit;
	exports.inflateInit2 = inflateInit2;
	exports.inflate = inflate;
	exports.inflateEnd = inflateEnd;
	exports.inflateGetHeader = inflateGetHeader;
	exports.inflateSetDictionary = inflateSetDictionary;
	exports.inflateInfo = 'pako inflate (from Nodeca project)';

	/* Not implemented
	exports.inflateCopy = inflateCopy;
	exports.inflateGetDictionary = inflateGetDictionary;
	exports.inflateMark = inflateMark;
	exports.inflatePrime = inflatePrime;
	exports.inflateSync = inflateSync;
	exports.inflateSyncPoint = inflateSyncPoint;
	exports.inflateUndermine = inflateUndermine;
	*/


/***/ },
/* 130 */
/***/ function(module, exports) {

	'use strict';

	// See state defs from inflate.js
	var BAD = 30;       /* got a data error -- remain here until reset */
	var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

	/*
	   Decode literal, length, and distance codes and write out the resulting
	   literal and match bytes until either not enough input or output is
	   available, an end-of-block is encountered, or a data error is encountered.
	   When large enough input and output buffers are supplied to inflate(), for
	   example, a 16K input buffer and a 64K output buffer, more than 95% of the
	   inflate execution time is spent in this routine.

	   Entry assumptions:

	        state.mode === LEN
	        strm.avail_in >= 6
	        strm.avail_out >= 258
	        start >= strm.avail_out
	        state.bits < 8

	   On return, state.mode is one of:

	        LEN -- ran out of enough output space or enough available input
	        TYPE -- reached end of block code, inflate() to interpret next block
	        BAD -- error in block data

	   Notes:

	    - The maximum input bits used by a length/distance pair is 15 bits for the
	      length code, 5 bits for the length extra, 15 bits for the distance code,
	      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
	      Therefore if strm.avail_in >= 6, then there is enough input to avoid
	      checking for available input while decoding.

	    - The maximum bytes that a single length/distance pair can output is 258
	      bytes, which is the maximum length that can be coded.  inflate_fast()
	      requires strm.avail_out >= 258 for each loop to avoid checking for
	      output space.
	 */
	module.exports = function inflate_fast(strm, start) {
	  var state;
	  var _in;                    /* local strm.input */
	  var last;                   /* have enough input while in < last */
	  var _out;                   /* local strm.output */
	  var beg;                    /* inflate()'s initial strm.output */
	  var end;                    /* while out < end, enough space available */
	//#ifdef INFLATE_STRICT
	  var dmax;                   /* maximum distance from zlib header */
	//#endif
	  var wsize;                  /* window size or zero if not using window */
	  var whave;                  /* valid bytes in the window */
	  var wnext;                  /* window write index */
	  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
	  var s_window;               /* allocated sliding window, if wsize != 0 */
	  var hold;                   /* local strm.hold */
	  var bits;                   /* local strm.bits */
	  var lcode;                  /* local strm.lencode */
	  var dcode;                  /* local strm.distcode */
	  var lmask;                  /* mask for first level of length codes */
	  var dmask;                  /* mask for first level of distance codes */
	  var here;                   /* retrieved table entry */
	  var op;                     /* code bits, operation, extra bits, or */
	                              /*  window position, window bytes to copy */
	  var len;                    /* match length, unused bytes */
	  var dist;                   /* match distance */
	  var from;                   /* where to copy match from */
	  var from_source;


	  var input, output; // JS specific, because we have no pointers

	  /* copy state to local variables */
	  state = strm.state;
	  //here = state.here;
	  _in = strm.next_in;
	  input = strm.input;
	  last = _in + (strm.avail_in - 5);
	  _out = strm.next_out;
	  output = strm.output;
	  beg = _out - (start - strm.avail_out);
	  end = _out + (strm.avail_out - 257);
	//#ifdef INFLATE_STRICT
	  dmax = state.dmax;
	//#endif
	  wsize = state.wsize;
	  whave = state.whave;
	  wnext = state.wnext;
	  s_window = state.window;
	  hold = state.hold;
	  bits = state.bits;
	  lcode = state.lencode;
	  dcode = state.distcode;
	  lmask = (1 << state.lenbits) - 1;
	  dmask = (1 << state.distbits) - 1;


	  /* decode literals and length/distances until end-of-block or not enough
	     input data or output space */

	  top:
	  do {
	    if (bits < 15) {
	      hold += input[_in++] << bits;
	      bits += 8;
	      hold += input[_in++] << bits;
	      bits += 8;
	    }

	    here = lcode[hold & lmask];

	    dolen:
	    for (;;) { // Goto emulation
	      op = here >>> 24/*here.bits*/;
	      hold >>>= op;
	      bits -= op;
	      op = (here >>> 16) & 0xff/*here.op*/;
	      if (op === 0) {                          /* literal */
	        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	        //        "inflate:         literal '%c'\n" :
	        //        "inflate:         literal 0x%02x\n", here.val));
	        output[_out++] = here & 0xffff/*here.val*/;
	      }
	      else if (op & 16) {                     /* length base */
	        len = here & 0xffff/*here.val*/;
	        op &= 15;                           /* number of extra bits */
	        if (op) {
	          if (bits < op) {
	            hold += input[_in++] << bits;
	            bits += 8;
	          }
	          len += hold & ((1 << op) - 1);
	          hold >>>= op;
	          bits -= op;
	        }
	        //Tracevv((stderr, "inflate:         length %u\n", len));
	        if (bits < 15) {
	          hold += input[_in++] << bits;
	          bits += 8;
	          hold += input[_in++] << bits;
	          bits += 8;
	        }
	        here = dcode[hold & dmask];

	        dodist:
	        for (;;) { // goto emulation
	          op = here >>> 24/*here.bits*/;
	          hold >>>= op;
	          bits -= op;
	          op = (here >>> 16) & 0xff/*here.op*/;

	          if (op & 16) {                      /* distance base */
	            dist = here & 0xffff/*here.val*/;
	            op &= 15;                       /* number of extra bits */
	            if (bits < op) {
	              hold += input[_in++] << bits;
	              bits += 8;
	              if (bits < op) {
	                hold += input[_in++] << bits;
	                bits += 8;
	              }
	            }
	            dist += hold & ((1 << op) - 1);
	//#ifdef INFLATE_STRICT
	            if (dist > dmax) {
	              strm.msg = 'invalid distance too far back';
	              state.mode = BAD;
	              break top;
	            }
	//#endif
	            hold >>>= op;
	            bits -= op;
	            //Tracevv((stderr, "inflate:         distance %u\n", dist));
	            op = _out - beg;                /* max distance in output */
	            if (dist > op) {                /* see if copy from window */
	              op = dist - op;               /* distance back in window */
	              if (op > whave) {
	                if (state.sane) {
	                  strm.msg = 'invalid distance too far back';
	                  state.mode = BAD;
	                  break top;
	                }

	// (!) This block is disabled in zlib defailts,
	// don't enable it for binary compatibility
	//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	//                if (len <= op - whave) {
	//                  do {
	//                    output[_out++] = 0;
	//                  } while (--len);
	//                  continue top;
	//                }
	//                len -= op - whave;
	//                do {
	//                  output[_out++] = 0;
	//                } while (--op > whave);
	//                if (op === 0) {
	//                  from = _out - dist;
	//                  do {
	//                    output[_out++] = output[from++];
	//                  } while (--len);
	//                  continue top;
	//                }
	//#endif
	              }
	              from = 0; // window index
	              from_source = s_window;
	              if (wnext === 0) {           /* very common case */
	                from += wsize - op;
	                if (op < len) {         /* some from window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = _out - dist;  /* rest from output */
	                  from_source = output;
	                }
	              }
	              else if (wnext < op) {      /* wrap around window */
	                from += wsize + wnext - op;
	                op -= wnext;
	                if (op < len) {         /* some from end of window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = 0;
	                  if (wnext < len) {  /* some from start of window */
	                    op = wnext;
	                    len -= op;
	                    do {
	                      output[_out++] = s_window[from++];
	                    } while (--op);
	                    from = _out - dist;      /* rest from output */
	                    from_source = output;
	                  }
	                }
	              }
	              else {                      /* contiguous in window */
	                from += wnext - op;
	                if (op < len) {         /* some from window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = _out - dist;  /* rest from output */
	                  from_source = output;
	                }
	              }
	              while (len > 2) {
	                output[_out++] = from_source[from++];
	                output[_out++] = from_source[from++];
	                output[_out++] = from_source[from++];
	                len -= 3;
	              }
	              if (len) {
	                output[_out++] = from_source[from++];
	                if (len > 1) {
	                  output[_out++] = from_source[from++];
	                }
	              }
	            }
	            else {
	              from = _out - dist;          /* copy direct from output */
	              do {                        /* minimum length is three */
	                output[_out++] = output[from++];
	                output[_out++] = output[from++];
	                output[_out++] = output[from++];
	                len -= 3;
	              } while (len > 2);
	              if (len) {
	                output[_out++] = output[from++];
	                if (len > 1) {
	                  output[_out++] = output[from++];
	                }
	              }
	            }
	          }
	          else if ((op & 64) === 0) {          /* 2nd level distance code */
	            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
	            continue dodist;
	          }
	          else {
	            strm.msg = 'invalid distance code';
	            state.mode = BAD;
	            break top;
	          }

	          break; // need to emulate goto via "continue"
	        }
	      }
	      else if ((op & 64) === 0) {              /* 2nd level length code */
	        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
	        continue dolen;
	      }
	      else if (op & 32) {                     /* end-of-block */
	        //Tracevv((stderr, "inflate:         end of block\n"));
	        state.mode = TYPE;
	        break top;
	      }
	      else {
	        strm.msg = 'invalid literal/length code';
	        state.mode = BAD;
	        break top;
	      }

	      break; // need to emulate goto via "continue"
	    }
	  } while (_in < last && _out < end);

	  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
	  len = bits >> 3;
	  _in -= len;
	  bits -= len << 3;
	  hold &= (1 << bits) - 1;

	  /* update state and return */
	  strm.next_in = _in;
	  strm.next_out = _out;
	  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
	  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
	  state.hold = hold;
	  state.bits = bits;
	  return;
	};


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	var utils = __webpack_require__(125);

	var MAXBITS = 15;
	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;

	var lbase = [ /* Length codes 257..285 base */
	  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
	  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
	];

	var lext = [ /* Length codes 257..285 extra */
	  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
	  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
	];

	var dbase = [ /* Distance codes 0..29 base */
	  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
	  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
	  8193, 12289, 16385, 24577, 0, 0
	];

	var dext = [ /* Distance codes 0..29 extra */
	  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
	  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
	  28, 28, 29, 29, 64, 64
	];

	module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
	{
	  var bits = opts.bits;
	      //here = opts.here; /* table entry for duplication */

	  var len = 0;               /* a code's length in bits */
	  var sym = 0;               /* index of code symbols */
	  var min = 0, max = 0;          /* minimum and maximum code lengths */
	  var root = 0;              /* number of index bits for root table */
	  var curr = 0;              /* number of index bits for current table */
	  var drop = 0;              /* code bits to drop for sub-table */
	  var left = 0;                   /* number of prefix codes available */
	  var used = 0;              /* code entries in table used */
	  var huff = 0;              /* Huffman code */
	  var incr;              /* for incrementing code, index */
	  var fill;              /* index for replicating entries */
	  var low;               /* low bits for current root entry */
	  var mask;              /* mask for low root bits */
	  var next;             /* next available space in table */
	  var base = null;     /* base value table to use */
	  var base_index = 0;
	//  var shoextra;    /* extra bits table to use */
	  var end;                    /* use base and extra for symbol > end */
	  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
	  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
	  var extra = null;
	  var extra_index = 0;

	  var here_bits, here_op, here_val;

	  /*
	   Process a set of code lengths to create a canonical Huffman code.  The
	   code lengths are lens[0..codes-1].  Each length corresponds to the
	   symbols 0..codes-1.  The Huffman code is generated by first sorting the
	   symbols by length from short to long, and retaining the symbol order
	   for codes with equal lengths.  Then the code starts with all zero bits
	   for the first code of the shortest length, and the codes are integer
	   increments for the same length, and zeros are appended as the length
	   increases.  For the deflate format, these bits are stored backwards
	   from their more natural integer increment ordering, and so when the
	   decoding tables are built in the large loop below, the integer codes
	   are incremented backwards.

	   This routine assumes, but does not check, that all of the entries in
	   lens[] are in the range 0..MAXBITS.  The caller must assure this.
	   1..MAXBITS is interpreted as that code length.  zero means that that
	   symbol does not occur in this code.

	   The codes are sorted by computing a count of codes for each length,
	   creating from that a table of starting indices for each length in the
	   sorted table, and then entering the symbols in order in the sorted
	   table.  The sorted table is work[], with that space being provided by
	   the caller.

	   The length counts are used for other purposes as well, i.e. finding
	   the minimum and maximum length codes, determining if there are any
	   codes at all, checking for a valid set of lengths, and looking ahead
	   at length counts to determine sub-table sizes when building the
	   decoding tables.
	   */

	  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
	  for (len = 0; len <= MAXBITS; len++) {
	    count[len] = 0;
	  }
	  for (sym = 0; sym < codes; sym++) {
	    count[lens[lens_index + sym]]++;
	  }

	  /* bound code lengths, force root to be within code lengths */
	  root = bits;
	  for (max = MAXBITS; max >= 1; max--) {
	    if (count[max] !== 0) { break; }
	  }
	  if (root > max) {
	    root = max;
	  }
	  if (max === 0) {                     /* no symbols to code at all */
	    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
	    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
	    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
	    table[table_index++] = (1 << 24) | (64 << 16) | 0;


	    //table.op[opts.table_index] = 64;
	    //table.bits[opts.table_index] = 1;
	    //table.val[opts.table_index++] = 0;
	    table[table_index++] = (1 << 24) | (64 << 16) | 0;

	    opts.bits = 1;
	    return 0;     /* no symbols, but wait for decoding to report error */
	  }
	  for (min = 1; min < max; min++) {
	    if (count[min] !== 0) { break; }
	  }
	  if (root < min) {
	    root = min;
	  }

	  /* check for an over-subscribed or incomplete set of lengths */
	  left = 1;
	  for (len = 1; len <= MAXBITS; len++) {
	    left <<= 1;
	    left -= count[len];
	    if (left < 0) {
	      return -1;
	    }        /* over-subscribed */
	  }
	  if (left > 0 && (type === CODES || max !== 1)) {
	    return -1;                      /* incomplete set */
	  }

	  /* generate offsets into symbol table for each length for sorting */
	  offs[1] = 0;
	  for (len = 1; len < MAXBITS; len++) {
	    offs[len + 1] = offs[len] + count[len];
	  }

	  /* sort symbols by length, by symbol order within each length */
	  for (sym = 0; sym < codes; sym++) {
	    if (lens[lens_index + sym] !== 0) {
	      work[offs[lens[lens_index + sym]]++] = sym;
	    }
	  }

	  /*
	   Create and fill in decoding tables.  In this loop, the table being
	   filled is at next and has curr index bits.  The code being used is huff
	   with length len.  That code is converted to an index by dropping drop
	   bits off of the bottom.  For codes where len is less than drop + curr,
	   those top drop + curr - len bits are incremented through all values to
	   fill the table with replicated entries.

	   root is the number of index bits for the root table.  When len exceeds
	   root, sub-tables are created pointed to by the root entry with an index
	   of the low root bits of huff.  This is saved in low to check for when a
	   new sub-table should be started.  drop is zero when the root table is
	   being filled, and drop is root when sub-tables are being filled.

	   When a new sub-table is needed, it is necessary to look ahead in the
	   code lengths to determine what size sub-table is needed.  The length
	   counts are used for this, and so count[] is decremented as codes are
	   entered in the tables.

	   used keeps track of how many table entries have been allocated from the
	   provided *table space.  It is checked for LENS and DIST tables against
	   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
	   the initial root table size constants.  See the comments in inftrees.h
	   for more information.

	   sym increments through all symbols, and the loop terminates when
	   all codes of length max, i.e. all codes, have been processed.  This
	   routine permits incomplete codes, so another loop after this one fills
	   in the rest of the decoding tables with invalid code markers.
	   */

	  /* set up for code type */
	  // poor man optimization - use if-else instead of switch,
	  // to avoid deopts in old v8
	  if (type === CODES) {
	    base = extra = work;    /* dummy value--not used */
	    end = 19;

	  } else if (type === LENS) {
	    base = lbase;
	    base_index -= 257;
	    extra = lext;
	    extra_index -= 257;
	    end = 256;

	  } else {                    /* DISTS */
	    base = dbase;
	    extra = dext;
	    end = -1;
	  }

	  /* initialize opts for loop */
	  huff = 0;                   /* starting code */
	  sym = 0;                    /* starting code symbol */
	  len = min;                  /* starting code length */
	  next = table_index;              /* current table to fill in */
	  curr = root;                /* current table index bits */
	  drop = 0;                   /* current bits to drop from code for index */
	  low = -1;                   /* trigger new sub-table when len > root */
	  used = 1 << root;          /* use root table entries */
	  mask = used - 1;            /* mask for comparing low */

	  /* check available table space */
	  if ((type === LENS && used > ENOUGH_LENS) ||
	    (type === DISTS && used > ENOUGH_DISTS)) {
	    return 1;
	  }

	  var i = 0;
	  /* process all codes and make table entries */
	  for (;;) {
	    i++;
	    /* create table entry */
	    here_bits = len - drop;
	    if (work[sym] < end) {
	      here_op = 0;
	      here_val = work[sym];
	    }
	    else if (work[sym] > end) {
	      here_op = extra[extra_index + work[sym]];
	      here_val = base[base_index + work[sym]];
	    }
	    else {
	      here_op = 32 + 64;         /* end of block */
	      here_val = 0;
	    }

	    /* replicate for those indices with low len bits equal to huff */
	    incr = 1 << (len - drop);
	    fill = 1 << curr;
	    min = fill;                 /* save offset to next table */
	    do {
	      fill -= incr;
	      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
	    } while (fill !== 0);

	    /* backwards increment the len-bit code huff */
	    incr = 1 << (len - 1);
	    while (huff & incr) {
	      incr >>= 1;
	    }
	    if (incr !== 0) {
	      huff &= incr - 1;
	      huff += incr;
	    } else {
	      huff = 0;
	    }

	    /* go to next symbol, update count, len */
	    sym++;
	    if (--count[len] === 0) {
	      if (len === max) { break; }
	      len = lens[lens_index + work[sym]];
	    }

	    /* create new sub-table if needed */
	    if (len > root && (huff & mask) !== low) {
	      /* if first time, transition to sub-tables */
	      if (drop === 0) {
	        drop = root;
	      }

	      /* increment past last table */
	      next += min;            /* here min is 1 << curr */

	      /* determine length of next table */
	      curr = len - drop;
	      left = 1 << curr;
	      while (curr + drop < max) {
	        left -= count[curr + drop];
	        if (left <= 0) { break; }
	        curr++;
	        left <<= 1;
	      }

	      /* check for enough space */
	      used += 1 << curr;
	      if ((type === LENS && used > ENOUGH_LENS) ||
	        (type === DISTS && used > ENOUGH_DISTS)) {
	        return 1;
	      }

	      /* point entry in root table to sub-table */
	      low = huff & mask;
	      /*table.op[low] = curr;
	      table.bits[low] = root;
	      table.val[low] = next - opts.table_index;*/
	      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
	    }
	  }

	  /* fill in remaining table entry if code is incomplete (guaranteed to have
	   at most one remaining entry, since if the code is incomplete, the
	   maximum code length that was allowed to get this far is one bit) */
	  if (huff !== 0) {
	    //table.op[next + huff] = 64;            /* invalid code marker */
	    //table.bits[next + huff] = len - drop;
	    //table.val[next + huff] = 0;
	    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
	  }

	  /* set return parameters */
	  //opts.table_index += used;
	  opts.bits = root;
	  return 0;
	};


/***/ },
/* 132 */
/***/ function(module, exports) {

	'use strict';


	module.exports = {

	  /* Allowed flush values; see deflate() and inflate() below for details */
	  Z_NO_FLUSH:         0,
	  Z_PARTIAL_FLUSH:    1,
	  Z_SYNC_FLUSH:       2,
	  Z_FULL_FLUSH:       3,
	  Z_FINISH:           4,
	  Z_BLOCK:            5,
	  Z_TREES:            6,

	  /* Return codes for the compression/decompression functions. Negative values
	  * are errors, positive values are used for special but normal events.
	  */
	  Z_OK:               0,
	  Z_STREAM_END:       1,
	  Z_NEED_DICT:        2,
	  Z_ERRNO:           -1,
	  Z_STREAM_ERROR:    -2,
	  Z_DATA_ERROR:      -3,
	  //Z_MEM_ERROR:     -4,
	  Z_BUF_ERROR:       -5,
	  //Z_VERSION_ERROR: -6,

	  /* compression levels */
	  Z_NO_COMPRESSION:         0,
	  Z_BEST_SPEED:             1,
	  Z_BEST_COMPRESSION:       9,
	  Z_DEFAULT_COMPRESSION:   -1,


	  Z_FILTERED:               1,
	  Z_HUFFMAN_ONLY:           2,
	  Z_RLE:                    3,
	  Z_FIXED:                  4,
	  Z_DEFAULT_STRATEGY:       0,

	  /* Possible values of the data_type field (though see inflate()) */
	  Z_BINARY:                 0,
	  Z_TEXT:                   1,
	  //Z_ASCII:                1, // = Z_TEXT (deprecated)
	  Z_UNKNOWN:                2,

	  /* The deflate compression method */
	  Z_DEFLATED:               8
	  //Z_NULL:                 null // Use -1 or null inline, depending on var type
	};


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var stream = __webpack_require__(55)


	function isStream (obj) {
	  return obj instanceof stream.Stream
	}


	function isReadable (obj) {
	  return isStream(obj) && typeof obj._read == 'function' && typeof obj._readableState == 'object'
	}


	function isWritable (obj) {
	  return isStream(obj) && typeof obj._write == 'function' && typeof obj._writableState == 'object'
	}


	function isDuplex (obj) {
	  return isReadable(obj) && isWritable(obj)
	}


	module.exports            = isStream
	module.exports.isReadable = isReadable
	module.exports.isWritable = isWritable
	module.exports.isDuplex   = isDuplex


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var util = __webpack_require__(10),
	    winston = __webpack_require__(73),
	    http = __webpack_require__(135),
	    https = __webpack_require__(145),
	    Stream = __webpack_require__(55).Stream,
	    Transport = __webpack_require__(118).Transport;

	//
	// ### function Http (options)
	// #### @options {Object} Options for this instance.
	// Constructor function for the Http transport object responsible
	// for persisting log messages and metadata to a terminal or TTY.
	//
	var Http = exports.Http = function (options) {
	  Transport.call(this, options);
	  options = options || {};

	  this.name = 'http';
	  this.ssl = !!options.ssl;
	  this.host = options.host || 'localhost';
	  this.port = options.port;
	  this.auth = options.auth;
	  this.path = options.path || '';

	  if (!this.port) {
	    this.port = this.ssl ? 443 : 80;
	  }
	};

	util.inherits(Http, winston.Transport);

	//
	// Expose the name of this Transport on the prototype
	//
	Http.prototype.name = 'http';

	//
	// ### function _request (options, callback)
	// #### @callback {function} Continuation to respond to when complete.
	// Make a request to a winstond server or any http server which can
	// handle json-rpc.
	//
	Http.prototype._request = function (options, callback) {
	  options = options || {};

	  var auth = options.auth || this.auth,
	      path = options.path || this.path || '',
	      req;

	  delete options.auth;
	  delete options.path;

	  // Prepare options for outgoing HTTP request
	  req = (this.ssl ? https : http).request({
	    host: this.host,
	    port: this.port,
	    path: '/' + path.replace(/^\//, ''),
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    auth: (auth) ? auth.username + ':' + auth.password : ''
	  });

	  req.on('error', callback);
	  req.on('response', function (res) {
	    res.on('end', function () {
	      callback(null, res);
	    });

	    res.resume();
	  });

	  req.end(new Buffer(JSON.stringify(options), 'utf8'));
	};

	//
	// ### function log (level, msg, [meta], callback)
	// #### @level {string} Level at which to log the message.
	// #### @msg {string} Message to log
	// #### @meta {Object} **Optional** Additional metadata to attach
	// #### @callback {function} Continuation to respond to when complete.
	// Core logging method exposed to Winston. Metadata is optional.
	//
	Http.prototype.log = function (level, msg, meta, callback) {
	  var self = this;

	  if (typeof meta === 'function') {
	    callback = meta;
	    meta = {};
	  }

	  var options = {
	    method: 'collect',
	    params: {
	      level: level,
	      message: msg,
	      meta: meta
	    }
	  };

	  if (meta) {
	    if (meta.path) {
	      options.path = meta.path;
	      delete meta.path;
	    }

	    if (meta.auth) {
	      options.auth = meta.auth;
	      delete meta.auth;
	    }
	  }

	  this._request(options, function (err, res) {
	    if (res && res.statusCode !== 200) {
	      err = new Error('HTTP Status Code: ' + res.statusCode);
	    }

	    if (err) return callback(err);

	    // TODO: emit 'logged' correctly,
	    // keep track of pending logs.
	    self.emit('logged');

	    if (callback) callback(null, true);
	  });
	};

	//
	// ### function query (options, callback)
	// #### @options {Object} Loggly-like query options for this instance.
	// #### @callback {function} Continuation to respond to when complete.
	// Query the transport. Options object is optional.
	//
	Http.prototype.query = function (options, callback) {
	  if (typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  var self = this,
	      options = this.normalizeQuery(options);

	  options = {
	    method: 'query',
	    params: options
	  };

	  if (options.params.path) {
	    options.path = options.params.path;
	    delete options.params.path;
	  }

	  if (options.params.auth) {
	    options.auth = options.params.auth;
	    delete options.params.auth;
	  }

	  this._request(options, function (err, res, body) {
	    if (res && res.statusCode !== 200) {
	      err = new Error('HTTP Status Code: ' + res.statusCode);
	    }

	    if (err) return callback(err);

	    if (typeof body === 'string') {
	      try {
	        body = JSON.parse(body);
	      } catch (e) {
	        return callback(e);
	      }
	    }

	    callback(null, body);
	  });
	};

	//
	// ### function stream (options)
	// #### @options {Object} Stream options for this instance.
	// Returns a log stream for this transport. Options object is optional.
	//
	Http.prototype.stream = function (options) {
	  options = options || {};
	  
	  var self = this,
	      stream = new Stream,
	      req,
	      buff;

	  stream.destroy = function () {
	    req.destroy();
	  };

	  options = {
	    method: 'stream',
	    params: options
	  };

	  if (options.params.path) {
	    options.path = options.params.path;
	    delete options.params.path;
	  }

	  if (options.params.auth) {
	    options.auth = options.params.auth;
	    delete options.params.auth;
	  }

	  req = this._request(options);
	  buff = '';

	  req.on('data', function (data) {
	    var data = (buff + data).split(/\n+/),
	        l = data.length - 1,
	        i = 0;

	    for (; i < l; i++) {
	      try {
	        stream.emit('log', JSON.parse(data[i]));
	      } catch (e) {
	        stream.emit('error', e);
	      }
	    }

	    buff = data[l];
	  });

	  req.on('error', function (err) {
	    stream.emit('error', err);
	  });

	  return stream;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var http = module.exports;
	var EventEmitter = __webpack_require__(9).EventEmitter;
	var Request = __webpack_require__(136);
	var url = __webpack_require__(140)

	http.request = function (params, cb) {
	    if (typeof params === 'string') {
	        params = url.parse(params)
	    }
	    if (!params) params = {};
	    if (!params.host && !params.port) {
	        params.port = parseInt(window.location.port, 10);
	    }
	    if (!params.host && params.hostname) {
	        params.host = params.hostname;
	    }

	    if (!params.protocol) {
	        if (params.scheme) {
	            params.protocol = params.scheme + ':';
	        } else {
	            params.protocol = window.location.protocol;
	        }
	    }

	    if (!params.host) {
	        params.host = window.location.hostname || window.location.host;
	    }
	    if (/:/.test(params.host)) {
	        if (!params.port) {
	            params.port = params.host.split(':')[1];
	        }
	        params.host = params.host.split(':')[0];
	    }
	    if (!params.port) params.port = params.protocol == 'https:' ? 443 : 80;
	    
	    var req = new Request(new xhrHttp, params);
	    if (cb) req.on('response', cb);
	    return req;
	};

	http.get = function (params, cb) {
	    params.method = 'GET';
	    var req = http.request(params, cb);
	    req.end();
	    return req;
	};

	http.Agent = function () {};
	http.Agent.defaultMaxSockets = 4;

	var xhrHttp = (function () {
	    if (typeof window === 'undefined') {
	        throw new Error('no window object present');
	    }
	    else if (window.XMLHttpRequest) {
	        return window.XMLHttpRequest;
	    }
	    else if (window.ActiveXObject) {
	        var axs = [
	            'Msxml2.XMLHTTP.6.0',
	            'Msxml2.XMLHTTP.3.0',
	            'Microsoft.XMLHTTP'
	        ];
	        for (var i = 0; i < axs.length; i++) {
	            try {
	                var ax = new(window.ActiveXObject)(axs[i]);
	                return function () {
	                    if (ax) {
	                        var ax_ = ax;
	                        ax = null;
	                        return ax_;
	                    }
	                    else {
	                        return new(window.ActiveXObject)(axs[i]);
	                    }
	                };
	            }
	            catch (e) {}
	        }
	        throw new Error('ajax not supported in this browser')
	    }
	    else {
	        throw new Error('ajax not supported in this browser');
	    }
	})();

	http.STATUS_CODES = {
	    100 : 'Continue',
	    101 : 'Switching Protocols',
	    102 : 'Processing',                 // RFC 2518, obsoleted by RFC 4918
	    200 : 'OK',
	    201 : 'Created',
	    202 : 'Accepted',
	    203 : 'Non-Authoritative Information',
	    204 : 'No Content',
	    205 : 'Reset Content',
	    206 : 'Partial Content',
	    207 : 'Multi-Status',               // RFC 4918
	    300 : 'Multiple Choices',
	    301 : 'Moved Permanently',
	    302 : 'Moved Temporarily',
	    303 : 'See Other',
	    304 : 'Not Modified',
	    305 : 'Use Proxy',
	    307 : 'Temporary Redirect',
	    400 : 'Bad Request',
	    401 : 'Unauthorized',
	    402 : 'Payment Required',
	    403 : 'Forbidden',
	    404 : 'Not Found',
	    405 : 'Method Not Allowed',
	    406 : 'Not Acceptable',
	    407 : 'Proxy Authentication Required',
	    408 : 'Request Time-out',
	    409 : 'Conflict',
	    410 : 'Gone',
	    411 : 'Length Required',
	    412 : 'Precondition Failed',
	    413 : 'Request Entity Too Large',
	    414 : 'Request-URI Too Large',
	    415 : 'Unsupported Media Type',
	    416 : 'Requested Range Not Satisfiable',
	    417 : 'Expectation Failed',
	    418 : 'I\'m a teapot',              // RFC 2324
	    422 : 'Unprocessable Entity',       // RFC 4918
	    423 : 'Locked',                     // RFC 4918
	    424 : 'Failed Dependency',          // RFC 4918
	    425 : 'Unordered Collection',       // RFC 4918
	    426 : 'Upgrade Required',           // RFC 2817
	    428 : 'Precondition Required',      // RFC 6585
	    429 : 'Too Many Requests',          // RFC 6585
	    431 : 'Request Header Fields Too Large',// RFC 6585
	    500 : 'Internal Server Error',
	    501 : 'Not Implemented',
	    502 : 'Bad Gateway',
	    503 : 'Service Unavailable',
	    504 : 'Gateway Time-out',
	    505 : 'HTTP Version Not Supported',
	    506 : 'Variant Also Negotiates',    // RFC 2295
	    507 : 'Insufficient Storage',       // RFC 4918
	    509 : 'Bandwidth Limit Exceeded',
	    510 : 'Not Extended',               // RFC 2774
	    511 : 'Network Authentication Required' // RFC 6585
	};

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(55);
	var Response = __webpack_require__(137);
	var Base64 = __webpack_require__(138);
	var inherits = __webpack_require__(139);

	var Request = module.exports = function (xhr, params) {
	    var self = this;
	    self.writable = true;
	    self.xhr = xhr;
	    self.body = [];
	    
	    self.uri = (params.protocol || 'http:') + '//'
	        + params.host
	        + (params.port ? ':' + params.port : '')
	        + (params.path || '/')
	    ;
	    
	    if (typeof params.withCredentials === 'undefined') {
	        params.withCredentials = true;
	    }

	    try { xhr.withCredentials = params.withCredentials }
	    catch (e) {}
	    
	    if (params.responseType) try { xhr.responseType = params.responseType }
	    catch (e) {}
	    
	    xhr.open(
	        params.method || 'GET',
	        self.uri,
	        true
	    );

	    xhr.onerror = function(event) {
	        self.emit('error', new Error('Network error'));
	    };

	    self._headers = {};
	    
	    if (params.headers) {
	        var keys = objectKeys(params.headers);
	        for (var i = 0; i < keys.length; i++) {
	            var key = keys[i];
	            if (!self.isSafeRequestHeader(key)) continue;
	            var value = params.headers[key];
	            self.setHeader(key, value);
	        }
	    }
	    
	    if (params.auth) {
	        //basic auth
	        this.setHeader('Authorization', 'Basic ' + Base64.btoa(params.auth));
	    }

	    var res = new Response;
	    res.on('close', function () {
	        self.emit('close');
	    });
	    
	    res.on('ready', function () {
	        self.emit('response', res);
	    });

	    res.on('error', function (err) {
	        self.emit('error', err);
	    });
	    
	    xhr.onreadystatechange = function () {
	        // Fix for IE9 bug
	        // SCRIPT575: Could not complete the operation due to error c00c023f
	        // It happens when a request is aborted, calling the success callback anyway with readyState === 4
	        if (xhr.__aborted) return;
	        res.handle(xhr);
	    };
	};

	inherits(Request, Stream);

	Request.prototype.setHeader = function (key, value) {
	    this._headers[key.toLowerCase()] = value
	};

	Request.prototype.getHeader = function (key) {
	    return this._headers[key.toLowerCase()]
	};

	Request.prototype.removeHeader = function (key) {
	    delete this._headers[key.toLowerCase()]
	};

	Request.prototype.write = function (s) {
	    this.body.push(s);
	};

	Request.prototype.destroy = function (s) {
	    this.xhr.__aborted = true;
	    this.xhr.abort();
	    this.emit('close');
	};

	Request.prototype.end = function (s) {
	    if (s !== undefined) this.body.push(s);

	    var keys = objectKeys(this._headers);
	    for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var value = this._headers[key];
	        if (isArray(value)) {
	            for (var j = 0; j < value.length; j++) {
	                this.xhr.setRequestHeader(key, value[j]);
	            }
	        }
	        else this.xhr.setRequestHeader(key, value)
	    }

	    if (this.body.length === 0) {
	        this.xhr.send('');
	    }
	    else if (typeof this.body[0] === 'string') {
	        this.xhr.send(this.body.join(''));
	    }
	    else if (isArray(this.body[0])) {
	        var body = [];
	        for (var i = 0; i < this.body.length; i++) {
	            body.push.apply(body, this.body[i]);
	        }
	        this.xhr.send(body);
	    }
	    else if (/Array/.test(Object.prototype.toString.call(this.body[0]))) {
	        var len = 0;
	        for (var i = 0; i < this.body.length; i++) {
	            len += this.body[i].length;
	        }
	        var body = new(this.body[0].constructor)(len);
	        var k = 0;
	        
	        for (var i = 0; i < this.body.length; i++) {
	            var b = this.body[i];
	            for (var j = 0; j < b.length; j++) {
	                body[k++] = b[j];
	            }
	        }
	        this.xhr.send(body);
	    }
	    else if (isXHR2Compatible(this.body[0])) {
	        this.xhr.send(this.body[0]);
	    }
	    else {
	        var body = '';
	        for (var i = 0; i < this.body.length; i++) {
	            body += this.body[i].toString();
	        }
	        this.xhr.send(body);
	    }
	};

	// Taken from http://dxr.mozilla.org/mozilla/mozilla-central/content/base/src/nsXMLHttpRequest.cpp.html
	Request.unsafeHeaders = [
	    "accept-charset",
	    "accept-encoding",
	    "access-control-request-headers",
	    "access-control-request-method",
	    "connection",
	    "content-length",
	    "cookie",
	    "cookie2",
	    "content-transfer-encoding",
	    "date",
	    "expect",
	    "host",
	    "keep-alive",
	    "origin",
	    "referer",
	    "te",
	    "trailer",
	    "transfer-encoding",
	    "upgrade",
	    "user-agent",
	    "via"
	];

	Request.prototype.isSafeRequestHeader = function (headerName) {
	    if (!headerName) return false;
	    return indexOf(Request.unsafeHeaders, headerName.toLowerCase()) === -1;
	};

	var objectKeys = Object.keys || function (obj) {
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    return keys;
	};

	var isArray = Array.isArray || function (xs) {
	    return Object.prototype.toString.call(xs) === '[object Array]';
	};

	var indexOf = function (xs, x) {
	    if (xs.indexOf) return xs.indexOf(x);
	    for (var i = 0; i < xs.length; i++) {
	        if (xs[i] === x) return i;
	    }
	    return -1;
	};

	var isXHR2Compatible = function (obj) {
	    if (typeof Blob !== 'undefined' && obj instanceof Blob) return true;
	    if (typeof ArrayBuffer !== 'undefined' && obj instanceof ArrayBuffer) return true;
	    if (typeof FormData !== 'undefined' && obj instanceof FormData) return true;
	};


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(55);
	var util = __webpack_require__(10);

	var Response = module.exports = function (res) {
	    this.offset = 0;
	    this.readable = true;
	};

	util.inherits(Response, Stream);

	var capable = {
	    streaming : true,
	    status2 : true
	};

	function parseHeaders (res) {
	    var lines = res.getAllResponseHeaders().split(/\r?\n/);
	    var headers = {};
	    for (var i = 0; i < lines.length; i++) {
	        var line = lines[i];
	        if (line === '') continue;
	        
	        var m = line.match(/^([^:]+):\s*(.*)/);
	        if (m) {
	            var key = m[1].toLowerCase(), value = m[2];
	            
	            if (headers[key] !== undefined) {
	            
	                if (isArray(headers[key])) {
	                    headers[key].push(value);
	                }
	                else {
	                    headers[key] = [ headers[key], value ];
	                }
	            }
	            else {
	                headers[key] = value;
	            }
	        }
	        else {
	            headers[line] = true;
	        }
	    }
	    return headers;
	}

	Response.prototype.getResponse = function (xhr) {
	    var respType = String(xhr.responseType).toLowerCase();
	    if (respType === 'blob') return xhr.responseBlob || xhr.response;
	    if (respType === 'arraybuffer') return xhr.response;
	    return xhr.responseText;
	}

	Response.prototype.getHeader = function (key) {
	    return this.headers[key.toLowerCase()];
	};

	Response.prototype.handle = function (res) {
	    if (res.readyState === 2 && capable.status2) {
	        try {
	            this.statusCode = res.status;
	            this.headers = parseHeaders(res);
	        }
	        catch (err) {
	            capable.status2 = false;
	        }
	        
	        if (capable.status2) {
	            this.emit('ready');
	        }
	    }
	    else if (capable.streaming && res.readyState === 3) {
	        try {
	            if (!this.statusCode) {
	                this.statusCode = res.status;
	                this.headers = parseHeaders(res);
	                this.emit('ready');
	            }
	        }
	        catch (err) {}
	        
	        try {
	            this._emitData(res);
	        }
	        catch (err) {
	            capable.streaming = false;
	        }
	    }
	    else if (res.readyState === 4) {
	        if (!this.statusCode) {
	            this.statusCode = res.status;
	            this.emit('ready');
	        }
	        this._emitData(res);
	        
	        if (res.error) {
	            this.emit('error', this.getResponse(res));
	        }
	        else this.emit('end');
	        
	        this.emit('close');
	    }
	};

	Response.prototype._emitData = function (res) {
	    var respBody = this.getResponse(res);
	    if (respBody.toString().match(/ArrayBuffer/)) {
	        this.emit('data', new Uint8Array(respBody, this.offset));
	        this.offset = respBody.byteLength;
	        return;
	    }
	    if (respBody.length > this.offset) {
	        this.emit('data', respBody.slice(this.offset));
	        this.offset = respBody.length;
	    }
	};

	var isArray = Array.isArray || function (xs) {
	    return Object.prototype.toString.call(xs) === '[object Array]';
	};


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	;(function () {

	  var object =  true ? exports : this; // #8: web workers
	  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	  function InvalidCharacterError(message) {
	    this.message = message;
	  }
	  InvalidCharacterError.prototype = new Error;
	  InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	  // encoder
	  // [https://gist.github.com/999166] by [https://github.com/nignag]
	  object.btoa || (
	  object.btoa = function (input) {
	    for (
	      // initialize result and counter
	      var block, charCode, idx = 0, map = chars, output = '';
	      // if the next input index does not exist:
	      //   change the mapping table to "="
	      //   check if d has no fractional digits
	      input.charAt(idx | 0) || (map = '=', idx % 1);
	      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	    ) {
	      charCode = input.charCodeAt(idx += 3/4);
	      if (charCode > 0xFF) {
	        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
	      }
	      block = block << 8 | charCode;
	    }
	    return output;
	  });

	  // decoder
	  // [https://gist.github.com/1020396] by [https://github.com/atk]
	  object.atob || (
	  object.atob = function (input) {
	    input = input.replace(/=+$/, '');
	    if (input.length % 4 == 1) {
	      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
	    }
	    for (
	      // initialize result and counters
	      var bc = 0, bs, buffer, idx = 0, output = '';
	      // get next character
	      buffer = input.charAt(idx++);
	      // character found in table? initialize bit storage and add its ascii value;
	      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
	        // and if not first of each 4 characters,
	        // convert the first 8 bits to one ascii character
	        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
	    ) {
	      // try to find character in table (0-63, not found => -1)
	      buffer = chars.indexOf(buffer);
	    }
	    return output;
	  });

	}());


/***/ },
/* 139 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var punycode = __webpack_require__(141);

	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;

	exports.Url = Url;

	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}

	// Reference: RFC 3986, RFC 1808, RFC 2396

	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,

	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(142);

	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;

	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}

	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }

	  var rest = url;

	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();

	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }

	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }

	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {

	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c

	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.

	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }

	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }

	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }

	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;

	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);

	    // pull out port.
	    this.parseHost();

	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';

	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';

	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }

	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }

	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a puny coded representation of "domain".
	      // It only converts the part of the domain name that
	      // has non ASCII characters. I.e. it dosent matter if
	      // you call it with a domain that already is in ASCII.
	      var domainArray = this.hostname.split('.');
	      var newOut = [];
	      for (var i = 0; i < domainArray.length; ++i) {
	        var s = domainArray[i];
	        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
	            'xn--' + punycode.encode(s) : s);
	      }
	      this.hostname = newOut.join('.');
	    }

	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;

	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }

	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {

	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }


	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }

	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }

	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};

	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}

	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }

	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';

	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }

	  if (this.query &&
	      isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }

	  var search = this.search || (query && ('?' + query)) || '';

	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }

	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;

	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');

	  return protocol + host + pathname + search + hash;
	};

	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}

	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};

	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}

	Url.prototype.resolveObject = function(relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }

	  var result = new Url();
	  Object.keys(this).forEach(function(k) {
	    result[k] = this[k];
	  }, this);

	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;

	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }

	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    Object.keys(relative).forEach(function(k) {
	      if (k !== 'protocol')
	        result[k] = relative[k];
	    });

	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }

	    result.href = result.format();
	    return result;
	  }

	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      Object.keys(relative).forEach(function(k) {
	        result[k] = relative[k];
	      });
	      result.href = result.format();
	      return result;
	    }

	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }

	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];

	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }

	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especialy happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!isNull(result.pathname) || !isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }

	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }

	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host) && (last === '.' || last === '..') ||
	      last === '');

	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last == '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }

	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }

	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }

	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');

	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especialy happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }

	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }

	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }

	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};

	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};

	function isString(arg) {
	  return typeof arg === "string";
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isNull(arg) {
	  return arg === null;
	}
	function isNullOrUndefined(arg) {
	  return  arg == null;
	}


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {

		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}

		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;

				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);

			}

			return ucs2encode(output);
		}

		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;

			}
			return output.join('');
		}

		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}

		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module), (function() { return this; }())))

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(143);
	exports.encode = exports.stringify = __webpack_require__(144);


/***/ },
/* 143 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};


/***/ },
/* 144 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var http = __webpack_require__(135);

	var https = module.exports;

	for (var key in http) {
	    if (http.hasOwnProperty(key)) https[key] = http[key];
	};

	https.request = function (params, cb) {
	    if (!params) params = {};
	    params.scheme = 'https';
	    return http.request.call(this, params, cb);
	}


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var events = __webpack_require__(9),
	    util = __webpack_require__(10),
	    common = __webpack_require__(77),
	    Transport = __webpack_require__(118).Transport;

	//
	// ### function Memory (options)
	// #### @options {Object} Options for this instance.
	// Constructor function for the Memory transport object responsible
	// for persisting log messages and metadata to a memory array of messages.
	//
	var Memory = exports.Memory = function (options) {
	  Transport.call(this, options);
	  options = options || {};

	  this.errorOutput = [];
	  this.writeOutput = [];

	  this.json        = options.json        || false;
	  this.colorize    = options.colorize    || false;
	  this.prettyPrint = options.prettyPrint || false;
	  this.timestamp   = typeof options.timestamp !== 'undefined' ? options.timestamp : false;
	  this.showLevel   = options.showLevel === undefined ? true : options.showLevel;
	  this.label       = options.label       || null;
	  this.depth       = options.depth       || null;

	  if (this.json) {
	    this.stringify = options.stringify || function (obj) {
	      return JSON.stringify(obj, null, 2);
	    };
	  }
	};

	//
	// Inherit from `winston.Transport`.
	//
	util.inherits(Memory, Transport);

	//
	// Expose the name of this Transport on the prototype
	//
	Memory.prototype.name = 'memory';

	//
	// ### function log (level, msg, [meta], callback)
	// #### @level {string} Level at which to log the message.
	// #### @msg {string} Message to log
	// #### @meta {Object} **Optional** Additional metadata to attach
	// #### @callback {function} Continuation to respond to when complete.
	// Core logging method exposed to Winston. Metadata is optional.
	//
	Memory.prototype.log = function (level, msg, meta, callback) {
	  if (this.silent) {
	    return callback(null, true);
	  }

	  var self = this,
	      output;

	  output = common.log({
	    colorize:    this.colorize,
	    json:        this.json,
	    level:       level,
	    message:     msg,
	    meta:        meta,
	    stringify:   this.stringify,
	    timestamp:   this.timestamp,
	    prettyPrint: this.prettyPrint,
	    raw:         this.raw,
	    label:       this.label,
	    depth:       this.depth,
	    formatter:   this.formatter,
	    humanReadableUnhandledException: this.humanReadableUnhandledException
	  });

	  if (level === 'error' || level === 'debug') {
	    this.errorOutput.push(output);
	  } else {
	    this.writeOutput.push(output);
	  }

	  self.emit('logged');
	  callback(null, true);
	};

	Memory.prototype.clearLogs = function () {
	  this.errorOutput = [];
	  this.writeOutput = [];
	};


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//
	// Remark: Requiring this file will use the "safe" colors API which will not touch String.prototype
	//
	//   var colors = require('colors/safe);
	//   colors.red("foo")
	//
	//
	var colors = __webpack_require__(148);
	module['exports'] = colors;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*

	The MIT License (MIT)

	Original Library 
	  - Copyright (c) Marak Squires

	Additional functionality
	 - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

	*/

	var colors = {};
	module['exports'] = colors;

	colors.themes = {};

	var ansiStyles = colors.styles = __webpack_require__(149);
	var defineProps = Object.defineProperties;

	colors.supportsColor = __webpack_require__(150);

	if (typeof colors.enabled === "undefined") {
	  colors.enabled = colors.supportsColor;
	}

	colors.stripColors = colors.strip = function(str){
	  return ("" + str).replace(/\x1B\[\d+m/g, '');
	};


	var stylize = colors.stylize = function stylize (str, style) {
	  if (!colors.enabled) {
	    return str+'';
	  }

	  return ansiStyles[style].open + str + ansiStyles[style].close;
	}

	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
	var escapeStringRegexp = function (str) {
	  if (typeof str !== 'string') {
	    throw new TypeError('Expected a string');
	  }
	  return str.replace(matchOperatorsRe,  '\\$&');
	}

	function build(_styles) {
	  var builder = function builder() {
	    return applyStyle.apply(builder, arguments);
	  };
	  builder._styles = _styles;
	  // __proto__ is used because we must return a function, but there is
	  // no way to create a function with a different prototype.
	  builder.__proto__ = proto;
	  return builder;
	}

	var styles = (function () {
	  var ret = {};
	  ansiStyles.grey = ansiStyles.gray;
	  Object.keys(ansiStyles).forEach(function (key) {
	    ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
	    ret[key] = {
	      get: function () {
	        return build(this._styles.concat(key));
	      }
	    };
	  });
	  return ret;
	})();

	var proto = defineProps(function colors() {}, styles);

	function applyStyle() {
	  var args = arguments;
	  var argsLen = args.length;
	  var str = argsLen !== 0 && String(arguments[0]);
	  if (argsLen > 1) {
	    for (var a = 1; a < argsLen; a++) {
	      str += ' ' + args[a];
	    }
	  }

	  if (!colors.enabled || !str) {
	    return str;
	  }

	  var nestedStyles = this._styles;

	  var i = nestedStyles.length;
	  while (i--) {
	    var code = ansiStyles[nestedStyles[i]];
	    str = code.open + str.replace(code.closeRe, code.open) + code.close;
	  }

	  return str;
	}

	function applyTheme (theme) {
	  for (var style in theme) {
	    (function(style){
	      colors[style] = function(str){
	        if (typeof theme[style] === 'object'){
	          var out = str;
	          for (var i in theme[style]){
	            out = colors[theme[style][i]](out);
	          }
	          return out;
	        }
	        return colors[theme[style]](str);
	      };
	    })(style)
	  }
	}

	colors.setTheme = function (theme) {
	  if (typeof theme === 'string') {
	    try {
	      colors.themes[theme] = __webpack_require__(151)(theme);
	      applyTheme(colors.themes[theme]);
	      return colors.themes[theme];
	    } catch (err) {
	      console.log(err);
	      return err;
	    }
	  } else {
	    applyTheme(theme);
	  }
	};

	function init() {
	  var ret = {};
	  Object.keys(styles).forEach(function (name) {
	    ret[name] = {
	      get: function () {
	        return build([name]);
	      }
	    };
	  });
	  return ret;
	}

	var sequencer = function sequencer (map, str) {
	  var exploded = str.split(""), i = 0;
	  exploded = exploded.map(map);
	  return exploded.join("");
	};

	// custom formatter methods
	colors.trap = __webpack_require__(152);
	colors.zalgo = __webpack_require__(153);

	// maps
	colors.maps = {};
	colors.maps.america = __webpack_require__(156);
	colors.maps.zebra = __webpack_require__(159);
	colors.maps.rainbow = __webpack_require__(157);
	colors.maps.random = __webpack_require__(158)

	for (var map in colors.maps) {
	  (function(map){
	    colors[map] = function (str) {
	      return sequencer(colors.maps[map], str);
	    }
	  })(map)
	}

	defineProps(colors, init());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*
	The MIT License (MIT)

	Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

	*/

	var styles = {};
	module['exports'] = styles;

	var codes = {
	  reset: [0, 0],

	  bold: [1, 22],
	  dim: [2, 22],
	  italic: [3, 23],
	  underline: [4, 24],
	  inverse: [7, 27],
	  hidden: [8, 28],
	  strikethrough: [9, 29],

	  black: [30, 39],
	  red: [31, 39],
	  green: [32, 39],
	  yellow: [33, 39],
	  blue: [34, 39],
	  magenta: [35, 39],
	  cyan: [36, 39],
	  white: [37, 39],
	  gray: [90, 39],
	  grey: [90, 39],

	  bgBlack: [40, 49],
	  bgRed: [41, 49],
	  bgGreen: [42, 49],
	  bgYellow: [43, 49],
	  bgBlue: [44, 49],
	  bgMagenta: [45, 49],
	  bgCyan: [46, 49],
	  bgWhite: [47, 49],

	  // legacy styles for colors pre v1.0.0
	  blackBG: [40, 49],
	  redBG: [41, 49],
	  greenBG: [42, 49],
	  yellowBG: [43, 49],
	  blueBG: [44, 49],
	  magentaBG: [45, 49],
	  cyanBG: [46, 49],
	  whiteBG: [47, 49]

	};

	Object.keys(codes).forEach(function (key) {
	  var val = codes[key];
	  var style = styles[key] = [];
	  style.open = '\u001b[' + val[0] + 'm';
	  style.close = '\u001b[' + val[1] + 'm';
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*
	The MIT License (MIT)

	Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

	*/

	var argv = process.argv;

	module.exports = (function () {
	  if (argv.indexOf('--no-color') !== -1 ||
	    argv.indexOf('--color=false') !== -1) {
	    return false;
	  }

	  if (argv.indexOf('--color') !== -1 ||
	    argv.indexOf('--color=true') !== -1 ||
	    argv.indexOf('--color=always') !== -1) {
	    return true;
	  }

	  if (process.stdout && !process.stdout.isTTY) {
	    return false;
	  }

	  if (process.platform === 'win32') {
	    return true;
	  }

	  if ('COLORTERM' in process.env) {
	    return true;
	  }

	  if (process.env.TERM === 'dumb') {
	    return false;
	  }

	  if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
	    return true;
	  }

	  return false;
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./colors": 148,
		"./colors.js": 148,
		"./custom/trap": 152,
		"./custom/trap.js": 152,
		"./custom/zalgo": 153,
		"./custom/zalgo.js": 153,
		"./extendStringPrototype": 154,
		"./extendStringPrototype.js": 154,
		"./index": 155,
		"./index.js": 155,
		"./maps/america": 156,
		"./maps/america.js": 156,
		"./maps/rainbow": 157,
		"./maps/rainbow.js": 157,
		"./maps/random": 158,
		"./maps/random.js": 158,
		"./maps/zebra": 159,
		"./maps/zebra.js": 159,
		"./styles": 149,
		"./styles.js": 149,
		"./system/supports-colors": 150,
		"./system/supports-colors.js": 150
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 151;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {module['exports'] = function runTheTrap (text, options) {
	  var result = "";
	  text = text || "Run the trap, drop the bass";
	  text = text.split('');
	  var trap = {
	    a: ["\u0040", "\u0104", "\u023a", "\u0245", "\u0394", "\u039b", "\u0414"],
	    b: ["\u00df", "\u0181", "\u0243", "\u026e", "\u03b2", "\u0e3f"],
	    c: ["\u00a9", "\u023b", "\u03fe"],
	    d: ["\u00d0", "\u018a", "\u0500" , "\u0501" ,"\u0502", "\u0503"],
	    e: ["\u00cb", "\u0115", "\u018e", "\u0258", "\u03a3", "\u03be", "\u04bc", "\u0a6c"],
	    f: ["\u04fa"],
	    g: ["\u0262"],
	    h: ["\u0126", "\u0195", "\u04a2", "\u04ba", "\u04c7", "\u050a"],
	    i: ["\u0f0f"],
	    j: ["\u0134"],
	    k: ["\u0138", "\u04a0", "\u04c3", "\u051e"],
	    l: ["\u0139"],
	    m: ["\u028d", "\u04cd", "\u04ce", "\u0520", "\u0521", "\u0d69"],
	    n: ["\u00d1", "\u014b", "\u019d", "\u0376", "\u03a0", "\u048a"],
	    o: ["\u00d8", "\u00f5", "\u00f8", "\u01fe", "\u0298", "\u047a", "\u05dd", "\u06dd", "\u0e4f"],
	    p: ["\u01f7", "\u048e"],
	    q: ["\u09cd"],
	    r: ["\u00ae", "\u01a6", "\u0210", "\u024c", "\u0280", "\u042f"],
	    s: ["\u00a7", "\u03de", "\u03df", "\u03e8"],
	    t: ["\u0141", "\u0166", "\u0373"],
	    u: ["\u01b1", "\u054d"],
	    v: ["\u05d8"],
	    w: ["\u0428", "\u0460", "\u047c", "\u0d70"],
	    x: ["\u04b2", "\u04fe", "\u04fc", "\u04fd"],
	    y: ["\u00a5", "\u04b0", "\u04cb"],
	    z: ["\u01b5", "\u0240"]
	  }
	  text.forEach(function(c){
	    c = c.toLowerCase();
	    var chars = trap[c] || [" "];
	    var rand = Math.floor(Math.random() * chars.length);
	    if (typeof trap[c] !== "undefined") {
	      result += trap[c][rand];
	    } else {
	      result += c;
	    }
	  });
	  return result;

	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {// please no
	module['exports'] = function zalgo(text, options) {
	  text = text || "   he is here   ";
	  var soul = {
	    "up" : [
	      '̍', '̎', '̄', '̅',
	      '̿', '̑', '̆', '̐',
	      '͒', '͗', '͑', '̇',
	      '̈', '̊', '͂', '̓',
	      '̈', '͊', '͋', '͌',
	      '̃', '̂', '̌', '͐',
	      '̀', '́', '̋', '̏',
	      '̒', '̓', '̔', '̽',
	      '̉', 'ͣ', 'ͤ', 'ͥ',
	      'ͦ', 'ͧ', 'ͨ', 'ͩ',
	      'ͪ', 'ͫ', 'ͬ', 'ͭ',
	      'ͮ', 'ͯ', '̾', '͛',
	      '͆', '̚'
	    ],
	    "down" : [
	      '̖', '̗', '̘', '̙',
	      '̜', '̝', '̞', '̟',
	      '̠', '̤', '̥', '̦',
	      '̩', '̪', '̫', '̬',
	      '̭', '̮', '̯', '̰',
	      '̱', '̲', '̳', '̹',
	      '̺', '̻', '̼', 'ͅ',
	      '͇', '͈', '͉', '͍',
	      '͎', '͓', '͔', '͕',
	      '͖', '͙', '͚', '̣'
	    ],
	    "mid" : [
	      '̕', '̛', '̀', '́',
	      '͘', '̡', '̢', '̧',
	      '̨', '̴', '̵', '̶',
	      '͜', '͝', '͞',
	      '͟', '͠', '͢', '̸',
	      '̷', '͡', ' ҉'
	    ]
	  },
	  all = [].concat(soul.up, soul.down, soul.mid),
	  zalgo = {};

	  function randomNumber(range) {
	    var r = Math.floor(Math.random() * range);
	    return r;
	  }

	  function is_char(character) {
	    var bool = false;
	    all.filter(function (i) {
	      bool = (i === character);
	    });
	    return bool;
	  }
	  

	  function heComes(text, options) {
	    var result = '', counts, l;
	    options = options || {};
	    options["up"] =   typeof options["up"]   !== 'undefined' ? options["up"]   : true;
	    options["mid"] =  typeof options["mid"]  !== 'undefined' ? options["mid"]  : true;
	    options["down"] = typeof options["down"] !== 'undefined' ? options["down"] : true;
	    options["size"] = typeof options["size"] !== 'undefined' ? options["size"] : "maxi";
	    text = text.split('');
	    for (l in text) {
	      if (is_char(l)) {
	        continue;
	      }
	      result = result + text[l];
	      counts = {"up" : 0, "down" : 0, "mid" : 0};
	      switch (options.size) {
	      case 'mini':
	        counts.up = randomNumber(8);
	        counts.mid = randomNumber(2);
	        counts.down = randomNumber(8);
	        break;
	      case 'maxi':
	        counts.up = randomNumber(16) + 3;
	        counts.mid = randomNumber(4) + 1;
	        counts.down = randomNumber(64) + 3;
	        break;
	      default:
	        counts.up = randomNumber(8) + 1;
	        counts.mid = randomNumber(6) / 2;
	        counts.down = randomNumber(8) + 1;
	        break;
	      }

	      var arr = ["up", "mid", "down"];
	      for (var d in arr) {
	        var index = arr[d];
	        for (var i = 0 ; i <= counts[index]; i++) {
	          if (options[index]) {
	            result = result + soul[index][randomNumber(soul[index].length)];
	          }
	        }
	      }
	    }
	    return result;
	  }
	  // don't summon him
	  return heComes(text, options);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var colors = __webpack_require__(148);

	module['exports'] = function () {

	  //
	  // Extends prototype of native string object to allow for "foo".red syntax
	  //
	  var addProperty = function (color, func) {
	    String.prototype.__defineGetter__(color, func);
	  };

	  var sequencer = function sequencer (map, str) {
	      return function () {
	        var exploded = this.split(""), i = 0;
	        exploded = exploded.map(map);
	        return exploded.join("");
	      }
	  };

	  addProperty('strip', function () {
	    return colors.strip(this);
	  });

	  addProperty('stripColors', function () {
	    return colors.strip(this);
	  });

	  addProperty("trap", function(){
	    return colors.trap(this);
	  });

	  addProperty("zalgo", function(){
	    return colors.zalgo(this);
	  });

	  addProperty("zebra", function(){
	    return colors.zebra(this);
	  });

	  addProperty("rainbow", function(){
	    return colors.rainbow(this);
	  });

	  addProperty("random", function(){
	    return colors.random(this);
	  });

	  addProperty("america", function(){
	    return colors.america(this);
	  });

	  //
	  // Iterate through all default styles and colors
	  //
	  var x = Object.keys(colors.styles);
	  x.forEach(function (style) {
	    addProperty(style, function () {
	      return colors.stylize(this, style);
	    });
	  });

	  function applyTheme(theme) {
	    //
	    // Remark: This is a list of methods that exist
	    // on String that you should not overwrite.
	    //
	    var stringPrototypeBlacklist = [
	      '__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'charAt', 'constructor',
	      'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'charCodeAt',
	      'indexOf', 'lastIndexof', 'length', 'localeCompare', 'match', 'replace', 'search', 'slice', 'split', 'substring',
	      'toLocaleLowerCase', 'toLocaleUpperCase', 'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight'
	    ];

	    Object.keys(theme).forEach(function (prop) {
	      if (stringPrototypeBlacklist.indexOf(prop) !== -1) {
	        console.log('warn: '.red + ('String.prototype' + prop).magenta + ' is probably something you don\'t want to override. Ignoring style name');
	      }
	      else {
	        if (typeof(theme[prop]) === 'string') {
	          colors[prop] = colors[theme[prop]];
	          addProperty(prop, function () {
	            return colors[theme[prop]](this);
	          });
	        }
	        else {
	          addProperty(prop, function () {
	            var ret = this;
	            for (var t = 0; t < theme[prop].length; t++) {
	              ret = colors[theme[prop][t]](ret);
	            }
	            return ret;
	          });
	        }
	      }
	    });
	  }

	  colors.setTheme = function (theme) {
	    if (typeof theme === 'string') {
	      try {
	        colors.themes[theme] = __webpack_require__(151)(theme);
	        applyTheme(colors.themes[theme]);
	        return colors.themes[theme];
	      } catch (err) {
	        console.log(err);
	        return err;
	      }
	    } else {
	      applyTheme(theme);
	    }
	  };

	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var colors = __webpack_require__(148);
	module['exports'] = colors;

	// Remark: By default, colors will add style properties to String.prototype
	//
	// If you don't wish to extend String.prototype you can do this instead and native String will not be touched
	//
	//   var colors = require('colors/safe);
	//   colors.red("foo")
	//
	//
	__webpack_require__(154)();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var colors = __webpack_require__(148);

	module['exports'] = (function() {
	  return function (letter, i, exploded) {
	    if(letter === " ") return letter;
	    switch(i%3) {
	      case 0: return colors.red(letter);
	      case 1: return colors.white(letter)
	      case 2: return colors.blue(letter)
	    }
	  }
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var colors = __webpack_require__(148);

	module['exports'] = (function () {
	  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta']; //RoY G BiV
	  return function (letter, i, exploded) {
	    if (letter === " ") {
	      return letter;
	    } else {
	      return colors[rainbowColors[i++ % rainbowColors.length]](letter);
	    }
	  };
	})();


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var colors = __webpack_require__(148);

	module['exports'] = (function () {
	  var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta'];
	  return function(letter, i, exploded) {
	    return letter === " " ? letter : colors[available[Math.round(Math.random() * (available.length - 1))]](letter);
	  };
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var colors = __webpack_require__(148);

	module['exports'] = function (letter, i, exploded) {
	  return i % 2 === 0 ? letter : colors.inverse(letter);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, __dirname) {/*
	 * pkginfo.js: Top-level include for the pkginfo module
	 *
	 * (C) 2011, Charlie Robbins
	 *
	 */

	var path = __webpack_require__(17);

	//
	// ### function pkginfo ([options, 'property', 'property' ..])
	// #### @pmodule {Module} Parent module to read from.
	// #### @options {Object|Array|string} **Optional** Options used when exposing properties.
	// #### @arguments {string...} **Optional** Specified properties to expose.
	// Exposes properties from the package.json file for the parent module on
	// it's exports. Valid usage:
	//
	// `require('pkginfo')()`
	//
	// `require('pkginfo')('version', 'author');`
	//
	// `require('pkginfo')(['version', 'author']);`
	//
	// `require('pkginfo')({ include: ['version', 'author'] });`
	//
	var pkginfo = module.exports = function (pmodule, options) {
	  var args = [].slice.call(arguments, 2).filter(function (arg) {
	    return typeof arg === 'string';
	  });

	  //
	  // **Parse variable arguments**
	  //
	  if (Array.isArray(options)) {
	    //
	    // If the options passed in is an Array assume that
	    // it is the Array of properties to expose from the
	    // on the package.json file on the parent module.
	    //
	    options = { include: options };
	  }
	  else if (typeof options === 'string') {
	    //
	    // Otherwise if the first argument is a string, then
	    // assume that it is the first property to expose from
	    // the package.json file on the parent module.
	    //
	    options = { include: [options] };
	  }

	  //
	  // **Setup default options**
	  //
	  options = options || {};

	  // ensure that includes have been defined
	  options.include = options.include || [];

	  if (args.length > 0) {
	    //
	    // If additional string arguments have been passed in
	    // then add them to the properties to expose on the
	    // parent module.
	    //
	    options.include = options.include.concat(args);
	  }

	  var pkg = pkginfo.read(pmodule, options.dir).package;
	  Object.keys(pkg).forEach(function (key) {
	    if (options.include.length > 0 && !~options.include.indexOf(key)) {
	      return;
	    }

	    if (!pmodule.exports[key]) {
	      pmodule.exports[key] = pkg[key];
	    }
	  });

	  return pkginfo;
	};

	//
	// ### function find (dir)
	// #### @pmodule {Module} Parent module to read from.
	// #### @dir {string} **Optional** Directory to start search from.
	// Searches up the directory tree from `dir` until it finds a directory
	// which contains a `package.json` file.
	//
	pkginfo.find = function (pmodule, dir) {
	  if (! dir) {
	    dir = path.dirname(pmodule.filename || pmodule.id);
	  }

	  if (dir === '/') {
	    throw new Error('Could not find package.json up from ' +
	                (pmodule.filename || pmodule.id));
	  }
	  else if (!dir || dir === '.') {
	    throw new Error('Cannot find package.json from unspecified directory');
	  }

	  var contents;
	  try {
	    contents = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
	  } catch (error) {}

	  if (contents) return contents;

	  return pkginfo.find(pmodule, path.dirname(dir));
	};

	//
	// ### function read (pmodule, dir)
	// #### @pmodule {Module} Parent module to read from.
	// #### @dir {string} **Optional** Directory to start search from.
	// Searches up the directory tree from `dir` until it finds a directory
	// which contains a `package.json` file and returns the package information.
	//
	pkginfo.read = function (pmodule, dir) {
	  return {
	    dir: dir,
	    package: pkginfo.find(pmodule, dir),
	  };
	};

	//
	// Call `pkginfo` on this module and expose version.
	//
	pkginfo(module, {
	  dir: __dirname,
	  include: ['version'],
	  target: pkginfo
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module), "/"))

/***/ },
/* 161 */
/***/ function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 161;


/***/ }
/******/ ]);