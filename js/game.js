class Game {
  // code to be added
  constructor(startScreen, gameScreen, gameEndScreen) {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = null;
    this.torpedos = [];
    this.height = 610;
    this.width = 971;
    this.enemy = [];
    this.score = 0;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.floor(1000 / 60);
    this.scoreboard = new Scoreboard();
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);

    this.player = new Player(this.gameScreen, 50, 520, 150, 50);
  }

  shot() {
    if (this.torpedos.length >= 50) return;
    this.player.torps--;
    this.torpedos.push(
      new Torpedo(
        this.gameScreen,
        this.player.left + 75,
        this.player.top,
        5,
        15
      )
    );
  }

  gameLoop() {
    console.log("in the game loop");
    this.update();

    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }
  update() {
    this.scoreboard.update(
      this.player.score,
      this.player.fuel,
      this.player.torps
    );
    console.log("in the update");
    this.player.move();
    setTimeout(() => {
      if (this.enemy.length >= 3) return;
      const newBoat = new Boat(this.gameScreen,150,50,"./images/enemy.png"); // prettier-ignore
      this.enemy.push(newBoat);
      this.enemy.forEach((enemy) => enemy.create("left"));
    }, 1000);

    this.torpedos.forEach((element) => {
      element.shot();
    });
    this.enemy.forEach((enemy) => {
      enemy.move(1, enemy.boat);
    });

    for (let i = 0; i < this.enemy.length; i++) {
      if (this.enemy[i] == undefined) continue;
      const enemy = this.enemy[i];
      this.removeHitBoat(enemy, i);
      for (let j = 0; j < this.torpedos.length; j++) {
        // If the player's car collides with an obstacle
        const torpedo = this.torpedos[j];
        if (torpedo.didCollide(enemy)) {
          // Remove the obstacle element from the DOM
          enemy.isHit = true;
          torpedo.element.remove();
          console.log("enemy ", this.enemy);
          // Remove enemy object from the array

          //Need to implement kills to increase +1
        }
      }
    }
  }

  removeHitBoat(obj, i) {
    if (obj.isHit) {
      console.log("removing ", obj);
      this.player.boatsRemaining--;
      this.player.score++;

      obj.boat.remove();
      this.enemy.splice(0 ? this.enemy.length <= 0 : i, 1);
      console.log("remove ", this.enemy);
    }
  }
}
