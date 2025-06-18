import { Projectile } from "./projectile.js";

export class Weapon {
  constructor({ ammo = 10, damage = 1, durability = 100, speed = 400 } = {}) {
    this.ammo = ammo;
    this.damage = damage;
    this.durability = durability;
    this.speed = speed;
  }

  // hier schiet je een kogel af
  fire(origin, direction, scene) {
    if (this.ammo <= 0 || this.durability <= 0) return;
    const proj = new Projectile(origin.clone(), direction.clone(), this.speed, this.damage);
    scene.add(proj);
    this.ammo--;
    this.durability--;
  }

  // hier reload je het wapen
  reload(amount = 5) {
    this.ammo += amount;
  }

  // hier doe je een spreidschot (niet implemented)
  uniqueShot(origin, direction, scene) {
    [-0.1, 0, 0.1].forEach(angle => {
      const dir = direction.clone().rotate(angle);
      this.fire(origin, dir, scene);
    });
  }
}
