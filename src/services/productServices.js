export const saveProduct = ({ name, size }) =>
  fetch('/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, size }),
  });

export default {
  saveProduct,
};
