import React, { Component } from 'react'
import { Button, createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import AddIcon from 'mdi-react/AddIcon'
import RemoveIcon from 'mdi-react/RemoveIcon'
import AutorenewIcon from 'mdi-react/AutorenewIcon'
import connector from './connector'

const styles = (theme: Theme) => createStyles({
  root: {
    ...globalStyles.flexCenter,
    ...globalStyles.alignCenter,
  },
  title: {
    marginTop: 3,
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  income: {
    ...globalStyles.headerButton,
    background: theme.palette.primary.light,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  consumption: {
    margin: '0 20px',
    background: '#ff7676',
    ...globalStyles.headerButton,
    '&:hover': {
      background: '#FF5A4B',
    },
  },
  transfer: {
    background: '#f3f3f3',
    ...globalStyles.headerButton,
    color: theme.palette.primary.dark,
    '&:hover': {
      background: 'white',
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  actions: {
    openIncome: () => void,
    openTransfer: () => void,
    openConsumption: () => void,
  },
}

class Transactions extends Component<Props> {
  public handleClickIncome = () => {
    const { actions } = this.props
    actions.openIncome()
  }

  public handleClickConsumption = () => {
    const { actions } = this.props
    actions.openConsumption()
  }

  public handleClickTransfer = () => {
    const { actions } = this.props
    actions.openTransfer()
  }

  public render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Button className={classes.income} onClick={this.handleClickIncome}>
          <AddIcon />
          <Typography color="inherit" variant="subtitle1" className={classes.title}>Доход</Typography>
        </Button>
        <Button className={classes.consumption} onClick={this.handleClickConsumption}>
          <RemoveIcon />
          <Typography color="inherit" variant="subtitle1" className={classes.title}>Расход</Typography>
        </Button>
        <Button className={classes.transfer} onClick={this.handleClickTransfer}>
          <AutorenewIcon />
          <Typography color="inherit" variant="subtitle1" className={classes.title}>Перевод</Typography>
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(connector(Transactions))
