import constants from './constants.js';
const {states, difficulty} = constants;


const menu = {
  draw: (context, game) => {
    if (game.state === states.menuPlayers) {
      context.font = '40px Arial';
      context.textAlign = 'center';
      context.fillStyle = '#888';
      context.fillText('Snake', game.canvasSize / 2, game.canvasSize / 4);

      if (game.numberOfPlayers === 1) {
        context.fillStyle = '#888';
        context.fillRect(game.canvasSize / 2 - 50, game.canvasSize / 1.61, 100, 25);
      }

      context.font = '16px Arial';
      context.fillStyle = game.numberOfPlayers === 1 ? 'white' : '#888';
      context.fillText('1 player', game.canvasSize / 2, game.canvasSize / 1.5);

      if (game.numberOfPlayers === 2) {
        context.fillStyle = '#888';
        context.fillRect(game.canvasSize / 2 - 50, game.canvasSize / 1.38, 100, 25);
      }

      context.fillStyle = game.numberOfPlayers === 2 ? 'white' : '#888';
      context.fillText('2 players', game.canvasSize / 2, game.canvasSize / 1.3);
      return;
    }

    if (game.state === states.menuDifficulty) {
      context.font = '40px Arial';
      context.textAlign = 'center';
      context.fillStyle = '#888';
      context.fillText('Snake', game.canvasSize / 2, game.canvasSize / 4);

      if (game.speed === difficulty.easy) {
        context.fillStyle = '#888';
        context.fillRect(game.canvasSize / 2 - 50, game.canvasSize / 1.61, 100, 25);
      }

      context.font = '16px Arial';
      context.fillStyle = game.speed === difficulty.easy ? 'white' : '#888';
      context.fillText('Easy', game.canvasSize / 2, game.canvasSize / 1.5);

      if (game.speed === difficulty.medium) {
        context.fillStyle = '#888';
        context.fillRect(game.canvasSize / 2 - 50, game.canvasSize / 1.38, 100, 25);
      }

      context.fillStyle = game.speed === difficulty.medium ? 'white' : '#888';
      context.fillText('Medium', game.canvasSize / 2, game.canvasSize / 1.3);

      if (game.speed === difficulty.hard) {
        context.fillStyle = '#888';
        context.fillRect(game.canvasSize / 2 - 50, game.canvasSize / 1.21, 100, 25);
      }

      context.fillStyle = game.speed === difficulty.hard ? 'white' : '#888';
      context.fillText('Hard', game.canvasSize / 2, game.canvasSize / 1.15);
      return;
    }

    if (game.state === states.gameOver) {
      context.font = '16px Arial';

      if (game.currentMenu === 'playAgain') {
        context.fillStyle = '#888';
        context.fillRect(game.canvasSize / 2 - 50, game.canvasSize / 1.61, 100, 25);
      }

      context.fillStyle = game.currentMenu === 'playAgain' ? 'white' : '#888';
      context.fillText('Play again', game.canvasSize / 2, game.canvasSize / 1.5);

      if (game.currentMenu === 'mainMenu') {
        context.fillStyle = '#888';
        context.fillRect(game.canvasSize / 2 - 50, game.canvasSize / 1.38, 100, 25);
      }

      context.fillStyle = game.currentMenu === 'mainMenu' ? 'white' : '#888';
      context.fillText('Main menu', game.canvasSize / 2, game.canvasSize / 1.3);
      return;
    }
  }
}

export default menu;
