import { BalanceScore } from './object-value/balance-score'
import { Identifier } from './object-value/identifier'

export type Customer = {
  id: Identifier
  // OBS: size me pareceu mais apropriado que score a principio,
  // mas percebi um objeto de valor calculado de alguma forma a partir do tamanho
  score: BalanceScore
}

// Fabrica para garantir restrição
// 0 < número de clientes < 1.000.000
// 0 < tamanho do cliente < 100.000
