import * as Phaser from 'phaser'
import { Assets } from '../constants/assets'
import { Scenes } from '../constants/scenes'
import { ParentScene } from './parent-scene'
import { isMobile } from 'mobile-device-detect'

export class BattleScene extends ParentScene {

  private childObjects: Phaser.GameObjects.GameObject[] = []

  get gameDimensions(): { width: number, height: number } {
    return {
      width: this.game.config.width as number,
      height: this.game.config.height as number
    }
  }


  constructor() {
    super({ key: Scenes.BattleScene })
  }

  create() {
    const { width, height } = this.gameDimensions

    const add = this.add as any



    const map = this.make.tilemap({ key: Assets.BattleMapTileMapKey })
    const platformerTileset = map.addTilesetImage(Assets.PlatformTilesImageKey, Assets.PlatformTilesImageKey)
    const skyTileset = map.addTilesetImage(Assets.BackgroundSkyImageKey, Assets.BackgroundSkyImageKey)

    const skyLayer = map.createLayer('sky', skyTileset, 0, 0)
    const cloudLayer = map.createLayer('clouds', platformerTileset, 0, 0)
    const groundFakeLayer = map.createLayer('groundfake', platformerTileset, 0, 0)
    const treesLayer = map.createLayer('trees', platformerTileset, 0, 0)

    const groundLayer = map.createLayer('ground', platformerTileset, 0, 0)
    groundLayer.setCollisionByExclusion([-1], true)


    this.hero = add.hero(400, 100)
    this.childObjects.push(this.hero)

    const golem1 = add.fireGolem(600, 100)
    this.childObjects.push(golem1)

    for (let i = 0; i < 6; i++) {
      const warrior = add.undeadWarrior(100 * i, 100)
      this.childObjects.push(warrior)
      this.physics.add.collider(warrior, groundLayer, null, null, this)

    }


    this.physics.add.collider(this.hero, groundLayer, (hero: any, tile: any) => {
      if (hero.y <= tile.pixelY)
        this.hero.hasTouchedGround = true
    }, null, this)
    this.physics.add.collider(golem1, groundLayer, null, null, this)

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels * 2)
    this.cameras.main.startFollow(this.hero, false, 1, 1, 0, -50)

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

    if (isMobile) {
      this.mobileControlPadPlugin.addControlPad(width / 2, 325)
    } else {
      // TODO: create a non-mobile version perhaps
      // increase the viewport size as well.  
    }

    this.graphics = this.add.graphics()

  }

  update(time: number, delta: number): void {
    this.graphics.clear()
    this.childObjects.forEach(obj => obj.update())
    this.childObjects = this.childObjects.filter(obj => !!obj.scene)
  }
}

