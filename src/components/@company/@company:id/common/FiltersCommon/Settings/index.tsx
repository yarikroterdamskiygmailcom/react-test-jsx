import React, { Component, ReactInstance } from 'react'
import moment from 'moment'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { Button, createStyles, Divider, Theme, Typography, WithStyles, withStyles } from '@material-ui/core'
import { FiltersType, TableFilterState } from 'src/redux/app/ui/tableFilter/types'
import { globalStyles } from 'src/styles/global-styles'
import { FiltersData } from 'src/redux/app/types'
import gear from 'src/assets/images/gear.png'
import printerTool from 'src/assets/images/printer-tool.png'
import magnifyingGlass from 'src/assets/images/magnifying-glass.png'
import { analyticsCategory, income, journalFilter } from 'src/constants'
import connector from './connector'
import ReactToPrint from 'react-to-print'

const styles = (theme: Theme) => createStyles({
  root: {
    height: 39,
    width: '100%',
    borderRadius: 10,
    background: '#f7fafc',
    border: '1px solid #ecf5fa',
  },
  container: {
    height: '100%',
    ...globalStyles.flexBetween,
    ...globalStyles.alignCenter,
  },
  iconButton: {
    padding: 11,
    '&:hover': {
      background: '#D3D3D3',
      width: '100%',
      height: '45%',
    },
  },
  icon: {
    cursor: 'pointer',
    ...globalStyles.alignCenter,
  },
  divider: {
    height: 15,
    width: 1,
    ...globalStyles.alignCenter,
  },
  reset: {
    fontSize: 12,
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    cursor: 'pointer',
    textDecoration: 'underline',
    ...globalStyles.alignCenter,
  },
  button: {
    ...globalStyles.alignCenter,
    background: '#55d498',
    borderRadius: 10,
    color: 'white',
    height: '100%',
    fontSize: 12,
    padding: 7,
    '&:hover': {
      boxShadow: 'none',
      background: theme.palette.primary.light,
    },
  },
  label: {
    marginTop: 4,
  }
})

interface Props extends WithStyles<typeof styles> {
  isFiltersOpened: boolean,
  componentRef: object | null,
  tableFilter: TableFilterState,
  isFilterCommentOpened: boolean,
  filtersData: FiltersData | null,
  actions: {
    isOpenFilterComment: () => void,
    openOrCloseFilters: () => void,
    resetFilters: () => void,
  },
}

class FilterSettings extends Component<Props> {
  public handleOpenSearchComment = () => {
    const { isOpenFilterComment } = this.props.actions
    isOpenFilterComment()
  }

  public handleOpenFilters = () => {
    const { openOrCloseFilters } = this.props.actions
    openOrCloseFilters()
  }

  public handleResetFilters = () => {
    const { resetFilters } = this.props.actions
    resetFilters()
  }

  public checkOutputClear = (filtersData: FiltersData | null, tableFilter: TableFilterState) => {
    if (filtersData) {
      if (!isEmpty(tableFilter.filters)) {
        if (Object.values((tableFilter.filters as FiltersType).accountsFilter!).length > 0) {
          return true
        }
      }

      if (tableFilter.date && filtersData.initialDate) {
        const endDay = moment(tableFilter.date[1]).hour(0).minute(0).second(0).millisecond(0).toDate()

        const date = isEqual(filtersData.initialDate, [tableFilter.date[0], endDay])
        if (!date) return true
      }

      if ((tableFilter.filters as FiltersType).typesFilter) {
        const journal = isEqual((tableFilter.filters as FiltersType).typesFilter, journalFilter[0])
        if (!journal) return true
      }

      const analytics = tableFilter.analyticsPage.map(value => value.selected && value.value)
      if (analytics[0] !== income) return true

      const reportType = tableFilter.reportType.map(value => value.selected && value.value)
      if (reportType[0] !== 'Cash Flow') return true

      if (tableFilter.category) {
        const category = isEqual(tableFilter.category, analyticsCategory[0])
        if (!category) return true
      }
    }

    return false
  }

  public render() {
    const { classes, filtersData, tableFilter, isFiltersOpened, isFilterCommentOpened, componentRef } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          {(this.checkOutputClear(filtersData, tableFilter) || isFiltersOpened || isFilterCommentOpened) && (
            <>
              <Typography
                variant="subtitle1"
                className={classes.reset}
                onClick={this.handleResetFilters}
              >
                Сброс
              </Typography>
              <Divider className={classes.divider} />
            </>)}

          {(!isFiltersOpened && !isFilterCommentOpened) && (
            <>
              <div onClick={this.handleOpenSearchComment} className={classes.iconButton}>
                <img alt="search" src={magnifyingGlass} className={classes.icon} />
              </div>

              <Divider className={classes.divider} />
              <div onClick={this.handleOpenFilters} className={classes.iconButton}>
                <img alt="search" src={gear} className={classes.icon} />
              </div>

              <Divider color="#f7fafc" className={classes.divider} />
              <ReactToPrint
                trigger={() => (
                  <div className={classes.iconButton}>
                    <img alt="search" src={printerTool} className={classes.icon} />
                  </div>)}
                content={() => (componentRef as ReactInstance)}
              />

            </>)}

          {(isFiltersOpened || isFilterCommentOpened) && (
            <Button
              fullWidth
              type="submit"
              variant="outlined"
              classes={{ root: classes.button, label: classes.label }}
            >
              Применить
            </Button>)}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(connector(FilterSettings))
