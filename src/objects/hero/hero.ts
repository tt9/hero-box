import * as Phaser from 'phaser'
import { Assets } from '../../constants/assets'
import { ParentScene } from '../../scenes/parent-scene'
import { GameObjectParent } from '../game-object-parent'
import { HeroAttack1AnimationConfig, HeroIdleAnimationConfig, HeroJumpAnimationConfig, HeroRunAnimationConfig } from './hero-animations'

export class Hero extends GameObjectParent {

  private frameCount = 0

  private attackDurationFrames = 24
  private attackDelayFrames = 45
  private lastAttackFrame = Number.MIN_SAFE_INTEGER

  private jumpDurationFrames = 60
  private jumpDelayFrames = 80
  private lastJumpFrame = Number.MIN_SAFE_INTEGER

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
    return left.isDown || right.isDown || up.isDown || down.isDown || padLeft || padRight
  }

  get isJumping() {
    return this.frameCount - this.lastJumpFrame < this.jumpDurationFrames
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

  create() {
    const body = this.getBody()
    if (body)
      body.setCollideWorldBounds(true)
  }

  update() {

    const physicsBody = this.getBody()


    if (this.isJumping) {
      physicsBody.setDrag(100, 10)
    } else {
      physicsBody.setDrag(300, 10)
    }

    this.frameCount++
    const { left, right, up, space } = this.keys

    const {
      up: padUp,
      left: padLeft,
      right: padRight,
      attack: padAttack
    } = this.scene.mobileControlPadPlugin.keys

    if (left.isDown || padLeft) {
      physicsBody.setVelocityX(-100)
      this.setFlipX(true)


    } else if (right.isDown || padRight) {
      physicsBody.setVelocityX(100)
      this.setFlipX(false)

    } else {
      // this.body.setVelocityX(0)


    }

    if ((up.isDown || padUp) && !this.isJumping) {
      if (this.frameCount - this.lastJumpFrame > this.jumpDelayFrames) {
        physicsBody.setVelocityY(-250)
        this.lastJumpFrame = this.frameCount
      }
    }


    if (space.isDown || padAttack) {
      if (this.frameCount - this.lastAttackFrame > this.attackDelayFrames) {

        this.lastAttackFrame = this.frameCount
      }
    }

    if (this.isAttacking) {
      this.playAttackAnimation()
    } else if (this.isJumping) {
      this.playJumpAnimation()
    } else if (this.isMoving) {
      this.playRunAnimation()
    } else {
      this.playIdleAnimation()
    }

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
  }
}

