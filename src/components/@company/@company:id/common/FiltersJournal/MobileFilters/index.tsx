import React from 'react'
import { Field } from 'formik'
import classNames from 'classnames'
import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import TagsAutosuggest from 'src/components/controls/TagsAutosuggest'
import FilterSelect from 'src/components/controls/FilterSelect'
import InputDate from 'src/components/controls/InputDate'
import { globalStyles } from 'src/styles/global-styles'
import RestFilterCheckBox from '../../FiltersCommon/RestFilterCheckBox'
import FilterSettings from '../../FiltersCommon/Settings'
import FilterSearch from '../../FiltersCommon/Search'
import connector from './connector'

const styles = () => createStyles({
  ...globalStyles,
  root: {
    padding: 10,
    background: 'white',
  },
  topBlock: {
    ...globalStyles.fullWidth,
    flexDirection: 'column',
  },
  container: {
    ...globalStyles.fullWidth,
    ...globalStyles.flexCenter,
  },
  block: {
    ...globalStyles.fullWidth,
    ...globalStyles.flexAround,
    marginBottom: 8,
  },
  fieldMargin: {
    margin: 4,
  },
  journal: {
    minWidth: 95,
  },
  field: {
    maxWidth: 620,
    margin: '0 auto',
    marginBottom: 10,
    '@media (max-width: 930px)': {
      maxWidth: 520,
    }
  },
  accounts: {
    minWidth: 190,
  },
})

const FilterJournal = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <div className={classes.fullWidth}>
      <div className={classes.container}>
        <div className={classes.topBlock}>
          <div className={classes.block}>
            <div className={classNames(classes.fieldMargin, classes.journal)}>
              <Field
                submitForm
                name="journal"
                component={FilterSelect}
              />
            </div>

            <div className={classes.fieldMargin}>
              <FilterSettings />
            </div>
          </div>
          <div className={classNames([classes.fieldMargin, classes.field])}>
            <Field
              name="date"
              fullWidth
              submitForm
              selectRange
              component={InputDate}
            />
          </div>

          <div className={classNames([classes.fieldMargin, classes.field, classes.accounts])}>
            <Field
              fullWidth
              submitForm
              name="accounts"
              placeholder="Все счета"
              component={TagsAutosuggest}
            />
          </div>
        </div>
      </div>

      <FilterSearch />
    </div>

    <RestFilterCheckBox />
  </div>
)

export default withStyles(styles)(connector(FilterJournal))
