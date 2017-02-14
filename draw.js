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
  }
};

export default draw;
