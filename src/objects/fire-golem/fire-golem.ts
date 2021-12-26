import * as Phaser from 'phaser'
import { Assets } from '../../constants/assets'
import { ParentScene } from '../../scenes/parent-scene'
import { CanBattleMixin } from '../attributes/can-battle'
import { SpriteAnimationFactoryInstance } from '../sprite-animation-factory'
import { SpriteGameObjectFactoryInstance } from '../sprite-game-object-factory'
import { SpriteParent } from '../sprite-parent'
import { FireGolemAnimations, FireGolemIdleAnimationConfig, FireGolemRunAnimationConfig } from './fire-golem-animations'


export class FireGolem extends CanBattleMixin(SpriteParent) {

  public readonly scene: ParentScene

  public moving = false

  constructor(scene: ParentScene, x: number, y: number) {
    super(scene, x, y, Assets.FireGolemTextureAtlasKey)
    this.scene = scene
  }

  create(): void {
    const body = this.getBody()
    if (body) {
      body.setCollideWorldBounds(true)
      body.setSize(32, 48)
    }

    this.playAnimation(FireGolemIdleAnimationConfig)
    this.defensePoints = 10
  }

  update() {
    const body = this.getBody()
    const attackDistance = 25
    if (this.scene.hero) {
      if (this.scene.hero.x - attackDistance > this.x) {
        body.setVelocityX(50)
        this.flipX = true
        this.moving = true
      }

      else if (this.scene.hero.x + attackDistance < this.x) {
        body.setVelocityX(-50)
        this.flipX = false
        this.moving = true
      }

      else {
        body.setVelocityX(0)
        this.moving = false
      }

    }

    if (this.moving) {
      this.playAnimation(FireGolemRunAnimationConfig)
    } else {
      this.playAnimation(FireGolemIdleAnimationConfig)
    }

    this.renderHealthBar()
  }


  static init(global: Phaser.Scene) {
    SpriteGameObjectFactoryInstance.register('fireGolem', FireGolem)
    SpriteAnimationFactoryInstance.createAll(global, FireGolemAnimations)
  }

}