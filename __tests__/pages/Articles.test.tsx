import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Articles from '@/components/pages/Articles';

describe('page: Articles', () => {
  test('renders page', () => {
    render(<Articles />);
  });
});
