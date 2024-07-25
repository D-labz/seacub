class Scoreboard {
  constructor() {
    this.score = document.getElementById("kills-counter");
    this.torpedos = document.getElementById("torps-counter");
    this.fuel = document.getElementById("fuel-counter");
  }

  update(score, fuel, torps) {
    this.score.innerHTML = `KILLS\n${score}`;
    this.torpedos.innerHTML = `TORPS\n${torps}`;
    this.fuel.innerHTML = `FUEL\n${fuel}`;
  }
}
