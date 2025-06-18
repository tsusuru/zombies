// src/js/zombie.js
import { Actor, Vector, CollisionType, CircleCollider } from "excalibur";
import { Resources } from "./resources.js";
import { HealthBar } from "./healthbar.js";
import { Player } from "./player.js";

export class Zombie extends Actor {
  constructor(
    spawnPos = new Vector(0, 0), 
    speed = 50, 
    droppedMoney = 5, 
    maxHealth = 2
  ) {
    super({
      pos: spawnPos,
      width: 20,
      height: 20,
      anchor: new Vector(0.5, 0.5),
      collisionType: CollisionType.Passive,
    });
    this.speed = speed;
    this.droppedMoney = droppedMoney;
    this.maxHealth = maxHealth;
    this.healthBar = new HealthBar(maxHealth, this.width, 6);
    this.enteredPlayfield = false;

    this.collider.set(new CircleCollider({
      radius: this.width,
    }));
  }

  // hier wordt de zombie klaargezet
  onInitialize(engine) {
    const sprite = Resources.Zombie.toSprite();
    if (sprite) {
      sprite.scale = new Vector(0.3, 0.3);
      this.graphics.use(sprite);
    }
    this.on('collisionstart', evt => this.handleCollision(evt));
  }

  // hier volgt de zombie de speler en wordt collisionType aangepast
  onPreUpdate(engine) {
    const player = this.scene.player;
    if (player) {
      const dir = player.pos.sub(this.pos).normalize();
      this.vel = dir.scale(this.speed);
    }
    if (
      !this.enteredPlayfield &&
      this.pos.x > 0 && this.pos.x < engine.drawWidth &&
      this.pos.y > 0 && this.pos.y < engine.drawHeight
    ) {
      this.collisionType = CollisionType.Active;
      this.enteredPlayfield = true;
    }
  }

  // hier krijgt speler damage
  handleCollision(event) {
    const other = event.other.owner;
    if (other instanceof Player) {
      other.takeDamage(1);
    }
  }

  // hier krijgt zombie damage
  takeDamage(amount) {
    this.maxHealth -= amount;
    if (this.maxHealth <= 0) {
        if (this.scene.player) {
              this.scene.player.score += 1;
              console.log(`Score: ${this.scene.player.score}`);
            }
      this.kill();
    }
  }
}