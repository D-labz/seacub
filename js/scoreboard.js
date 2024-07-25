class Scoreboard {
  constructor() {
    this.score = document.getElementById("score-counter");
    this.torpedos = document.getElementById("torps-counter");
    this.fuel = document.getElementById("fuel-counter");
  }

  update(score, fuel, torps) {
    this.score.innerHTML = score;
    this.torpedos.innerHTML = torps;
    this.fuel.innerHTML = fuel;
  }
}
