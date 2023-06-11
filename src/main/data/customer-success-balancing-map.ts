import { Customer } from './customer'
import { Identifier } from './object-value/identifier'

export type CustomerSuccessBalancingMap = {
  id: Identifier
  customers: Customer[]
}

// Fabrica para garantir restrição
// 0 < número de CSs < 1.000
