import * as Phaser from 'phaser'
import { Assets } from '../../constants/assets'

import { ParentScene } from '../../scenes/parent-scene'
import { CanBattleMixin } from '../attributes/can-battle'
import { SpriteAnimationFactoryInstance } from '../sprite-animation-factory'
import { SpriteDirection } from '../sprite-direction'
import { SpriteGameObjectFactoryInstance } from '../sprite-game-object-factory'
import { SpriteParent } from '../sprite-parent'
import { HeroAnimations, HeroAttack1AnimationConfig, HeroIdleAnimationConfig, HeroJumpAnimationConfig, HeroRunAnimationConfig, HeroSlideAnimationConfig } from './hero-animations'

export class Hero extends CanBattleMixin(SpriteParent) {

  private attackDelayMs = 600
  private lastAttackMs = Number.MIN_SAFE_INTEGER

  private jumpDelayMs = 1000
  private lastJumpMs = Number.MIN_SAFE_INTEGER
  public hasTouchedGroundSinceLastJump = true

  public isSliding = false
  public canSlide = true

  public xSpeedRun = 125
  public ySpeedJump = 350
  public xDragRun = 700

  public healthBarWidth = 28

  public attackHitBox: Phaser.GameObjects.Rectangle
  public get attackHitBoxBody() {
    if (this.attackHitBox)
      return this.attackHitBox.body as Phaser.Physics.Arcade.Body
  }
  public attackHitBoxXOffset = 6

  protected _facingDirection: SpriteDirection = 'right'

  public get facingDirection() {
    return this._facingDirection
  }

  public set facingDirection(val: SpriteDirection) {
    this.setFlipX(val === 'left')
    this._facingDirection = val
  }

  private keys: Phaser.Types.Input.Keyboard.CursorKeys


  public readonly scene: ParentScene

  get isMoving() {
    const { left, right, up } = this.keys
    const {
      left: padLeft,
      right: padRight
    } = this.scene.mobileControlPadPlugin.keys
    return left.isDown || right.isDown || up.isDown || padLeft || padRight
  }


  constructor(scene: ParentScene, x: number, y: number) {
    super(scene, x, y, Assets.HeroTextureAtlasKey)
    this.keys = this.scene.input.keyboard.createCursorKeys()
  }

  create() {
    const body = this.getBody()
    if (body)
      body.setCollideWorldBounds(true)
    body.setSize(14, 30)
    body.setDrag(this.xDragRun, 10)
    body.setMaxVelocityX(125)

    this.attackHitBox = this.scene.add.rectangle(this.x, this.y, 30, 28)
    this.scene.physics.add.existing(this.attackHitBox)

    // Set override properties here
    this.attackPoints = 25

    this.attackAnimationDuration =
      this.scene.anims.get(HeroAttack1AnimationConfig.key).duration

    const attackHitBoxBody = this.getBody(this.attackHitBox)
    attackHitBoxBody.setAllowGravity(false)
  }



  jump(now: number) {
    if (this.hasTouchedGroundSinceLastJump &&
      now - this.lastJumpMs > this.jumpDelayMs) {
      this.hasTouchedGroundSinceLastJump = false
      this.lastJumpMs = now
      this.getBody().setVelocityY(-350)
      this.play(HeroJumpAnimationConfig.key, true)
    }
  }

  update() {
    const now = this.scene.time.now
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
        body.setDrag(this.xDragRun, 10)
        this.canSlide = false
      }
    } else {
      this.isSliding = false
      body.setDrag(this.xDragRun, 10)
    }

    if (!down.isDown && !defend) {
      this.canSlide = true
    }


    if (!this.isSliding && (left.isDown || padLeft)) {
      body.setVelocityX(-this.xSpeedRun)
      this.facingDirection = 'left'
    } else if (!this.isSliding && (right.isDown || padRight)) {
      body.setVelocityX(this.xSpeedRun)
      this.facingDirection = 'right'
    } else if (!this.isSliding) {
      // body.setVelocityX(0)
    }


    if (attackLeft)
      this.facingDirection = 'left'
    if (attackRight)
      this.facingDirection = 'right'

    if ((up.isDown || padUp)) {
      this.jump(now)
    }

    if ((space.isDown || padAttack)) {
      this.attack(this.scene.heroAttackableObjects, () => {
        this.play(HeroAttack1AnimationConfig.key, true)
      })
    }

    if (!this.isAttacking && this.attackHitBox) {
      // this.attackHitBox.destroy(true)
      // this.attackHitBox = null
    }
    if (this.isCurrentlyAnimatingAttack) {
      // No op
    } else if (!this.hasTouchedGroundSinceLastJump) {
      // If this is still in the midst of jumping
      // but the animation is done, we'll keep the
      // frame at the very end
      if (now - this.lastJumpMs > this.anims.currentAnim.duration) {
        this.setFrame(this.anims.currentAnim.getLastFrame().textureFrame)
      }
    } else if (this.isSliding) {
      this.play(HeroSlideAnimationConfig.key, true)
    } else if (this.isMoving) {
      this.play(HeroRunAnimationConfig.key, true)
    } else {
      this.play(HeroIdleAnimationConfig.key, true)
    }

    this.renderHealthBar()

    // attack hitbox
    if (this.attackHitBox) {
      let attackHitBoxX = this.x
      if (this.facingDirection === 'left')
        attackHitBoxX -= this.attackHitBoxXOffset
      else
        attackHitBoxX += this.attackHitBoxXOffset

      this.attackHitBox.setPosition(attackHitBoxX, this.y)
    }
  }


  static init(global: Phaser.Scene) {
    SpriteGameObjectFactoryInstance.register('hero', Hero)
    SpriteAnimationFactoryInstance.createAll(global, HeroAnimations)
  }
}

