import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import News from '@/components/pages/News';

describe('page: News', () => {
  test('renders page', () => {
    render(<News />);
  });
});
