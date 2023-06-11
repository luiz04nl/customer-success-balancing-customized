import { BalanceScore } from './object-value/balance-score'
import { Identifier } from './object-value/identifier'

export type CustomerSuccess = {
  id: Identifier
  // OBS: experienceLevel me pareceu mais apropriado que score a principio,
  // mas percebi um objeto de valor calculado de alguma forma a partir do nível de experiência
  score: BalanceScore
}

// Fabrica para garantir restrição
// 0 < nível do css < 10.000
