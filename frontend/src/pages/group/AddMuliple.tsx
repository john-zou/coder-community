/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Avatar from '../common/Avatar';
import { CssTextField } from './TextFields';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
  }),
);

export default function AddMultiple({ label, options, imgKey, setItems }: { label: string, options: Array<{ name: string }>, imgKey?: string, setItems: Function }) {
  const classes = useStyles();

  const handleChange = (e, values) => {
    const ids = values.map(value => value._id);
    console.log(ids);
    setItems(ids);
  }

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={options}
        disableCloseOnSelect={true}
        renderOption={imgKey && ((option) =>
          <Avatar pic={option[imgKey]} title={option.name} subtitle="" extraText="" />
        )}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <CssTextField
            {...params}
            variant="standard"
            label={label}
            placeholder=""
          />
        )}
        onChange={handleChange}
      />
    </div>
  );
}