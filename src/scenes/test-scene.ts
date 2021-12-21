import * as Phaser from 'phaser'
import { Assets } from '../constants/assets'
import { Scenes } from '../constants/scenes'
import { ParentScene } from './parent-scene'

export class TestScene extends ParentScene {

  private background: Phaser.GameObjects.Image

  private childObjects: Phaser.GameObjects.GameObject[] = []

  private controlPad: Phaser.GameObjects.Image

  get gameDimensions(): { width: number, height: number } {
    return {
      width: this.game.config.width as number,
      height: this.game.config.height as number
    }
  }


  constructor() {
    super({ key: Scenes.TestScene })
  }

  create() {

    const { width, height } = this.gameDimensions
    const worldWidth = 1800
    const worldHeight = (height * 2) / 5

    this.physics.world.setBounds(0, 0, worldWidth, worldHeight)

    const add = this.add as any

    this.background = this.add
      .image(0, 0, Assets.MountainBackgroundImageKey)
      .setOrigin(0, 0)
      .setDisplaySize(width * 1.3, worldHeight)
      .setScrollFactor(.05)

    const hero = add.hero(50, 100)
    this.childObjects.push(hero)

    const golem1 = add.fireGolem(200, 100)
    this.childObjects.push(golem1)



    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.startFollow(hero)


    this.mobileControlPadPlugin.addControlPad(width / 2, 300)

  }

  update() {
    this.childObjects.forEach(obj => obj.update())
    this.childObjects = this.childObjects.filter(obj => !!obj.scene)
  }

}