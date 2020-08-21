function preload() {
    // start letters 
    this.load.spritesheet("s", "/images/letterS.png", {
      frameWidth: 59,
      frameHeight: 108
    });
    this.load.spritesheet("t1", "/images/letterT1.png", {
      frameWidth: 60,
      frameHeight: 108
    });
    this.load.spritesheet("a", "/images/letterA.png", {
      frameWidth: 73.95,
      frameHeight: 107
    });
    this.load.spritesheet("r", "/images/letterR.png", {
      frameWidth: 71,
      frameHeight: 105
    });
    this.load.spritesheet("t2", "/images/letterT2.png", {
      frameWidth: 60,
      frameHeight: 108
    });
    // distractions
    this.load.image('email', '/images/email.png');
    this.load.image('meetings', '/images/meetings.png');
    this.load.image('disconnected', '/images/badVpn.png');
    this.load.image('phone', '/images/phone.png');
    this.load.image('toDo', '/images/toDo.png');
    // chill things
    this.load.image('tp', '/images/tp.png');
    this.load.image('coffee', '/images/coffee.png');
    this.load.image('donut', '/images/donut.png');
    this.load.image('martini', '/images/martini.png');
    this.load.image('pizza', '/images/pizza.png');
    this.load.image('waterloo', '/images/waterloo.png');
    // background
    this.load.image('water', '/images/water.png');
    this.load.image('sun', '/images/sun.png');
    this.load.image('cloud1', '/images/cloud1.png');
    this.load.image('cloud2', '/images/cloud2.png');
    this.load.image('affinicado', '/images/affinicado.png');
    this.load.image('affinilime', '/images/affinilime.png');
    // character/board
    this.load.image('workmelon', '/images/workMelon.png');
    this.load.image('dreammelon', '/images/dream.png');
    this.load.image('melonBoard', '/images/boardMelon.png');
    this.load.spritesheet("affinimelon", "/images/affinimelonSheet.png", {
      frameWidth: 53,
      frameHeight: 56
    });
  }
    
  // score tracker
  const gameState = {
    score: 0,
    starting: true,
    playing: false,
    lives: 3,
    timer: 0,
  };
    
  function create() {
    setInterval(function(){gameState.timer++}, 1000)
    // set up keyboard use
    gameState.cursors = this.input.keyboard.createCursorKeys();
  
    // add character and board
    gameState.board = this.physics.add.sprite(225, 400, 'melonBoard');
    gameState.melon = this.physics.add.sprite(225, 350, 'affinimelon');
    this.anims.create({
      key: "3lives",
      frames: this.anims.generateFrameNumbers("affinimelon", {
        start: 0,
        end: 0
      }),
      frameRate: 1,
    });
    this.anims.create({
      key: "2lives",
      frames: this.anims.generateFrameNumbers("affinimelon", {
        start: 1,
        end: 1
      }),
      frameRate: 1,
    });
    this.anims.create({
      key: "1life",
      frames: this.anims.generateFrameNumbers("affinimelon", {
        start: 2,
        end: 2
      }),
      frameRate: 1,
    });
    this.anims.create({
      key: "business",
      frames: this.anims.generateFrameNumbers("affinimelon", {
        start: 3,
        end: 3
      }),
      frameRate: 1,
    });
    function melonLooks(){
      switch(gameState.lives) {
        case 3:
          gameState.melon.anims.play("3lives", true);
          break;
        case 2:
        gameState.melon.anims.play("2lives", true);
          break;
        case 1:
        gameState.melon.anims.play("1life", true);
          break;
        case 0:
        gameState.melon.anims.play("business", true);
          break;
        default:
        gameState.melon.anims.play("3lives", true);
      }
    }
    
    // add background water, sun, and clouds
    gameState.sun = this.physics.add.image(5,5, 'sun');
    gameState.sun.body.gravity.y = -200;
    const water = this.physics.add.staticGroup();
    water.create(325, 488, 'water');
    gameState.friends = this.physics.add.group();
  
    // create clouds
    gameState.friends = this.physics.add.group();
    const friendList= ['affinicado', 'affinilime'];
    // place clouds at random points
    function friendGen () {
      const ranfriend = friendList[Math.floor(Math.random() * friendList.length)];
      //removes gravity from clouds and has them float along at random speeds
      gameState.friends.create(-55, 460, ranfriend).setGravityY(-200).setVelocityX(85);
    }
    // loop to add continuous clouds
    const friendGenLoop = this.time.addEvent({
      delay: 28000,
      callback: friendGen,
      callbackScope: this,
      loop: true,
    });
  
    // create the start square
    gameState.startSquare = this.add.rectangle(325, 250, 500, 400, 0x4985e0);
    gameState.s = this.add.sprite(150, 230, "s");
    gameState.t1 = this.add.sprite(230, 230, "t1");
    gameState.a = this.add.sprite(320, 230, "a");
    gameState.r = this.add.sprite(420, 230, "r");
    gameState.t2 = this.add.sprite(510, 230, "t2");
    gameState.startText = this.add.text(200, 355, 'Press space to begin', { fontSize: '20px', fill: '#fff', fontFamily: "Rammetto One" });
  
    // start text color animation
    this.anims.create({
      key: "rainbowS",
      frames: this.anims.generateFrameNumbers("s", {
        start: 0,
        end: 6
      }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: "rainbowT1",
      frames: this.anims.generateFrameNumbers("t1", {
        start: 0,
        end: 6
      }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: "rainbowA",
      frames: this.anims.generateFrameNumbers("a", {
        start: 0,
        end: 6
      }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: "rainbowR",
      frames: this.anims.generateFrameNumbers("r", {
        start: 0,
        end: 6
      }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: "rainbowT2",
      frames: this.anims.generateFrameNumbers("t2", {
        start: 0,
        end: 6
      }),
      frameRate: 4,
      repeat: -1
    });
  
    // add score text
    gameState.scoreText = this.add.text(280, 455, 'Score: 0', { fontSize: '20px', fill: '#fff', fontFamily: "Rammetto One" });
  
    // create clouds
    gameState.clouds = this.physics.add.group();
    const cloudList= ['cloud1', 'cloud2'];
    // place clouds at random points
    function cloudGen () {
      const yCoord = Math.random()* 300;
      const cloudVelocity = Math.random()*125;
      const ranCloud = cloudList[Math.floor(Math.random() * cloudList.length)];
      //removes gravity from clouds and has them float along at random speeds
      gameState.clouds.create(-100, yCoord, ranCloud).setGravityY(-200).setVelocityX(cloudVelocity);
    }
    // loop to add continuous clouds
    const cloudGenLoop = this.time.addEvent({
      delay: 8000,
      callback: cloudGen,
      callbackScope: this,
      loop: true,
    });
  
    // set the world boundaries and don't let the character fall through the board or the board through the water
    gameState.board.setCollideWorldBounds(true);
    gameState.melon.setCollideWorldBounds(true);
    this.physics.add.collider(water, gameState.board);
    this.physics.add.collider(gameState.board, gameState.melon);
  
    gameState.thisPlace = this;
    // create the distractions
    gameState.distractions = this.physics.add.group();
    const distractionList= ['email', 'meetings', 'disconnected', 'phone', 'toDo'];
    // place distractions at random points
    gameState.distractionGen = function distractionGen () {
      const xCoord = Math.random() * 650;
      const ranDistraction = distractionList[Math.floor(Math.random() * distractionList.length)];
      gameState.distractions.create(xCoord, 10, ranDistraction)
    }
  
  
    // create chilllThings
    gameState.chillThings = this.physics.add.group();
    const chillThingsList= ['donut', 'coffee', 'martini', 'pizza', 'waterloo'];
    // place chillThings at random points
    gameState.chillThingGen = function chillThingGen () {
      const xCoord = Math.random() * 650;
      const ranchillThing = chillThingsList[Math.floor(Math.random() * chillThingsList.length)];
      gameState.chillThings.create(xCoord, 10, ranchillThing)
    }
    
  
    // let the chillThings sit on the board
    this.physics.add.collider(gameState.board, gameState.chillThings);
    // get points for eating the food
    this.physics.add.collider(gameState.chillThings, gameState.melon, (melon, obj) => {
      obj.destroy();
      gameState.score += 10;
      gameState.scoreText.setText(`Score: ${gameState.score}`);
      if (gameState.lives < 3){
        gameState.lives++;
      }
      melonLooks();
    });
  
    // lose points and chill when the food touches the water
    this.physics.add.collider(water, gameState.chillThings, (water, obj) => {
      obj.destroy();
      if (gameState.score > 0){
        gameState.score -= 10;
      }
      gameState.scoreText.setText(`Score: ${gameState.score}`);
      gameState.lives-=1;
      if(gameState.lives === 0){
        gameState.playing=false;
        this.physics.pause();
        gameState.chillThingGenLoop.destroy();
        gameState.distractionGenLoop.destroy();
        gameState.chillThings.clear(false,true);
        gameState.distractions.clear(false,true);
        gameState.endSquare = this.add.rectangle(325, 250, 500, 400, 0x4985e0);
        gameState.distractionText = this.add.text(98, 75, 'Too many distractions!', { fontSize: '32px', fill: '#fff', fontFamily: "Rammetto One" });
        gameState.moodText = this.add.text(130, 125, 'Your chill mood is gone', { fontSize: '28px', fill: '#fff', fontFamily: "Rammetto One" });
        gameState.workMelon = this.physics.add.sprite(300, 320, 'workmelon');
        gameState.dreamMelon = this.physics.add.sprite(390, 225, 'dreammelon');
        gameState.startOverText = this.add.text(175, 405, 'Press space to try again', { fontSize: '20px', fill: '#fff', fontFamily: "Rammetto One" });
      }
      melonLooks();
    });
  
    // lose a life when catching a distraction
    this.physics.add.collider(gameState.distractions, gameState.board)
    this.physics.add.collider(gameState.distractions, gameState.melon, (melon, obj) => {
      obj.destroy();
      gameState.lives-=1;
      if(gameState.lives === 0){
        gameState.playing=false;
        this.physics.pause();
        gameState.chillThingGenLoop.destroy();
        gameState.distractionGenLoop.destroy();
        gameState.chillThings.clear(false,true);
        gameState.distractions.clear(false,true);
        gameState.endSquare = this.add.rectangle(325, 250, 500, 400, 0x4985e0);
        gameState.distractionText = this.add.text(98, 75, 'Too many distractions!', { fontSize: '32px', fill: '#fff', fontFamily: "Rammetto One" });
        gameState.moodText = this.add.text(130, 125, 'Your chill mood is gone', { fontSize: '28px', fill: '#fff', fontFamily: "Rammetto One" });
        gameState.workMelon = this.physics.add.sprite(300, 320, 'workmelon');
        gameState.dreamMelon = this.physics.add.sprite(390, 225, 'dreammelon');
        gameState.startOverText = this.add.text(175, 405, 'Press space to try again', { fontSize: '20px', fill: '#fff', fontFamily: "Rammetto One" });
      }
      melonLooks();
    });
  
    
  }
    
  function update() {
  
    if(gameState.playing===false && gameState.starting===true){
      gameState.s.anims.play("rainbowS", true);
      gameState.t1.anims.play("rainbowT1", true);
      gameState.a.anims.play("rainbowA", true);
      gameState.r.anims.play("rainbowR", true);
      gameState.t2.anims.play("rainbowT2", true);
    }
    
    // start game from start screen
    if(gameState.playing===false && gameState.starting===true && gameState.cursors.space.isDown){
      gameState.starting=false;
      gameState.playing=true;
      gameState.startSquare.destroy();
      gameState.s.destroy();
      gameState.t1.destroy();
      gameState.a.destroy();
      gameState.r.destroy();
      gameState.t2.destroy();
      gameState.startText.destroy();
      // generate distractions
      gameState.distractionGenLoop = this.time.addEvent({
        delay: 4500,
        callback: gameState.distractionGen,
        callbackScope: this,
        loop: true,
      });
      // loop chillThings
      gameState.chillThingGenLoop = this.time.addEvent({
        delay: 3750,
        callback: gameState.chillThingGen,
        callbackScope: this,
        loop: true,
      });
    }
  
    // restart game from end screen
    if (gameState.cursors.space.isDown&& gameState.playing===false&&gameState.starting===false){
      gameState.playing=true;
      gameState.lives=3;
      gameState.score=0;
      gameState.timer=0;
      gameState.melon.anims.play("3lives", true);
      gameState.scoreText.setText(`Score: ${gameState.score}`);
      gameState.endSquare.destroy();
      gameState.distractionText.destroy();
      gameState.moodText.destroy();
      gameState.startOverText.destroy();
      gameState.workMelon.destroy();
      gameState.dreamMelon.destroy();
      this.physics.resume();
      gameState.distractionGenLoop.reset({
        delay: 4500,
        callback: gameState.distractionGen,
        callbackScope: gameState.thisPlace,
        loop: true,
      });
      gameState.chillThingGenLoop.reset({
        delay: 3750,
        callback: gameState.chillThingGen,
        callbackScope: gameState.thisPlace,
        loop: true,
      });
    }
  
    // sometimes the boat falls over and I don't really know why
    if(gameState.melon.y>420){
      gameState.playing=false;
      this.physics.pause();
      gameState.chillThingGenLoop.destroy();
      gameState.distractionGenLoop.destroy();
      gameState.endSquare = this.add.rectangle(325, 250, 500, 400, 0x4985e0);
      gameState.distractionText = this.add.text(125, 155, 'Oh no you capsized!', { fontSize: '32px', fill: '#fff', fontFamily: "Rammetto One" });
      gameState.moodText = this.add.text(98, 245, 'Refresh the page to try again', { fontSize: '25px', fill: '#fff', fontFamily: "Rammetto One" });
    }
  
    // make the game harder every 30 seconds
    if(gameState.playing===true && gameState.timer===30){
      gameState.distractionGenLoop.reset({
        delay: 3500,
        callback: gameState.distractionGen,
        callbackScope: this,
        loop: true,
      });
    }
    if(gameState.playing===true && gameState.timer===60){
      gameState.distractionGenLoop.reset({
        delay: 3500,
        callback: gameState.distractionGen,
        callbackScope: this,
        loop: true,
      });
      gameState.chillThingGenLoop.reset({
        delay: 3250,
        callback: gameState.chillThingGen,
        callbackScope: gameState.thisPlace,
        loop: true,
      });
    }
    if(gameState.playing===true && gameState.timer===90){
      gameState.distractionGenLoop.reset({
        delay: 2500,
        callback: gameState.distractionGen,
        callbackScope: this,
        loop: true,
      });
    }
    if(gameState.playing===true && gameState.timer===120){
      gameState.distractionGenLoop.reset({
        delay: 2225,
        callback: gameState.distractionGen,
        callbackScope: this,
        loop: true,
      });
      gameState.chillThingGenLoop.reset({
        delay: 2850,
        callback: gameState.chillThingGen,
        callbackScope: gameState.thisPlace,
        loop: true,
      });
    }
    if(gameState.playing===true && gameState.timer===150){
      gameState.distractionGenLoop.reset({
        delay: 1950,
        callback: gameState.distractionGen,
        callbackScope: this,
        loop: true,
      });
    }
    if(gameState.playing===true && gameState.timer===180){
      gameState.distractionGenLoop.reset({
        delay: 2005,
        callback: gameState.distractionGen,
        callbackScope: this,
        loop: true,
      });
      gameState.chillThingGenLoop.reset({
        delay: 2350,
        callback: gameState.chillThingGen,
        callbackScope: gameState.thisPlace,
        loop: true,
      });
    }
    if(gameState.playing===true && gameState.timer===210){
      gameState.distractionGenLoop.reset({
        delay: 1550,
        callback: gameState.distractionGen,
        callbackScope: this,
        loop: true,
      });
    }
    if(gameState.playing===true && gameState.timer===240){
      gameState.distractionGenLoop.reset({
        delay: 1350,
        callback: gameState.distractionGen,
        callbackScope: this,
        loop: true,
      });
      gameState.chillThingGenLoop.reset({
        delay: 1800,
        callback: gameState.chillThingGen,
        callbackScope: gameState.thisPlace,
        loop: true,
      });
    }
    if(gameState.playing===true && gameState.timer===270){
      gameState.distractionGenLoop.reset({
        delay: 1150,
        callback: gameState.distractionGen,
        callbackScope: this,
        loop: true,
      });
    }
    if(gameState.playing===true && gameState.timer===300){
      gameState.distractionGenLoop.reset({
        delay: 805,
        callback: gameState.distractionGen,
        callbackScope: this,
        loop: true,
      });
      gameState.chillThingGenLoop.reset({
        delay: 1350,
        callback: gameState.chillThingGen,
        callbackScope: gameState.thisPlace,
        loop: true,
      });
    }
    if(gameState.playing===true && gameState.timer===330){
      gameState.distractionGenLoop.reset({
        delay: 645,
        callback: gameState.distractionGen,
        callbackScope: this,
        loop: true,
      });
    }
    if(gameState.playing===true && gameState.timer===360){
      gameState.distractionGenLoop.reset({
        delay: 455,
        callback: gameState.distractionGen,
        callbackScope: this,
        loop: true,
      });
      gameState.chillThingGenLoop.reset({
        delay: 900,
        callback: gameState.chillThingGen,
        callbackScope: gameState.thisPlace,
        loop: true,
      });
    }
    
    // set characte and sun movements while playing
    if (gameState.playing===true ){
      gameState.sun.setVelocityX(.05);
      if (gameState.cursors.left.isDown) {
        gameState.board.setVelocityX(-150);
        gameState.melon.setVelocityX(-150);
        gameState.melon.rotation = .35;
      } else if (gameState.cursors.right.isDown) {
        gameState.board.setVelocityX(150);
        gameState.melon.setVelocityX(150);
        gameState.melon.rotation = -.75;
    
      } else {
        gameState.board.setVelocityX(0);
        gameState.melon.setVelocityX(0);
        gameState.melon.rotation = 0;
      }
    } 
    
  }
    
  const config = {
    type: Phaser.AUTO,
    width: 650,
    height: 500,
    backgroundColor: "b9eaff",
    parent: 'melonGame',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 },
        enableBody: true,
      }
    },
    scene: {
      preload,
      create,
      update
    }
  };
  
  const game = new Phaser.Game(config);