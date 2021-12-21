import * as Phaser from 'phaser'

export abstract class GameObjectParent extends Phaser.GameObjects.Sprite {
  public currentAnimationKey: string = null

  stopAnimations() {
    this.stop()
    this.currentAnimationKey = null
  }

  playAnimation(key: string, stopFirst = false) {
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