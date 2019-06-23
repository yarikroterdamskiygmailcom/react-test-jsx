import React from 'react'
import { createStyles, TableBody, TableCell, TableRow, WithStyles, withStyles } from '@material-ui/core'
import { hundredPercents, numberForRound } from 'src/constants'
import { ChosenProjectsData } from 'src/redux/app/reports/types'

import connector from './connector'

const styles = createStyles({
  hover: {
    cursor: 'pointer',
  },
  tableCell: {
    textAlign: 'left',
    maxWidth: '20%',
    paddingRight: 50,
  },
})

type ChooseReportsProjectDataType = {
  name: string,
  profit: number,
  profitability: number,
  id: string,
  ids: string[]
}

interface Props extends WithStyles<typeof styles> {
  sortedData: { incomeValue: number, consumptionValue: number, name: string, id: string }[],
  actions: {
    chooseReportsProject: (data: ChosenProjectsData) => void
  }
}

const Body = ({ sortedData, actions, classes }: Props) => {

  const chooseReportsProject = (data: ChooseReportsProjectDataType) => {
    const { chooseReportsProject } = actions
    chooseReportsProject(data)
  }

  const ids = sortedData.reduce((acc: string[], val) => {
    acc.push(val.id)
    return acc
  },                            [])

  return (
    <TableBody>
      {sortedData && sortedData.map((value, index) => {
        const { incomeValue, consumptionValue, name, id } = value

        const profitValue = incomeValue - consumptionValue

        const incomeRoundedValue = Math.round(incomeValue * numberForRound) / numberForRound
        const consumptionRoundedValue = Math.round(consumptionValue * numberForRound) / numberForRound
        const profitRoundedValue = Math.round(profitValue * numberForRound) / numberForRound

        const profitabilityPercentage = hundredPercents - ((consumptionRoundedValue / incomeRoundedValue) * hundredPercents)
        const profitabilityRoundedPercentage = incomeRoundedValue ? Math.round((profitabilityPercentage) * hundredPercents) / hundredPercents : 0

        const reportData = {
          id,
          name,
          ids,
          profit: profitRoundedValue,
          profitability: profitabilityRoundedPercentage
        }
        return (
          <TableRow className={classes.hover} hover key={index} onClick={() => chooseReportsProject(reportData)}>
            <TableCell className={classes.tableCell}>{name}</TableCell>
            <TableCell className={classes.tableCell}>{consumptionRoundedValue.toLocaleString('ru')}</TableCell>
            <TableCell className={classes.tableCell}>{incomeRoundedValue.toLocaleString('ru')}</TableCell>
            <TableCell className={classes.tableCell}>{profitRoundedValue.toLocaleString('ru')}</TableCell>
            <TableCell className={classes.tableCell}>{profitabilityRoundedPercentage} %</TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default withStyles(styles)(connector(Body))
