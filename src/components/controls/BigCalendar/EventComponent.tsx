import React from 'react'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { getBalance } from 'src/utils/getBalance'

const styles = createStyles({
  incomeStyle: {
    background: '#55cda1',
    borderRadius: 5,
  },
  consumptionStyle: {
    background: '#ff7676',
    borderRadius: 5,
  },
  consumptionDblStyle: {
    background: '#ff7676',
    borderRadius: 5,
    marginTop: 5,
  },
  balanceStyle: {
    color: '#000000',
    // marginTop: 75,
  },
  balanceDblStyle: {
    color: '#000000',
    // marginTop: 42,
  },
  aa: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  wrapperStyle: {
    height: 130,
  },
})

interface Props extends WithStyles<typeof styles> {
  event: {
    income: number,
    consumption: number,
    balance: number,
  }
  title: string,
}

const EventComponent = (props: Props) => {
  const { classes, event: { income, consumption, balance } } = props
  const incomeValue = getBalance(income)
  const consumptionValue = getBalance(consumption)
  const balanceValue = getBalance(balance)

  let content = <div/>
  if (!income && !consumption) {
    content = <div/>
  } else if (!income) {
    content = (
      <div className={classes.aa}>
        <div className={classes.consumptionStyle}>- {consumptionValue}$</div>
        <div className={classes.balanceStyle}>{balanceValue}$</div>
      </div>
    )
  } else if (!consumption) {
    content = (
      <div className={classes.aa}>
        <div className={classes.incomeStyle}>+ {incomeValue}$</div>
        <div className={classes.balanceStyle}>{balanceValue}$</div>
      </div>
    )
  } else {
    content = (
      <div className={classes.aa}>
        <div>
          <div className={classes.incomeStyle}>+ {incomeValue}$</div>
          <div className={classes.consumptionDblStyle}>- {consumptionValue}$</div>
        </div>
        <div className={classes.balanceDblStyle}>{balanceValue}$</div>
      </div>
    )
  }
  return <div className={classes.wrapperStyle}>{content}</div>
}

export default withStyles(styles)(EventComponent)
