import React from 'react';
import Button from './components/button';
import Section from './components/section';
import Icons from './components/icons';
import draw from './draw.js';
import snake from './snake.js';
import isCollision from './is-collision.js';
import apple from './apple.js';
import eatApple from './eat-apple.js';
import styles from './styles.js';

const game = {
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

export default class NilssongamesSnake extends React.Component {
  constructor() {
    super();

    this.state = {
      numberOfPlayers: game.numberOfPlayers,
      speed: game.speed,
      gameOver: game.gameOver,
      score: game.score,
      highScore: game.highScore
    };

    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
    this.newGame = this.newGame.bind(this);
    this.loop = this.loop.bind(this);
  }

  handleDifficultyChange(e) {
    const speed = parseInt(e.currentTarget.value);

    game.speed = speed;
    this.setState({speed});
  }

  handlePlayerChange(e) {
    const numberOfPlayers = parseInt(e.currentTarget.value);

    game.numberOfPlayers = numberOfPlayers;
    this.setState({numberOfPlayers});
  }

  newGame() {
    game.snakes = [];
    game.apples = [];
    game.gameOver = false;
    game.score = 0;
    const {gameOver} = game;
    this.setState({gameOver, score: 0});
    window.requestAnimationFrame(this.loop);
  }

  update() {
    // All logic happens here, no canvas rendering

    while (game.snakes.length < game.numberOfPlayers) {
      // TODO: do forEach numberofplayers and send an index to get different starting coordinates
      game.snakes.push(new snake(game));
    }

    if (!game.apples.length) {
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
        game.startTime = null;
        game.gameOver = true;

        if (game.score > game.highScore) {
          game.highScore = game.score;
          this.setState({highScore: game.highScore});
        }
        this.setState({gameOver: true});
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
          this.setState({score: game.score});
        }
      });
    });
  }

  draw() {
    // Render the canvas only, no variables should change
    const {canvasSize} = game;
    var context = this.refs.canvasEl.getContext('2d');

    context.clearRect(0, 0, canvasSize, canvasSize);

    if (game.gameOver) {
      draw.gameOver(context, game.canvasSize);
    }

    game.apples.forEach(apple => {
      apple.draw(context);
    });
    game.snakes.forEach(snake => {
      snake.draw(context);
    });
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

    if (game.gameOver) {
      game.startTime = null;
      return;
    }

    requestAnimationFrame(this.loop);
  }

  handleKeyDown(e) {
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
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const {human} = Icons;
    const {numberOfPlayers, speed, gameOver, score, highScore} = this.state;

    return (
      <div style={styles.snake}>
        <Section>
          <Button isSelected={numberOfPlayers === 1} isDisabled={!gameOver} handleClick={this.handlePlayerChange} value={1}>
            {human}
          </Button>
          <Button isSelected={numberOfPlayers === 2} isDisabled={!gameOver} handleClick={this.handlePlayerChange} value={2}>
            {human} {human}
          </Button>
        </Section>

        <Section>
          <Button isSelected={speed === 1} isDisabled={!gameOver} handleClick={this.handleDifficultyChange} value={1}>
            Easy
          </Button>
          <Button isSelected={speed === 2} isDisabled={!gameOver} handleClick={this.handleDifficultyChange} value={2}>
            Normal
          </Button>
          <Button isSelected={speed === 5} isDisabled={!gameOver} handleClick={this.handleDifficultyChange} value={5}>
            Hard
          </Button>
        </Section>

        <Section>
          <Button isDisabled={!gameOver} handleClick={this.newGame}>
            New game
          </Button>
        </Section>

        <Section>
          <p>Score: {numberOfPlayers === 1 ? score : '-'}</p>
          <p>High score: {highScore}</p>
        </Section>

        <canvas style={styles.snake__canvas} width={game.canvasSize} height={game.canvasSize} ref="canvasEl" />
      </div>
    );
  }
}
