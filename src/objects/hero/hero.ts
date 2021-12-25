import * as Phaser from 'phaser'
import { Assets } from '../../constants/assets'
import { ParentScene } from '../../scenes/parent-scene'
import { SpriteAnimationFactoryInstance } from '../sprite-animation-factory'
import { SpriteGameObjectFactoryInstance } from '../sprite-game-object-factory'
import { SpriteParent } from '../sprite-parent'
import { HeroAnimations, HeroAttack1AnimationConfig, HeroIdleAnimationConfig, HeroJumpAnimationConfig, HeroRunAnimationConfig, HeroSlideAnimationConfig } from './hero-animations'

export class Hero extends SpriteParent {

  private health = 100

  private attackDurationFrames = 24
  private attackDelayFrames = 45
  private lastAttackFrame = Number.MIN_SAFE_INTEGER

  private jumpDurationFrames = 40
  private jumpDelayFrames = 40
  private lastJumpFrame = Number.MIN_SAFE_INTEGER
  public hasTouchedGround = true

  public isSliding = false
  public canSlide = true

  private keys: Phaser.Types.Input.Keyboard.CursorKeys


  public readonly scene: ParentScene

  get isAttacking() {
    return this.frameCount - this.lastAttackFrame < this.attackDurationFrames
  }

  get isMoving() {
    const { left, right, up, down } = this.keys

    const {
      left: padLeft,
      right: padRight
    } = this.scene.mobileControlPadPlugin.keys
    return left.isDown || right.isDown || up.isDown || padLeft || padRight
  }

  get isJumping() {
    return this.frameCount - this.lastJumpFrame < this.jumpDurationFrames
  }

  get canJump() {
    return !this.isJumping && this.hasTouchedGround
  }

  constructor(scene: ParentScene, x: number, y: number) {
    super(scene, x, y, Assets.HeroTextureAtlasKey)
    this.scene = scene
    this.keys = this.scene.input.keyboard.createCursorKeys()
  }

  playSlideAnimation() {
    this.setFrame('adventurer-slide-00')
  }

  create() {
    const body = this.getBody()
    if (body)
      body.setCollideWorldBounds(true)
    body.setSize(14, 30)
    body.setDrag(325, 10)
    body.setMaxVelocityX(125)

  }

  update() {



    const body = this.getBody()
    this.frameCount++
    const { left, right, up, space, down } = this.keys

    const {
      up: padUp,
      left: padLeft,
      right: padRight,
      attack: padAttack,
      attackLeft,
      attackRight,
      defend
    } = this.scene.mobileControlPadPlugin.keys

    if (!this.isAttacking && (down.isDown || defend) && this.canSlide) {
      if (Math.abs(body.velocity.x) > 100) {
        this.isSliding = true
        body.setDrag(15, 0)
      } else {
        this.isSliding = false
        body.setDrag(325, 10)
        this.canSlide = false
      }
    } else {
      this.isSliding = false
      body.setDrag(325, 10)
    }

    if (!down.isDown && !defend) {
      this.canSlide = true
    }


    if (!this.isSliding && (left.isDown || padLeft)) {
      body.setVelocityX(-125)
      // body.setAccelerationX(-325)
      this.setFlipX(true)

    } else if (!this.isSliding && (right.isDown || padRight)) {
      body.setVelocityX(125)

      // body.setAccelerationX(325)
      this.setFlipX(false)

    } else {
      // body.setAccelerationX(0)
    }


    if (attackLeft)
      this.setFlipX(true)
    if (attackRight)
      this.setFlipX(false)

    if ((up.isDown || padUp) && this.canJump) {
      if (this.frameCount - this.lastJumpFrame > this.jumpDelayFrames) {
        this.hasTouchedGround = false
        body.setVelocityY(-350)
        this.lastJumpFrame = this.frameCount
      }
    }


    if (space.isDown || padAttack) {
      if (this.frameCount - this.lastAttackFrame > this.attackDelayFrames) {
        body.setDrag(325, 10)
        this.isSliding = false
        this.lastAttackFrame = this.frameCount
      }
    }


    if (this.isAttacking) {
      this.playAnimation(HeroAttack1AnimationConfig)
    } else if (this.isJumping || !this.hasTouchedGround) {
      this.playAnimation(HeroJumpAnimationConfig)
    } else if (this.isSliding) {
      this.playAnimation(HeroSlideAnimationConfig)
    } else if (this.isMoving) {
      this.playAnimation(HeroRunAnimationConfig)
    } else {
      this.playAnimation(HeroIdleAnimationConfig)
    }

    // health bar
    this.scene.graphics.fillStyle(0x00ff00)
    this.scene.graphics.fillRect(body.x - 7, body.y - 5, 28, 4)

  }


  static init(global: Phaser.Scene) {
    SpriteGameObjectFactoryInstance.register('hero', Hero)
    SpriteAnimationFactoryInstance.createAll(global, HeroAnimations)
  }
}

