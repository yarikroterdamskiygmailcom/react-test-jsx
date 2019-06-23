import { get } from 'lodash'
import { Company } from 'src/redux/app/company/types'

export type Keys = {
  [key: string]: number,
}

const defaultAdvantages = [
  { active: false, text: 'Финансово-управленческий учет' },
  { active: false, text: 'Автоматизация финансовых отчетов' },
  { active: false, text: 'Создание собственных отчетов' },
  { active: false, text: 'Управление доступами сотрудников' },
  { active: false, text: 'Персональный консультант' },
]

const keysMap: Keys = {
  entrepreneur: 1,
  business: 4,
  fullSupport: 5,
}

const getAdvantages = (key: string) =>
  defaultAdvantages.map((adv, idx) => ({
    ...adv,
    active: keysMap[key] > idx,
  }))

const calculatePrices = (isPromocodeValid: boolean, prices: Keys) => {
  const constPrice = 0.1
  const oldPrices = {
    oldMonth: prices.month,
    oldYear: prices.year,
    oldMonthByYear: prices.monthByYear,
  }

  for (const period in prices) {
    prices[period] = isPromocodeValid
      ? Math.floor(prices[period] - prices[period] * constPrice)
      : prices[period]
  }

  return { ...oldPrices, ...prices }
}

const isTariffActive = (tariffName: string, company: Company) => {
  const subscriptionIsActive = get(company, 'subscription.is_active', false)
  const currentTariff = get(company, 'tariff.path', '')

  return subscriptionIsActive && currentTariff === tariffName
}

export const getTariffs = (isPromocodeValid: boolean, company: Company) => ({
  entrepreneur: {
    _id: '5ae084f433b78e2e1888d416',
    name: 'Предприниматель',
    prices: calculatePrices(isPromocodeValid, {
      month: 18,
      year: 180,
      monthByYear: 15,
    }),
    advantages: getAdvantages('entrepreneur'),
    isActive: isTariffActive('Предприниматель', company),
  },
  business: {
    _id: '5ae0856ff8dabd2e18edba7c',
    name: 'Бизнес',
    prices: calculatePrices(isPromocodeValid, {
      month: 40,
      year: 360,
      monthByYear: 30,
    }),
    advantages: getAdvantages('business'),
    isActive: isTariffActive('Бизнес', company),
  },
  fullSupport: {
    _id: '5ae0857bf8dabd2e18edba7d',
    name: 'Полная поддержка',
    prices: calculatePrices(isPromocodeValid, {
      month: 130,
      year: 1320,
      monthByYear: 110,
    }),
    advantages: getAdvantages('fullSupport'),
    isActive: isTariffActive('Полная поддержка', company),
  },
})
