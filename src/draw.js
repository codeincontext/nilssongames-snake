const draw = {
  countdown: (context, game) => {
    const {canvasSize, countdown, time} = game;
    const currentCountdown = countdown - parseInt(time / 1000);

    if (currentCountdown < 1) {
      return;
    }

    context.font = '50px Arial';
    context.textAlign = 'center';
    context.fillStyle = '#888';
    context.fillText(currentCountdown, canvasSize / 2, canvasSize / 2);
  },

  gameOver: (context, canvasSize) => {
    context.font = '40px Arial';
    context.textAlign = 'center';
    context.fillStyle = '#888';
    context.fillText('Game over', canvasSize / 2, canvasSize / 2);
  },

  score: (context, game) => {
    context.fillStyle = '#444';
    context.fillRect(0, 0, game.canvasSize, game.canvasSize - game.board.height);

    context.font = '16px Arial';
    context.textAlign = 'left';
    context.fillStyle = '#eee';
    context.fillText('Score: ' + (game.numberOfPlayers === 1 ? game.score : '-'), 10, 25);

    context.textAlign = 'right';
    context.fillText('High Score: ' + game.highScore, game.canvasSize - 10, 25);
  }
};

export default draw;
