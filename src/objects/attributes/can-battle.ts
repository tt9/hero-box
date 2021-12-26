import { Constructor } from "../../lib/constructor"
import { SpriteParent } from "../sprite-parent"

export interface CanBattle {
  get maxHealthPoints(): number;
  get healthPoints(): number;
  get attackPoints(): number;
  get defensePoints(): number;

  reduceHealthPoints(amount: number): void
  addHealthPoints(amount: number): void
  setHealthPoints(amount: number): void

  displayHit(): void

  renderHealthBar(): void
}

export function CanBattleMixin<T extends Constructor<SpriteParent>>(SuperClass: T) {
  return class extends SuperClass implements CanBattle {

    renderHealthBar(): void {
      // health bar
      // This is just a default health bar implementation
      // For quickly spinning up classes. It is meant to be replaced
      // by inheriting classes eventually
      const { x, y, width, height } = this.getBody()
      this.scene.graphics.fillStyle(0xff0000)
      this.scene.graphics.fillRect(x - 7, y - 5, width * 2, 4)
      this.scene.graphics.fillStyle(0x00ff00)
      this.scene.graphics.fillRect(x - 7, y - 5, (this.healthPoints / this.maxHealthPoints) * (width * 2), 4)
    }


    public maxHealthPoints = 100

    public healthPoints = 100

    public attackPoints = 10

    public defensePoints = 1

    reduceHealthPoints(amount: number) {
      this.addHealthPoints(-amount)
    }

    addHealthPoints(amount: number) {
      this.healthPoints += amount

      this.healthPoints = Math.max(0, this.healthPoints)
    }

    setHealthPoints(amount: number) {
      this.healthPoints = Math.abs(amount)
    }

    displayHit() {
      console.log('Fell back to default implementaion of "displayHit"')
    }


  }

}