import React from 'react'
import { Field } from 'formik'
import classNames from 'classnames'
import { Button, createStyles, Hidden, Theme, WithStyles, withStyles } from '@material-ui/core'
import ControlAutosuggest from 'src/components/controls/Autosuggest'
import { globalStyles } from 'src/styles/global-styles'
import CheckBox from 'src/components/controls/CheckBox'
import { JournalAnalyticsData } from 'src/redux/app/types'
import CancelTransaction from '../../../CancelTransaction'
import DeleteTransation from '../../../DeleteTransation'
import connector from './connector'

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: 330,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'none',
    },
  },
  container: {
    ...globalStyles.flexBetween,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 20,
    },
  },
  cancelDelete: {
    display: 'flex',
  },
  alignCenter: {
    ...globalStyles.alignCenter,
  },
  button: {
    ...globalStyles.headerButton,
    height: 44,
    width: '100%',
    marginTop: 5,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
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
  income: {
    background: theme.palette.primary.light,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  consumption: {
    background: '#ff7676',
    '&:hover': {
      background: '#FF5A4B',
    },
  },
  checkBoxRoot: {
    ...globalStyles.flexAround,
  },
  checkBox: {
    paddingRight: 5,
    ...globalStyles.alignCenter,
  },
})

interface Props extends WithStyles<typeof styles> {
  journalData: JournalAnalyticsData | null,
  analyticsData: JournalAnalyticsData | null,
  isIncomeOpened: boolean,
  isConsumptionOpened: boolean,
  isRepeatDisabled: boolean,
  onDelete: () => void,
}

const DialogActions = ({ classes, journalData, analyticsData, isIncomeOpened, isConsumptionOpened, isRepeatDisabled, onDelete }: Props) => (
  <div className={classes.root}>
    <div className={classes.container}>
      <div className={classes.checkBoxRoot}>
        <div className={classes.alignCenter}>
          <Field
            small
            name="scheduled"
            label="Плановая"
            component={CheckBox}
          />
        </div>
        <div className={classes.checkBox}>
          <Field
            small
            name="repeat"
            label="Повторять"
            component={CheckBox}
          />
        </div>
      </div>
      <Field
        small
        fullWidth
        name="repeatMonth"
        placeholder="каждый мес."
        component={ControlAutosuggest}
        isRepeatDisabled={isRepeatDisabled}
      />
    </div>

    <Button
      type="submit"
      className={classNames([classes.button, isIncomeOpened && classes.income, isConsumptionOpened && classes.consumption])}
    >
      Сохранить
    </Button>

    <div className={classes.cancelDelete}>
      <CancelTransaction />

      <Hidden mdUp implementation="css">
        <DeleteTransation journalData={journalData || analyticsData} onDelete={onDelete} />
      </Hidden>
    </div>
  </div>
)

export default withStyles(styles)(connector(DialogActions))
