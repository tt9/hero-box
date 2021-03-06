import { Assets } from '../../constants/assets'
import { SpriteAnimationConfig } from '../sprite-animation-config'
import { SpriteAnimationFactoryInstance } from '../sprite-animation-factory'

export const FireGolemRunAnimationConfig: SpriteAnimationConfig = {
  key: 'fire-golem-run',
  atlasKey: Assets.FireGolemTextureAtlasKey,
  frameMax: 5,
  frameRate: 6,
  prefix: 'fire-golem-run-',
  repeat: -1
}

export const FireGolemIdleAnimationConfig: SpriteAnimationConfig = {
  key: 'fire-golem-idle',
  atlasKey: Assets.FireGolemTextureAtlasKey,
  frameMax: 4,
  frameRate: 8,
  prefix: 'fire-golem-idle-',
  repeat: -1
}

export const FireGolemAttack1AnimationConfig: SpriteAnimationConfig = {
  key: 'fire-golem-attack1',
  atlasKey: Assets.FireGolemTextureAtlasKey,
  frameMax: 6,
  frameRate: 12,
  prefix: 'fire-golem-attack-',
  repeat: 0
}

export const FireGolemHitAnimationConfig: SpriteAnimationConfig = {
  key: 'fire-golem-hit',
  atlasKey: Assets.FireGolemTextureAtlasKey,
  frameMax: 2,
  frameRate: 8,
  prefix: 'fire-golem-hurt-',
  repeat: 2
}

export const FireGolemDieAnimationConfig: SpriteAnimationConfig = {
  key: 'fire-golem-die',
  atlasKey: Assets.FireGolemTextureAtlasKey,
  frameMax: 6,
  frameRate: 12,
  prefix: 'fire-golem-die-',
  repeat: 0
}


export const FireGolemAnimations = [
  FireGolemAttack1AnimationConfig,
  FireGolemIdleAnimationConfig,
  FireGolemRunAnimationConfig,
  FireGolemHitAnimationConfig,
  FireGolemDieAnimationConfig
]