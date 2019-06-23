import React, { Component } from 'react'
import Select from 'react-select'
import {
  createStyles,
  MenuItem,
  Paper,
  Popper,
  TextField,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core'
import { SelectComponents } from 'react-select/lib/components'
import { analyticsCategory, fontWeightBold, journalFilter } from 'src/constants'
import InputLabel from 'src/components/common/InputLabel'
import ShowError from 'src/components/common/ShowError'
import { globalStyles } from 'src/styles/global-styles'
import { AutosuggestProps } from '../Autosuggest/types'
import { ValueType } from 'react-select/lib/types'
import { Value } from 'src/redux/app/types'
import './styles.css'

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    position: 'relative',
  },
  input: {
    ...globalStyles.input,
    ...globalStyles.alignCenter,
    padding: '2px 4px 2px 8px',
    display: 'flex',
    fontSize: 13,
    minWidth: 60,
    position: 'relative',
    textOverflow: 'ellipsis',
    '-webkit-appearance': 'none',
    border: '1px solid #b6b9aa',
    borderBottom: '3px solid #57de8b',
    '&:hover': {
      border: '1px solid transparent',
      borderBottom: '3px solid #57de8b',
      boxShadow: '0 0 38px rgba(85,205,161,0.41)',
      '-webkit-box-shadow': '0 0 38px rgba(85,205,161,0.41)',
    },
  },
  valueContainer: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    alignItems: 'center',
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 13,
  },
  popper: {
    zIndex: 9999,
    overflow: 'hidden',
  },
  paper: {
    margin: 0,
    padding: 0,
    minWidth: 180,
    maxHeight: 200,
    borderRadius: 10,
    overflowY: 'hidden',
    boxShadow: 'none',
    background: 'white',
    border: '1px solid #E6E6E6',
  },
})

let popperNode: null | undefined | Element | HTMLInputElement = null

const inputComponent = ({ inputRef, ...props }: Partial<AutosuggestProps>) => (
  <div ref={inputRef} {...props} />
)

const Control = ({ selectProps, children, innerProps }: Partial<AutosuggestProps>) => (
  <TextField
    fullWidth={selectProps && selectProps.fullWidth}
    inputProps={{
      children,
      ...innerProps,
      className: selectProps && selectProps.classes.input,
      inputRef: (node: Element) => {
        popperNode = node
      },
    }}
    InputProps={{
      inputComponent,
      disableUnderline: true,
    }}
  >
    {children}
  </TextField>
)

const Option = ({ innerRef, isFocused, isSelected, innerProps, children }: Partial<AutosuggestProps>) => (
  <MenuItem
    buttonRef={innerRef}
    selected={isFocused}
    component="div"
    style={{
      fontSize: 13,
      background: isFocused ? '#edf4fa' : undefined,
      fontWeight: isSelected ? fontWeightBold : undefined,
    }}
    {...innerProps}
  >
    {children}
  </MenuItem>
)

const SingleValue = ({ innerProps, children, selectProps }: Partial<AutosuggestProps>) => (
  <Typography {...innerProps} variant="subtitle1" className={selectProps && selectProps.classes.singleValue}>
    {children}
  </Typography>
)

const Menu = ({ selectProps, children, innerProps }: Partial<AutosuggestProps>) => (
  <Popper anchorEl={popperNode} open={Boolean(children)} className={selectProps && selectProps.classes.popper}>
    <Paper
      className={selectProps && selectProps.classes.paper}
      style={{ width: popperNode ? popperNode.clientWidth : undefined }}
      {...innerProps}
    >
      {children}
    </Paper>
  </Popper>
)

const components: Partial<SelectComponents<Value>> = {
  Menu,
  Option,
  Control,
  SingleValue,
}

interface Props extends WithStyles<typeof styles> {
  name: string,
  disabled?: boolean,
  fullWidth?: boolean,
  submitForm?: boolean,
  placeholder: string,
  inputLabel?: string,
  value: ValueType<Value>,
  data: Value[],
  field: {
    name: string,
    value: Value,
  },
  form: {
    submitCount: number,
    errors: {
      [key: string]: string,
    },
    setFieldValue: (name: string, value: ValueType<Value>) => void,
    submitForm: () => void,
  },
}

class FilterSelect extends Component<Props> {
  public handleChange = async (value: ValueType<Value>) => {
    const { submitForm, form, field } = this.props

    await form.setFieldValue(field.name, value)

    if (submitForm) form.submitForm()
  }

  public options = (name: string) => {
    switch (name) {
      case 'journal':
        return journalFilter
      case 'category':
        return analyticsCategory
      default:
        return []
    }
  }

  public render(): React.ReactNode {
    const { classes, disabled, placeholder, fullWidth, inputLabel, field, form } = this.props

    const isFormTouched = form.submitCount > 0
    const error = form.errors[field.name]

    return (
      <div className={classes.root}>
        {inputLabel && <InputLabel inputLabel={inputLabel} />}

        <Select
          fullWidth={fullWidth}
          options={this.options(field.name)}
          value={field.value as Value}
          name={field.name}
          classes={classes}
          components={components}
          isSearchable={!disabled}
          placeholder={placeholder}
          onChange={this.handleChange}
        />

        <ShowError isFormTouched={isFormTouched} error={error} />
      </div>
    )
  }
}

export default withStyles(styles)(FilterSelect)
