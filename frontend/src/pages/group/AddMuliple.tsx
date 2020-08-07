/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Avatar from '../common/Avatar';
import { CssTextField } from './TextFields';


export default function AddMultiple({ label, options, defaultValID, imgKey, setItems, limit, panelWidth }: {
  label: string, options: Array<{ name: string }>, defaultValID?: [number], imgKey?: string, setItems: Function, limit?: number, panelWidth?: any
}) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        minWidth: "30vw",
        width: panelWidth,
        '& > * + *': {
          marginTop: theme.spacing(3),
        },
      },
    }),
  );

  const classes = useStyles();

  const handleChange = (e, values) => {
    const ids = values.map(value => value._id);
    setItems(ids);
  }
  let arr = [0, 1];
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-standard"
        defaultValue={defaultValID?.map(id => options[id])}
        options={options}
        disableCloseOnSelect={true}
        renderOption={imgKey && ((option) =>
          <Avatar pic={option[imgKey]} title={option.name} subtitle="" extraText="" />
        )}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions={true}
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