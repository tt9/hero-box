import { CanBattle } from './attributes/can-battle'

export class BattleEvaluator {

  apply(attacker: CanBattle, defender: CanBattle) {
    const grossDamage = attacker.attackPoints - defender.defensePoints
    const netDamage = Math.max(grossDamage, 1)
    defender.reduceHealthPoints(netDamage)
    defender.displayHit()
  }

}

const BattleEvaluatorInstance = new BattleEvaluator()

export { BattleEvaluatorInstance }