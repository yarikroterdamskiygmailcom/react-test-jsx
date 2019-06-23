import React from 'react'
import { createStyles, FormControlLabel, Switch, Typography, withStyles, WithStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import ShowError from 'src/components/common/ShowError'

const styles = createStyles({
  blockChoose: {
    paddingTop: 15,
    paddingBottom: 15,
    ...globalStyles.flexBetween,
  },
  iconChecked: {
    marginLeft: 26,
  },
  colorIcon: {
    width: 26,
    height: 26,
    background: 'linear-gradient(2deg, #1595b1 0%, #57dd8b 100%)',
  },
  colorBar: {
    width: 50,
    height: 20,
    marginTop: -10,
    backgroundColor: 'white',
    '-webkit-appearance': 'none',
    boxShadow: ' 0 0 13px rgba(81,174,203,0.41)',
    '-webkit-box-shadow': '0 0 13px rgba(81,174,203,0.41)',
  },
  demo: {
    marginLeft: 20,
  },
})

interface Props extends WithStyles<typeof styles> {
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

const MySwitch = ({ classes, field, form, ...props }: Props) => {
  const isFormTouched = form.submitCount > 0
  const error = form.errors[field.name]

  return (
    <>
      <FormControlLabel
        label={<Typography variant="subtitle1" className={classes.demo}>Демо компания</Typography>}
        control={(
          <Switch
            {...field}
            {...props}
            color="primary"
            className={classes.blockChoose}
            classes={{
              iconChecked: classes.iconChecked,
              icon: classes.colorIcon,
              bar: classes.colorBar,
            }}
          />)}
      />

      <ShowError isFormTouched={isFormTouched} error={error} />
    </>
  )
}

export default withStyles(styles)(MySwitch)
