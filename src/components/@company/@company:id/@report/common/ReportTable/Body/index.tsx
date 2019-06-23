import React from 'react'
import classNames from 'classnames'
import { round, } from 'lodash'
import { getBalance } from 'src/utils/getBalance'
import { hundredPercents } from 'src/constants'
import { createStyles, TableBody, TableCell, TableRow, withStyles, WithStyles } from '@material-ui/core'
import { SumSaldoDataType } from 'src/components/@company/@company:id/@analytics/common/Charts/types'
import { ReportData, TableData } from '../../Charts/types'
import logger from 'src/utils/logger'

const styles = createStyles({
  body: {
    fontWeight: 400,
  },
  left: {
    paddingLeft: 20,
  },
  fontBold: {
    fontWeight: 500,
  },
})

interface Props extends WithStyles<typeof styles> {
  reportData: ReportData,
  tableIncomeData: TableData[],
  tableConsumptionData: TableData[],
  type: string,
  currency: string | null,
}

const Body = ({ classes, reportData, tableIncomeData, tableConsumptionData, type, currency }: Props) => {

  const balanceAtTheEndOfTheMonth = reportData.allDataObj && reportData.allDataObj.newSaldoData
    .reduce((acc: number[], value: SumSaldoDataType) => {
      !acc.length ?
        acc.push(Math.round(value.y * hundredPercents) / hundredPercents) :
        // acc.push(Math.round((acc[acc.length - 1] + value.y) * hundredPercents) / hundredPercents)
        acc.push(round(acc[acc.length - 1] + value.y, 2))
      return acc
    },      [])

  logger.log('balanceAtTheEndOfTheMonth', balanceAtTheEndOfTheMonth)

  // const balanceAtTheStartOfTheMonth = [...balanceAtTheEndOfTheMonth!]
  //   .splice(0, balanceAtTheEndOfTheMonth!.length - 1, 0)

  const balanceAtTheStartOfTheMonth = [0, ...balanceAtTheEndOfTheMonth]
  logger.log('balanceAtTheStartOfTheMonth', balanceAtTheStartOfTheMonth)
  // const balanceAtTheStartOfTheMonth = chain(balanceAtTheEndOfTheMonth)
  //   .dropRight(1)
  //   .reverse()
  //   .push(0)
  //   .reverse()
  //   .value()

  // console.log('balanceAtTheStartOfTheMonth', balanceAtTheStartOfTheMonth)
  return (
    <TableBody>
      {type === 'Cash Flow' ? <TableRow>
        <TableCell align="left" className={classNames(classes.left, classes.fontBold)}>
          Остаток на конец месяца
        </TableCell>
        {/* {balanceAtTheEndOfTheMonth!.map(
          (val, idx) => <TableCell key={idx}>{getBalance(val)} {currency}</TableCell>
        )} */}
        {balanceAtTheStartOfTheMonth!.map(
          (val, idx) => idx !== 0 &&
            <TableCell key={idx} className={classes.fontBold}>{getBalance(val)} {currency}</TableCell>
        )}
      </TableRow> : null}

      <TableRow>
        <TableCell
          align="left"
          className={classNames(classes.left, classes.fontBold)}
        >
          {type === 'P&L' ? 'Прибыль' : 'Чистый денежный поток'}
        </TableCell>
        {reportData.allDataObj && reportData.allDataObj.newSaldoData.map(
          (val, idx) => <TableCell key={idx} className={classes.fontBold}>{getBalance(val.y)} {currency}</TableCell>)}
      </TableRow>

      <TableRow>
        <TableCell align="left" className={classNames(classes.left, classes.fontBold)}>Доход</TableCell>
        {reportData.allDataObj && reportData.allDataObj.newSaldoDataIncome.map(
          (val, idx) => <TableCell key={idx} className={classes.fontBold}>{getBalance(val)} {currency}</TableCell>)}
      </TableRow>

      {tableIncomeData && tableIncomeData.map(
        (val, idx) => (
          <TableRow key={idx}>
            <TableCell align="left" className={classNames([classes.body, classes.left])}>
              {val.name}
            </TableCell>
            {val.tableDataValues.map((v, i) => (
              <TableCell
                key={i}
                className={classes.body}
              >
                {v === 0 ? `${v} ${currency}` : `${getBalance(v)} ${currency}`}
              </TableCell>))}
          </TableRow>))}

      <TableRow>
        <TableCell align="left" className={classNames(classes.left, classes.fontBold)}>Расход</TableCell>
        {reportData.allDataObj && reportData.allDataObj.newSaldoDataConsumption.map(
          (val, idx) => <TableCell key={idx} className={classes.fontBold}>{getBalance(val)} {currency}</TableCell>)}
      </TableRow>

      {tableConsumptionData && tableConsumptionData.map(
        (val, idx) => (
          <TableRow key={idx}>
            <TableCell align="left" className={classNames([classes.body, classes.left])}>
              {val.name}
            </TableCell>
            {val.tableDataValues.map((v, i) => (
              <TableCell
                key={i}
                className={classes.body}
              >
                {v === 0 ? `${getBalance(v)} ${currency}` : `-${getBalance(v)} ${currency}`}
              </TableCell>))}
          </TableRow>))}
      {type === 'Cash Flow' ? <TableRow>
        <TableCell align="left" className={classNames(classes.left, classes.fontBold)}>Остаток на начало
          месяца</TableCell>
        {balanceAtTheStartOfTheMonth!.map(
          (val, idx) => idx !== balanceAtTheStartOfTheMonth.length - 1 &&
            <TableCell key={idx} className={classes.fontBold}>{getBalance(val)} {currency}</TableCell>
        )}
      </TableRow> : null}
    </TableBody>
  )
}

export default withStyles(styles)(Body)
