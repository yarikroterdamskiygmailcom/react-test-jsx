import React from 'react'
import { Field } from 'formik'
import classNames from 'classnames'
import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import FilterSelect from 'src/components/controls/FilterSelect'
import TagsAccount from 'src/components/controls/TagsAccount'
import InputDate from 'src/components/controls/InputDate'
import { globalStyles } from 'src/styles/global-styles'
import RestFilterCheckBox from '../../FiltersCommon/RestFilterCheckBox'
import FilterSettings from '../../FiltersCommon/Settings'
import FilterSearch from '../../FiltersCommon/Search'

const styles = createStyles({
  ...globalStyles,
  root: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    background: 'white',
  },
  topBlock: {
    ...globalStyles.fullWidth,
    ...globalStyles.flexCenter,
    '@media (max-width: 1550px)': {
      flexDirection: 'column-reverse',
    },
  },
  container: {
    ...globalStyles.fullWidth,
    ...globalStyles.flexBetween,
    '@media (max-width: 1550px)': {
      ...globalStyles.flexCenter,
    },
  },
  block: {
    ...globalStyles.fullWidth,
    ...globalStyles.flexBetween,
    '@media (max-width: 1200px)': {
      ...globalStyles.flexCenter,
    },
  },
  fieldMargin: {
    margin: '0 40px',
    '@media (max-width: 1800px)': {
      margin: '0 20px',
    },
    '@media (max-width: 1620px)': {
      margin: '0 10px',
    },
    '@media (max-width: 1550px)': {
      margin: 10,
    },
    '@media (max-width: 1200px)': {
      margin: 4,
    },
  },
  journal: {
    minWidth: 91,
    position: 'relative',
  },
  date: {
    minWidth: 175,
  },
  accounts: {
    ...globalStyles.fullWidth,
    minWidth: 220,
    '@media (max-width: 1300px)': {
      minWidth: 190,
    },
  },
})

const FiltersDesctop = ({ classes }: WithStyles<typeof styles>) => (
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
            <div className={classNames(classes.fieldMargin, classes.date)}>
              <Field
                name="date"
                submitForm
                selectRange
                component={InputDate}
              />
            </div>

            <div className={classNames(classes.fieldMargin, classes.accounts)}>
              <Field
                small
                fullWidth
                submitForm
                name="accounts"
                placeholder="Все счета"
                component={TagsAccount}
              />
            </div>

            <div className={classes.fieldMargin}>
              <FilterSettings />
            </div>
          </div>
        </div>
      </div>

      <FilterSearch />
    </div>

    <RestFilterCheckBox />
  </div>
)

export default withStyles(styles)(FiltersDesctop)
