import constants from './constants.js';
const {states, difficulty} = constants;


const menu = {
  draw: (context, game) => {
    if (game.state === states.menuPlayers) {
      context.font = '40px Arial';
      context.textAlign = 'center';
      context.fillStyle = '#888';
      context.fillText('Snake', game.canvasSize / 2, game.canvasSize / 4);

      context.font = '16px Arial';
      context.fillStyle = game.numberOfPlayers === 1 ? 'gold' : '#888';
      context.fillText('1 player', game.canvasSize / 2, game.canvasSize / 1.5);

      context.fillStyle = game.numberOfPlayers === 2 ? 'gold' : '#888';
      context.fillText('2 players', game.canvasSize / 2, game.canvasSize / 1.3);
      return;
    }

    if (game.state === states.menuDifficulty) {
      context.font = '40px Arial';
      context.textAlign = 'center';
      context.fillStyle = '#888';
      context.fillText('Snake', game.canvasSize / 2, game.canvasSize / 4);

      context.font = '16px Arial';
      context.fillStyle = game.speed === difficulty.easy ? 'gold' : '#888';
      context.fillText('Easy', game.canvasSize / 2, game.canvasSize / 1.5);

      context.fillStyle = game.speed === difficulty.medium ? 'gold' : '#888';
      context.fillText('Medium', game.canvasSize / 2, game.canvasSize / 1.3);

      context.fillStyle = game.speed === difficulty.hard ? 'gold' : '#888';
      context.fillText('Hard', game.canvasSize / 2, game.canvasSize / 1.15);
      return;
    }

    if (game.state === states.gameOver) {
      console.log(game.currentMenu);
      context.font = '16px Arial';
      context.fillStyle = game.currentMenu === 'playAgain' ? 'gold' : '#888';
      context.fillText('Play again', game.canvasSize / 2, game.canvasSize / 1.5);

      context.fillStyle = game.currentMenu === 'mainMenu' ? 'gold' : '#888';
      context.fillText('Main menu', game.canvasSize / 2, game.canvasSize / 1.3);
      return;
    }
  }
}

export default menu;
