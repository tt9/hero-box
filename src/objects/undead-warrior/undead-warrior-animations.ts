import { Assets } from '../../constants/assets'
import { SpriteAnimationConfig } from '../sprite-animation-config'

export const UndeadWarriorRunAnimationConfig: SpriteAnimationConfig = {
  key: 'undead-warrior-run',
  atlasKey: Assets.UndeadWarriorTextureAtlasKey,
  frameMax: 5,
  frameRate: 12,
  prefix: 'undead-warrior-run-',
  repeat: -1
}

export const UndeadWarriorAttackAnimationConfig: SpriteAnimationConfig = {
  key: 'undead-warrior-attack',
  atlasKey: Assets.UndeadWarriorTextureAtlasKey,
  frameMax: 5,
  frameRate: 12,
  prefix: 'undead-warrior-attack-',
  repeat: 0
}

export const UndeadWarriorIdleAnimationConfig: SpriteAnimationConfig = {
  key: 'undead-warrior-idle',
  atlasKey: Assets.UndeadWarriorTextureAtlasKey,
  frameMax: 3,
  frameRate: 8,
  prefix: 'undead-warrior-idle-',
  repeat: -1
}

export const UndeadWarriorAnimations = [
  UndeadWarriorAttackAnimationConfig,
  UndeadWarriorIdleAnimationConfig,
  UndeadWarriorRunAnimationConfig
]


