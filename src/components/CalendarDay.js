import React, { useReducer } from 'react'

import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import CalendarEvent from './CalendarEvent'
import AddEventModal from './AddEventModal'

const initialState = {
  showAddEventModal: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_EVENT_MODAL':
      return {
        ...state,
        showAddEventModal: action.payload,
      }
    default:
      return state
  }
}

const useStyles = makeStyles((theme) => ({
  date: {
    padding: theme.spacing(0.5),
  },
  events: {
    overflow: 'auto',
    height: 'calc(100% - 26px)',
  },
  event: {
    margin: theme.spacing(0.2),
  },
}))

const CalendarDay = (props) => {
  const classes = useStyles()
  const [state, dispatch] = useReducer(reducer, initialState)

  const format = props.day.date() === 1 ? 'M月D日' : 'D'
  const today = props.day.isSame(moment(), 'day')
  let attr = { display: 'inline' }
  if (today)
    attr = {
      ...attr,
      color: 'white',
      borderRadius: '50%',
      bgcolor: 'info.main',
    }

  return (
    <>
      <Box
        flex="1 1 0%"
        border={1}
        borderLeft={0}
        borderTop={0}
        borderColor="grey.500"
        onClick={(e) =>
          dispatch({ type: 'TOGGLE_ADD_EVENT_MODAL', payload: true })
        }
      >
        <Box className={classes.date} textAlign="center">
          <Box {...attr}>{props.day.format(format)}</Box>
        </Box>
        <Box className={classes.events}>
          {props.events.map((event, i) => {
            return (
              <Box className={classes.event}>
                <CalendarEvent
                  event={event}
                  key={`${props.day.format('YYYY-MM-DD')}-event-${i}`}
                  day={props.day}
                />
              </Box>
            )
          })}
        </Box>
      </Box>
      <AddEventModal
        open={state.showAddEventModal}
        onClose={() =>
          dispatch({ type: 'TOGGLE_ADD_EVENT_MODAL', payload: false })
        }
        day={props.day}
      />
    </>
  )
}

export default CalendarDay
