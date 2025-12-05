import { render } from '@testing-library/react';
import App from './App';

test('renders Users component', () => {
  const { getByText } = render(<App />);
  const text = getByText(/loading/i);
  expect(text).toBeInTheDocument();
});
