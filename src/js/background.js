import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class Background extends Actor {
  constructor() {
    super({
      pos: new Vector(400, 300),
      width: Resources.Background.width,
      height: Resources.Background.height,
      anchor: new Vector(0.5, 0.5)
    });
  }

  // hier wordt de achtergrond klaargezet
  async onInitialize(engine) {
    await Resources.Background.load();
    const sprite = Resources.Background.toSprite();
    sprite.anchor = new Vector(0.5, 0.5);
    const scaleX = 800 / sprite.width;
    const scaleY = 600 / sprite.height;
    sprite.scale = new Vector(scaleX, scaleY);
    this.graphics.use(sprite);
    this.z = -9;
  }
}