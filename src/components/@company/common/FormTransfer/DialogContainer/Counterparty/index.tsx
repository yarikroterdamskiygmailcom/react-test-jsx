import React from 'react'
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import ControlAutosuggest from 'src/components/controls/Autosuggest'
import { globalStyles } from 'src/styles/global-styles'
import { Field } from 'formik'
import classNames from 'classnames'

const styles = (theme: Theme) => createStyles({
  root: {
    ...globalStyles.fullWidth,
    ...globalStyles.flexBetween,
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  inputPadding: {
    width: '100%',
    marginRight: 30,
  },
  inputPaddingNone: {
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
})

const Counterparty = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <div className={classes.inputPadding}>
      <Field
        fullWidth
        name="counterpartyTo"
        inputLabel="Контрагент"
        placeholder="Выберите контрагента"
        component={ControlAutosuggest}
      />
    </div>

    <div className={classNames([classes.inputPadding, classes.inputPaddingNone])}>
      <Field
        fullWidth
        name="counterpartyFrom"
        inputLabel="Контрагент"
        placeholder="Выберите контрагента"
        component={ControlAutosuggest}
      />
    </div>
  </div>
)

export default withStyles(styles)(Counterparty)
