import React from 'react'
import { Button, createStyles, Hidden, Theme, WithStyles, withStyles } from '@material-ui/core'
import CancelTransaction from 'src/components/@company/common/CancelTransaction'
import DeleteTransation from 'src/components/@company/common/DeleteTransation'
import ControlAutosuggest from 'src/components/controls/Autosuggest'
import { JournalAnalyticsData } from 'src/redux/app/types'
import { globalStyles } from 'src/styles/global-styles'
import CheckBox from 'src/components/controls/CheckBox'
import { Field } from 'formik'
import connector from './connector'

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
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
    background: '#8a8a8a',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
    },
    '&:hover': {
      background: 'white',
      color: theme.palette.primary.dark,
    },
  },
  checkBoxRoot: {
    ...globalStyles.flexAround,
  },
  checkBox: {
    paddingRight: 10,
    ...globalStyles.alignCenter,
  },
})

interface Props extends WithStyles<typeof styles> {
  journalData: JournalAnalyticsData | null,
  analyticsData: JournalAnalyticsData | null,
  isRepeatDisabled: boolean,
  onDelete: () => void,
}

const DialogActions = ({ classes, journalData, analyticsData, isRepeatDisabled, onDelete }: Props) => (
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

    <Button type="submit" className={classes.button}>
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
