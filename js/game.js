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
      if (this.enemy.length >= 1) return;
      const newBoat = new Boat(this.gameScreen,160,150,50,"./images/enemy.png"); // prettier-ignore
      this.enemy.push(newBoat); // prettier-ignore
      this.enemy.forEach((enemy) => enemy.create("left"));
    }, 1);

    this.torpedos.forEach((element) => {
      element.shot();
    });
    console.log(boats);
    boats.forEach((boat) => {
      this.enemy.forEach((enemy) => {
        enemy.move(1, boat);
      });
    });
  }
}
