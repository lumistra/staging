import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Home from '@/components/pages/Home';

describe('page: Home', () => {
  test('renders page', () => {
    render(<Home />);
  });
});
