import * as Phaser from 'phaser'
import { ParentScene } from '../scenes/parent-scene'
import { SpriteAnimationConfig } from './sprite-animation-config'

export class SpriteParent extends Phaser.GameObjects.Sprite {

  public get currentAnimationKey() {
    if (this.anims.currentAnim)
      return this.anims.currentAnim.key
  }
  public frameCount = 0

  get now() {
    return this.scene.time.now
  }

  constructor(
    public scene: ParentScene,
    x: number,
    y: number,
    texture: string
  ) {
    super(scene, x, y, texture)
    this.scene.events.on('update', () => {
      this.update()
    })
  }

  stopAnimations() {
    this.stop()
  }

  playAnimation(config: SpriteAnimationConfig) {
    const { key, repeat } = config
    const stopFirst = repeat > -1
    if (!this.anims.currentAnim || this.anims.currentAnim.key !== key) {
      if (stopFirst && this.anims.currentAnim && this.anims.currentAnim.key !== key) {
        this.stopAnimations()
      }
      this.play(key)
    }
  }

  getBody(child?: any): Phaser.Physics.Arcade.Body {
    if (child)
      return child.body as Phaser.Physics.Arcade.Body
    return this.body as Phaser.Physics.Arcade.Body
  }

  create(): void {
    //
  }
  update(): void {
    // 
  }
}