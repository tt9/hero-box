import * as Phaser from 'phaser'
import { Assets } from '../../constants/assets'
import { ParentScene } from '../../scenes/parent-scene'
import { GameObjectParent } from '../game-object-parent'
import { FireGolemIdleAnimationConfig } from './fire-golem-animations'


export class FireGolem extends GameObjectParent {

  public readonly scene: ParentScene
  constructor(scene: ParentScene, x: number, y: number) {
    super(scene, x, y, Assets.FireGolemTextureAtlasKey)
    this.scene = scene
  }

  create(): void {
    const body = this.getBody()
    if (body)
      body.setCollideWorldBounds(true)

    this.playAnimation(FireGolemIdleAnimationConfig.key)
  }


  static init(global: Phaser.Scene) {
    Phaser.GameObjects.GameObjectFactory.register('fireGolem', function (x: number, y: number) {
      const npc = new FireGolem(this.scene, x, y)

      this.displayList.add(npc)
      this.updateList.add(npc)

      if (this.scene.physics)
        this.scene.physics.add.existing(npc)

      npc.create()

      return npc
    })

    global.anims.create({
      key: FireGolemIdleAnimationConfig.key,
      frames: global.anims.generateFrameNames(Assets.FireGolemTextureAtlasKey, {
        prefix: FireGolemIdleAnimationConfig.prefix,
        end: FireGolemIdleAnimationConfig.frameMax,
        start: 0,
        zeroPad: 2
      }),
      repeat: -1,
      frameRate: FireGolemIdleAnimationConfig.frameRate
    })
  }

}