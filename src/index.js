import React from 'react';
import draw from './draw.js';
import snake from './snake.js';
import isCollision from './is-collision.js';
import apple from './apple.js';
import eatApple from './eat-apple.js';
import menu from './menu.js';
import constants from './constants.js';
import styles from './styles.js';

const {states, difficulty} = constants;

const game = {
  numberOfPlayers: 1,
  gameOver: true,
  speed: 2,
  fps: 1000 / 30,
  countdown: 3,
  canvasSize: 400,
  board: {
    x: 0,
    y: 40,
    width: 400,
    height: 360 // canvasSize - board.y
  },
  startTime: null,
  time: 0,
  lastInterval: 0,
  snakes: [],
  apples: [],
  score: 0,
  highScore: 0,
  state: states.menuPlayers,
  currentMenu: 'playAgain'
};

function newGame() {
  game.snakes = [];
  game.apples = [];
  game.gameOver = false;
  game.state = states.game;
  game.score = 0;
  game.startTime = null;
}

function gameOver() {
  game.gameOver = true;
  game.state = states.gameOver;

  if (game.score > game.highScore) {
    game.highScore = game.score;
    game.currentMenu = 'playAgain';
  }
}

export default class NilssongamesSnake extends React.Component {
  constructor() {
    super();

    this.loop = this.loop.bind(this);
  }

  init() {
    game.state = states.menuPlayers;
    requestAnimationFrame(this.loop);
  }

  update() {
    // All logic happens here, no canvas rendering

    if (game.state !== states.game) {
      return;
    }

    while (game.snakes.length < game.numberOfPlayers) {
      // TODO: do forEach numberofplayers and send an index to get different starting coordinates
      game.snakes.push(new snake(game));
    }

    if (!game.apples.length && game.numberOfPlayers === 1) {
      game.apples.push(new apple(game));
    }

    if (game.countdown - parseInt(game.time / 1000) > 0) {
      //start game only after countdown is finished
      return;
    }

    // Start moving the snake(s)
    game.snakes.forEach(snake => {
      if (isCollision(snake, game) || snake.gameOver) {
        snake.gameOver = true;
        gameOver();
        return;
      }

      snake.move();

      if (game.snakes.length > 1) {
        // if more than one snake, ignore apples, and just grow the snake every move
        snake.grow();
        return;
      }

      game.apples.forEach((appleObj, i) => {
        if (eatApple(snake, appleObj)) {
          game.apples[i] = new apple(game);
          snake.grow();
          game.score += game.speed;
        }
      });
    });
  }

  draw() {
    // Render the canvas only, no variables should change
    const {canvasSize} = game;
    var context = this.canvas.getContext('2d');

    context.clearRect(0, 0, canvasSize, canvasSize);
    draw.score(context, game);

    if (game.state === states.menuPlayers || game.state === states.menuDifficulty) {
      menu.draw(context, game);
      return;
    }


    game.apples.forEach(apple => {
      apple.draw(context);
    });

    game.snakes.forEach(snake => {
      snake.draw(context);
    });

    if (game.state === states.gameOver) {
      draw.gameOver(context, game.canvasSize);
      menu.draw(context, game);
    }

    draw.countdown(context, game);
  }

  loop(time) {
    const {fps, speed} = game;
    time = parseInt(time);

    if (!game.startTime) {
      game.startTime = time;
      game.lastInterval = time - game.startTime;
    }

    game.time = time - game.startTime;

    if (game.time >= game.lastInterval + (fps * (10 / speed))) {
      game.lastInterval = game.time;
      this.update();
      this.draw();
    }

    requestAnimationFrame(this.loop);
  }

  handleKeyDown(e) {
    if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
    }

    if (game.state === states.menuPlayers) {
      if (e.keyCode === 40) {
        game.numberOfPlayers = 2;
      } else if (e.keyCode === 38) {
        game.numberOfPlayers = 1;
      } else if (e.keyCode === 13 || e.keyCode === 32) {
        game.state = states.menuDifficulty;
      }
      return;
    }

    if (game.state === states.menuDifficulty) {
      if (e.keyCode === 40) {
        if (game.speed === difficulty.easy) {
          game.speed = difficulty.medium;
        } else if (game.speed === difficulty.medium) {
          game.speed = difficulty.hard;
        }
      } else if (e.keyCode === 38) {
        if (game.speed === difficulty.hard) {
          game.speed = difficulty.medium;
        } else if (game.speed === difficulty.medium) {
          game.speed = difficulty.easy;
        }
      } else if (e.keyCode === 13 || e.keyCode === 32) {
        newGame();
      }
      return;
    }

    if (game.state === states.gameOver) {
      if (e.keyCode === 40) {
        game.currentMenu = 'mainMenu';
      } else if (e.keyCode === 38) {
        game.currentMenu = 'playAgain';
      } else if (e.keyCode === 13 || e.keyCode === 32) {
        if (game.currentMenu === 'mainMenu') {
          game.state = states.menuPlayers;
        } else if (game.currentMenu === 'playAgain') {
          newGame();
        }
      }
      return;
    }

    game.snakes.forEach(snake => {
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

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.init();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div style={styles.snake}>
        <canvas style={styles.snake__canvas} width={game.canvasSize} height={game.canvasSize} ref={el => this.canvas = el} />
      </div>
    );
  }
}
