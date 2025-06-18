import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
import { Zombie } from "./zombie.js";

export class Projectile extends Actor {
  constructor(pos, direction, speed = 400, damage = 1) {
    super({
      pos,
      width: 2,
      height: 2,
      anchor: new Vector(0.5, 0.5),
      collisionType: CollisionType.Passive,
    });
    this.direction = direction.normalize();
    this.speed = speed;
    this.damage = damage;
  }

  // hier wordt de projectile sprite en snelheid ingesteld
  onInitialize(engine) {
    if (Resources.Bullet.isLoaded()) {
      const sprite = Resources.Bullet.toSprite();
      sprite.scale = new Vector(0.2, 0.2);
      this.graphics.use(sprite);
    }

    this.vel = this.direction.scale(this.speed);

    this.on("collisionstart", (evt) => this.handleCollision(evt));
  }

  // hier krijgt zombie damage als hij geraakt wordt
  handleCollision(event) {
    const other = event.other.owner;
    if (other instanceof Zombie) {
      other.takeDamage(this.damage);
      this.kill();
    }
  }
}


