import React from 'react';

import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Form from './Form';
import {
  CREATED_STATUS,
  ERROR_SERVER_STATUS,
  INVALID_REQUEST_STATUS,
} from '../consts/httpStatus';

const server = setupServer(
  rest.post('/products', (req, res, ctx) => {
    const { name, size } = req.body;

    if (name && size) {
      return res(ctx.status(CREATED_STATUS));
    }
    return res(ctx.status(ERROR_SERVER_STATUS));
  })
);
beforeAll(() => server.listen());

afterAll(() => server.close());
beforeEach(() => server.resetHandlers());

// eslint-disable-next-line testing-library/no-render-in-setup
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

describe('when the user submits the form properly and the server returns created status', () => {
  it('should the submit button be disabled until the request is done', async () => {
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    expect(submitBtn).not.toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(submitBtn).toBeDisabled();

    await waitFor(() => expect(submitBtn).not.toBeDisabled());
  });

  it('the form page must display the success message “Product stored” and clean the fields values', async () => {
    const nameInput = screen.getByLabelText(/name/i);
    const sizeInput = screen.getByLabelText(/size/i);

    fireEvent.change(nameInput, {
      target: { name: name, value: 'my product' },
    });
    fireEvent.change(sizeInput, {
      target: { name: size, value: '10' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() =>
      expect(screen.getByText(/product stored/i)).toBeInTheDocument()
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue('');
    expect(screen.getByLabelText(/size/i)).toHaveValue('');
  });
});

describe('when the user submits the form and the server returns an unexpected error', () => {
  it('the form page must display the error message “Unexpected error, please try again”', async () => {
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() =>
      expect(
        screen.getByText(/Unexpected error, please try again/i)
      ).toBeInTheDocument()
    );
  });
});

describe('when the user submits the form and the server returns an invalid request error', () => {
  it('the form page must display the error message “The form is invalid, the fields [field1...fieldN] are required”', async () => {
    server.use(
      rest.post('/products', (req, res, ctx) => {
        return res(
          ctx.status(INVALID_REQUEST_STATUS),
          ctx.json({
            message: 'The form is invalid, the fields name, size are required',
          })
        );
      })
    );
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() =>
      expect(
        screen.getByText(
          /The form is invalid, the fields name, size are required/i
        )
      ).toBeInTheDocument()
    );
  });
});

describe('when the user submits the form and the server returns an invalid request error', () => {
  it('the form page must display the error message “The form is invalid, the fields [field1...fieldN] are required”', async () => {
    server.use(
      rest.post('/products', (req, res) =>
        res.networkError('Failed to connect')
      )
    );
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() =>
      expect(
        screen.getByText(/connection error, please try again later/i)
      ).toBeInTheDocument()
    );
  });
});
