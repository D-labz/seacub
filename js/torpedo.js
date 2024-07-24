class Torpedo {
  constructor(gameScreen, left, top, width, height, directionY, element) {
    this.gameScreen = document.getElementById("game-screen");

    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src = "images/torpedo.png";

    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;

    this.gameScreen.appendChild(this.element);
  }

  shot() {
    this.top -= 3;
    if (this.top < 120) {
      this.element.remove();
    }
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
  }
}
