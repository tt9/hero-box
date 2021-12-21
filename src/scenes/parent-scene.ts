import * as Phaser from 'phaser'
import { Hero } from '../objects/hero/hero'
import { MobileControlPadPlugin } from '../plugins/mobile-control-pad-plugin'

/**
 * Helper type to define plugin properties
 */
export class ParentScene extends Phaser.Scene {
  joystick: any
  mobileControlPadPlugin: MobileControlPadPlugin
  hero: Hero
}