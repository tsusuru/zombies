// import { ScreenElement, Font, Color, Vector } from "excalibur";

// export class ScoreDisplay extends ScreenElement {
//   constructor(player, gameWidth, gameHeight) {
//     super({ x: gameWidth - 20, y: gameHeight - 20, anchor: new Vector(1, 1) });
//     this.player = player;
//     this.z = 1000;
//     this.font = new Font({
//       family: "Arial",
//       size: 24,
//       color: Color.White,
//       textAlign: "right"
//     });
//   }

//   // hier wordt de score getekend
//   onPostDraw(ctx) {
//     ctx.font = this.font.toCSS();
//     ctx.fillStyle = this.font.color.toString();
//     ctx.textAlign = "right";
//     ctx.fillText(`Score: ${this.player.score}`, 0, 0);
//   }
// }