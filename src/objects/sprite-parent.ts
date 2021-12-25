import * as Phaser from 'phaser'
import { SpriteAnimationConfig } from './sprite-animation-config'

export abstract class SpriteParent extends Phaser.GameObjects.Sprite {
  public currentAnimationKey: string = null
  public frameCount = 0

  stopAnimations() {
    this.stop()
    this.currentAnimationKey = null
  }

  playAnimation(config: SpriteAnimationConfig) {

    const { key, repeat } = config
    const stopFirst = repeat > -1
    if (!this.anims.currentAnim || this.anims.currentAnim.key !== key) {
      if (stopFirst && this.anims.currentAnim && this.anims.currentAnim.key !== key) {
        this.stopAnimations()
      }
      this.play(key)
      this.currentAnimationKey = key
    }
  }

  getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body
  }

  abstract create(): void;
}