import React from 'react'
import { createStyles, Dialog, Theme, WithStyles, withStyles } from '@material-ui/core'
import { SetOperation } from 'src/redux/app/types'
import { globalStyles } from 'src/styles/global-styles'
import FormTransfer from '../common/FormTransfer'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: 1100,
      height: 'auto',
      maxWidth: 'none',
      borderRadius: 10,
      overflowX: 'hidden',
      background: '#FAFCFF',
      '-webkit-appearance': 'none',
      border: '2px solid #8a8a8a',
      boxShadow: '0 0 38px rgba(138,138,138,0.53)',
      '-webkit-box-shadow': '0 0 38px rgba(138,138,138,0.53)',
      [theme.breakpoints.down('sm')]: {
        margin: 30,
      },
      [theme.breakpoints.down('xs')]: {
        margin: 15,
      },
      '@media (max-width: 340px)': {
        margin: 5,
      },
    },
    container: {
      margin: 40,
      ...globalStyles.flexCenter,
      [theme.breakpoints.down('sm')]: {
        marginTop: 10,
      },
      [theme.breakpoints.down('xs')]: {
        margin: 10,
      },
      '@media (max-width: 340px)': {
        margin: 5,
      },
    },
  })

interface Props extends WithStyles<typeof styles> {
  isOpened: boolean,
  onSubmit: (data: SetOperation) => void,
  onCloseDialog: () => void,
  onDelete: () => void,
}

const DialogTransfer = ({ classes, isOpened, onCloseDialog, onSubmit, onDelete }: Props) => (
  <Dialog
    open={isOpened}
    onClose={onCloseDialog}
    PaperProps={{ className: classes.root }}
  >
    <div className={classes.container}>
      <FormTransfer onSubmit={onSubmit} onDelete={onDelete} />
    </div>
  </Dialog>
)

export default withStyles(styles)(DialogTransfer)
