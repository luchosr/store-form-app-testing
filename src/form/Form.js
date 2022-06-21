import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

const Form = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: '',
    size: '',
    type: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSaving(true);
    const { name, size, type } = e.target.elements;

    if (!name.value) {
      setFormErrors((prevState) => ({
        ...prevState,
        name: 'The name is required',
      }));
    }

    if (!size.value) {
      setFormErrors((prevState) => ({
        ...prevState,
        size: 'The size is required',
      }));
    }

    await fetch('/products', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    setIsSaving(false);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFormErrors({
      ...formErrors,
      [name]: value.length ? '' : `The ${name} is required`,
    });
  };
  return (
    <div>
      <h1>Create product</h1>

      <form onSubmit={handleSubmit}>
        <TextField
          label='name'
          id='name'
          name='name'
          helperText={formErrors.name}
          onBlur={handleBlur}
        />
        <TextField
          label='size'
          id='size'
          name='size'
          helperText={formErrors.size}
          onBlur={handleBlur}
        />
        <InputLabel htmlFor='type'>Type</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='type'
          value=''
          label='type'
        >
          <MenuItem value='electronic'>Electronic</MenuItem>
          <MenuItem value='furniture'>Furniture</MenuItem>
          <MenuItem value='clothing'>Clothing</MenuItem>
        </Select>
        <Button type='submit' disabled={isSaving}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
