import React, { Component, MouseEvent } from 'react'
import classnames from 'classnames'
import moment from 'moment'
import {
  ClickAwayListener,
  createStyles,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import CalendarIcon from 'src/assets/images/calendar.png'
import InputLabel from 'src/components/common/InputLabel'
import ShowError from 'src/components/common/ShowError'
import ChevronRightIcon from 'mdi-react/ChevronRightIcon'
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon'
import Calendar from 'react-calendar'
import 'moment/locale/ru'
import './style.css'

moment.locale('ru')

const styles = createStyles({
  root: {
    color: 'white',
    position: 'relative',
    marginBottom: 20,
    width: '100%',
  },
  rootSelect: {
    marginBottom: 0,
  },
  input: {
    ...globalStyles.input,
    ...globalStyles.alignCenter,
    position: 'relative',
    padding: '12px 36px',
    color: 'rgb(84, 84, 84)',
    border: '1px solid #b6b9aa',
    '&:hover': {
      border: '1px solid transparent',
      '-webkit-appearance': 'none',
      boxShadow: '0 0 38px rgba(85,205,161,0.41)',
      '-webkit-box-shadow': '0 0 38px rgba(85,205,161,0.41)',
    },
  },
  smallPadding: {
    padding: '12px 20px',
  },
  selectRange: {
    padding: '8px 10px',
    minWidth: 152,
    fontSize: 13,
    borderBottom: '3px solid #57de8b',
    '&:hover': {
      borderBottom: '3px solid #57de8b',
    },
  },
  inputWithError: {
    marginBottom: 10,
  },
  calendarNone: {
    display: 'none',
  },
  calendarBlock: {
    display: 'block',
  },
  daysOfWeek: {
    color: '#3e98a3',
  },
  icon: {
    top: '44%',
    right: '2%',
    position: 'absolute',
  },
})

type DateValueKey = {
  value: {
    [key: string]: string | Date,
  }
}

interface Props extends WithStyles<typeof styles> {
  fullWidth?: boolean,
  submitForm?: boolean,
  selectRange?: boolean,
  inputLabel?: string,
  field: {
    name: string,
    value: string | Date,
  },
  form: {
    submitCount: number,
    errors: {
      [key: string]: string,
    },
    setFieldValue: (name: string, value: Date | Date[]) => void,
    submitForm: () => void,
  },
}

type FuncDate = {
  date: Date,
}

interface State {
  isOpenCalendar: boolean,
}

const NavigationLabel = ({ date }: FuncDate) => (
  <Typography variant="subtitle1" color="secondary">
    {moment(date).format('MMMM YYYY').toLocaleUpperCase()}
  </Typography>
)

class InputDate extends Component<Props, State> {
  public state = {
    isOpenCalendar: false,
  }

  public handleClickCalendar = (e: MouseEvent<HTMLDivElement>) => {
    this.setState(({ isOpenCalendar }) => ({
      isOpenCalendar: !isOpenCalendar,
    }))

    e.stopPropagation()
  }

  public handleCloseCalendar = () => {
    this.setState({
      isOpenCalendar: false,
    })
  }

  public handleChangeCalendar = async (date: Date | Date[]) => {
    const { submitForm, form, field } = this.props

    await form.setFieldValue(field.name, date)

    if (submitForm) form.submitForm()

    this.handleCloseCalendar()
  }

  public render(): React.ReactNode {
    const { classes, inputLabel, fullWidth, field, form, ...props } = this.props
    const { isOpenCalendar } = this.state

    const fieldValueDate: boolean | Date = field.value
      ? (!Array.isArray(field.value)
        && !(field.value instanceof Date)
        && moment(field.value, 'DD.MM.YYYY').toDate())
      : false

    const firstDate = () => {
      if (field.value) {
        if (Array.isArray(field.value) && !(field.value[0] instanceof Date)) {
          return field.value[0]
        }

        return moment((field as unknown as DateValueKey).value[0]).format('DD.MM.YYYY')
      }

      return ''
    }

    const secondDate = () => {
      if (field.value) {
        if (Array.isArray(field.value) && !(field.value[1] instanceof Date)) {
          return field.value[1]
        }

        return moment((field as unknown as DateValueKey).value[1]).format('DD.MM.YYYY')
      }

      return ''
    }

    const fieldValue = moment(fieldValueDate || field.value).format('DD.MM.YYYY')

    const isFormTouched = form.submitCount > 0
    const error = form.errors[field.name]

    return (
      <ClickAwayListener onClickAway={this.handleCloseCalendar}>
        <div className={classnames(classes.root, { [classes.rootSelect]: this.props.selectRange })}>
          {inputLabel && <InputLabel inputLabel={inputLabel} />}

          <TextField
            disabled
            fullWidth={fullWidth}
            name={field.name}
            onClick={this.handleClickCalendar}
            value={fieldValue !== 'Invalid date'
              ? fieldValue
              : field.value ? (`${firstDate()} - ${secondDate()}`) : ''}
            inputProps={{
              className: classnames(
                classes.input,
                { [classes.smallPadding]: inputLabel },
                { [classes.selectRange]: this.props.selectRange },
                { [classes.inputWithError]: (isFormTouched && !!error) },
              )
            }}
            InputProps={{
              disableUnderline: true,
              endAdornment: !this.props.selectRange && (
                <InputAdornment position="end" className={classes.icon}>
                  <IconButton onClick={this.handleClickCalendar}>
                    <img alt="calendar" src={CalendarIcon} />
                  </IconButton>
                </InputAdornment>)
            }}
          />

          <div className={classnames(isOpenCalendar ? classes.calendarBlock : classes.calendarNone)}>
            <Calendar
              {...field}
              {...props}
              value={fieldValueDate as Date || field.value}
              minDetail="month"
              maxDetail="month"
              next2Label={null}
              prev2Label={null}
              className={classes.daysOfWeek}
              navigationLabel={NavigationLabel}
              onChange={this.handleChangeCalendar}
              prevLabel={<ChevronLeftIcon color="white" />}
              nextLabel={<ChevronRightIcon color="white" />}
            />
          </div>

          <ShowError isFormTouched={isFormTouched} error={error} />
        </div>
      </ClickAwayListener>
    )
  }
}

export default withStyles(styles)(InputDate)
