import React, { Component } from 'react'
import { createStyles, Table, withStyles, WithStyles } from '@material-ui/core'
import { TableCounterpartyType } from 'src/redux/app/reports/receivables/types'
import NotFoundDataTable from 'src/components/common/NotFoundDataTable'
import { headerRPLabels } from 'src/constants'
import { RowOrPage } from 'src/redux/app/ui/tableFilter/types'
import TableHead from './Head'
import TableBody from './Body'
import connector from './connector'

const styles = createStyles({
  root: {
    width: 'calc(100vw - 435px)',
    overflowX: 'auto',
    margin: '10px 30px 40px',
    '@media (max-width: 1279.98px)': {
      width: 'calc(100vw - 400px)',
    },
    '@media (max-width: 1023.98px)': {
      width: 'calc(100vw - 20px)',
      margin: '10px 10px 20px',
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  tableData: TableCounterpartyType[] | null,
  currency: string,
  buttonLabel: string,
  getTableData: (props?: RowOrPage) => void
  actions: {
    chooseCounterparty: (data: TableCounterpartyType) => void,
    openTransfer: () => void,
  }
}

class RPTable extends Component<Props> {

  public chooseCounterparty = (data: TableCounterpartyType) => () => {
    const { chooseCounterparty } = this.props.actions
    chooseCounterparty(data)
  }

  public openTransfer = () => {
    const { openTransfer } = this.props.actions
    openTransfer()
  }

  public render() {
    const { classes, tableData, currency, buttonLabel } = this.props
    if (!tableData) return <NotFoundDataTable />

    return (
      <Table className={classes.root}>
        <TableHead headerLabels={headerRPLabels} />
        <TableBody
          currency={currency}
          sortedData={tableData}
          buttonLabel={buttonLabel}
          chooseCounterparty={this.chooseCounterparty}
          openTransfer={this.openTransfer}
        />
      </Table>
    )
  }
}

export default withStyles(styles)(connector(RPTable))
