import React from 'react';

import { screen, render, fireEvent } from '@testing-library/react';

import Form from './Form';

beforeEach(() => render(<Form />));
describe('when the form is mounted', () => {
  it('there must be a create product form page', () => {
    expect(
      screen.getByRole('heading', { name: /create product/i })
    ).toBeInTheDocument();
  });

  it('should exists the  fields: name, size, type (electronic, furniture, clothing) and a submit button.', () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/size/i)).toBeInTheDocument();
    // expect(screen.getByLabelText(/type/i)).toBeInTheDocument();

    // expect(screen.queryByText(/electronic/i)).toBeInTheDocument();
  });

  it('should exist the submit button', () => {
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});

describe('when the user submits the form without values', () => {
  it('should display validation messages', () => {
    expect(screen.queryByText(/The name is required/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.queryByText(/The name is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/The size is required/i)).toBeInTheDocument();
  });
});

// If the user blurs a field that is empty, then the form must display therequired message for that field.

describe('when the user blur an empty field', () => {
  it('should display a validation error message for the input name', () => {
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument();
    fireEvent.blur(screen.getByLabelText(/name/i), {
      target: { name: 'name', value: '' },
    });
    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument();
  });

  it('should display a validation error message for the input size', () => {
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument();
    fireEvent.blur(screen.getByLabelText(/size/i), {
      target: { name: 'size', value: '' },
    });
    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument();
  });
});

describe('when the user submits the form', () => {
  it('should the submit button be disabled until the request is done', () => {
    expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });
});
