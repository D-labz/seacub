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
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);

    this.player = new Player(this.gameScreen, 50, 570, 150, 50);
  }

  shot() {
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
    console.log("in the update");
    this.player.move();
    const boats = [...document.querySelectorAll(".enemy")];
    setTimeout(() => {
      if (this.enemy.length >= 3) return;
      const newBoat = new Boat(this.gameScreen,150,50,"./images/enemy.png"); // prettier-ignore
      this.enemy.push(newBoat); // prettier-ignore
      this.enemy.forEach((enemy) => enemy.create("left"));
    }, 1);

    this.torpedos.forEach((element) => {
      element.shot();
    });
    console.log(boats);
    this.enemy.forEach((enemy) => {
      enemy.move(1, enemy.boat);
    });

    for (let i = 0; i < this.enemy.length; i++) {
      if (this.enemy[i] == undefined) continue;
      const enemy = this.enemy[i];
      for (let j = 0; j < this.torpedos.length; j++) {
        // If the player's car collides with an obstacle
        const torpedo = this.torpedos[j];
        if (torpedo.didCollide(enemy)) {
          // Remove the obstacle element from the DOM
          enemy.boat.remove();
          this.enemy.splice(i, 1);
          torpedo.element.remove();
          i--;
          console.log("enemy ", this.enemy);
          // Remove enemy object from the array

          //Need to implement kills to increase +1
        }
      }
    }
  }
}
