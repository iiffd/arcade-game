// Enemies our player must avoid
class Enemy {
  constructor() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = 143;
  }

  update(dt) {
    const choice = Math.random();

    if (this.x + 101 < 605) {
      this.x+=(101*dt);
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.x = 101;
    this.y = 403;
  }

  update(dt) {

  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  }

  /** Change x y coordinate upon key input */
  handleInput(key) {
    switch (key) {
      case 'right':
        if (this.x + 101 < 505) {
          this.x+=101;
        }
        break;
      case 'left':
      if (this.x - 101 >= 0) {
        this.x-=101;
      }
      break;
      case 'up':
        if (this.y - 83 >= -15) {
          this.y-=83;
        }
        break;
      case 'down':
        if (this.y + 83 < 483) {
          this.y+=83;
        }

    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];

let start_point = '';
for (let i = 0; i < 8; i++) {
  allEnemies.push(new Enemy());
}
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
