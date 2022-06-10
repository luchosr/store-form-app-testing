import React from 'react';
import { TextField } from '@mui/material';

const Form = () => {
  return (
    <div>
      <h1>Create product</h1>

      <form>
        <TextField label='name' id='name' />
      </form>
    </div>
  );
};

export default Form;
