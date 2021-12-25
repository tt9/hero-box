import { Assets } from '../../constants/assets'
import { SpriteAnimationConfig } from '../sprite-animation-config'
import { SpriteAnimationFactoryInstance } from '../sprite-animation-factory'


export const HeroRunAnimationConfig: SpriteAnimationConfig = {
  key: 'hero-run',
  atlasKey: Assets.HeroTextureAtlasKey,
  repeat: -1,
  frameMax: 5,
  frameRate: 12,
  prefix: 'adventurer-run-'
}

export const HeroIdleAnimationConfig: SpriteAnimationConfig = {
  key: 'hero-idle',
  atlasKey: Assets.HeroTextureAtlasKey,
  frameMax: 3,
  frameRate: 8,
  prefix: 'adventurer-idle-',
  repeat: -1
}

export const HeroAttack1AnimationConfig: SpriteAnimationConfig = {
  key: 'hero-attack1',
  atlasKey: Assets.HeroTextureAtlasKey,
  frameMax: 4,
  frameRate: 12,
  prefix: 'adventurer-attack1-',
  repeat: 0
}

export const HeroJumpAnimationConfig: SpriteAnimationConfig = {
  key: 'hero-jump',
  atlasKey: Assets.HeroTextureAtlasKey,
  frameMax: 3,
  frameRate: 12,
  prefix: 'adventurer-jump-',
  repeat: 0
}

export const HeroSlideAnimationConfig: SpriteAnimationConfig = {
  key: 'hero-slide',
  atlasKey: Assets.HeroTextureAtlasKey,
  frameMax: 1,
  frameRate: 8,
  prefix: 'adventurer-slide-',
  repeat: 100
}

export const HeroAnimations = [
  HeroRunAnimationConfig,
  HeroIdleAnimationConfig,
  HeroSlideAnimationConfig,
  HeroAttack1AnimationConfig,
  HeroJumpAnimationConfig
]
