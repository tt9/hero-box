import { Physics } from 'phaser'
import { Constructor } from '../../lib/constructor'
import { BattleEvaluatorInstance } from '../battle-evaluator'
import { SpriteParent } from '../sprite-parent'

export interface CanBattle extends Phaser.GameObjects.GameObject {

  // Battle statistic properties

  // The maximum health points
  maxHealthPoints: number;

  // The current health points
  healthPoints: number;

  // Attack and Defense points for
  // battle calculation
  attackPoints: number;
  defensePoints: number;


  // Attack action properties
  // Milliseconds between consecutive attacks
  attackCooldown: number;

  // The Milliseconds when the last attack occurred
  lastAttackTime: number;

  attackHitBox: Phaser.GameObjects.GameObject;

  // The duration of the attack animation
  // Must be set by child class
  attackAnimationDuration: number;

  // Is the character attack animation running?
  get isCurrentlyAnimatingAttack(): boolean
  // Is the character in the attacking state
  get canAttack(): boolean;


  reduceHealthPoints(amount: number): void
  addHealthPoints(amount: number): void
  setHealthPoints(amount: number): void

  displayHit(): void

  renderHealthBar(): void

  attack(attackbleObjects: CanBattle[], attackAnimationFunction?: () => void): void
}

export function CanBattleMixin<T extends Constructor<SpriteParent>>(SuperClass: T) {
  return class extends SuperClass implements CanBattle {



    renderHealthBar(): void {
      // health bar
      // This is just a default health bar implementation
      // For quickly spinning up classes. It is meant to be replaced
      // by inheriting classes eventually
      const { x, y, width } = this.getBody()
      this.scene.graphics.fillStyle(0xff0000)
      this.scene.graphics.fillRect(x - 7, y - 5, width * 2, 4)
      this.scene.graphics.fillStyle(0x00ff00)
      this.scene.graphics.fillRect(x - 7, y - 5, (this.healthPoints / this.maxHealthPoints) * (width * 2), 4)
    }


    public maxHealthPoints = 100

    public healthPoints = 100

    public attackPoints = 10

    public defensePoints = 1

    public attackCooldown = 600

    public lastAttackTime = Number.MIN_SAFE_INTEGER

    public isAttacking = false

    public attackAnimationDuration = 600

    get canAttack(): boolean {
      return this.scene.time.now - this.lastAttackTime > this.attackCooldown
    }
    get isCurrentlyAnimatingAttack(): boolean {
      return this.scene.time.now - this.lastAttackTime <= this.attackAnimationDuration
    }

    attackHitBox: Phaser.GameObjects.GameObject

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

    attack(attackbleObjects: CanBattle[], attackAnimationFunction?: () => void) {
      const now = this.scene.time.now

      if (this.canAttack) {
        this.lastAttackTime = now

        if (attackAnimationFunction)
          attackAnimationFunction()

        attackbleObjects.forEach(obj => {
          const overlaps = this.scene.physics.overlap(this.attackHitBox, obj)
          if (overlaps) {
            BattleEvaluatorInstance.apply(this, obj)
          }
        })
      }
    }

  }

}