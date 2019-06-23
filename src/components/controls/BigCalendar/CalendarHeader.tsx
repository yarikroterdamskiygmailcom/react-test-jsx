import React from 'react'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import Divider from '@material-ui/core/Divider'
import ArrowLeft from 'mdi-react/KeyboardArrowLeftIcon'
import ArrowRight from 'mdi-react/KeyboardArrowRightIcon'
import { globalStyles } from 'src/styles/global-styles'
import moment from 'moment'
import calendarIcon from 'src/assets/images/calendar.png'
import timetableIcon from 'src/assets/images/timetable.png'

const styles = createStyles({
  calendarHeader: {
    background: '#ffffff',
    height: 80,
    paddingRight: 40,
    paddingLeft: 40,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlButtonWrapper: {
    width: 200,
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlButton: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f7fafc',
    borderRadius: 10,
    border: '1px solid #ecf5fa',
    cursor: 'pointer',
  },
  monthText: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    lineHeight: 28,
    color: '#313131',
    fontFamily: 'Gotham Pro',
    fontWeight: 500,
    textTransform: 'capitalize',
    '-webkit-user-select': 'none',
  },
  selectCalendarViewWrapper: {
    borderRadius: 10,
    background: '#f7fafc',
    border: '1px solid #ecf5fa',
    boxSizing: 'border-box',
    ...globalStyles.flexBetween,
    ...globalStyles.alignCenter,
  },
  calendarIcon: {
    padding: 11,
    cursor: 'pointer',
    '-webkit-user-select': 'none',
    '&:hover': {
      background: '#e5e7e9',
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    '&:active': {
      transition: '.1s',
      background: '#d3d3d3',
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    }
  },
  timetableIcon: {
    padding: 11,
    cursor: 'pointer',
    '-webkit-user-select': 'none',
    '&:hover': {
      background: '#e5e7e9',
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    '&:active': {
      transition: '.1s',
      background: '#d3d3d3',
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    }
  },
  divider: {
    height: 15,
    width: 1,
    ...globalStyles.alignCenter,
  },
})

interface Props extends WithStyles<typeof styles> {
  currentDate: Date,
  prevDate: () => void,
  nextDate: () => void,
  calendarView: (type: string) => () => void | undefined,
}

const CalendarHeader = ({ classes, currentDate, prevDate, nextDate, calendarView }: Props) => {
  const arrowSize = 16

  const controlButton = (
    <div className={classes.controlButtonWrapper}>
      <div className={classes.controlButton} onClick={prevDate}>
        <ArrowLeft size={arrowSize}/>
      </div>
      <div className={classes.monthText}>
        {moment(currentDate).format('MMM YYYY')}
      </div>
      <div className={classes.controlButton} onClick={nextDate}>
        <ArrowRight size={arrowSize}/>
      </div>
    </div>
  )

  const selectCalendarView = (
    <div className={classes.selectCalendarViewWrapper}>
      <div className={classes.calendarIcon} onClick={calendarView('calendar')}>
        <img src={calendarIcon} alt="calendar"/>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.timetableIcon} onClick={calendarView('timetable')}>
        <img src={timetableIcon} alt="timetable"/>
      </div>
    </div>
  )

  return (
    <div className={classes.calendarHeader}>
      {controlButton}
      {selectCalendarView}
    </div>
  )
}

export default withStyles(styles)(CalendarHeader)
