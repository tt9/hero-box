import * as Phaser from 'phaser'
import { Assets } from '../constants/assets'
import { Scenes } from '../constants/scenes'
import { ParentScene } from './parent-scene'
import { isMobile } from 'mobile-device-detect'
import { BattleMap } from '../maps/battle-map'

export class BattleScene extends ParentScene {

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
    super.create()
    this.input.addPointer(3)

    this.events.on('preupdate', () => {
      this.graphics.clear()
    })

    const { width: gameWidth } = this.gameDimensions

    // any cast to 
    const add = this.add as any

    const map = new BattleMap(this).create()

    this.hero = add.hero(400, 300)
    this.updateableObjects.push(this.hero)

    const golem1 = add.fireGolem(600, 100)
    this.updateableObjects.push(golem1)
    this.heroAttackableObjects.push(golem1)

    for (let i = 0; i < 6; i++) {
      const warrior = add.undeadWarrior(100 * i, 100)
      this.updateableObjects.push(warrior)
      this.physics.add.collider(warrior, map.groundLayer, null, null, this)
      this.heroAttackableObjects.push(warrior)
    }

    map.registerStandardCollisions(this.updateableObjects, (character: any, mapItem: any) => {
      character.hasTouchedGroundSinceLastJump = true
    })

    let cameraFollowOffset = -50

    if (isMobile) {
      this.mobileControlPadPlugin.addControlPad(gameWidth / 2, 325)
    } else {
      cameraFollowOffset = 50
    }

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels * 2)
    this.cameras.main.startFollow(this.hero, false, 1, 1, 0, cameraFollowOffset)

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.graphics = this.add.graphics()

  }

  update(): void {
    // this.graphics.clear()
    // this.updateableObjects.forEach(obj => obj.update())
    this.updateableObjects = this.updateableObjects.filter(obj => !!obj.scene)
    this.heroAttackableObjects = this.heroAttackableObjects.filter(obj => !!obj.scene)
  }
}

