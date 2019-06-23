import React from 'react'
import { Avatar, Card, createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import Plus from 'src/assets/images/Plus.png'

const styles = (theme: Theme) => createStyles({
  root: {
    width: 380,
    height: 435,
    color: '#9a9a9a',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gridTemplateColumns: '380px 380px 380px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '380px 380px',
    },
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      maxWidth: 380,
    },
  },
  icon: {
    width: 93,
    height: 93,
  },
  addCompany: {
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
})

interface Props extends WithStyles<typeof styles> {
  onOpenDialog: () => void
}

const AddCard = ({ classes, onOpenDialog }: Props) => (
  <Card elevation={0} className={classes.root} onClick={onOpenDialog}>
    <Avatar alt="Plus" src={Plus} className={classes.icon} />
    <Typography variant="subtitle2" align="center" className={classes.addCompany}>Добавить компанию</Typography>
  </Card>
)

export default withStyles(styles)(AddCard)
