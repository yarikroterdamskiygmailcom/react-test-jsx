import React from 'react'
import classNames from 'classnames'
import { createStyles, Dialog, Theme, WithStyles, withStyles } from '@material-ui/core'
import { SetOperation } from 'src/redux/app/types'
import { globalStyles } from 'src/styles/global-styles'
import FormIncomeConsumption from '../common/FormIncomeConsumption'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: 1100,
      height: 'auto',
      maxWidth: 'none',
      borderRadius: 10,
      overflowX: 'hidden',
      background: '#FAFCFF',
      '-webkit-appearance': 'none',
      [theme.breakpoints.down('sm')]: {
        margin: 30,
      },
      [theme.breakpoints.down('xs')]: {
        margin: 15,
      },
      '@media (max-width: 340px)': {
        margin: 5,
      },
    },
    income: {
      border: '2px solid #57de8b',
      boxShadow: '0 0 38px rgba(87,222,139,0.53)',
      '-webkit-box-shadow': '0 0 38px rgba(87,222,139,0.53)',
    },
    consumption: {
      border: '2px solid #ff7676cf',
      boxShadow: '0 0 38px rgba(232,120,87,0.53)',
      '-webkit-box-shadow': '0 0 38px rgba(232,120,87,0.53)',
    },
    container: {
      margin: 40,
      ...globalStyles.flexCenter,
      [theme.breakpoints.down('sm')]: {
        marginTop: 10,
      },
      [theme.breakpoints.down('xs')]: {
        margin: 10,
      },
      '@media (max-width: 340px)': {
        margin: 5,
      },
    },
  })

interface Props extends WithStyles<typeof styles> {
  isIncomeOpened: boolean,
  isConsumptionOpened: boolean,
  onSubmit: (data: SetOperation) => void,
  onDelete: () => void,
  onCloseDialog: () => void,
}

const DialogIncomeConsumption = ({ classes, isIncomeOpened, isConsumptionOpened, onCloseDialog, onSubmit, onDelete }: Props) => (
  <Dialog
    open={isIncomeOpened || isConsumptionOpened}
    onClose={onCloseDialog}
    PaperProps={{
      className: classNames([classes.root, isIncomeOpened && classes.income, isConsumptionOpened && classes.consumption])
    }}
  >
    <div className={classes.container}>
      <FormIncomeConsumption onSubmit={onSubmit} onDelete={onDelete} />
    </div>
  </Dialog>
)

export default withStyles(styles)(DialogIncomeConsumption)
