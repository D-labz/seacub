class Boat {
  constructor(gameScreen, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.imgSrc = imgSrc;
    this.isSpawning = false;
  }

  create(spawnLocation) {
    if (this.isSpawning) return;
    this.isSpawning = true;
    const boat = document.createElement("img");
    boat.setAttribute("src", this.imgSrc);
    boat.style.width = `${this.width}px`;
    boat.style.height = `${this.height}px`;
    boat.style.top = `${this.top}px`;
    boat.style.position = "absolute";
    boat.setAttribute("class", "enemy");

    if (spawnLocation === "left") {
      boat.style.left = `-${200}px`;
    } else if (spawnLocation === "right") {
      boat.style.left = `${
        parseInt(
          this.gameScreen.style.width.slice(
            0,
            this.gameScreen.style.width.length - 2
          )
        ) + 100
      }px`;
    }

    this.gameScreen.appendChild(boat);
    setTimeout(() => (this.isSpawning = false), 5000);

    // Return the created boat element for later reference
    return boat;
  }

  move(directionX, boat) {
    const currentWidth = parseInt(
      boat.style.width.slice(0, boat.style.width.length - 2)
    );
    const currentLeft = parseInt(
      boat.style.left.slice(0, boat.style.left.length - 2)
    );
    boat.style.left = `${currentLeft + directionX}px`;
    if (currentLeft > this.gameScreen.offsetWidth + currentWidth) {
      console.log("removed");
      boat.remove();
    }
  }
}
