class EnemyLimitHandler {
  constructor() {
    this.enemies = [];
  }

  add(enemy) {
    this.enemies.push(enemy);
    this.enemies.forEach((x) => x.create("left"));
  }

  filter() {
    this.enemies = this.enemies.filter((x) => !x.isHit);
  }

  move(x) {
    this.enemies.forEach((x) => {
      x.move(x, x.boat);
    });
  }
}
