import { JournalAnalyticsData } from 'src/redux/app/types'
import _ from 'lodash'
import { consumption, income } from 'src/constants'

const generateReceivablesData = (data: [JournalAnalyticsData] | null) => {
  const sortedData = _.chain(data)
    .groupBy(item => _.get(item, 'account.account_type.label',
                           _.get(item, item.counterpartyTo ? 'accountTo.account_type.label' : 'accountFrom.account_type.label',
                                 _.get(item, 'accountFrom.account_type.label'))))
    .get('Внешний')
    .groupBy(item => _.get(item, 'counterparty.label',
                           _.get(item, 'counterpartyFrom.label',
                                 _.get(item, 'counterpartyTo.label'))))
    .reduce<any, any>((acc, el) => {
      const interimSum = _.reduce<any, number>(el, (acc, val) => (
        val.operationType === consumption ? acc - Number(val.sum) : (
          val.operationType === income ? acc + Number(val.sum) : (
            val.counterpartyTo ? acc + Number(val.sum) :
              acc - val.sum
          )
        )
      ),                                       0)
      const label = el[0].counterparty ? el[0].counterparty.label : (
        el[0].counterpartyTo ? el[0].counterpartyTo.label : (
          el[0].counterpartyFrom ? el[0].counterpartyFrom.label : '')
      )
      const date = new Date()
      const repeatable = false

      const accountFrom = interimSum > 0 ? (el[0].operationType === income || el[0].operationType === consumption ?
          el[0].account : (
            el[0].operationType === 'transfer' && el[0].counterpartyTo ? el[0].accountTo : el[0].accountFrom
          )
      ) : null

      const accountTo = interimSum < 0 ? (el[0].operationType === income || el[0].operationType === consumption ?
          el[0].account : (
            el[0].operationType === 'transfer' && el[0].counterpartyTo ? el[0].accountTo : el[0].accountFrom
          )
      ) : null

      const counterpartyFrom = interimSum > 0 ? (el[0].operationType === income || el[0].operationType === consumption ?
          el[0].counterparty : (
            el[0].operationType === 'transfer' && el[0].counterpartyTo ? el[0].counterpartyTo : el[0].counterpartyFrom
          )
      ) : null

      const counterpartyTo = interimSum < 0 ? (el[0].operationType === income || el[0].operationType === consumption ?
          el[0].counterparty : (
            el[0].operationType === 'transfer' && el[0].counterpartyTo ? el[0].counterpartyTo : el[0].counterpartyFrom
          )
      ) : null

      const tableData = el
      const sum = _.round(Math.abs(interimSum), 2)

      acc.push({
        label,
        date,
        tableData,
        accountFrom,
        accountTo,
        counterpartyFrom,
        counterpartyTo,
        repeatable,
        sum,
      })
      return acc
    },                [])
    .sortBy(el => el.label)
    .value()

  return sortedData
}

export default generateReceivablesData
