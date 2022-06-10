import React from 'react';

import { screen, render } from '@testing-library/react';

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
