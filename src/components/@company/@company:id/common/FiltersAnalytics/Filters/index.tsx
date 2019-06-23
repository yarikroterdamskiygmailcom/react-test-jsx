import React from 'react'
import { Field } from 'formik'
import classNames from 'classnames'
import { globalStyles } from 'src/styles/global-styles'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'
import AnalyticsControl from 'src/components/controls/Analytics'
import FilterSelect from 'src/components/controls/FilterSelect'
import InputDate from 'src/components/controls/InputDate'
import RestFilterCheckBox from '../../FiltersCommon/RestFilterCheckBox'
import FilterSettings from '../../FiltersCommon/Settings'
import FilterSearch from '../../FiltersCommon/Search'

const styles = (theme: Theme) => createStyles({
  ...globalStyles,
  root: {
    paddingTop: 25,
    paddingBottom: 15,
    background: 'white',
  },
  topBlock: {
    ...globalStyles.fullWidth,
    ...globalStyles.flexCenter,
    '@media (max-width: 1024px)': {
      padding: '0 10%',
      flexDirection: 'column',
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
    ...globalStyles.flexEvenly,
    '@media (max-width: 1200px)': {
      ...globalStyles.flexCenter,
    },
    '@media (max-width: 1023px)': {
      flexDirection: 'column',
    },
  },
  mobileRow: {
    ...globalStyles.fullWidth,
    ...globalStyles.flexBetween,
    '@media (max-width: 600px)': {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
  },
  mobileFiltersRow: {
    ...globalStyles.flexBetween,
    width: '60%',
    '@media (max-width: 740px)': {
      width: '64%',
    },
    '@media (max-width: 600px)': {
      width: 'initial',
    },
  },
  mobileFiltersRowEnd: {
    ...globalStyles.fullWidth,
    ...globalStyles.flexCenter,
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
      margin: 4,
    },
    '@media (max-width: 1200px)': {
      margin: 3,
    },
    '@media (max-width: 1024px)': {
      marginBottom: 10,
    },
    '@media (max-width: 600px)': {
      maxWidth: 320,
    },
  },
  reportType: {
    minWidth: 140,
  },
  category: {
    minWidth: 142,
    marginBottom: 0,
    '@media (max-width: 1024px)': {
      ...globalStyles.fullWidth,
    },
    '@media (max-width: 600px)': {
      width: 200,
    },
  },
  data: {
    '@media (max-width: 1024px)': {
      ...globalStyles.fullWidth,
    },
  },
  bottomNone: {
    marginBottom: 0,
  },
  desktop: {
    '@media (max-width: 1024px)': {
      display: 'none',
    },
  },
  mobile: {
    display: 'none',
    marginBottom: 0,
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  tablet: {
    display: 'none',
    '@media (max-width: 1024px)': {
      display: 'block',
    },
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
})

const Filters = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <div className={classes.fullWidth}>
      <div className={classes.container}>
        <div className={classes.topBlock}>
          <div className={classes.block}>
            <div className={classes.mobileRow}>
              <div className={classes.mobileFiltersRow}>
                <div className={classes.fieldMargin}>
                  <Field
                    fullWidth
                    submitForm
                    name="analytics"
                    component={AnalyticsControl}
                  />
                </div>
                <div className={classNames(classes.fieldMargin, classes.reportType)}>
                  <Field
                    fullWidth
                    submitForm
                    name="reportType"
                    component={AnalyticsControl}
                  />
                </div>
              </div>
              <div className={classNames(classes.fieldMargin, classes.tablet)}>
                <FilterSettings />
              </div>
            </div>
            <div className={classes.mobileRow}>
              <div className={classes.mobileFiltersRowEnd}>
                <div className={classNames(classes.fieldMargin, classes.category)}>
                  <Field
                    fullWidth
                    submitForm
                    name="category"
                    placeholder="Выберите категорию"
                    component={FilterSelect}
                  />
                </div>
              </div>
              <div className={classNames(classes.fieldMargin, classes.data)}>
                <Field
                  name="date"
                  fullWidth
                  submitForm
                  selectRange
                  component={InputDate}
                />
              </div>
            </div>

            <div className={classNames(classes.desktop, classes.fieldMargin)}>
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

export default withStyles(styles)(Filters)
