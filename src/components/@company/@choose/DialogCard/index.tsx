import React from 'react'
import { Avatar, createStyles, Dialog, IconButton, Theme, Typography, WithStyles, withStyles } from '@material-ui/core'
import Close from 'src/assets/images/close.svg'
import { ChooseCompany, Currency } from '../types'
import Form from './Form'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: 610,
      minHeight: 450,
      borderRadius: 10,
      background: '#FAFCFF',
      [theme.breakpoints.down('xs')]: {
        margin: 30,
      },
    },
    container: {
      margin: 45,
      marginTop: 0,
      marginBottom: 0,
      [theme.breakpoints.down('xs')]: {
        margin: 20,
        marginTop: 0,
      },
    },
    closeButton: {
      marginTop: 10,
      marginRight: 10,
      alignSelf: 'flex-end',
      [theme.breakpoints.down('xs')]: {
        margin: 0,
      },
    },
    close: {
      width: 20,
      height: 20,
    },
    form: {
      marginBottom: 70,
      [theme.breakpoints.down('xs')]: {
        marginBottom: 10,
      },
    },
  })

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean,
  error: string | null,
  currencies: [Currency] | null,
  onCloseDialog: () => void,
  onSubmit: (form: ChooseCompany) => void,
}

const DialogCard = ({ classes, currencies, isOpen, error, onSubmit, onCloseDialog }: Props) => (
  <Dialog open={isOpen} onClose={onCloseDialog} PaperProps={{ className: classes.root }}>
    <IconButton className={classes.closeButton} onClick={onCloseDialog}>
      <Avatar alt="close" src={Close} className={classes.close} />
    </IconButton>

    <div className={classes.container}>
      <Typography align="center" variant="subtitle2">Добавление компании</Typography>

      <div className={classes.form}>
        <Form error={error} currencies={currencies} onSubmit={onSubmit} />
      </div>
    </div>
  </Dialog>
)

export default withStyles(styles)(DialogCard)
