import React from 'react'
import { Field } from 'formik'
import { createStyles, Hidden, Theme, WithStyles, withStyles } from '@material-ui/core'
import ControlAutosuggest from 'src/components/controls/Autosuggest'
import DialogInputSum from 'src/components/controls/DialogInputSum'
import { globalStyles } from 'src/styles/global-styles'
import connector from './connector'

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

interface Props extends WithStyles<typeof styles> {
  isIncomeOpened: boolean,
  isConsumptionOpened: boolean,
}

const SecondColumn = ({ classes, isIncomeOpened, isConsumptionOpened }: Props) => (
  <div className={classes.root}>
    <Hidden xsDown implementation="css">
      <Field
        fullWidth
        name="sum"
        type="number"
        inputLabel="Сумма"
        placeholder="Введите сумму"
        component={DialogInputSum}
      />
    </Hidden>

    <Field
      fullWidth
      name={`${isIncomeOpened ? 'income' : (isConsumptionOpened && 'consumption')}`}
      inputLabel={`Категории ${isIncomeOpened ? 'доходов' : (isConsumptionOpened && 'расходов')}`}
      placeholder="Выберите категорию"
      component={ControlAutosuggest}
    />

    <Field
      fullWidth
      name="projects"
      inputLabel="Проект"
      placeholder="Выберите проект"
      component={ControlAutosuggest}
    />
  </div>
)

export default withStyles(styles)(connector(SecondColumn))
