import { SpriteParent } from '../sprite-parent'
import * as Phaser from 'phaser'
import { Assets } from '../../constants/assets'
import { UndeadWarriorAnimations, UndeadWarriorAttackAnimationConfig, UndeadWarriorIdleAnimationConfig, UndeadWarriorRunAnimationConfig } from './undead-warrior-animations'
import { SpriteAnimationFactoryInstance } from '../sprite-animation-factory'
import { SpriteGameObjectFactoryInstance } from '../sprite-game-object-factory'
import { ParentScene } from '../../scenes/parent-scene'


export class UndeadWarrior extends SpriteParent {

  constructor(scene: ParentScene, x: number, y: number) {
    super(scene, x, y, Assets.UndeadWarriorTextureAtlasKey)
  }

  create(): void {
    //
  }


  update() {
    //
    this.playAnimation(UndeadWarriorIdleAnimationConfig)
  }

  static init(global: Phaser.Scene) {
    SpriteGameObjectFactoryInstance.register('undeadWarrior', UndeadWarrior)
    SpriteAnimationFactoryInstance.createAll(global, UndeadWarriorAnimations)
  }
}