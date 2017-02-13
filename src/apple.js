function apple(game) {
  this.size = 20;
  this.x = Math.floor(Math.random() * (game.canvasSize / this.size)) * this.size;
  this.y = Math.floor(Math.random() * (game.canvasSize / this.size)) * this.size;

  this.draw = function (context) {
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, this.size, this.size);
  }
}

export default apple;
