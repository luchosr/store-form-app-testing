import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

const Form = () => {
  return (
    <div>
      <h1>Create product</h1>

      <form>
        <TextField label='name' id='name' />
        <TextField label='size' id='size' />
        <InputLabel htmlFor='type'>Type</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='Type'
          value=''
          label='Type'
        >
          <MenuItem value='electronic'>Electronic</MenuItem>
          <MenuItem value='furniture'>Furniture</MenuItem>
          <MenuItem value='clothing'>Clothing</MenuItem>
        </Select>
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default Form;
