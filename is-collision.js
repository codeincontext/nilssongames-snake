const isCollision = (currentSnake, game) => {
  var collision = false;

  // check if snake is going off the canvas
  if (currentSnake.direction.y === 1 && currentSnake.head.y >= (game.canvasSize - currentSnake.size)) {
    return true;
  } else if (currentSnake.direction.y === -1 && currentSnake.head.y <= 0) {
    return true;
  } else if (currentSnake.direction.x === 1 && currentSnake.head.x >= (game.canvasSize - currentSnake.size)) {
    return true;
  } else if (currentSnake.direction.x === -1 && currentSnake.head.x <= 0) {
    return true;
  }

  // collision with other snakes
  game.snakes.forEach(function (snake) {
    if (currentSnake.index === snake.index) {
      return;
    }

    // next frame's position of the head (this snake)
    var next = {
      x: currentSnake.head.x + (currentSnake.direction.x * currentSnake.size),
      y: currentSnake.head.y + (currentSnake.direction.y * currentSnake.size)
    };

    // next frame's position of the head (other snake)
    var otherSnakeNext = {
      x: snake.head.x + (snake.direction.x * snake.size),
      y: snake.head.y + (snake.direction.y * snake.size)
    };

    snake.tail.forEach(part => {
      if (next.x === part.x && next.y === part.y) {
        collision = true;
      }
    });

    if (next.x === otherSnakeNext.x && next.y === otherSnakeNext.y) {
      collision = true;
    }
  });

  return collision;
};

export default isCollision;
