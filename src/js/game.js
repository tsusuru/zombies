// src/js/game.js
import { Engine, Vector, Actor, CollisionType, Color } from "excalibur";
import { Player } from "./player.js";
import { ZombieSpawner } from "./zombieSpawner.js";
import { ResourceLoader } from "./resources.js";
import { Background } from "./background.js";

export class Game extends Engine {
  constructor() {
    super({ width: 800, height: 600, pointerScope: true });
    this.spawner = new ZombieSpawner(this, 2000);
    this.showDebug(true)
  }

  // hier start het spel en worden muren/speler/background toegevoegd
  startGame() {
    const start = new Vector(this.drawWidth / 2, this.drawHeight / 2);
    this.player = new Player(start);
    this.add(this.player);

    const wallThickness = 32;
    this.add(new Actor({
      x: this.drawWidth / 2,
      y: -wallThickness / 2,
      width: this.drawWidth,
      height: wallThickness,
      collisionType: CollisionType.Fixed,
      color: Color.Transparent
    }));
    this.add(new Actor({
      x: this.drawWidth / 2,
      y: this.drawHeight + wallThickness / 2,
      width: this.drawWidth,
      height: wallThickness,
      collisionType: CollisionType.Fixed,
      color: Color.Transparent
    }));
    this.add(new Actor({
      x: -wallThickness / 2,
      y: this.drawHeight / 2,
      width: wallThickness,
      height: this.drawHeight,
      collisionType: CollisionType.Fixed,
      color: Color.Transparent
    }));
    this.add(new Actor({
      x: this.drawWidth + wallThickness / 2,
      y: this.drawHeight / 2,
      width: wallThickness,
      height: this.drawHeight,
      collisionType: CollisionType.Fixed,
      color: Color.Transparent
    }));

    this.currentScene.player = this.player;

    let bg = new Background();
    this.add(bg);
  }

  // hier wordt de spawner elke frame geüpdatet
  onPreUpdate(engine) {
    this.spawner.update(engine.clock.elapsed());
  }
}

const game = new Game();
game.start(ResourceLoader).then(() => {
  game.startGame();
});
