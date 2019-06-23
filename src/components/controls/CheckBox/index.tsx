import React, { Component } from 'react'
import classnames from 'classnames'
import omit from 'lodash/omit'
import { Checkbox, createStyles, FormControlLabel, Theme, Typography, WithStyles, withStyles } from '@material-ui/core'
import { iconCheckBox, smallIconCheckBox } from 'src/constants'
import PanoramaFishEye from 'mdi-react/PanoramaFisheyeIcon'
import ShowError from 'src/components/common/ShowError'
import Lens from 'mdi-react/LensIcon'
import connector from './connector'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: '0 auto',
      marginLeft: -5,
    },
    title: {
      marginTop: 3,
      color: theme.palette.secondary.dark,
    },
    small: {
      fontSize: 13,
      marginLeft: -10,
    },
  })

interface Props extends WithStyles<typeof styles> {
  label: string | React.ReactNode,
  small?: boolean,
  isRepeatDisabled: boolean,
  field: {
    name: string,
    value: string,
  },
  form: {
    submitCount: number,
    errors: {
      [key: string]: string,
    },
  },
  actions: {
    enableRepeat: () => void,
    disabledRepeat: () => void,
  }
}

class CheckBox extends Component<Props> {
  public componentDidUpdate(prevProps: Readonly<Props>): void {
    const { actions, field, isRepeatDisabled } = this.props

    if (prevProps.field !== field) {
      if (field.value && field.name === 'repeat' && isRepeatDisabled) actions.enableRepeat()
      if (!field.value && field.name === 'repeat' && !isRepeatDisabled) actions.disabledRepeat()
    }
  }

  public render() {
    const { classes, small, label, field, form } = this.props

    const newField = omit(field, 'value')

    const isFormTouched = form.submitCount > 0
    const error = form.errors[field.name]

    return (
      <>
        <FormControlLabel
          {...newField}
          checked={field.value}
          className={classes.root}
          label={
            <Typography
              variant="subtitle1"
              className={classnames([classes.title, small && classes.small])}
            >
              {label}
            </Typography>}
          control={
            <Checkbox
              icon={<PanoramaFishEye size={small ? smallIconCheckBox : iconCheckBox} />}
              checkedIcon={<Lens size={small ? smallIconCheckBox : iconCheckBox} color="#00D28F" />}
            />}
        />

        <ShowError small={small} isFormTouched={isFormTouched} error={error} />
      </>
    )
  }
}

export default withStyles(styles)(connector(CheckBox))
