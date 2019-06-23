import React from 'react'
import classNames from 'classnames'
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import ControlAutosuggest from 'src/components/controls/Autosuggest'
import { globalStyles } from 'src/styles/global-styles'
import { Field } from 'formik'

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

const ProjectAndCategory = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <div className={classes.inputPadding}>
      <Field
        fullWidth
        name="incomeCategory"
        inputLabel="Категория"
        placeholder="Выберите категорию"
        component={ControlAutosuggest}
      />
      <Field
        fullWidth
        name="consumptionCategory"
        inputLabel="Категория"
        placeholder="Выберите категорию"
        component={ControlAutosuggest}
      />
    </div>

    <div className={classNames([classes.inputPadding, classes.inputPaddingNone])}>
      <Field
        fullWidth
        name="projectsTransfer"
        inputLabel="Проект"
        placeholder="Выберите проект"
        component={ControlAutosuggest}
      />
    </div>
  </div>
)

export default withStyles(styles)(ProjectAndCategory)
