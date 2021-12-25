import * as Phaser from 'phaser'
import { SpriteAnimationConfig } from './sprite-animation-config'

class SpriteAnimationFactory {

  create(scene: Phaser.Scene, config: SpriteAnimationConfig) {
    return scene.anims.create({
      key: config.key,
      frames: scene.anims.generateFrameNames(config.atlasKey, {
        prefix: config.prefix,
        end: config.frameMax,
        start: 0,
        zeroPad: 2
      }),
      frameRate: config.frameRate,
      repeat: config.repeat
    })
  }

  createAll(scene: Phaser.Scene, configs: SpriteAnimationConfig[]) {
    return configs.map(config => this.create(scene, config))
  }

}

const SpriteAnimationFactoryInstance = new SpriteAnimationFactory()

export { SpriteAnimationFactoryInstance }