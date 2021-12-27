import { SpriteParent } from '../sprite-parent'
import * as Phaser from 'phaser'
import { Assets } from '../../constants/assets'
import { UndeadWarriorAnimations, UndeadWarriorAttackAnimationConfig, UndeadWarriorIdleAnimationConfig, UndeadWarriorRunAnimationConfig } from './undead-warrior-animations'
import { SpriteAnimationFactoryInstance } from '../sprite-animation-factory'
import { SpriteGameObjectFactoryInstance } from '../sprite-game-object-factory'
import { ParentScene } from '../../scenes/parent-scene'
import { CanBattleMixin } from '../attributes/can-battle'



export class UndeadWarrior extends CanBattleMixin(SpriteParent) {

  constructor(scene: ParentScene, x: number, y: number) {
    super(scene, x, y, Assets.UndeadWarriorTextureAtlasKey)
  }

  create(): void {
    super.create()
    const body = this.getBody()
    body.setSize(14, 24)
    body.setOffset(40, 10)
  }

  displayHit(): void {
    // 
  }

  update() {
    super.update()
    this.playAnimation(UndeadWarriorIdleAnimationConfig)
    this.renderHealthBar()
  }

  static init(global: Phaser.Scene) {
    SpriteGameObjectFactoryInstance.register('undeadWarrior', UndeadWarrior)
    SpriteAnimationFactoryInstance.createAll(global, UndeadWarriorAnimations)
  }
}