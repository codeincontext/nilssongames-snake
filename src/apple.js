function apple(game) {
  this.size = 20;
  this.x = (Math.floor(Math.random() * (game.board.width / this.size)) * this.size) + game.board.x;
  this.y = (Math.floor(Math.random() * (game.board.height / this.size)) * this.size) + game.board.y;

  this.draw = function (context) {
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, this.size, this.size);
  }
}

export default apple;
