import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('shows a responsive PDF modal with scrollable content and visible action buttons', () => {
  const rows = Array.from({ length: 30 }, (_, index) => ({
    name: `Product ${index + 1}`,
    sellPrice: '10.00',
    quantity: String(index + 1),
    totalPrice: String((index + 1) * 10),
  }));

  localStorage.setItem('productRows', JSON.stringify(rows));
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /pdf ნახვა/i }));

  expect(screen.getByRole('button', { name: /pdf შენახვა/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /pdf გაზიარება/i })).toBeInTheDocument();

  const actionRow = screen.getByRole('button', { name: /pdf შენახვა/i }).parentElement;
  expect(actionRow).toHaveClass('flex-wrap');
  expect(actionRow).toHaveClass('gap-2');
});
