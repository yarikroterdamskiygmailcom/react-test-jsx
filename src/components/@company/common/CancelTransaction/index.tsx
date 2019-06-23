import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { Button, createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import { JournalAnalyticsData } from 'src/redux/app/types'
import { globalStyles } from 'src/styles/global-styles'
import connector from './connector'

const styles = (theme: Theme) => createStyles({
  button: {
    ...globalStyles.headerButton,
    height: 44,
    width: '100%',
    marginTop: 5,
    background: '#8a8a8a',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
    },
    '&:hover': {
      background: 'white',
      color: theme.palette.primary.dark,
    },
  },
  cancel: {
    marginTop: 10,
    color: '#323335',
    background: '#e5eef3',
    boxShadow: 'none',
    '-webkit-box-shadow': 'none',
    '&:hover': {
      background: '#D8E1E6',
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  isIncomeOpened: boolean,
  isTransferOpened: boolean,
  isConsumptionOpened: boolean,
  journalData: JournalAnalyticsData | null,
  analyticsData: JournalAnalyticsData | null,
  receivablesData: JournalAnalyticsData[] | null,
  actions: {
    closeIncome: () => void,
    closeTransfer: () => void,
    closeConsumption: () => void,
    resetInputSum: () => void,
    leaveCurrentJournalData: () => void,
    leaveCurrentAnalyticsData: () => void,
  },
}

class CancelTransaction extends PureComponent<Props> {
  public handleCloseDialog = () => {
    const { actions, isIncomeOpened, isConsumptionOpened, isTransferOpened } = this.props
    if (isIncomeOpened) actions.closeIncome()
    if (isTransferOpened) actions.closeTransfer()
    if (isConsumptionOpened) actions.closeConsumption()
    actions.leaveCurrentJournalData()
    actions.leaveCurrentAnalyticsData()
    actions.resetInputSum()
  }

  public render() {
    const { classes, journalData, analyticsData, receivablesData } = this.props
    return (journalData || analyticsData || receivablesData) && (
      <Button
        onClick={this.handleCloseDialog}
        className={classNames(classes.button, classes.cancel)}
      >
        Отмена
      </Button>
    )
  }
}

export default withStyles(styles)(connector(CancelTransaction))
