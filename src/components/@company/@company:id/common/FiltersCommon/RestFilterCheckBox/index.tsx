import React from 'react'
import { Field } from 'formik'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'
import SelectFilterCheckBox from 'src/components/controls/SelectFilterCheckBox'
import TagsAutosuggest from 'src/components/controls/TagsAutosuggest'
import { globalStyles } from 'src/styles/global-styles'
import connector from './connector'

const styles = (theme: Theme) => createStyles({
  root: {
    [theme.breakpoints.down('sm')]: {
      ...globalStyles.flexEvenly,
    },
    [theme.breakpoints.down('xs')]: {
      margin: 2,
      display: 'flex',
      flexDirection: 'column-reverse',
    },
  },
  container: {
    ...globalStyles.flexAround,
    [theme.breakpoints.down('md')]: {
      ...globalStyles.flexBetween,
      margin: 0,
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  counterparties: {
    margin: 10,
    width: '100%',
    maxWidth: 320,
    [theme.breakpoints.down('md')]: {
      maxWidth: 270,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'none',
      margin: '5px 0',
    },
  },
  block: {
    margin: 10,
    width: '100%',
    maxWidth: 320,
    [theme.breakpoints.down('md')]: {
      maxWidth: 270,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'none',
      margin: '5px 0',
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  isFiltersOpened: boolean,
}

const RestFilterCheckBox = ({ classes, isFiltersOpened }: Props) => {
  if (!isFiltersOpened) return null

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.block}>
          <Field
            name="operationsTypes"
            inputLabel="Типы операций"
            component={SelectFilterCheckBox}
          />
        </div>
        <div className={classes.block}>
          <Field
            name="incomeCategories"
            inputLabel="Категории доходов"
            component={SelectFilterCheckBox}
          />
        </div>
        <div className={classes.block}>
          <Field
            name="consumptionCategories"
            inputLabel="Категории расходов"
            component={SelectFilterCheckBox}
          />
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.counterparties}>
          <Field
            small
            fullWidth
            name="counterparties"
            inputLabel="Контрагенты"
            placeholder="Все контрагенты"
            component={TagsAutosuggest}
          />
        </div>
        <div className={classes.block}>
          <Field
            name="projects"
            inputLabel="Проекты"
            component={SelectFilterCheckBox}
          />
        </div>
        <div className={classes.block}>
          <Field
            name="tags"
            inputLabel="Теги"
            component={SelectFilterCheckBox}
          />
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(connector(RestFilterCheckBox))
