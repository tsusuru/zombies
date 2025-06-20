// src/js/player.js
import { Actor, Vector, Keys, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
import { HealthBar } from "./healthbar.js";
import { Weapon } from "./weapon.js";
import { Zombie } from "./zombie.js";

export class Player extends Actor {
  currentAim = new Vector(0, 0); // private

  constructor(startPos = new Vector(100, 100)) {
    super({
      pos: startPos,
      width: 50,
      height: 50,
      collisionType: CollisionType.Active
    });
    this.speed = 200;
    this.score = 0;
    this.currentWeapon = new Weapon({
      ammo: 20,
      damage: 1,
      durability: 100,
      speed: 500
    });
  
  }

  // hier wordt de speler sprite klaargezet en pointer events toegevoegd
  onInitialize(engine) {
    const sprite = Resources.Player.toSprite();
    if (sprite.width > 0 && sprite.height > 0) {
        const scaleX = this.width / sprite.width;
        const scaleY = this.height / sprite.height;
        sprite.scale = new Vector(scaleX, scaleY);
    } else {
        console.warn("Sprite dimensions are invalid. Check the resource file.");
    }
    this.graphics.use(sprite);

    this.enableCapturePointer = true;
    this.pointer.useGraphicsBounds = true;

    this.on("pointerdown", (evt) => {
      const dir = evt.worldPos.sub(this.pos).normalize();
      this.currentWeapon.fire(this.pos.clone(), dir, this.scene);

      this.on('collisionstart', (evt) => {
        if (evt.other instanceof Zombie) {
          window.location.reload();
        }
      });
    });
  }

  // hier beweegt de speler en kun je schieten/reloaden
  onPreUpdate(engine) {
    const kb = engine.input.keyboard;
    let xspeed = 0;
    let yspeed = 0;

    if (kb.isHeld(Keys.W) || kb.isHeld(Keys.Up))   yspeed = -this.speed;
    if (kb.isHeld(Keys.S) || kb.isHeld(Keys.Down)) yspeed =  this.speed;
    if (kb.isHeld(Keys.A) || kb.isHeld(Keys.Left)) xspeed = -this.speed;
    if (kb.isHeld(Keys.D) || kb.isHeld(Keys.Right)) xspeed =  this.speed;

    this.vel = new Vector(xspeed, yspeed);

    let aimDirection = new Vector(0, 0);
    if (kb.isHeld(Keys.W)) aimDirection = aimDirection.add(new Vector(0, -1));
    if (kb.isHeld(Keys.S)) aimDirection = aimDirection.add(new Vector(0, 1));
    if (kb.isHeld(Keys.A)) aimDirection = aimDirection.add(new Vector(-1, 0));
    if (kb.isHeld(Keys.D)) aimDirection = aimDirection.add(new Vector(1, 0));

    if (!aimDirection.equals(Vector.Zero)) {
      this.currentAim = aimDirection.normalize();
    }

    if (kb.wasPressed(Keys.Space)) {
      this.currentWeapon.fire(this.pos.clone(), this.currentAim, this.scene);
    }

    if (kb.wasPressed(Keys.R)) {
      this.currentWeapon.reload(10);
    }
    

    
    
  }

  // hier krijgt speler damage
  takeDamage(amount) {
    console.log("Player killed!");
    this.kill();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
