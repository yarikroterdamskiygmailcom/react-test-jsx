import React from 'react'
import { createStyles, Divider, WithStyles, withStyles } from '@material-ui/core'
import SelectDate from 'src/components/controls/SelectDate'
import { FiltersData, Value } from 'src/redux/app/types'
import { ValueType } from 'react-select/lib/types'

const styles = createStyles({
  root: {
    display: 'flex',
    marginLeft: 10,
    height: 45,
    '@media (max-width: 800px)': {
      margin: '0 auto 10px',
      marginTop: 10,
    },
  },
  divider: {
    width: 5,
    height: 2,
    margin: 'auto 12px',
    background: '#313131',
  },
})

interface Props extends WithStyles<typeof styles> {
  endMonth: ValueType<Value>,
  startMonth: ValueType<Value>,
  filtersData: FiltersData,
  onChangeStart: (value: ValueType<Value>) => void,
  onChangeEnd: (value: ValueType<Value>) => void,
}

const endMonthLength = 11

const FiltersMonth = ({ classes, startMonth, endMonth, filtersData, onChangeStart, onChangeEnd }: Props) => {
  if (filtersData.months!.length === Number('13')) filtersData.months!.pop()

  return (
    <div className={classes.root}>
      <SelectDate
        name="startMonth"
        placeholder="Выберите месяц"
        options={filtersData.months!}
        value={startMonth || filtersData.months![0]}
        onChange={onChangeStart}
      />

      <Divider className={classes.divider} />

      <SelectDate
        name="endMonth"
        placeholder="Выберите месяц"
        options={filtersData.months!}
        value={endMonth || (filtersData.months![endMonthLength] || filtersData.months![0])}

        onChange={onChangeEnd}
      />
    </div>
  )
}

export default withStyles(styles)(FiltersMonth)
