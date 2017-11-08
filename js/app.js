/** Class representing enemy object. */
class Enemy {
  /**
  * Enemy constructor.
  * @param {integer} start_point - Row where enemy is initialized.
  * @param {object} player - Player object for detecting player location.
  * @param {string} this.sprite - Location of enemy image.
  * @param {integer} this.x - Starting x axis.
  * @param {integer} this.y - Starting y axis.
  */
  constructor(start_point, player) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = 60 + start_point;
    this.speed = Math.random() * 5;
    this.player = player;
  }

  /** Multiplies with game time for smoother framerate */
  update(dt) {
    let self = this;

    // Movement for enemies
    if (self.x + 101 < 605) {
      self.x+=(101*dt*self.speed);
    } else {
      setTimeout(function() {
        self.x = -120;
        self.speed = Math.random() * 5;
      }, 600);
    }
    this.detectCollision();
  }

  /** Draw enemies starting at given x, y location. */
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  /** Detect collision with player. **/
  detectCollision() {
    if (this.x + 77 > this.player.x && this.x - 70 < this.player.x &&
        this.y == this.player.y - 11) {
      this.player.resetPlayer();
    }
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
        if (this.x + 101 <= 403) {
          this.x+=101;
        }
        break;
      case 'left':
      if (this.x - 101 >= -1) {
        this.x-=101;
      }
      break;
      case 'up':
        if (this.y - 83 <= 68) {
          this.resetPlayer();
          winMessage();
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

/** Open modal with win message when water is reached. */
function winMessage() {
  $('#end-message').text("Great job! You won!");
  $('#myModal').modal('toggle');
}

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const player = new Player();

// Removes modal on x click.
$('.close').click(function() {
  $('#myModal').modal('toggle');
});

// Play again button. Closes modal.
$('.btn-success').click(function() {
  $('#myModal').modal('toggle');
});

let start_point = 0;

// Initialize enemies for each row.
for (let i = 0; i < 3; i++) {
  for (let i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(start_point, player));
  }
  start_point += 83;
}

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
