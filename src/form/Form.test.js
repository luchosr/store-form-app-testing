import React from 'react';

import { screen, render, fireEvent } from '@testing-library/react';

import Form from './Form';

describe('when the form is mounted', () => {
  beforeEach(() => render(<Form />));

  it('there must be a create product form page', () => {
    expect(
      screen.getByRole('heading', { name: /create product/i })
    ).toBeInTheDocument();
  });

  it('should exists the  fields: name, size, type (electronic, furniture, clothing) and a submit button.', () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/size/i)).toBeInTheDocument();
    // expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
    screen.debug();

    // expect(screen.queryByText(/electronic/i)).toBeInTheDocument();
  });

  it('should exist the submit button', () => {
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});

describe('when the user submits the form without values', () => {
  it('should display validation messages', () => {
    render(<Form />);
    expect(screen.queryByText(/The name is required/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.queryByText(/The name is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/The size is required/i)).toBeInTheDocument();
  });
});

// If the user blurs a field that is empty, then the form must display therequired message for that field.

describe('when the user blur an empty field', () => {
  it('should display a validation error message', () => {
    render(<Form />);

    fireEvent.blur(screen.getByLabelText(/name/i), {
      target: { name: 'name', value: '' },
    });
    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument();
  });
});
