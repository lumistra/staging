import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Home from '@/app/page';


describe('page: Home', () => {
  test('renders Home', () => {
    render(<Home />);
  });
});