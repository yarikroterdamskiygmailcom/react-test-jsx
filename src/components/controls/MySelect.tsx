import React from 'react'
import { isEmpty } from 'lodash'
import classNames from 'classnames'
import ExpandMoreIcon from 'mdi-react/ExpandMoreIcon'
import { createStyles, FormControl, MenuItem, Select, WithStyles, withStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import ShowError from 'src/components/common/ShowError'
import { Currency } from '../@company/@choose/types'

const styles = createStyles({
  input: {
    padding: '21px 36px',
    ...globalStyles.input
  },
  placeholder: {
    color: '#b4b4b7',
  },
  root: {
    marginBottom: 20,
  },
  inputWithError: {
    marginBottom: 10,
  },
  icon: {
    paddingRight: 15,
  },
})

interface Props extends WithStyles<typeof styles> {
  placeholder: string,
  data: [Currency],
  field: {
    name: string,
  },
  form: {
    values: {
      currency: string,
    },
    submitCount: number,
    errors: {
      [key: string]: string,
    },
  },
}

const MySelect = ({ classes, placeholder, data, field, form, ...props }: Props) => {
  const isFormTouched = form.submitCount > 0
  const error = form.errors[field.name]

  return (
    <FormControl fullWidth className={classes.root}>
      <Select
        {...props}
        {...field}
        displayEmpty
        disableUnderline
        classes={{ icon: classes.icon }}
        IconComponent={ExpandMoreIcon}
        style={(isFormTouched && !!error) ? styles.inputWithError : undefined}
        inputProps={{ className: classNames(classes.input, { [classes.placeholder]: isEmpty(form.values.currency) }) }}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {data.map(option => (
          <MenuItem key={option._id} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <ShowError isFormTouched={isFormTouched} error={error} />
    </FormControl>
  )
}

export default withStyles(styles)(MySelect)
