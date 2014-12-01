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
  jump : 100,
  moveSpeed : 150,



  /**************** PRELOAD ****************/

  preload : function() {
    game.load.image('playerAvatar', 'assets/img/playerSquare.png');
    game.load.image('wallBlock', 'assets/img/wallBlock.png');
    game.load.image('enemyBlock', 'assets/img/enemyBlock.png');
    game.load.image('sky', 'assets/img/sky.png');
    game.load.image('circle', 'assets/img/circle.png');
  },



  /**************** CREATE ****************/

  create : function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0,0,3200,600);
    var sky = game.add.sprite(0,0,'sky');
    sky.scale.setTo(4,1);
    this.platforms = game.add.group();
    this.platforms.enableBody = true;
    // var ground = this.platforms.create(0, game.world.height - 64, 'wallBlock');
    // ground.scale.setTo(50, 4);
    // ground.body.immovable = true;
    var circle = this.platforms.create(800/2-55, 600/2-50, 'playerAvatar');
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
    this.cursors = game.input.keyboard.createCursorKeys();

  // create random enemies every few seconds
    // setInterval(this.createEnemy, 3000);
  },



  /**************** UPDATE ****************/

  update : function() {
    game.physics.arcade.collide(this.player, this.platforms);

    // this.player.body.acceleration.y = 0;
    // this.player.body.acceleration.x = 0;

    if (this.player.position.x > 100 && this.player.position.x < 700 && this.player.position.y > 50 && this.player.position.y < 550)
      this.setGrav();
    else {
      this.player.body.gravity.x = 0;
      this.player.body.gravity.y = 0;
    }

  // PLAYER TOUCHING GROUND
    if (this.player.body.touching.down) {
      // this.setGrav();
      this.player.body.velocity.x = 0;
      this.player.body.gravity.x = 0;

      if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -this.moveSpeed;
      } else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = this.moveSpeed;
      }
    // handle jumping
      if (this.cursors.up.isDown) {
        this.player.body.velocity.y = -(this.jump);
      }
    }

  // PLAYER ON RIGHT SIDE OF WORLD
    else if (this.player.body.touching.left) {
      // this.setGrav();
      this.player.body.velocity.y = 0;
      this.player.body.gravity.y = 0;

      // moving up and down
      if (this.cursors.up.isDown) {
        this.player.body.velocity.y = -this.moveSpeed;
      } else if (this.cursors.down.isDown) {
        this.player.body.velocity.y = this.moveSpeed;
      }
      // jumping
      if (this.cursors.right.isDown) {
        this.player.body.velocity.x = this.jump;
      }
    }

  // PLAYER ON LEFT SIDE OF WORLD
    else if (this.player.body.touching.right) {
      // this.setGrav();
      this.player.body.velocity.y = 0;
      this.player.body.gravity.y = 0;

      // moving up and down
      if (this.cursors.up.isDown) {
        this.player.body.velocity.y = -this.moveSpeed;
      } else if (this.cursors.down.isDown) {
        this.player.body.velocity.y = this.moveSpeed;
      }
      // jumping
      if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -(this.jump);
      }
    }

  // PLAYER ON UNDER SIDE OF WORLD
    else if (this.player.body.touching.up) {
      // this.setGrav();
      this.player.body.velocity.x = 0;
      this.player.body.gravity.x = 0;

      // moving up and down
      if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -this.moveSpeed;
      } else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = this.moveSpeed;
      }
      // jumping
      if (this.cursors.down.isDown) {
        this.player.body.velocity.y = (this.jump);
      }
    } //else {

    if (game.input.keyboard.isDown(Phaser.Keyboard.W))
      this.player.body.velocity.y += -5;
    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
      this.player.body.velocity.x += -5;
    if (game.input.keyboard.isDown(Phaser.Keyboard.S))
      this.player.body.velocity.y += 5;
    if (game.input.keyboard.isDown(Phaser.Keyboard.D))
      this.player.body.velocity.x += 10;
    //}




  // make camera follow the player
    game.camera.follow(this.player);

    // this.player.body.acceleration.x += this.player.body.gravity.x;
    // this.player.body.acceleration.y += this.player.body.gravity.y;

    
  // PRINT SOME STUFF TO SCREEN
    // console.log("gravX: " + this.player.body.gravity.x + " :: gravY: " + this.player.body.gravity.y);
    document.getElementById("gravity").innerHTML = "gravX: " + this.player.body.gravity.x + "<br>gravY: " + this.player.body.gravity.y
    + "<br>x Accel: " + this.player.body.acceleration.x+ "<br>y Accel: " + this.player.body.acceleration.y+ "<br>x Vel: " + this.player.body.velocity.x+ "<br>y Vel: " + this.player.body.velocity.y;

  },

  createEnemy : function() {
    this.enemies.create(game.add.sprite(Math.random()*800, Math.random()*536, 'enemyBlock'));  
  },

  setGrav : function() {
    var deltaX = this.player.position.x - 400;
    var deltaY = this.player.position.y - 300;
    var dist = Math.sqrt(Math.pow(Math.abs(deltaX),2) + Math.pow(Math.abs(deltaY), 2));
    this.player.body.gravity.x = -deltaX / (Math.sqrt(dist))*20;
    this.player.body.gravity.y = -deltaY / (Math.sqrt(dist))*20;
  }

} // end of main state




game.state.add('main', mainState);
game.state.start('main');
