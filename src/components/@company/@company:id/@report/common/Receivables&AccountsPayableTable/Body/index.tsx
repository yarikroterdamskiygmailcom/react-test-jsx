import React from 'react'
import { Button, createStyles, TableBody, TableCell, TableRow, withStyles, WithStyles } from '@material-ui/core'
import { TableCounterpartyType } from 'src/redux/app/reports/receivables/types'

const styles = createStyles({
  hover: {
    cursor: 'pointer',
  },
  firstCell: {
    textAlign: 'left',
    paddingLeft: 50,
    paddingRight: 5,
    width: '30%',
    fontSize: 15,
    '@media (max-width: 1399.98px)': {
      fontSize: 14,
      paddingLeft: 30,
    },
    '@media (max-width: 799.98px)': {
      fontSize: 11,
      paddingLeft: 10,
    },
  },
  secondCell: {
    textAlign: 'left',
    paddingLeft: 50,
    paddingRight: 5,
    width: '50%',
    fontSize: 15,
    '@media (max-width: 1399.98px)': {
      fontSize: 14,
      paddingLeft: 30,
    },
    '@media (max-width: 799.98px)': {
      fontSize: 11,
      paddingLeft: 10,
    },
  },
  thirdCell: {
    width: '20%',
    textAlign: 'left',
  },
  receivablesRoot: {
    width: '70%',
    fontSize: 14,
    height: 45,
    padding: '0 10px',
    '@media (max-width: 1399.98px)': {
      fontSize: 14,
    },
    '@media (max-width: 799.98px)': {
      fontSize: 11,
    },
    background: '#5CDC8F'
  },
  accountsPayableRoot: {
    width: '70%',
    fontSize: 14,
    height: 45,
    padding: '0 10px',
    '@media (max-width: 1399.98px)': {
      fontSize: 14,
    },
    '@media (max-width: 799.98px)': {
      fontSize: 11,
    },
    background: '#E6775B'
  }
})

interface BodyProps extends WithStyles<typeof styles> {
  sortedData: TableCounterpartyType[],
  currency: string,
  buttonLabel: string,
  chooseCounterparty: (data: TableCounterpartyType) => () => void,
  openTransfer: () => void,
}

const Body = ({ classes, sortedData, currency, buttonLabel, chooseCounterparty, openTransfer }: BodyProps) => {
  const setTransfer = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    openTransfer()
  }
  return (
    <TableBody>
      {sortedData && sortedData.map((value, index) => (
        <TableRow className={classes.hover} hover key={index} onClick={chooseCounterparty(value)}>
          <TableCell className={classes.firstCell}>{value.label}</TableCell>
          <TableCell className={classes.secondCell}>{Math.abs(value.sum).toLocaleString('ru')} {currency}</TableCell>
          <TableCell className={classes.thirdCell}>
            <Button
              onClick={setTransfer}
              variant="text"
              classes={{
                root: buttonLabel === 'Внести оплату'
                  ? classes.receivablesRoot
                  : classes.accountsPayableRoot,
              }}
            >
              {buttonLabel}
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default withStyles(styles)(Body)
