import * as Phaser from 'phaser'
import { Hero } from '../objects/hero/hero'
import { MobileControlPadPlugin } from '../plugins/mobile-control-pad-plugin'

declare const __DEBUG_MODE__: boolean
/**
 * Helper type to define plugin properties
 */
export class ParentScene extends Phaser.Scene {
  mobileControlPadPlugin: MobileControlPadPlugin
  hero: Hero
  graphics: Phaser.GameObjects.Graphics

  debugGraphics: Phaser.GameObjects.Graphics

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config)


  }

  create() {
    if (__DEBUG_MODE__) {
      this.debugGraphics = this.add.graphics()
      this.debugGraphics.setDepth(1000)

      this.events.on('preupdate', () => {
        this.debugGraphics.clear()
      })
    }
  }

}