import * as Phaser from 'phaser'

import { Assets } from '../constants/assets'
import { Scenes } from '../constants/scenes'
import { FireGolem } from '../objects/fire-golem/fire-golem'
import { Hero } from '../objects/hero/hero'

// All initial asset loading should be dispatched through this scene
// if there are exceptions make special note of it

// TODO: the loading bar code was copied from an online
// example. None of it is really functional yet.
// Need to go back and clean it up and make sure it works.

export class PreloadScene extends Phaser.Scene {

  private graphics: Phaser.GameObjects.Graphics
  // TODO: Refactor the "NewGraphics" pattern
  private newGraphics: Phaser.GameObjects.Graphics
  private progressBar: Phaser.Geom.Rectangle
  private progressBarFill: Phaser.Geom.Rectangle
  private loadingText: Phaser.GameObjects.Text

  private percentage = 0
  constructor() {
    super({ key: Scenes.PreloadScene })
    this.percentage = 0
  }

  preload() {
    this.createLoadingBar()
    // Load assets
    this.load.atlas(Assets.HeroTextureAtlasKey, './assets/hero/hero.png', './assets/hero/hero.json')
    this.load.atlas(Assets.FireGolemTextureAtlasKey, './assets/fire-golem/fire-golem.png', './assets/fire-golem/fire-golem.json')

    this.load.image(Assets.MountainBackgroundImageKey, './assets/mountain-bg/parallax-mountain-bg.png')
    this.load.image(Assets.MountainForegroundTreesImageKey, './assets/mountain-bg/parallax-mountain-foreground-trees.png')
    this.load.image(Assets.MountainBackgroundMountainFarImageKey, './assets/mountain-bg/parallax-mountain-mountain-far.png')
    this.load.image(Assets.MountainBackgroundTreesImageKey, './assets/mountain-bg/parallax-mountain-trees.png')
    this.load.image(Assets.MountainBackgroundMountainsImageKey, './assets/mountain-bg/parallax-mountain-mountains.png')


    this.load.image(Assets.ControlPadImageKey, './assets/controlpad.png')

    this.load.image(Assets.PlatformTilesImageKey, './assets/maps/plat_tiles.png')
    this.load.tilemapTiledJSON(Assets.TestLevelTileMapKey, './assets/maps/test-level.json')


    this.load.on('progress', () => this.updateBar())
    this.load.on('complete', () => this.complete())
  }


  updateBar() {
    this.newGraphics.clear()
    this.newGraphics.fillStyle(0x3587e2, 1)
    this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(205, 205, this.percentage * 390, 40))

    this.percentage = this.percentage * 100
    this.loadingText.setText('Loading: ' + this.percentage.toFixed(2) + '%')
    console.log('P:' + this.percentage)

  }

  complete() {
    /**
     * TODO: find a cleaner pattern for this
     * 
     * I would like to define all animations
     * within the class of the sprite object being
     * animated, to limit things being spread around
     * 
     * But all of that needs to be initialized somewhere. 
     * 
     * For now its all initialized here by putting the type
     * in this array and defining a static method called init
     * 
     * Not clean, not pretty, but no time to think about it 🤔
     */
    this.gameObjectInitializer([
      Hero,
      FireGolem
    ])

    this.scene.start(Scenes.TestScene)
  }

  createLoadingBar() {
    this.graphics = this.add.graphics()
    this.newGraphics = this.add.graphics()

    this.progressBar = new Phaser.Geom.Rectangle(200, 200, 400, 50)
    this.progressBarFill = new Phaser.Geom.Rectangle(205, 205, 290, 40)

    this.graphics.fillStyle(0xffffff, 1)
    this.graphics.fillRectShape(this.progressBar)

    this.newGraphics.fillStyle(0x3587e2, 1)
    this.newGraphics.fillRectShape(this.progressBarFill)

    this.loadingText = this.add.text(250, 260, 'Loading: ', { fontSize: '32px', color: '#FFFFFF' })
  }

  // TODO: type strongly
  gameObjectInitializer(list: any[]) {
    for (const item of list) {
      if (item['init']) {
        item.init(this)
      }
    }
  }
}