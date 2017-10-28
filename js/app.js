/** Class representing enemy object. */
class Enemy {
  /**
  * Enemy constructor.
  * @param {integer} start_point - Row where enemy is initialized.
  * @param {string} this.sprite - Location of enemy image.
  * @param {integer} this.x - Starting x axis.
  * @param {integer} this.y - Starting y axis.
  */
  constructor(start_point) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = 143 + start_point;
  }

  /** Multiplies with game time for smoother framerate */
  update(dt) {
    let self = this;
    if (this.x + 101 < 605) {
      this.x+=(101*dt);
    } else {
      setTimeout(function() {
        console.log(this.x);
        self.x = -100;
      }, 600);
    }
  }

  /** Draw enemies starting at given x, y location. */
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  }
}


/** Class representing player object. */
class Player {
  /**
  * Player constructor.
  * @param {string} this.sprite - Location of player image.
  * @param {integer} this.x - Starting x axis.
  * @param {integer} this.y - Starting y axis.
  */
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.x = 201;
    this.y = 403;
  }

  /** Multiplies with game time for smoother framerate */
  update(dt) {

  }

  /** Draw main character starting at x, y location. */
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  }

  /**
  * Change x y coordinate upon key input.
  * @param {string} key - String of player input.
  */
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
        if (this.y - 83 <= 68) {
          this.resetPlayer();
        } else {
          this.y-=83;
        }
        break;
      case 'down':
        if (this.y + 83 < 483) {
          this.y+=83;
        }
    }
  }

  /** If contact is made with water, resets start state. */
  resetPlayer() {
    this.x = 201;
    this.y = 403;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];

let start_point = 0;
for (let i = 0; i < 8; i++) {
  const random_choice = Math.random();
  if (random_choice > 0.5) {
    start_point = 83;
  } else {
    start_point = 0;
  }
  allEnemies.push(new Enemy(start_point));
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
