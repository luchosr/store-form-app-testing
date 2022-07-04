import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { saveProduct } from '../services/productServices';
import { CREATED_STATUS } from '../consts/httpStatus';

const Form = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: '',
    size: '',
    type: '',
  });

  const validateField = ({ name, value }) => {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: value.length ? '' : `The ${name} is required`,
    }));
  };

  const validateForm = ({ name, size }) => {
    validateField({ name: 'name', value: name });
    validateField({ size: 'name', value: size });

    if (!size.value) {
      setFormErrors((prevState) => ({
        ...prevState,
        size: 'The size is required',
      }));
    }
  };
  const getFormValues = ({ name, size }) => ({
    name: name.value,
    size: size.value,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSaving(true);
    const { name, size } = e.target.elements;

    validateForm(getFormValues({ name, size }));
    const response = await saveProduct(getFormValues({ name, size }));

    if (response.status === CREATED_STATUS) {
      setIsSuccess(true);
    }

    setIsSaving(false);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField({ name, value });
  };
  return (
    <div>
      <h1>Create product</h1>

      {isSuccess && <p>Product Stored</p>}

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
        <Select labelId='demo-simple-select-label' id='type' label='type'>
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
