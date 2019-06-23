import React from 'react'
import { createStyles, Hidden, Theme, WithStyles, withStyles } from '@material-ui/core'
import ControlAutosuggest from 'src/components/controls/Autosuggest'
import DialogInputSum from 'src/components/controls/DialogInputSum'
import { globalStyles } from 'src/styles/global-styles'
import ExchangeRateField from '../ExchangeRateField'
import { Field } from 'formik'

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    marginRight: 30,
    ...globalStyles.alignCenter,
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    }
  },
})

const SecondColumn = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <Hidden xsDown implementation="css">
      <Field
        fullWidth
        name="sum"
        type="number"
        hasAdditionalNode
        inputLabel="Сумма"
        placeholder="Введите сумму"
        component={DialogInputSum}
        additionalInputNode={<ExchangeRateField />}
      />
    </Hidden>

    <Field
      fullWidth
      name="accountTo"
      inputLabel="На счет"
      placeholder="Выберите счет"
      component={ControlAutosuggest}
    />
  </div>
)

export default withStyles(styles)(SecondColumn)
