import * as Phaser from 'phaser'
import { SpriteParent } from './sprite-parent'


class SpriteGameObjectFactory {
  register(
    key: string,
    ChildType: new (scene: Phaser.Scene, x: number, y: number) => SpriteParent) {

    // NOTE: Phaser passes in the registering scene
    // as the "this" argument in this sub function
    Phaser.GameObjects.GameObjectFactory.register(key, function (x: number, y: number) {
      const child = new ChildType(this.scene, x, y)
      this.displayList.add(child)
      this.updateList.add(child)

      if (this.scene.physics)
        this.scene.physics.add.existing(child)

      child.create()
      return child
    })

  }
}

const SpriteGameObjectFactoryInstance = new SpriteGameObjectFactory()

export { SpriteGameObjectFactoryInstance }