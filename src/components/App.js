import React, { createContext, useReducer } from 'react';
import Header from './Header';
import Calendar from './Calendar';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const initialState = {
  currentMonth: moment(),
  events: {
    '2020-06-26': [{
      name: '予定1',
      place: '',
      description: ''
    }, {
      name: '',
      place: '自宅',
      description: '勉強する'
    }, {
      name: '',
      place: '自宅',
      description: '勉強する'
    }, {
      name: '',
      place: '自宅',
      description: '勉強する'
    }, {
      name: '',
      place: '自宅',
      description: '勉強する'
    }, {
      name: '',
      place: '自宅',
      description: '勉強する'
    }, {
      name: '',
      place: '自宅',
      description: '勉強する'
    }, {
      name: '',
      place: '自宅',
      description: '勉強する'
    }, {
      name: '',
      place: '自宅',
      description: '勉強する'
    }, {
      name: '',
      place: '自宅',
      description: '勉強する'
    }],
    '2020-06-22': [{
      name: '前の予定',
      place: '',
      description: ''
    }]
  },
  startWeekDay: 6
}

const Store = createContext()

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>
}

export { Store }

const reducer = (state, action) => {
  switch(action.type) {
    case 'NEXT_CALENDAR':
      return {
        ...state,
        currentMonth: state.currentMonth.clone().add(1, 'month')
      }
    case 'PREV_CALENDAR':
      return {
        ...state,
        currentMonth: state.currentMonth.clone().subtract(1, 'month')
      }
    case 'TODAY_CALENDAR':
      return {
        ...state,
        currentMonth: moment()
      }
    case 'ADD_EVENT':
      return {
        ...state,
        events: addEvent(state.events, action.payload)
      }
    case 'DELETE_EVENT':
      return {
        ...state,
        events: deleteEvent(state.events, action.payload)
      }
    default:
      return state;
  }
}

const addEvent = (events, event) => {
  const { name, place, description } = event
  if (events[event.day]) {
    events[event.day].push({ name, place, description });
  } else {
    events[event.day] = [{ name, place, description }];
  }
  return events;
}

const deleteEvent = (events, event) => {
  const { name, place, description } = event;
  const i = events[event.day].findIndex((e) => e.name === name && e.place === place && e.description === description);
  events[event.day].splice(i, 1);
  if (events[event.day] === []) {
    delete events[event.day]
  }
  return events;
}

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Provider>
        <Header />
        <Calendar />
      </Provider>
    </MuiPickersUtilsProvider>
  )
};

export default App;
