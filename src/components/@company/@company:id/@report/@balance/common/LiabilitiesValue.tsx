import React from 'react'
import { createStyles, Typography, withStyles, WithStyles } from '@material-ui/core'
import BalanceValues from './BalanceValues'
import { globalStyles } from 'src/styles/global-styles'
import generateBalance from '../../../../../../utils/generateBalance'
import { Accounts } from '../../../../../../redux/app/company/types'

const styles = createStyles({
  root: {
    display: 'block',
    overflow: 'auto',
    backgroundColor: 'white',
    width: '45%',
    height: '100%!important',
    border: 'solid 1px #EBF0F3',
    borderRadius: 10,
    '@media (max-width: 799.98px)': {
      width: '100%',
    },
  },
  text: {
    fontWeight: 500,
    maxWidth: '50%',
    '@media (max-width: 1399.98px)': {
      fontSize: 14,
    },
    '@media (max-width: 799.98px)': {
      fontSize: 12,
    },
  },
  label: {
    padding: '20px',
    fontWeight: 700,
  },
  field: {
    ...globalStyles.flexBetween,
    padding: '20px',
    borderTop: 'solid 1px #EBF0F3',
  },
})

interface Props extends WithStyles<typeof styles> {
  selfCapital: number,
  activeBalance: number,
  currencySymbol: string | null,
  companyAccounts: Accounts | null,
}

const LiabilitiesValue = ({ classes, currencySymbol, activeBalance, selfCapital, companyAccounts }: Props) => {
  const balanceValues = generateBalance(companyAccounts)

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" className={classes.label}>
        Пассивы: {activeBalance.toLocaleString('ru')} {currencySymbol}
      </Typography>

      <div className={classes.field}>
        <Typography variant="subtitle1" className={classes.text}>
          Собственный капитал
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          {selfCapital.toLocaleString('ru')} {currencySymbol}
        </Typography>
      </div>

      <BalanceValues
        label="Обязательтва (кредиторка)"
        data={balanceValues.creditValues}
        currencySymbol={currencySymbol}
      />
    </div>
  )
}

export default withStyles(styles)(LiabilitiesValue)
