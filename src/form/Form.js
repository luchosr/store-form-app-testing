import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import { saveProduct } from '../services/productServices';
import {
  CREATED_STATUS,
  ERROR_SERVER_STATUS,
  INVALID_REQUEST_STATUS,
} from '../consts/httpStatus';

const Form = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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

  const handleFetchErrors = async (err) => {
    if (err.status === ERROR_SERVER_STATUS) {
      setErrorMessage('Unexpected error, please try again');
      return;
    }
    if (err.status === INVALID_REQUEST_STATUS) {
      const data = await err.json();
      setErrorMessage(data.message);
      return;
    }

    setErrorMessage('connection error, please try again later');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSaving(true);
    const { name, size } = e.target.elements;

    validateForm(getFormValues({ name, size }));

    try {
      const response = await saveProduct(getFormValues({ name, size }));

      if (!response.ok) {
        throw response;
      }

      if (response.status === CREATED_STATUS) {
        e.target.reset();
        setIsSuccess(true);
      }
    } catch (err) {
      handleFetchErrors(err);
    }

    setIsSaving(false);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField({ name, value });
  };
  return (
    <Container maxWidth='xs'>
      <CssBaseline />
      <h1>Create product</h1>

      {isSuccess && <p>Product Stored</p>}
      <p>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <Grid container>
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
        </Grid>
      </form>
    </Container>
  );
};

export default Form;
