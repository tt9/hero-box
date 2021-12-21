import * as Phaser from 'phaser'
import { Assets } from '../constants/assets'

export class MobileControlPadPlugin extends Phaser.Plugins.ScenePlugin {

  keys = {
    left: false,
    right: false,
    up: false,
    attack: false
  }



  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager, 'mobileControlPadPlugin')
  }

  boot() {
    // const eventEmitter = this.systems.events

    // eventEmitter.on('update', this.update, this)
  }

  addControlPad(x: number, y: number) {
    const bigButtonRadius = 48
    const smallButtonRadius = 24
    //
    this.scene.add.image(x, y, Assets.ControlPadImageKey).setScrollFactor(0)

    // NOTE: This is all supppperr dirty and needs 
    // to be re-written for configurability, probably
    // from scratch if this
    // is ever going to be anything useful beyond this game.

    // left button
    const leftButton = this.scene.add
      .circle(x - bigButtonRadius, y + 30, bigButtonRadius)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.keys.left = true
      })
      .on('pointerover', () => {
        this.keys.left = true
      })
      .on('pointerup', () => {
        this.keys.left = false
      })
      .on('pointerout', () => {
        this.keys.left = false
      })

    // right Button
    const rightButton = this.scene.add
      .circle(x + bigButtonRadius, y + 30, bigButtonRadius)
      .setScrollFactor(0)
      .setInteractive().on('pointerdown', () => {
        this.keys.right = true
      })
      .on('pointerover', () => {
        this.keys.right = true
      })
      .on('pointerup', () => {
        this.keys.right = false
      })
      .on('pointerout', () => {
        this.keys.right = false
      })
    // up button
    const upButton = this.scene.add
      .circle(x, y - 30, bigButtonRadius)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.keys.up = true
      })
      .on('pointerover', () => {
        this.keys.up = true
      })
      .on('pointerup', () => {
        this.keys.up = false
      })
      .on('pointerout', () => {
        this.keys.up = false
      })

    // attack left button
    const attackLeftButton = this.scene.add
      .circle(x - 62, y - 30, smallButtonRadius)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.keys.attack = true
      })
      .on('pointerover', () => {
        this.keys.attack = true
      })
      .on('pointerup', () => {
        this.keys.attack = false
      })
      .on('pointerout', () => {
        this.keys.attack = false
      })

    // attack right button
    const attackRightButton = this.scene.add
      .circle(x + 62, y - 30, smallButtonRadius)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.keys.attack = true
      })
      .on('pointerover', () => {
        this.keys.attack = true
      })
      .on('pointerup', () => {
        this.keys.attack = false
      })
      .on('pointerout', () => {
        this.keys.attack = false
      })



  }

  // update() {

  //   //
  // }
}