import React from 'react'
import { Field } from 'formik'
import { createStyles, Hidden, WithStyles, withStyles } from '@material-ui/core'
import ControlAutosuggest from 'src/components/controls/Autosuggest'
import DialogInputSum from 'src/components/controls/DialogInputSum'
import InputDate from 'src/components/controls/InputDate'
import ExchangeRateField from '../ExchangeRateField'
import { globalStyles } from 'src/styles/global-styles'

const styles = createStyles({
  root: {
    width: '100%',
    marginRight: 30,
    ...globalStyles.alignCenter,
  },
})

const FirstColumn = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <Field
      fullWidth
      name="date"
      type="date"
      inputLabel="Дата"
      placeholder="Выберите дату"
      component={InputDate}
    />

    <Hidden smUp implementation="css">
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
      name="accountFrom"
      inputLabel="Со счета"
      placeholder="Выберите счет"
      component={ControlAutosuggest}
    />
  </div>
)

export default withStyles(styles)(FirstColumn)
