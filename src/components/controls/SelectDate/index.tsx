import React from 'react'
import Select from 'react-select'
import {
  createStyles,
  InputAdornment,
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
import CalendarIcon from 'src/assets/images/calendar.png'
import { fontWeightBold } from 'src/constants'
import { globalStyles } from 'src/styles/global-styles'
import InputLabel from 'src/components/common/InputLabel'
import { AutosuggestProps } from '../Autosuggest/types'
import { ValueType } from 'react-select/lib/types'
import { Value } from 'src/redux/app/types'

const styles = (theme: Theme) => createStyles({
  root: {
    position: 'relative',
  },
  input: {
    ...globalStyles.input,
    ...globalStyles.alignCenter,
    maxHeight: 60,
    display: 'flex',
    fontSize: 13,
    padding: 6,
    paddingRight: 15,
    border: '1px solid #b6b9aa',
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
  text: {
    fontSize: 14,
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
  icon: {
    top: '46%',
    right: '6%',
    position: 'absolute',
  },
})

let startMonth: null | undefined | Element | HTMLInputElement = null
let endMonth: null | undefined | Element | HTMLInputElement = null

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
        if (selectProps) {
          if (selectProps.name === 'startMonth') startMonth = node
          if (selectProps.name === 'endMonth') endMonth = node
        }
      },
    }}
    InputProps={{
      inputComponent,
      disableUnderline: true,
      endAdornment: selectProps && (
        <InputAdornment position="end" className={selectProps.classes.icon}>
          <img alt="calendar" src={CalendarIcon} />
        </InputAdornment>)
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
      maxHeight: 200,
      background: isFocused ? '#edf4fa' : undefined,
      fontWeight: isSelected ? fontWeightBold : undefined,
    }}
    {...innerProps}
  >
    {children}
  </MenuItem>
)

const SingleValue = ({ innerProps, children, selectProps }: Partial<AutosuggestProps>) => (
  <Typography {...innerProps} variant="subtitle1" className={selectProps && selectProps.classes.text}>
    {children}
  </Typography>
)

const Menu = ({ selectProps, children, innerProps }: Partial<AutosuggestProps>) => {
  const popperNode = selectProps
    ? selectProps.name === 'startMonth' ? startMonth : (selectProps.name === 'endMonth' ? endMonth : undefined)
    : null

  return (
    <Popper
      open={Boolean(children)}
      anchorEl={popperNode}
      className={selectProps && selectProps.classes.popper}
    >
      <Paper
        className={selectProps && selectProps.classes.paper}
        style={{ width: popperNode ? popperNode.clientWidth : undefined }}
        {...innerProps}
      >
        {children}
      </Paper>
    </Popper>
  )
}

const components: Partial<SelectComponents<Value>> = {
  Menu,
  Option,
  Control,
  SingleValue,
}

interface Props extends WithStyles<typeof styles> {
  name: string,
  disabled?: boolean,
  placeholder: string,
  inputLabel?: string,
  value: ValueType<Value>,
  options: Value[],
  onChange: (value: ValueType<Value>) => void,
}

const SelectDateAutosuggest = ({ classes, name, value, options, disabled, placeholder, inputLabel, onChange }: Props) => (
  <div className={classes.root}>
    {inputLabel && <InputLabel inputLabel={inputLabel} />}

    <Select
      options={options}
      value={value}
      name={name}
      classes={classes}
      components={components}
      isSearchable={!disabled}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
)

export default withStyles(styles)(SelectDateAutosuggest)
