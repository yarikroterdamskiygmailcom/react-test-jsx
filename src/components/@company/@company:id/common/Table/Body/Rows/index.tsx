import React, { MouseEvent } from 'react'
import { createStyles, TableCell, TableRow, Theme, Typography, WithStyles, withStyles } from '@material-ui/core'
import { getOperationTypeColor, operationType, outputValueConterparty } from 'src/utils/table'
import TableCheckBox from 'src/components/controls/TableCheckBox'
import { JournalAnalyticsData } from 'src/redux/app/types'
import { globalStyles } from 'src/styles/global-styles'
import { getBalance } from 'src/utils/getBalance'
import TagsComment from './TagsComment'
import classNames from 'classnames'

const styles = (theme: Theme) => createStyles({
  sum: {
    minWidth: 100,
    [theme.breakpoints.down('md')]: {
      minWidth: 85,
    },
  },
  date: {
    paddingLeft: 10,
  },
  account: {
    paddingTop: 24,
    minWidth: 150,
    [theme.breakpoints.down('md')]: {
      minWidth: 100,
    },
  },
  balance: {
    fontSize: 11,
    paddingTop: 5,
    color: '#9c9c9c',
  },
  conterparty: {
    ...globalStyles.alignCenter,
    marginTop: 3,
  },
  conterpartyBlock: {
    [theme.breakpoints.down('md')]: {
      minWidth: 125,
    },
  },
  scheduled: {
    fontSize: 13,
    color: '#9c9c9c',
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  data: JournalAnalyticsData,
  onSelect?: (event: MouseEvent<HTMLTableElement>) => void
  onChoose?: () => void
}

type GetBalance = {
  balance: number | string | null,
  symbol: string,
}

const BodyRows = ({ classes, data, onSelect, onChoose }: Props) => {
  const getBalances = (getBalance: GetBalance | null | undefined) =>
    !!getBalance && (`${getBalance.balance} ${getBalance.symbol}`)

  const accountBalance = data.account && {
    balance: getBalance(data.account.balance!),
    symbol: data.account.account_currency!.symbol
  }

  const accountToBalance = data.accountTo && {
    balance: getBalance(data.accountTo.balance!),
    symbol: data.accountTo.account_currency!.symbol,
  }

  const accountFromBalance = data.accountFrom && {
    balance: getBalance(data.accountFrom.balance!),
    symbol: data.accountFrom.account_currency!.symbol,
  }

  const accountValue: string | null | undefined = data.account && data.account.value
  const accountFromValue: string | null | undefined = data.accountFrom && data.accountFrom.value

  return (
    <TableRow hover onClick={onChoose}>
      {!!onSelect && (
        <TableCell>
          <TableCheckBox value={data.selected} onSelect={onSelect} />
        </TableCell>)}

      <TableCell className={classNames({ [classes.date]: !onSelect })}>
        <div>
          {data.date}
          <br />
          <div>
            {!data.repeatable && data.scheduled && (
              <Typography className={classes.scheduled}>Плановая</Typography>)}
          </div>
        </div>
      </TableCell>

      <TableCell>
        {operationType(data.operationType, data.accountTo, data.accountFrom)}
      </TableCell>

      <TableCell className={classes.sum}>
        <div
          style={{ color: getOperationTypeColor(data.operationType, data.accountTo, data.accountFrom) }}
        >
          {getBalance(data.sum)} $
        </div>
      </TableCell>

      <TableCell className={classes.account}>
        <div>
          {data.account ? accountValue : accountFromValue}
          <br />
          <div className={classes.balance}>
            {data.account
              ? getBalances(accountBalance)
              : getBalances(accountFromBalance)}
          </div>
        </div>
      </TableCell>

      <TableCell className={classes.conterpartyBlock}>
        {outputValueConterparty(data, classes.conterparty)}
      </TableCell>

      <TableCell>
        {data.category ? data.category.value : (data.accountTo && (
          <div className={classes.account}>
            {data.accountTo.value}
            <br />
            <div className={classes.balance}>
              {getBalances(accountToBalance)}
            </div>
          </div>
        ))}
      </TableCell>

      <TableCell>
        {data.project && data.project.value}
      </TableCell>

      <TagsComment data={data} />
    </TableRow>
  )
}

export default withStyles(styles)(BodyRows)
