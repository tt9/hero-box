import './index.css'
import * as Phaser from 'phaser'
import { MainScene } from './scenes/main-scene'
import { PreloadScene } from './scenes/preload-scene'
import { GameConfig } from './constants/game-config'
import { TestScene } from './scenes/test-scene'
import { OverworldScene } from './scenes/overworld-scene'
import { MobileControlPadPlugin } from './plugins/mobile-control-pad-plugin'
import { BattleScene } from './scenes/battle-scene'

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT
  },
  width: GameConfig.width,
  height: GameConfig.height,
  backgroundColor: GameConfig.backgroundColor,
  scene: [
    PreloadScene,
    MainScene,
    TestScene,
    OverworldScene,
    BattleScene
  ],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: GameConfig.gravity,
      debug: false
    }
  },
  plugins: {
    scene: [
      {
        key: 'mobileControlPadPlugin',
        plugin: MobileControlPadPlugin,
        mapping: 'mobileControlPadPlugin'
      }
    ]
  }

}

const game = new Phaser.Game(config)

game.scene.start('PreloadScene')