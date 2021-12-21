import * as Phaser from 'phaser'
import { MobileControlPadPlugin } from '../plugins/mobile-control-pad-plugin'

/**
 * Helper type to define plugin properties
 */
export class ParentScene extends Phaser.Scene {
  joystick: any
  mobileControlPadPlugin: MobileControlPadPlugin
}