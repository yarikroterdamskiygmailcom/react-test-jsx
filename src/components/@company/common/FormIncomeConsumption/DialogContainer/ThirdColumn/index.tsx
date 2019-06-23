import React from 'react'
import { Field } from 'formik'
import { createStyles, Hidden, WithStyles, withStyles } from '@material-ui/core'
import DialogInput from 'src/components/controls/DialogInput'
// import InputFile from 'src/components/controls/InputFile'

const styles = createStyles({
  root: {
    marginRight: 65,
  },
})

const ThirdColumn = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
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
)

export default withStyles(styles)(ThirdColumn)
