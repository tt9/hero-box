import * as Phaser from 'phaser'
import { Assets } from '../../constants/assets'
import { ParentScene } from '../../scenes/parent-scene'
import { GameObjectParent } from '../game-object-parent'
import { HeroAttack1AnimationConfig, HeroIdleAnimationConfig, HeroJumpAnimationConfig, HeroRunAnimationConfig, HeroSlideAnimationConfig } from './hero-animations'

export class Hero extends GameObjectParent {

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



  playRunAnimation() {
    const { key } = HeroRunAnimationConfig
    this.playAnimation(key)
  }

  playJumpAnimation() {
    const { key } = HeroJumpAnimationConfig
    this.playAnimation(key)
  }


  playIdleAnimation() {
    const { key } = HeroIdleAnimationConfig
    this.playAnimation(key, true)
  }

  playAttackAnimation() {
    const { key } = HeroAttack1AnimationConfig
    this.playAnimation(key, true)
  }

  playSlideAnimation() {
    // const { key } = HeroSlideAnimationConfig
    // this.playAnimation(key, false)
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
      this.playAttackAnimation()
    } else if (this.isJumping || !this.hasTouchedGround) {
      this.playJumpAnimation()
    } else if (this.isSliding) {
      this.playSlideAnimation()
    } else if (this.isMoving) {
      this.playRunAnimation()
    } else {
      this.playIdleAnimation()
    }

    // health bar
    this.scene.graphics.fillStyle(0x00ff00)
    this.scene.graphics.fillRect(body.x - 7, body.y - 5, 28, 4)

    // hit box debugging
    // this.scene.graphics.lineStyle(1, 0xff00ff, .8)
    // this.scene.graphics.strokeRect(body.x, body.y, body.width, body.height)


  }



  static init(global: Phaser.Scene) {

    Phaser.GameObjects.GameObjectFactory.register('hero', function (x: number, y: number) {
      const hero = new Hero(this.scene, x, y)

      this.displayList.add(hero)
      this.updateList.add(hero)

      if (this.scene.physics)
        this.scene.physics.add.existing(hero)

      hero.create()

      return hero
    })

    global.anims.create({
      key: HeroRunAnimationConfig.key,
      frames: global.anims.generateFrameNames(Assets.HeroTextureAtlasKey, {
        prefix: HeroRunAnimationConfig.prefix,
        end: HeroRunAnimationConfig.frameMax,
        start: 0,
        zeroPad: 2
      }),
      repeat: -1,
      frameRate: HeroRunAnimationConfig.frameRate
    })

    global.anims.create({
      key: HeroIdleAnimationConfig.key,
      frames: global.anims.generateFrameNames(Assets.HeroTextureAtlasKey, {
        prefix: HeroIdleAnimationConfig.prefix,
        end: HeroIdleAnimationConfig.frameMax,
        start: 0,
        zeroPad: 2
      }),
      repeat: -1,
      frameRate: HeroIdleAnimationConfig.frameRate
    })

    global.anims.create({
      key: HeroAttack1AnimationConfig.key,
      frames: global.anims.generateFrameNames(Assets.HeroTextureAtlasKey, {
        prefix: HeroAttack1AnimationConfig.prefix,
        end: HeroAttack1AnimationConfig.frameMax,
        start: 0,
        zeroPad: 2
      }),
      repeat: 0,
      frameRate: HeroAttack1AnimationConfig.frameRate
    })

    global.anims.create({
      key: HeroJumpAnimationConfig.key,
      frames: global.anims.generateFrameNames(Assets.HeroTextureAtlasKey, {
        prefix: HeroJumpAnimationConfig.prefix,
        end: HeroJumpAnimationConfig.frameMax,
        start: 0,
        zeroPad: 2
      }),
      repeat: 0,
      frameRate: HeroJumpAnimationConfig.frameRate
    })

    global.anims.create({
      key: HeroSlideAnimationConfig.key,
      frames: global.anims.generateFrameNames(Assets.HeroTextureAtlasKey, {
        prefix: HeroSlideAnimationConfig.prefix,
        end: HeroSlideAnimationConfig.frameMax,
        start: 0,
        zeroPad: 2
      }),
      repeat: -1,
      frameRate: HeroSlideAnimationConfig.frameRate
    })
  }
}

