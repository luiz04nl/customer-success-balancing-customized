import { CustomerSuccessBalancing } from '../../src/main/customer-success-balancing'
import { Customer } from '../../src/main/data/customer'
import { CustomerSuccess } from '../../src/main/data/customer-success'
import { BalanceScore } from '../../src/main/data/object-value/balance-score'
import { Identifier } from '../../src/main/data/object-value/identifier'

describe('Tests pessoais de Luiz Carlos no estilo funcional', () => {
  test(`Quando não houverem customerSucess indisponíveis, deve se distribuir a carga de trabalho, levando em consideração
a priorização dos maiores clientes para o customerSucess com mais esperiência mas sem sobrecarregá lo,
aliviando a carga de clientes com a ajuda dos customerSucess com menor esperiência`, () => {
    // Arrange
    const doubleIdentifiersOfUnavailableCustomerSuccess = [] as Identifier[]

    const doubleCustomers = [
      { id: 1, score: 20 } as Customer,
      { id: 2, score: 30 } as Customer,
      { id: 3, score: 35 } as Customer,
      { id: 4, score: 40 } as Customer,

      { id: 5, score: 60 } as Customer,
      { id: 6, score: 60 } as Customer
    ] as Customer[]

    const doubleCustomerSuccessCollection = [
      { id: 1, score: 50 } as CustomerSuccess,
      { id: 2, score: 100 } as CustomerSuccess
    ] as CustomerSuccess[]

    const expectedValue = [
      {
        id: 1,
        customers: [
          { id: 1, score: 20 } as Customer,
          { id: 2, score: 30 } as Customer,
          { id: 3, score: 35 } as Customer,
          { id: 4, score: 40 } as Customer
        ]
      },
      {
        id: 2,
        customers: [
          { id: 5, score: 60 } as Customer,
          { id: 6, score: 60 } as Customer
        ]
      }
    ]

    // Act
    const customerSuccessBalancing = new CustomerSuccessBalancing(
      doubleCustomerSuccessCollection,
      doubleCustomers,
      doubleIdentifiersOfUnavailableCustomerSuccess
    )
    customerSuccessBalancing.execute()
    const value = customerSuccessBalancing.getCustomerSuccessBalancing()

    // Assert
    expect(value).toStrictEqual(expectedValue)
  })

  test(`Quando houverem customerSucess indisponíveis, deve se distribuir a carga de trabalho, levando em consideração
a priorização dos maiores clientes para o customerSucess com mais esperiência mas sem sobrecarregá lo,
aliviando a carga de clientes com a ajuda dos customerSucess com menor esperiência,
nesse caso todos os clientes poderam ser atendidos pois teremos customer success com esperiência adequada,
mas este será cobrecarregado de tarefas`, () => {
    // Arrange
    const doubleIdentifiersOfUnavailableCustomerSuccess = [1] as Identifier[]

    const doubleCustomers = [
      { id: 1, score: 20 } as Customer,
      { id: 2, score: 30 } as Customer,
      { id: 3, score: 35 } as Customer,
      { id: 4, score: 40 } as Customer,
      { id: 5, score: 60 } as Customer,
      { id: 6, score: 80 } as Customer
    ] as Customer[]

    const doubleCustomerSuccessCollection = [
      { id: 1, score: 50 } as CustomerSuccess,
      { id: 2, score: 100 } as CustomerSuccess
    ] as CustomerSuccess[]

    const expectedValue = [
      {
        id: 2,
        customers: [
          { id: 1, score: 20 } as Customer,
          { id: 2, score: 30 } as Customer,
          { id: 3, score: 35 } as Customer,
          { id: 4, score: 40 } as Customer,

          { id: 5, score: 60 } as Customer,
          { id: 6, score: 80 } as Customer
        ]
      }
    ]

    // Act
    const customerSuccessBalancing = new CustomerSuccessBalancing(
      doubleCustomerSuccessCollection,
      doubleCustomers,
      doubleIdentifiersOfUnavailableCustomerSuccess
    )
    customerSuccessBalancing.execute()
    const value = customerSuccessBalancing.getCustomerSuccessBalancing()

    // Assert
    expect(value).toStrictEqual(expectedValue)
  })

  test(`Quando houverem customerSucess indisponíveis, deve se distribuir a carga de trabalho, levando em consideração
a priorização dos maiores clientes para o customerSucess com mais esperiência mas sem sobrecarregá lo,
aliviando a carga de clientes com a ajuda dos customerSucess com menor esperiência,
nesse caso nem todos os clientes poderam ser atendidos porque não teremos customer success com esperiência adequada`, () => {
    // Arrange
    const doubleIdentifiersOfUnavailableCustomerSuccess = [2] as Identifier[]

    const doubleCustomers = [
      { id: 1, score: 20 } as Customer,
      { id: 2, score: 30 } as Customer,
      { id: 3, score: 35 } as Customer,
      { id: 4, score: 40 } as Customer,
      { id: 5, score: 60 } as Customer,
      { id: 6, score: 80 } as Customer
    ] as Customer[]

    const doubleCustomerSuccessCollection = [
      { id: 1, score: 50 } as CustomerSuccess,
      { id: 2, score: 100 } as CustomerSuccess
    ] as CustomerSuccess[]

    const expectedValue = [
      {
        id: 1,
        customers: [
          { id: 1, score: 20 } as Customer,
          { id: 2, score: 30 } as Customer,
          { id: 3, score: 35 } as Customer,
          { id: 4, score: 40 } as Customer
        ]
      }
    ]

    // Act
    const customerSuccessBalancing = new CustomerSuccessBalancing(
      doubleCustomerSuccessCollection,
      doubleCustomers,
      doubleIdentifiersOfUnavailableCustomerSuccess
    )
    customerSuccessBalancing.execute()
    const value = customerSuccessBalancing.getCustomerSuccessBalancing()

    // Assert
    expect(value).toStrictEqual(expectedValue)
  })

  test(`Deve terminar em no máximo 100 milisegundos com uma carga maior de dados`, () => {
    // Arrange
    const mapEntities = (arr: number[]): CustomerSuccess[] | Customer[] => {
      return arr.map((item, index) => {
        return {
          id: (index + 1) as Identifier,
          score: item as BalanceScore
        } as CustomerSuccess | Customer
      }) as CustomerSuccess[] | Customer[]
    }
    const arraySeq = (count: number, startAt: number) => {
      return Array.apply(0, Array(count)).map((it, index) => index + startAt)
    }
    const buildSizeEntities = (size: number, score: number) => {
      const result = []
      for (let i = 0; i < size; i += 1) {
        result.push({ id: i + 1, score })
      }
      return result
    }

    const testTimeoutInMs = 100

    const testStartTime = new Date().getTime()

    const doubleCustomerSuccessCollection = mapEntities(arraySeq(999, 1))

    const doubleCustomers = buildSizeEntities(10000, 998)

    const doubleIdentifiersOfUnavailableCustomerSuccess = [999]

    // Act
    const customerSuccessBalancing = new CustomerSuccessBalancing(
      doubleCustomerSuccessCollection,
      doubleCustomers,
      doubleIdentifiersOfUnavailableCustomerSuccess
    )
    customerSuccessBalancing.execute()

    const executionTime = new Date().getTime() - testStartTime

    console.log('DEBUG executionTime: ', executionTime)

    // Assert
    expect(executionTime).toBeLessThanOrEqual(testTimeoutInMs)
  })

  test(`Quando houver empate no balanceamento de customer success deve retornar o sinalizado 0, para sinalizar o empate`, () => {
    // Arrange
    const doubleIdentifiersOfUnavailableCustomerSuccess = [] as Identifier[]

    const doubleCustomers = [
      { id: 1, score: 20 } as Customer,
      { id: 2, score: 30 } as Customer,
      { id: 3, score: 60 } as Customer,
      { id: 4, score: 80 } as Customer
    ] as Customer[]

    const doubleCustomerSuccessCollection = [
      { id: 1, score: 50 } as CustomerSuccess,
      { id: 2, score: 100 } as CustomerSuccess
    ] as CustomerSuccess[]

    // Act
    const customerSuccessBalancing = new CustomerSuccessBalancing(
      doubleCustomerSuccessCollection,
      doubleCustomers,
      doubleIdentifiersOfUnavailableCustomerSuccess
    )
    const value = customerSuccessBalancing.execute()

    // Assert
    expect(value).toBe(0)
  })

  test(`Quando não houver empate no balanceamento de customer success deve retornar o id do customer sucess com mais customers`, () => {
    // Arrange
    const doubleIdentifiersOfUnavailableCustomerSuccess = [] as Identifier[]

    const doubleCustomers = [
      { id: 1, score: 20 } as Customer,
      { id: 2, score: 55 } as Customer,
      { id: 3, score: 60 } as Customer,
      { id: 4, score: 80 } as Customer
    ] as Customer[]

    const doubleCustomerSuccessCollection = [
      { id: 1, score: 50 } as CustomerSuccess,
      { id: 2, score: 100 } as CustomerSuccess
    ] as CustomerSuccess[]

    // Act
    const customerSuccessBalancing = new CustomerSuccessBalancing(
      doubleCustomerSuccessCollection,
      doubleCustomers,
      doubleIdentifiersOfUnavailableCustomerSuccess
    )
    const value = customerSuccessBalancing.execute()

    // Assert
    expect(value).toBe(2)
  })
})
