import { ScreenElement, Actor, Color, Vector } from "excalibur";
//NIET MEER GEBRUIKT.
export class HealthBar extends ScreenElement {

    healthBar

    onInitialize(engine) {
        let barBackground = new Actor({ x: 0, y: 0, color: Color.fromRGB(255, 255, 255, 0.4), width: 200, height: 20, anchor: new Vector(0, 0.5) });
        this.addChild(barBackground);

        this.healthBar = new Actor({ x: 0, y: 0, color: Color.Green, width: 200, height: 20, anchor: new Vector(0, 0.5) });
        this.addChild(this.healthBar);
    }

    reduceHealth() {
        this.healthBar.scale = new Vector(0.5, 1);
    }
}