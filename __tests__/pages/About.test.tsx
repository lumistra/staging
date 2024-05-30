import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import About from '@/components/pages/About';

describe('page: About', () => {
  test('renders page', () => {
    render(<About />);
  });
});
