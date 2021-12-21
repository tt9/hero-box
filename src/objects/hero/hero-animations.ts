import { SpriteAnimationConfig } from '../sprite-animation-config'

export const HeroRunAnimationConfig: SpriteAnimationConfig = {
  key: 'hero-run',
  frameMax: 5,
  frameRate: 12,
  prefix: 'adventurer-run-'
}

export const HeroIdleAnimationConfig: SpriteAnimationConfig = {
  key: 'hero-idle',
  frameMax: 3,
  frameRate: 8,
  prefix: 'adventurer-idle-'
}

export const HeroAttack1AnimationConfig: SpriteAnimationConfig = {
  key: 'hero-attack1',
  frameMax: 4,
  frameRate: 12,
  prefix: 'adventurer-attack1-'
}

export const HeroJumpAnimationConfig: SpriteAnimationConfig = {
  key: 'hero-jump',
  frameMax: 3,
  frameRate: 12,
  prefix: 'adventurer-jump-'
}
