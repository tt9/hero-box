import * as Phaser from 'phaser'
import { Assets } from '../constants/assets'
import { Scenes } from '../constants/scenes'
import { ParentScene } from './parent-scene'
import { isMobile } from 'mobile-device-detect'

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

    this.background = this.add
      .image(0, 0, Assets.MountainBackgroundMountainFarImageKey)
      .setOrigin(0, 0)
      .setDisplaySize(width * 1.5, worldHeight)
      .setScrollFactor(.08)

    this.background = this.add
      .image(0, 0, Assets.MountainBackgroundMountainsImageKey)
      .setOrigin(0, 0)
      .setDisplaySize(width * 1.7, worldHeight)
      .setScrollFactor(.1)


    this.background = this.add
      .image(0, 0, Assets.MountainForegroundTreesImageKey)
      .setOrigin(0, 0)
      .setDisplaySize(width * 2, worldHeight)
      .setScrollFactor(.5)

    this.background = this.add
      .image(width * 2, 0, Assets.MountainForegroundTreesImageKey)
      .setOrigin(0, 0)
      .setDisplaySize(width * 2, worldHeight)
      .setScrollFactor(.5)

    this.hero = add.hero(400, 100)
    this.childObjects.push(this.hero)

    const golem1 = add.fireGolem(600, 100)
    this.childObjects.push(golem1)



    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.startFollow(this.hero)

    if (isMobile) {
      this.mobileControlPadPlugin.addControlPad(width / 2, 300)
    } else {
      // TODO: create a non-mobile version perhaps
      // increase the viewport size as well.  
    }

  }

  update() {
    this.childObjects.forEach(obj => obj.update())
    this.childObjects = this.childObjects.filter(obj => !!obj.scene)
  }

}