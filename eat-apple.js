const eatApple = (snake, apple) => {
  if (snake.head.x === apple.x && snake.head.y === apple.y) {
    return true;
  }

  return false;
};

export default eatApple;
