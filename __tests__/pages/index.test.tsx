import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Home from '@/pages/[[...slug]]';

describe('page: Home', () => {
  test('renders Home page', () => {
    render(<Home />);
  });
});
