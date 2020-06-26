import React, { useContext } from 'react';
import { Store } from './App';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlaceIcon from '@material-ui/icons/Place';
import NotesIcon from '@material-ui/icons/Notes';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    minWidth: '300px',
  },
}));

const EventModal = (props) => {
  const classes = useStyles();
  const { dispatch } = useContext(Store);

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      className={classes.modal}
      onClick={(e) => e.stopPropagation() }
    >
      <Box className={classes.paper}>
        <Box display="flex" flexDirection="row-reverse">
          <CloseIcon onClick={props.onClose} />
          <DeleteIcon
            onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: 'DELETE_EVENT', payload: { ...props.event, day: props.day.format('YYYY-MM-DD') } });
                props.onClose();
            }}
          />
        </Box>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <Box>{props.event.name || '(タイトルなし)'}</Box>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccessTimeIcon />
          </Grid>
          <Grid item>
            <Box>{props.day.format('M月D日')}</Box>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <PlaceIcon />
          </Grid>
          <Grid item>
            <Box>{props.event.place}</Box>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <NotesIcon />
          </Grid>
          <Grid item>
            <Box>{props.event.description}</Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default EventModal;
