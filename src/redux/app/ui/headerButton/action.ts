export const OPEN_INCOME = 'OPEN_INCOME'
export const CLOSE_INCOME = 'CLOSE_INCOME'
export const OPEN_CONSUMPTION = 'OPEN_CONSUMPTION'
export const CLOSE_CONSUMPTION = 'CLOSE_CONSUMPTION'
export const OPEN_TRANSFER = 'OPEN_TRANSFER'
export const CLOSE_TRANSFER = 'CLOSE_TRANSFER'
export const DISABLED_REPEAT = 'DISABLED_REPEAT'
export const ENABLED_REPEAT = 'ENABLED_REPEAT'

const openIncome = () => ({
  type: OPEN_INCOME,
})

const closeIncome = () => ({
  type: CLOSE_INCOME,
})

const openConsumption = () => ({
  type: OPEN_CONSUMPTION,
})

const closeConsumption = () => ({
  type: CLOSE_CONSUMPTION,
})

const openTransfer = () => ({
  type: OPEN_TRANSFER,
})

const closeTransfer = () => ({
  type: CLOSE_TRANSFER,
})

const enableRepeat = () => ({
  type: ENABLED_REPEAT,
})

const disabledRepeat = () => ({
  type: DISABLED_REPEAT,
})

export default {
  openIncome,
  closeIncome,
  openConsumption,
  closeConsumption,
  openTransfer,
  closeTransfer,
  disabledRepeat,
  enableRepeat,
}
