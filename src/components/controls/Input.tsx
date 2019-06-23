import React from 'react'
import classNames from 'classnames'
import { createStyles, TextField, withStyles, WithStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import Search from 'src/assets/images/Search.png'
import InputLabel from 'src/components/common/InputLabel'
import ShowError from 'src/components/common/ShowError'

const styles = createStyles({
  root: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    padding: '18px 36px',
    textOverflow: 'ellipsis',
    '-webkit-appearance': 'none',
    boxShadow: '0px 0px 50px 0px rgba(81, 174, 203, 0.41)',
    '-webkit-box-shadow': '0px 0px 50px 0px rgba(81, 174, 203, 0.41)',
    ...globalStyles.input,
  },
  filterComment: {
    padding: '10px 20px 10px 45px',
  },
  inputWithError: {
    marginBottom: 10,
  },
  icon: {
    top: '30%',
    left: '2%',
    position: 'absolute',
  },
})

interface Props extends WithStyles<typeof styles> {
  inputLabel?: string,
  filterComment?: boolean,
  field: {
    name: string,
  },
  form: {
    submitCount: number,
    errors: {
      [key: string]: string,
    },
  },
}

const StartAdornment = (style: string) => <img src={Search} alt="Search" className={style} />

const Input = ({ classes, inputLabel, field, filterComment, form, ...props }: Props) => {
  const isFormTouched = form.submitCount > 0
  const error = form.errors[field.name]

  return (
    <div className={classes.root}>
      {inputLabel && <InputLabel inputLabel={inputLabel} />}

      <TextField
        {...props}
        {...field}
        inputProps={{ className: classNames(classes.input, { [classes.filterComment]: filterComment }) }}
        InputProps={{
          disableUnderline: true,
          startAdornment: filterComment && StartAdornment(classes.icon)
        }}
        style={(isFormTouched && !!error) ? styles.inputWithError : undefined}
      />

      <ShowError isFormTouched={isFormTouched} error={error} />
    </div>
  )
}

export default withStyles(styles)(Input)
