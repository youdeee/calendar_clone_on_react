import React, { useContext } from 'react';
import { Store } from './App';
import { useForm, Controller } from "react-hook-form";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlaceIcon from '@material-ui/icons/Place';
import NotesIcon from '@material-ui/icons/Notes';
import { DatePicker } from "@material-ui/pickers";
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
  }
}));

const AddEventModal = (props) => {
  const classes = useStyles();
  const { dispatch } = useContext(Store);
  const { handleSubmit, register, control } = useForm();
  const onSubmit = (data) => {
    dispatch({ type: 'ADD_EVENT', payload: { ...data, day: data.day.format('YYYY-MM-DD') } });
    props.onClose();
  }

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      className={classes.modal}
    >
      <Box className={classes.paper}>
        <Box display="flex" flexDirection="row-reverse">
          <CloseIcon onClick={props.onClose} />
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <TextField
                inputRef={register}
                placeholder="タイトルと日時を追加"
                name="name"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end" width={1}>
            <Grid item>
              <AccessTimeIcon />
            </Grid>
            <Grid item>
              <Controller
                as={
                  <DatePicker />
                }
                name="day"
                format="YYYY/MM/DD"
                variant="inline"
                value={register}
                defaultValue={props.day}
                control={control}
                rules={{ required: true }}
                autoOk
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <PlaceIcon />
            </Grid>
            <Grid item>
              <TextField
                inputRef={register}
                placeholder="場所を追加"
                name="place"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <NotesIcon />
            </Grid>
            <Grid item>
              <TextField
                inputRef={register}
                placeholder="説明を追加"
                name="description"
              />
            </Grid>
          </Grid>
          <Box display="flex" flexDirection="row-reverse">
            <Button type="submit" variant="contained" color="primary">保存</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default AddEventModal;
