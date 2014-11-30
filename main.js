var game = new Phaser.Game(800,600, Phaser.AUTO, '');


var mainState = {

platforms : "",
enemies : "",
player : "",// {
//   image = "",
//   secondJump = false,

// },
cursors : "",
gravity : 200,
jump : 50,
moveSpeed : 150,

preload : function() {
  game.load.image('playerAvatar', 'assets/img/playerSquare.png');
  game.load.image('wallBlock', 'assets/img/wallBlock.png');
  game.load.image('enemyBlock', 'assets/img/enemyBlock.png');
  game.load.image('sky', 'assets/img/sky.png');
  game.load.image('circle', 'assets/img/circle.png');
},

create : function() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0,0,'sky');
  this.platforms = game.add.group();
  this.platforms.enableBody = true;
  var ground = this.platforms.create(0, game.world.height - 64, 'wallBlock');
  ground.scale.setTo(50, 4);
  ground.body.immovable = true;
  var circle = this.platforms.create(game.world.width/2-55, game.world.height/2-50, 'playerAvatar');
  circle.body.immovable = true;
  circle.scale.setTo(6.875,6.25);

// create enemy physics
  this.enemies = game.add.group();
  this.enemies.enableBody = true;
  
  game.physics.arcade.enable(this.enemies);
  // this.enemies.body.gravity.y = gravity;

// create player
  this.player = game.add.sprite(64, game.world.height - (64+16), 'playerAvatar');
  game.physics.arcade.enable(this.player);
  // this.player.body.gravity.y = this.gravity;
  this.player.body.collideWorldBounds = true;
  console.log(this.player);
// create input keys
  cursors = game.input.keyboard.createCursorKeys();

// make camera follow the player
  game.camera.follow(this.player);

// create random enemies every few seconds
  // setInterval(this.createEnemy, 3000);
},

update : function() {
  game.physics.arcade.collide(this.player, this.platforms);

// player touching the ground
  if (this.player.body.touching.down) {
    this.player.body.velocity.x = 0;
    // console.log("down");

    if (cursors.left.isDown) {
      this.player.body.velocity.x = -this.moveSpeed;
    } else if (cursors.right.isDown) {
      this.player.body.velocity.x = this.moveSpeed;
    }
  // handle jumping
    if (cursors.up.isDown/* && this.player.body.touching.down*/) {
      this.player.body.velocity.y = -(this.gravity+this.jump);
    }
  } else {
    if (cursors.left.isDown) {
      this.player.body.velocity.x = -(this.moveSpeed / 2);
    } else if (cursors.right.isDown) {
      this.player.body.velocity.x = (this.moveSpeed / 2);
    }
  }

// player touching left side to a platform's right side
  if (this.player.body.touching.left) {
    this.player.body.velocity.y = 0;
    // console.log("left");

    // moving up and down
    if (cursors.up.isDown) {
      this.player.body.velocity.y += -this.moveSpeed;
    } else if (cursors.down.isDown) {
      this.player.body.velocity.y += this.moveSpeed;
    }
    // jumping
    if (cursors.right.isDown) {
      this.player.body.velocity.x += this.gravity*this.jump;
    }
  }

// player touching right side to a platform's left side
  if (this.player.body.touching.right) {
    this.player.body.velocity.y = 0;
    // console.log("right");

    // moving up and down
    if (cursors.up.isDown) {
      this.player.body.velocity.y = -this.moveSpeed;
    } else if (cursors.down.isDown) {
      this.player.body.velocity.y = this.moveSpeed;
    }
    // jumping
    if (cursors.right.isDown) {
      this.player.body.velocity.x = -(this.gravity*this.jump);
    }
  }

// player touching top side to a platform's bottom side
  if (this.player.body.touching.up) {
    this.player.body.velocity.x = 0;
    // console.log("right");

    // moving up and down
    if (cursors.left.isDown) {
      this.player.body.velocity.x = -this.moveSpeed;
    } else if (cursors.right.isDown) {
      this.player.body.velocity.x = this.moveSpeed;
    }
    // jumping
    if (cursors.down.isDown) {
      this.player.body.velocity.y = (this.gravity*this.jump);
    }
  }


  // if (this.player.x > 400) {
  //   this.gravity = -50;
  //   this.player.body.gravity.y = this.gravity;
  // } else {
  //   this.gravity = 200;
  //   this.player.body.gravity.y = this.gravity;
  // }
  // if (this.player.y > 400 && this.player.y < 450) {
  //   this.player.body.velocity.x = 300;
  // }

  var deltaX = this.player.position.x - 400;
  var deltaY = this.player.position.y - 300;
  this.player.body.gravity.x = -deltaX*2;//Math.cos(-deltaX);
  this.player.body.gravity.y = -deltaY*2;//Math.sin(deltaY);

  console.log("gravX: " + this.player.body.gravity.x + " :: gravY: " + this.player.body.gravity.y);

},

createEnemy : function() {
  this.enemies.create(game.add.sprite(Math.random()*800, Math.random()*536, 'enemyBlock'));  
}

} // end of main state





game.state.add('main', mainState);
game.state.start('main');
