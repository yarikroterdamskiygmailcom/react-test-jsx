import React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import Loading from 'src/components/common/Loading'
import { FiltersData } from 'src/redux/app/types'
import Expansion from './Expansion'
import connector from './connector'

const styles = createStyles({
  root: {},
  flexAround: {
    ...globalStyles.flexAround,
  },
  expansion: {
    width: 300,
  },
})

interface Props extends WithStyles<typeof styles> {
  loading: boolean,
  filtersData: FiltersData | null,
}

class SettingsScene extends React.Component<Props> {
  public render() {
    const { classes, loading, filtersData } = this.props
    if (loading) return <Loading />

    return (
      <div className={classes.root}>
        {filtersData && (
          <div className={classes.flexAround}>
            <div className={classes.expansion}>
              <Expansion title="Счета" data={filtersData.accounts} />
              <Expansion title="Категории доходов" data={filtersData.incomeCategories} />
            </div>
            <div className={classes.expansion}>
              <Expansion title="Проекты" isArchive data={filtersData.projects} />
              <Expansion title="Категории расходов" data={filtersData.consumptionCategories} />
            </div>
            <div className={classes.expansion}>
              <Expansion title="Теги" data={filtersData.tags} />
              <Expansion title="Контрагенты" data={filtersData.counterparties} />
            </div>
          </div>)}
      </div>
    )
  }
}

export default withStyles(styles)(connector(SettingsScene))
