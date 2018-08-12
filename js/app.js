// Enemies our player must avoid
var Enemy = function (x, y, speed) {

    //this variables are used to determine x, y axis and speed of the enemies
    this.x = x;
    this.y = y;
    this.speed = speed;
	
    //The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;

    // Once enemies are off the canvas, they reappear randomly with different speeds
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    };

    //Checks for collisions between the player and an enemy
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    };
};

// Renders the enemy into the game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class focusing on x and y axis
var Player = function (x, y) {

    // Variables for the player to move along x and y axis 
    this.x = x;
    this.y = y;

    //The image of the player of cat girl is added to the playing field 
    this.player = 'images/char-cat-girl.png';
};

Player.prototype.update = function (dt) {

};

// Renders the image of the user into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Allows the user to use the arrow keys for movement
Player.prototype.handleInput = function (keyPress) {

    // Enables user move left by 102 and not to go off the game tiles on the left side
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    };

    // Enables user move right by 102 and not to go off the game tiles on the right side
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    };

    // Enables user move up by 83 and not to go off the game tiles on the up side
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };

    // Enables user move down by 83 and not to go off the game tiles on the bottom side
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    };

    //Resets the position of the user after reaching out to the water to the starting position
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 800);
    };
};


//Places Enemies in an array
var allEnemies = [];

//Keeps 3 enemies are located on the stone road
var enemyLocation = [63, 147, 230];


//Keeps the speed for each enemy at 200 
// Until regenerated randomly in the enemy update function above
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

//Sets the starting position of the player
var player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});