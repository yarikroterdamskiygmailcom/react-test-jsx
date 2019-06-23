import React from 'react'
import { createStyles, Hidden, WithStyles, withStyles } from '@material-ui/core'
import DialogInput from 'src/components/controls/DialogInput'
// import InputFile from 'src/components/controls/InputFile'
import DialogActions from './DialogActions'
import { Field } from 'formik'

const styles = createStyles({
  root: {
    width: '100%',
  },
  multiline: {
    marginRight: 65,
  },
})

interface Props extends WithStyles<typeof styles> {
  onDelete: () => void,
}

const ThirdColumn = ({ classes, onDelete }: Props) => (
  <div className={classes.root}>
    <div className={classes.multiline}>
      <Hidden smDown implementation="css">
        <Field
          fullWidth
          multiline
          rows="12"
          rowsMax="12"
          name="comment"
          component={DialogInput}
          inputLabel="Комментарий"
          placeholder="Комментарий"
          // additionalNode={<InputFile />}
        />
      </Hidden>
      <Hidden mdUp implementation="css">
        <Field
          fullWidth
          multiline
          rows="6"
          rowsMax="6"
          name="comment"
          component={DialogInput}
          inputLabel="Комментарий"
          placeholder="Комментарий"
          // additionalNode={<InputFile />}
        />
      </Hidden>
    </div>

    <DialogActions onDelete={onDelete} />
  </div>
)

export default withStyles(styles)(ThirdColumn)
