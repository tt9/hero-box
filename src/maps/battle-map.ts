import * as Phaser from 'phaser'
import { Assets } from '../constants/assets'
import { ParentScene } from '../scenes/parent-scene'

export class BattleMap {

  groundLayer: Phaser.Tilemaps.TilemapLayer
  topcollisionLayer: Phaser.GameObjects.Sprite[]

  get allCollidableLayers() {
    return [this.groundLayer]
  }

  tilemap: Phaser.Tilemaps.Tilemap

  get widthInPixels() {
    return this.tilemap.widthInPixels
  }

  get heightInPixels() {
    return this.tilemap.widthInPixels
  }

  constructor(private scene: ParentScene) {

  }

  create() {
    this.tilemap = this.scene.make.tilemap({ key: Assets.BattleMapTileMapKey })
    const platformerTileset = this.tilemap.addTilesetImage(Assets.PlatformTilesImageKey, Assets.PlatformTilesImageKey)
    const skyTileset = this.tilemap.addTilesetImage(Assets.BackgroundSkyImageKey, Assets.BackgroundSkyImageKey)

    const skyLayer = this.tilemap.createLayer('sky', skyTileset, 0, 0)
    const cloudLayer = this.tilemap.createLayer('clouds', platformerTileset, 0, 0)
    const groundFakeLayer = this.tilemap.createLayer('groundfake', platformerTileset, 0, 0)
    const treesLayer = this.tilemap.createLayer('trees', platformerTileset, 0, 0)

    this.topcollisionLayer = this.tilemap.createFromObjects('topcollision', { name: 'platform', key: Assets.InvisibleImageKey }) as Phaser.GameObjects.Sprite[]

    this.groundLayer = this.tilemap.createLayer('ground', platformerTileset, 0, 0)
    this.groundLayer.setCollisionByExclusion([-1], true)

    this.topcollisionLayer.forEach(item => {
      this.scene.physics.add.existing(item, true)
    })

    this.scene.events.once('preupdate', () => {
      this.topcollisionLayer.forEach(item => {

        item.y += (item.height / 2)
        const body = item.body as Phaser.Physics.Arcade.Body

        body.checkCollision.down = false
        body.checkCollision.left = false
        body.checkCollision.right = false

        body.y += body.height
      })
    })

    return this

  }

  registerStandardCollisions(obj: Phaser.GameObjects.GameObject[] | Phaser.GameObjects.GameObject, cb?: any) {

    this.scene.physics.add.collider(obj, this.groundLayer, cb)
    this.scene.physics.add.collider(obj, this.topcollisionLayer, cb)

    return this
  }
}