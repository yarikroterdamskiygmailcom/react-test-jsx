import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { createStyles, Divider, Typography, WithStyles, withStyles } from '@material-ui/core'
import { AnalyticsValue } from 'src/redux/app/ui/tableFilter/types'
import { globalStyles } from 'src/styles/global-styles'
import AddIcon from 'mdi-react/AddIcon'
import RemoveIcon from 'mdi-react/RemoveIcon'
import { consumption, income, tableIconSize } from 'src/constants'
import ShowError from '../../common/ShowError'
import connector from './connector'

const styles = createStyles({
  root: {
    ...globalStyles.fullWidth,
  },
  container: {
    ...globalStyles.flexCenter,
    padding: '0.5px 5px',
    background: 'white',
    borderRadius: 10,
    border: '1px solid #b6b9aa',
  },
  divider: {
    height: 15,
    width: 1,
    ...globalStyles.alignCenter,
  },
  block: {
    padding: 7,
    paddingBottom: 4,
    cursor: 'pointer',
    ...globalStyles.alignCenter,
  },
  title: {
    fontSize: 13,
  },
  borderBottom: {
    paddingBottom: 4,
    borderBottom: '3px solid #57de8b',
  },
})

interface Props extends WithStyles<typeof styles> {
  reportType: AnalyticsValue[],
  submitForm?: boolean,
  field: {
    name: string,
    value: AnalyticsValue[],
  },
  form: {
    submitCount: number,
    errors: {
      [key: string]: string,
    },
    setFieldValue: (name: string, value: AnalyticsValue[]) => void,
    submitForm: () => void,
  },
}

const outputValue = (value: AnalyticsValue, name: string, style?: string, report?: boolean) => {
  switch (value.value) {
    case income:
      return <AddIcon size={tableIconSize} color="#55d498" />
    case consumption:
      return <RemoveIcon size={tableIconSize} color="#ff7676" />
    default:
      return (
        <Typography variant="subtitle1" className={style}>
          {(report && name === 'analytics') ? value.labelReport : value.label}
        </Typography>)
  }
}

class AnalyticsControl extends Component<Props> {
  public handleChangeAnalyticsPage = (value: AnalyticsValue) => async () => {
    const { name, value: formValue } = this.props.field
    const { submitForm: isSubmitForm } = this.props
    const { setFieldValue, submitForm } = this.props.form

    const newValues = formValue.map(formValues => value === formValues
      ? ({
        ...formValues,
        selected: true,
      })
      : ({
        ...formValues,
        selected: false,
      })
    )

    await setFieldValue(name, newValues)

    if (isSubmitForm) submitForm()
  }

  public isShowDivider = (index: number) => index < this.props.field.value.length - 1

  public render() {
    const { classes, field, form, reportType } = this.props

    const isFormTouched = form.submitCount > 0
    const error = form.errors[field.name]

    let report: boolean = false
    reportType.map(value => value.selected && value.value === 'P&L' && (report = true))

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          {field.value.map((value, index) => (
            <Fragment key={index}>
              <div
                onClick={this.handleChangeAnalyticsPage(value)}
                className={classNames(classes.block, { [classes.borderBottom]: value.selected })}
              >
                {outputValue(value, field.name, classes.title, report)}
              </div>
              {this.isShowDivider(index) && <Divider color="#f7fafc" className={classes.divider} />}
            </Fragment>
          ))}
        </div>

        <ShowError isFormTouched={isFormTouched} error={error} />
      </div>
    )
  }
}

export default withStyles(styles)(connector(AnalyticsControl))
