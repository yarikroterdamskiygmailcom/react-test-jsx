import React, { Component } from 'react'
import { createStyles, TableCell, TableHead, TableRow, WithStyles, withStyles } from '@material-ui/core'
import { TableFilterState } from 'src/redux/app/ui/tableFilter/types'
import TableCheckBox from 'src/components/controls/TableCheckBox'
import { JournalAnalyticsData } from 'src/redux/app/types'
import { globalStyles } from 'src/styles/global-styles'
import { iconSize, tableHead } from 'src/constants'
import DeleteIcon from 'mdi-react/DeleteIcon'
import Rows from './Rows'

const styles = createStyles({
  root: {
    height: 70,
  },
  deleteIcon: {
    cursor: 'pointer',
    alignSelf: 'center',
    marginTop: 3,
  },
})

interface Props extends WithStyles<typeof styles> {
  isSelectedAll?: boolean,
  tableFilter: TableFilterState,
  data: JournalAnalyticsData[] | null,
  onSelectAll?: () => void,
  onDeleteSelected?: () => void,
  onTableSort: (name: string) => () => void,
}

class Head extends Component<Props> {
  public deleteIcon = () => {
    const { classes, data, onDeleteSelected } = this.props

    if (data && !!data.length && !!data.filter(value => value.selected).length) {
      return (
        <div onClick={onDeleteSelected} className={classes.deleteIcon}>
          <DeleteIcon size={iconSize} color="#919191" />
        </div>
      )
    }

    return null
  }

  public render() {
    const { classes, tableFilter, onTableSort, onSelectAll, isSelectedAll, } = this.props
    const { order, orderBy } = tableFilter

    return (
      <TableHead>
        <TableRow classes={{ head: classes.root }}>
          {isSelectedAll !== undefined && (
            <TableCell align="center">
              <div style={globalStyles.flexCenter}>
                <TableCheckBox
                  value={isSelectedAll}
                  onSelect={onSelectAll}
                />
                {this.deleteIcon()}
              </div>
            </TableCell>)}

          {tableHead.map((value, index) =>
            <Rows
              key={index}
              order={order}
              orderBy={orderBy}
              name={value.name}
              title={value.title}
              onTableSort={onTableSort(value.name)}
            />)}
        </TableRow>
      </TableHead>
    )
  }
}

export default withStyles(styles)(Head)
