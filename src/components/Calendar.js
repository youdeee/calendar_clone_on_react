import React, { useContext } from 'react'
import { Store } from './App'
import CalendarDay from './CalendarDay'

import moment from 'moment'
import 'moment/locale/ja'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  calendar: {
    height: `calc(100vh - 64px - ${theme.spacing(1) * 2}px)`,
    padding: theme.spacing(1),
  },
  weekDay: {
    height: '24px',
  },
  days: {
    height: 'calc(100% - 24px)',
  },
}))

const Calendar = () => {
  const classes = useStyles()
  const { state } = useContext(Store)

  const numberOfweedDay = 7

  const weekDays = (startWeekDay) => {
    moment.locale('ja')
    return moment
      .weekdaysShort()
      .concat(moment.weekdaysShort())
      .slice(startWeekDay, startWeekDay + numberOfweedDay)
  }

  const _calcStartAndEndDay = (thisMonth, startWeekDay) => {
    const startDayOfMonth = thisMonth.clone().startOf('month')
    const startDay = startDayOfMonth
      .clone()
      .startOf('week')
      .add(startWeekDay, 'days')
    while (startDay.isAfter(startDayOfMonth)) {
      startDay.subtract(numberOfweedDay, 'days')
    }
    const endDayOfMonth = thisMonth.clone().endOf('month')
    const endDay = endDayOfMonth
      .clone()
      .endOf('week')
      .add(startWeekDay, 'days')
      .subtract(numberOfweedDay, 'days')
    while (endDay.isBefore(endDayOfMonth)) {
      endDay.add(numberOfweedDay, 'days')
    }
    return { startDay, endDay }
  }

  const _dayRows = (thisMonth, startWeekDay) => {
    const { startDay, endDay } = _calcStartAndEndDay(thisMonth, startWeekDay)
    const days = []
    let tmpDays = []
    const numberOfColumn = (endDay - startDay) / 3600 / 24 / 1000 + 1
    for (let i = 0; i < numberOfColumn; i++) {
      tmpDays.push(startDay.clone().add(i, 'days'))
      if (i % numberOfweedDay === numberOfweedDay - 1) {
        days.push(tmpDays)
        tmpDays = []
      }
    }
    return days
  }

  const dayRows = _dayRows(state.currentMonth.clone(), state.startWeekDay)

  return (
    <div className={classes.calendar}>
      <Box display="flex" className={classes.weekDay}>
        {weekDays(state.startWeekDay).map((weekDay) => (
          <Box flex="1 1 0%" textAlign="center" key={weekDay}>
            {weekDay}
          </Box>
        ))}
      </Box>
      <Box className={classes.days}>
        {dayRows.map((dayRow, i) => (
          <Box
            display="flex"
            style={{ height: `calc(100% / ${dayRows.length})` }}
            key={`dayRow-${i}`}
          >
            {dayRow.map((day) => {
              const k = day.format('YYYY-MM-DD')
              return (
                <CalendarDay day={day} events={state.events[k] || []} key={k} />
              )
            })}
          </Box>
        ))}
      </Box>
    </div>
  )
}

export default Calendar
