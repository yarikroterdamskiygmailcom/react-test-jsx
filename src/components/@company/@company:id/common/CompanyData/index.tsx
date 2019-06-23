import React from 'react'
import longCity from 'src/assets/images/longCity.jpg'
import { Avatar, Card, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'
import Capital from './Capital'

const styles = (theme: Theme) => createStyles({
  root: {
    width: 300,
    zIndex: 1000,
    borderRadius: 0,
    overflowY: 'auto',
    boxShadow: 'none',
    position: 'fixed',
    height: 'calc(100% - 100px)',
    '-webkit-appearance': 'none',
    borderRight: '2px solid #ecf5fa',
    '-webkit-box-shadow': 'none',
    '&:hover': {
      cursor: 'auto',
      boxShadow: 'none',
      '-webkit-box-shadow': 'none',
    },
    [theme.breakpoints.down('md')]: {
      width: 265,
    },
    [theme.breakpoints.down('sm')]: {
      position: 'initial',
    },
  },
  image: {
    height: 180,
    width: '100%',
    borderRadius: 0,
  },
})

const CompanyData = ({ classes }: WithStyles<typeof styles>) => (
  <Card className={classes.root}>
    <Avatar alt="longCity" src={longCity} className={classes.image} />

    <Capital />
  </Card>
)

export default withStyles(styles)(CompanyData)
