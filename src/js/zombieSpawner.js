// src/js/zombieSpawner.js
import { Vector } from "excalibur";
import { Zombie } from "./zombie.js";

export class ZombieSpawner {
  constructor(engine, interval = 3000, maxZombies = 10) {
    this.engine = engine;
    this.interval = interval;
    this.timer = 0;
    this.maxZombies = maxZombies;
    this.activeZombies = 0;
  }

  // hier wordt gekeken of er een zombie gespawned mag worden
  update(delta) {
    this.timer += delta;
    if (this.timer >= this.interval && this.activeZombies < this.maxZombies) {
      this.spawn();
      this.timer = 0;
    }
  }

  // hier spawn je een zombie buiten het scherm
  spawn() {
    const margin = 30;
    const edge = Math.floor(Math.random() * 4);
    let x, y;

    switch (edge) {
      case 0:
        x = Math.random() * this.engine.drawWidth;
        y = -margin;
        break;
      case 1:
        x = this.engine.drawWidth + margin;
        y = Math.random() * this.engine.drawHeight;
        break;
      case 2:
        x = Math.random() * this.engine.drawWidth;
        y = this.engine.drawHeight + margin;
        break;
      case 3:
        x = -margin;
        y = Math.random() * this.engine.drawHeight;
        break;
    }

    const speed = Math.random() < 0.5
      ? 50 + Math.random() * 30
      : 100 + Math.random() * 50;

    const zombie = new Zombie(new Vector(x, y), speed);

    this.activeZombies++;
    zombie.on('kill', () => {
      this.activeZombies--;
    });

    this.engine.add(zombie);
  }
}
