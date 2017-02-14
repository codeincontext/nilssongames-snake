'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('./components/button');

var _button2 = _interopRequireDefault(_button);

var _section = require('./components/section');

var _section2 = _interopRequireDefault(_section);

var _icons = require('./components/icons');

var _icons2 = _interopRequireDefault(_icons);

var _draw2 = require('./draw.js');

var _draw3 = _interopRequireDefault(_draw2);

var _snake = require('./snake.js');

var _snake2 = _interopRequireDefault(_snake);

var _isCollision = require('./is-collision.js');

var _isCollision2 = _interopRequireDefault(_isCollision);

var _apple = require('./apple.js');

var _apple2 = _interopRequireDefault(_apple);

var _eatApple = require('./eat-apple.js');

var _eatApple2 = _interopRequireDefault(_eatApple);

var _index = require('./index.css');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var game = {
  numberOfPlayers: 1,
  gameOver: true,
  speed: 2,
  fps: 1000 / 30,
  countdown: 3,
  canvasSize: 400,
  startTime: null,
  time: 0,
  lastInterval: 0,
  snakes: [],
  apples: [],
  score: 0,
  highScore: 0
};

var NilssongamesSnake = function (_React$Component) {
  _inherits(NilssongamesSnake, _React$Component);

  function NilssongamesSnake() {
    _classCallCheck(this, NilssongamesSnake);

    var _this = _possibleConstructorReturn(this, (NilssongamesSnake.__proto__ || Object.getPrototypeOf(NilssongamesSnake)).call(this));

    _this.state = {
      numberOfPlayers: game.numberOfPlayers,
      speed: game.speed,
      gameOver: game.gameOver,
      score: game.score,
      highScore: game.highScore
    };

    _this.handlePlayerChange = _this.handlePlayerChange.bind(_this);
    _this.handleDifficultyChange = _this.handleDifficultyChange.bind(_this);
    _this.newGame = _this.newGame.bind(_this);
    _this.loop = _this.loop.bind(_this);
    return _this;
  }

  _createClass(NilssongamesSnake, [{
    key: 'handleDifficultyChange',
    value: function handleDifficultyChange(e) {
      var speed = parseInt(e.currentTarget.value);

      game.speed = speed;
      this.setState({ speed: speed });
    }
  }, {
    key: 'handlePlayerChange',
    value: function handlePlayerChange(e) {
      var numberOfPlayers = parseInt(e.currentTarget.value);

      game.numberOfPlayers = numberOfPlayers;
      this.setState({ numberOfPlayers: numberOfPlayers });
    }
  }, {
    key: 'newGame',
    value: function newGame() {
      game.snakes = [];
      game.apples = [];
      game.gameOver = false;
      game.score = 0;
      var gameOver = game.gameOver;

      this.setState({ gameOver: gameOver, score: 0 });
      window.requestAnimationFrame(this.loop);
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      // All logic happens here, no canvas rendering

      while (game.snakes.length < game.numberOfPlayers) {
        // TODO: do forEach numberofplayers and send an index to get different starting coordinates
        game.snakes.push(new _snake2.default(game));
      }

      if (!game.apples.length) {
        game.apples.push(new _apple2.default(game));
      }

      if (game.countdown - parseInt(game.time / 1000) > 0) {
        //start game only after countdown is finished
        return;
      }

      // Start moving the snake(s)
      game.snakes.forEach(function (snake) {
        if ((0, _isCollision2.default)(snake, game) || snake.gameOver) {
          snake.gameOver = true;
          game.startTime = null;
          game.gameOver = true;

          if (game.score > game.highScore) {
            game.highScore = game.score;
            _this2.setState({ highScore: game.highScore });
          }
          _this2.setState({ gameOver: true });
          return;
        }

        snake.move();

        if (game.snakes.length > 1) {
          // if more than one snake, ignore apples, and just grow the snake every move
          snake.grow();
          return;
        }

        game.apples.forEach(function (appleObj, i) {
          if ((0, _eatApple2.default)(snake, appleObj)) {
            game.apples[i] = new _apple2.default(game);
            snake.grow();
            game.score += game.speed;
            _this2.setState({ score: game.score });
          }
        });
      });
    }
  }, {
    key: 'draw',
    value: function draw() {
      // Render the canvas only, no variables should change
      var canvasSize = game.canvasSize;

      var context = this.refs.canvasEl.getContext('2d');

      context.clearRect(0, 0, canvasSize, canvasSize);

      if (game.gameOver) {
        _draw3.default.gameOver(context, game.canvasSize);
      }

      game.apples.forEach(function (apple) {
        apple.draw(context);
      });
      game.snakes.forEach(function (snake) {
        snake.draw(context);
      });
      _draw3.default.countdown(context, game);
    }
  }, {
    key: 'loop',
    value: function loop(time) {
      var fps = game.fps,
          speed = game.speed;

      time = parseInt(time);

      if (!game.startTime) {
        game.startTime = time;
        game.lastInterval = time - game.startTime;
      }

      game.time = time - game.startTime;

      if (game.time >= game.lastInterval + fps * (10 / speed)) {
        game.lastInterval = game.time;
        this.update();
        this.draw();
      }

      if (game.gameOver) {
        game.startTime = null;
        return;
      }

      requestAnimationFrame(this.loop);
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      game.snakes.forEach(function (snake) {
        if (snake.controlKeys[e.keyCode]) {
          e.preventDefault();
          var direction = snake.controlKeys[e.keyCode];

          switch (direction) {
            case 'left':
              if (snake.direction.previousX === 1) {
                // Don't allow going back in opposite direction
                return;
              }
              snake.direction.x = -1;
              snake.direction.y = 0;
              break;
            case 'up':
              if (snake.direction.previousY === 1) {
                // Don't allow going back in opposite direction
                return;
              }
              snake.direction.x = 0;
              snake.direction.y = -1;
              break;
            case 'right':
              if (snake.direction.previousX === -1) {
                // Don't allow going back in opposite direction
                return;
              }
              snake.direction.x = 1;
              snake.direction.y = 0;
              break;
            case 'down':
              if (snake.direction.previousY === -1) {
                // Don't allow going back in opposite direction
                return;
              }
              snake.direction.x = 0;
              snake.direction.y = 1;
              break;
          }
        }
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: 'render',
    value: function render() {
      var human = _icons2.default.human;
      var _state = this.state,
          numberOfPlayers = _state.numberOfPlayers,
          speed = _state.speed,
          gameOver = _state.gameOver,
          score = _state.score,
          highScore = _state.highScore;


      return _react2.default.createElement(
        'div',
        { className: _index2.default.snake },
        _react2.default.createElement(
          _section2.default,
          null,
          _react2.default.createElement(
            _button2.default,
            { isSelected: numberOfPlayers === 1, isDisabled: !gameOver, handleClick: this.handlePlayerChange, value: 1 },
            human
          ),
          _react2.default.createElement(
            _button2.default,
            { isSelected: numberOfPlayers === 2, isDisabled: !gameOver, handleClick: this.handlePlayerChange, value: 2 },
            human,
            ' ',
            human
          )
        ),
        _react2.default.createElement(
          _section2.default,
          null,
          _react2.default.createElement(
            _button2.default,
            { isSelected: speed === 1, isDisabled: !gameOver, handleClick: this.handleDifficultyChange, value: 1 },
            'Easy'
          ),
          _react2.default.createElement(
            _button2.default,
            { isSelected: speed === 2, isDisabled: !gameOver, handleClick: this.handleDifficultyChange, value: 2 },
            'Normal'
          ),
          _react2.default.createElement(
            _button2.default,
            { isSelected: speed === 5, isDisabled: !gameOver, handleClick: this.handleDifficultyChange, value: 5 },
            'Hard'
          )
        ),
        _react2.default.createElement(
          _section2.default,
          null,
          _react2.default.createElement(
            _button2.default,
            { isDisabled: !gameOver, handleClick: this.newGame },
            'New game'
          )
        ),
        _react2.default.createElement(
          _section2.default,
          null,
          _react2.default.createElement(
            'p',
            null,
            'Score: ',
            score
          ),
          _react2.default.createElement(
            'p',
            null,
            'High score: ',
            highScore
          )
        ),
        _react2.default.createElement('canvas', { className: _index2.default.snake__canvas, width: game.canvasSize, height: game.canvasSize, ref: 'canvasEl' })
      );
    }
  }]);

  return NilssongamesSnake;
}(_react2.default.Component);

exports.default = NilssongamesSnake;
