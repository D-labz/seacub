window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let keyDown = false;
  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    console.log("start game");
    game = new Game();

    game.start();
  }
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = ["ArrowLeft", "ArrowRight", " "];

    // Check if the pressed key is in the possibleKeystrokes array
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();
      if (keyDown && key === " ") return;

      // Update player's directionX and directionY based on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -3;
          break;
        case "ArrowRight":
          game.player.directionX = 3;
          break;
        case " ":
          keyDown = true;
          game.shot();
          break;
      }
    }
  }
  function handleKeyup(event) {
    const key = event.key;
    const possibleKeystrokes = ["ArrowLeft", "ArrowRight", " "];

    // Check if the released key is in the possibleKeystrokes array
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      // Stop the player's movement when the arrow keys are released
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = 0;
          break;
        case "ArrowRight":
          game.player.directionX = 0;
          break;
        case " ":
          keyDown = false;
      }
    }

    restartButton.addEventListener("click", () => {
      location.reload();
    });
    // Add the handleKeydown function as an event listener for the keydown event
  }
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};
