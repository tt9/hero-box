import * as Phaser from 'phaser'
import { Scenes } from '../constants/scenes'
import { Assets } from '../constants/assets'

export class MainScene extends Phaser.Scene {



  constructor() {
    super({ key: Scenes.MainScene })

  }


  create() {

    // this.input.addPointer(3)


    // const bgWidth = this.game.config.width * 2.2
    // const bgHeight = this.game.config.height * .75
    // this.background = this.add
    //   .image(0, 0, Assets.MountainBackgroundImageKey)
    //   .setOrigin(0, 0)
    //   .setDisplaySize(bgWidth, bgHeight).setScrollFactor(.35)

    // this.backgroundMountainFar = this.add
    //   .image(0, 0, Assets.MountainBackgroundMountainFarImageKey)
    //   .setOrigin(0, 0)
    //   .setDisplaySize(bgWidth * 1.1, bgHeight)
    //   .setScrollFactor(.4)


    // this.backgroundMountains = this.add
    //   .image(0, 0, Assets.MountainBackgroundMountainsImageKey)
    //   .setOrigin(0, 0)
    //   .setDisplaySize(bgWidth * 1.25, bgHeight).setScrollFactor(.5)
    // this.backgroundMountainTrees = this.add
    //   .image(0, 0, Assets.MountainBackgroundTreesImageKey)
    //   .setOrigin(0, 0)
    //   .setDisplaySize(bgWidth * 1.5, bgHeight).setScrollFactor(.8)
    // this.backgroundTreesClose = this.add
    //   .image(0,0,Assets.MountainForegroundTreesImageKey)
    //   .setOrigin(0,0)
    //   .setDisplaySize(bgWidth * 1.5, this.game.config.height)
    //   .setScrollFactor(1.5)





    // this.input.on('pointerdown', this.joystick.create, this.joystick)
    // this.input.on('pointerup', this.joystick.remove, this.joystick)



    // this.graphics = this.add.graphics({
    //   lineStyle: { width: 2, color: 0xaa0000 },
    //   fillStyle: { color: 0x0000aa }
    // })

    // this.rect = this.add.rectangle(0, 380, 10000, 200, 0x3D0606, 1)

    // this.childObjects = []

    // const hero = this.add.hero(100, 100)

    // this.childObjects.push(hero)

    // const attackButton = this.add.sprite(this.game.config.width - 36, 405, Assets.SwordIconImageKey).setInteractive().setScrollFactor(0)


    // const walls = this.physics.add.staticGroup()
    // walls.add(this.rect)
    // this.rect.body.friction = .9


    // this.physics.add.existing(hero)
    // this.physics.add.collider(hero, walls)

    // this.cameras.main.setBounds(0, 0, this.background.displayWidth / .35, this.background.displayHeight)
    // this.cameras.main.startFollow(hero)

  }

  update() {

    // for (const obj of this.childObjects) {
    //   obj.update(this)
    // }

  }
}