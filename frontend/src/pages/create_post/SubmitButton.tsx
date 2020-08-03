import React, { useEffect } from "react"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Group, User } from "../../store/types";
import { RootState } from "../../reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchGroups } from "../../reducers/groupsSlice";
import { Dictionary, unwrapResult } from "@reduxjs/toolkit";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export const SubmitButton = () => {

  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const user = useSelector<RootState, User>(state => state.user)
  const groups = useSelector<RootState, Dictionary<Group>>(state => state.groups.entities)
  const userGroups = Object.values(groups).filter(group => user.groups.includes(group._id))

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchGroups()).then(unwrapResult).then(() => {
      //console.log(groups)
    })
  }, [])

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Submit</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          <MenuItem value={10}>Post to my profile</MenuItem>
          <p style={{ textAlign: "center" }}>Post to my group</p>
          {userGroups.map(group => (
            <MenuItem value={group.name}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{group.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>)
}