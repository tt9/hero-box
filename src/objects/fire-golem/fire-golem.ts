import * as Phaser from 'phaser'
import { Assets } from '../../constants/assets'
import { ParentScene } from '../../scenes/parent-scene'
import { CanBattleMixin } from '../attributes/can-battle'
import { SpriteAnimationFactoryInstance } from '../sprite-animation-factory'
import { SpriteGameObjectFactoryInstance } from '../sprite-game-object-factory'
import { SpriteParent } from '../sprite-parent'
import { FireGolemAnimations, FireGolemDieAnimationConfig, FireGolemHitAnimationConfig, FireGolemIdleAnimationConfig, FireGolemRunAnimationConfig } from './fire-golem-animations'


export class FireGolem extends CanBattleMixin(SpriteParent) {

  public readonly scene: ParentScene

  public moving = false
  public startedDying = false
  public hitFrames = Number.MAX_SAFE_INTEGER
  public hitDuration = 25

  public get isHitSequence() {
    return this.hitFrames < this.hitDuration
  }

  public get canAct() {
    return this.healthPoints > 0
  }

  constructor(scene: ParentScene, x: number, y: number) {
    super(scene, x, y, Assets.FireGolemTextureAtlasKey)
    this.scene = scene
  }

  create(): void {
    super.create()
    const body = this.getBody()
    if (body) {
      body.setCollideWorldBounds(true)
      body.setSize(32, 48)
    }

    this.playAnimation(FireGolemIdleAnimationConfig)
    this.defensePoints = 10
  }

  die() {
    this.startedDying = true
    this.play({ key: FireGolemDieAnimationConfig.key, hideOnComplete: true }, true)
    setTimeout(() => {
      this.destroy()
    }, this.anims.currentAnim.duration + 10)
  }

  displayHit() {
    this.play({ key: FireGolemHitAnimationConfig.key }, true)
    this.tint = 0xff0000
    this.hitFrames = 0
  }

  update() {
    super.update()
    const body = this.getBody()
    const attackDistance = 25

    if (this.healthPoints <= 0 && !this.startedDying) {
      this.die()
    }

    if (this.hitFrames < this.hitDuration) {
      this.hitFrames++
      if (this.hitFrames % 10 < 5) {
        this.tint = 0xff0000
      } else {
        this.tint = 0xffffff
      }
    } else {
      this.tint = 0xffffff
    }

    if (this.canAct && this.scene.hero) {

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
      if (this.isHitSequence) {
        // NO op 
      }
      else if (this.moving) {
        this.playAnimation(FireGolemRunAnimationConfig)
      } else {
        this.playAnimation(FireGolemIdleAnimationConfig)
      }
      this.renderHealthBar()
    }

  }


  static init(global: Phaser.Scene) {
    SpriteGameObjectFactoryInstance.register('fireGolem', FireGolem)
    SpriteAnimationFactoryInstance.createAll(global, FireGolemAnimations)
  }

}