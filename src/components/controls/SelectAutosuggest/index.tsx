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
import { fontWeightBold } from 'src/constants'
import InputLabel from 'src/components/common/InputLabel'
import ShowError from 'src/components/common/ShowError'
import { globalStyles } from 'src/styles/global-styles'
import { AutosuggestProps } from '../Autosuggest/types'
import { ValueType } from 'react-select/lib/types'
import { Value } from 'src/redux/app/types'

const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    ...globalStyles.input,
    ...globalStyles.alignCenter,
    maxHeight: 60,
    display: 'flex',
    marginBottom: 10,
    padding: '10px 10px 9px 28px',
    '-webkit-appearance': 'none',
    boxShadow: '0px 0px 50px 0px rgba(81, 174, 203, 0.41)',
    '-webkit-box-shadow': '0px 0px 50px 0px rgba(81, 174, 203, 0.41)',
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
    fontSize: 16,
  },
  popper: {
    zIndex: 9999,
    overflow: 'hidden',
  },
  paper: {
    margin: 0,
    padding: 0,
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
    fullWidth
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
      fontSize: 14,
      maxHeight: 200,
      background: isFocused ? '#edf4fa' : undefined,
      fontWeight: isSelected ? fontWeightBold : undefined,
    }}
    {...innerProps}
  >
    {children}
  </MenuItem>
)

const Placeholder = ({ innerProps, children }: Partial<AutosuggestProps>) => (
  <Typography {...innerProps} variant="subtitle1" style={{ color: '#a4a8ae', textOverflow: 'clip' }}>
    {children}
  </Typography>
)

const SingleValue = ({ innerProps, children }: Partial<AutosuggestProps>) => (
  <Typography {...innerProps} variant="subtitle1">
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
  Placeholder,
}

interface Props extends WithStyles<typeof styles> {
  name: string,
  disabled?: boolean,
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
  },
}

class SelectTagsAutosuggest extends Component<Props> {
  public state = {
    select: [],
  }

  public handleChange = (value: ValueType<Value>) => {
    const { form, field } = this.props

    form.setFieldValue(field.name, value)
  }

  public render(): React.ReactNode {
    const { classes, data, disabled, placeholder, inputLabel, field, form } = this.props

    const isFormTouched = form.submitCount > 0
    const error = form.errors[field.name]

    return (
      <div className={classes.root}>
        {inputLabel && <InputLabel inputLabel={inputLabel} />}

        <Select
          options={data}
          value={field.value}
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

export default withStyles(styles)(SelectTagsAutosuggest)
