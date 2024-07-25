class Player {
  constructor(gameScreen, left, top, width, height, directionX, element) {
    this.gameScreen = document.getElementById("game-screen");
    this.left = left;
    this.top = top;
    this.width = width;
    this.heigth = height;
    this.directionX = 0;
    this.element = document.createElement("img");
    this.element.src = "images/player.png";

    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.torps = 25;
    this.score = 0;
    this.fuel = 60;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left += this.directionX;

    if (this.left < 10) {
      this.left = 10;
    }
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}
