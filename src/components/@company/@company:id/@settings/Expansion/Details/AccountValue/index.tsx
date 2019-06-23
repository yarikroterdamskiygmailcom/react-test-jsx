import React from 'react'
import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import { InputValue } from 'src/redux/app/company/types'

const styles = createStyles({
  root: {
    padding: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
  },
  details: {
    fontSize: 14,
  },
  flexBetween: {
    ...globalStyles.flexBetween,
  }
})

interface Props extends WithStyles<typeof styles> {
  name: string,
  archived?: boolean,
  isArchive?: boolean,
  startingBalance?: number,
  accountType?: InputValue,
}

const AccountValue = ({ classes, name, archived, isArchive, accountType, startingBalance }: Props) => (
  <div className={classes.root}>
    <div className={classes.flexBetween}>
      <Typography variant="subtitle1" className={classes.title}>Название:</Typography>
      <Typography variant="subtitle1" className={classes.details}>{name}</Typography>
    </div>
    {accountType && (
      <div className={classes.flexBetween}>
        <Typography variant="subtitle1" className={classes.title}>Тип:</Typography>
        <Typography variant="subtitle1" className={classes.details}>{accountType.label}</Typography>
      </div>
    )}
    {(startingBalance || startingBalance === 0) && (
      <div className={classes.flexBetween}>
        <Typography variant="subtitle1" className={classes.title}>Стартовый баланс:</Typography>
        <Typography variant="subtitle1" className={classes.details}>{startingBalance || 0}</Typography>
      </div>)}
    {isArchive && (
      <div className={classes.flexBetween}>
        <Typography variant="subtitle1" className={classes.title}>Архив:</Typography>
        <Typography variant="subtitle1" className={classes.details}>{archived ? 'Да' : 'Нет'}</Typography>
      </div>)}
  </div>
)

export default withStyles(styles)(AccountValue)
