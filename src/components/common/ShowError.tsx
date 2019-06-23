import React from 'react'
import classnames from 'classnames'
import { createStyles, FormHelperText, WithStyles, withStyles } from '@material-ui/core'

const styles = createStyles({
  error: {
    fontSize: 14,
    marginTop: 0,
    marginBottom: 20,
    textAlign: 'center',
  },
  smallError: {
    fontSize: 12,
  },
})

interface Props extends WithStyles<typeof styles> {
  isFormTouched: boolean,
  error?: string,
  small?: boolean,
}

const ShowError = ({ classes, small, isFormTouched, error }: Props) =>
  isFormTouched && !!error ? (
      <FormHelperText
        error={!!error}
        className={classnames(classes.error, { [classes.smallError]: small })}
      >
        {error}
      </FormHelperText>
    )
    : null

export default withStyles(styles)(ShowError)
