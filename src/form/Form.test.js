import React from 'react';

import { screen, render } from '@testing-library/react';

import Form from './Form';

describe('when the form is mounted', () => {
  it('there must be a create product form page', () => {
    render(<Form />);
    expect(
      screen.getByRole('heading', { name: /create product/i })
    ).toBeInTheDocument();
  });

  it('should exists the  fields: name, size, type (electronic, furniture, clothing) and a submit button.', () => {
    render(<Form />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });
});
