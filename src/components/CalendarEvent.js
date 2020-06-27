import React, { useReducer } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import EventModal from './EventModal'

const initialState = {
  showEventModal: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_EVENT_MODAL':
      return {
        ...state,
        showEventModal: action.payload,
      }
    default:
      return state
  }
}

const useStyles = makeStyles((theme) => ({
  event: {
    padding: theme.spacing(0.2),
  },
}))

const CalendarEvent = (props) => {
  const classes = useStyles()
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <Box
        className={classes.event}
        bgcolor="primary.main"
        color="white"
        borderRadius={4}
        onClick={(e) => {
          e.stopPropagation()
          dispatch({ type: 'TOGGLE_EVENT_MODAL', payload: true })
        }}
      >
        {props.event.name || '(タイトルなし)'}
      </Box>
      <EventModal
        open={state.showEventModal}
        onClose={() => {
          dispatch({ type: 'TOGGLE_EVENT_MODAL', payload: false })
        }}
        event={props.event}
        day={props.day}
      />
    </>
  )
}

export default CalendarEvent
