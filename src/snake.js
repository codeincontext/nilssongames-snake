// Different values to give each snake a unique position/direction


function snake(game) {
  const color = ['purple', 'teal'];
  const offsetX = [5, 15];
  const offsetY = [5, 15];
  const tailOffsetX = [[2, 3, 4], [18, 17, 16]];
  const directionX = [1, -1];
  const directionY = [0, 0];
  const controls = [
    {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    },
    {
      65: 'left',
      87: 'up',
      68: 'right',
      83: 'down'
    }
  ];

  // Fetch unique position/direction values depending on how many snakes are already on the board
  const index = game.snakes.length;

  this.index = index;
  this.color = color[index];
  this.width = game.canvasSize / 20;
  this.height = this.width;
  this.size = this.width;
  this.speed = game.speed;
  this.gameOver = false;

  this.head = {
    x: this.size * offsetX[index],
    y: this.size * offsetY[index]
  };

  this.tail = [
    {
      x: this.size * tailOffsetX[index][0],
      y: this.head.y
    },
    {
      x: this.size * tailOffsetX[index][1],
      y: this.head.y
    },
    {
      x: this.size * tailOffsetX[index][2],
      y: this.head.y
    }
  ];

  this.direction = {
    x: directionX[index],
    y: directionY[index],
    previousX: directionX[index],
    previousY: directionY[index]
  };

  this.controlKeys = controls[index];

  this.move = function () {
    this.direction.previousX = this.direction.x;
    this.direction.previousY = this.direction.y;

    var tail = this.tail;
    var head = this.head;

    tail.forEach((piece, i) => {
      var next = tail.length > i + 1 ? tail[i + 1] : head;

      if (i === 0) {
        if (next.x === piece.x && next.y === piece.y) {
          // Snake just grew. Don't move the end of the tail
          return;
        }
      }

      piece.x = next.x;
      piece.y = next.y;
    });

    head.x += this.direction.x * this.size;
    head.y += this.direction.y * this.size;
  };

  this.grow = function () {
    this.tail.unshift({
      x: this.tail[0].x,
      y: this.tail[0].y
    });
  };

  this.draw = function (context) {
    var color = this.color;

    if (game.gameOver && !this.gameOver) {
      color = 'orange';
    }

    if (game.gameOver && this.gameOver) {
      color = 'grey';
    }

    context.fillStyle = color;
    context.fillRect(this.head.x + 1, this.head.y + 1, this.size - 2, this.size - 2);

    this.tail.forEach(piece => {
      context.fillRect(piece.x + 1, piece.y + 1, this.size - 2, this.size - 2);
    });
  }
}

module.exports = snake;