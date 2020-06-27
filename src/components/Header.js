import React, { useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import EventIcon from '@material-ui/icons/Event'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { Store } from './App'
/* import * as Colors from '@material-ui/core/colors'; */

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
}))

const Header = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(Store)

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <EventIcon />
        <Typography variant="h6" className={classes.title}>
          カレンダー
        </Typography>
        <Button
          color="inherit"
          variant="outlined"
          onClick={() => dispatch({ type: 'TODAY_CALENDAR' })}
        >
          今日
        </Button>
        <IconButton
          color="inherit"
          aria-label="prev month"
          onClick={() => dispatch({ type: 'PREV_CALENDAR' })}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="next month"
          onClick={() => dispatch({ type: 'NEXT_CALENDAR' })}
        >
          <NavigateNextIcon />
        </IconButton>
        <div>{state.currentMonth.format('Y年 M月')}</div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
