import React from 'react'
import { InputDataValue } from 'src/redux/app/company/types'
import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'

const styles = createStyles({
  field: {
    ...globalStyles.flexBetween,
    padding: '20px 20px',
    borderTop: 'solid 1px #EBF0F3',
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
  values: {
    ...globalStyles.flexBetween,
    backgroundColor: '#F7FAFC',
    padding: '20px 20px',
    borderTop: 'solid 1px #EBF0F3',
  }
})

interface BalanceValuesProps extends WithStyles<typeof styles> {
  label: string,
  data: InputDataValue[] | null,
  currencySymbol: string | null
}

const BalanceValues = ({ label, data, currencySymbol, classes }: BalanceValuesProps) => {
  const totalValue = data && data.reduce((acc, el) => {
    acc += el.balance!
    return acc
  },                                     0)
  return (
    <>
      <div className={classes.field}>
        <Typography variant="subtitle1" className={classes.text}>{label}</Typography>
        <Typography variant="subtitle1" className={classes.text}>
          {totalValue && Math.round(totalValue).toLocaleString('ru')} {currencySymbol}
        </Typography>
      </div>
      {data && data.map((el, idx) => (
        <div
          key={idx}
          className={classes.values}
        >
          <Typography variant="subtitle1" className={classes.text}>
            {el.label}
          </Typography>
          <Typography variant="subtitle1" className={classes.text}>
            {Math.round(el.balance!).toLocaleString('ru')} {currencySymbol}
          </Typography>
        </div>)
      )}
    </>
  )
}

export default withStyles(styles)(BalanceValues)
