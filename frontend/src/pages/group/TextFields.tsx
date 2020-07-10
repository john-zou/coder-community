import React from 'react';
import {
  createStyles,
  withStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
  },
})(TextField);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    margin: {
      width: "97%",
      paddingRight: "10px",
      margin: theme.spacing(1),
    },
  }),
);

export const TextFields = ({ name, description, setName, setDescription }:
  { name: string, description: string, setName: React.Dispatch<React.SetStateAction<string>>, setDescription: React.Dispatch<React.SetStateAction<string>> }) => {
  const classes = useStyles();

  return (
    <>
      <CssTextField className={classes.margin} id="custom-css-standard-input" label={name} onChange={(e) => {
        setName(e.target.value);
      }} required={true} />
      <CssTextField className={classes.margin} id="custom-css-standard-input" label={description} onChange={(e) => setDescription(e.target.value)} />
    </>
  )
}