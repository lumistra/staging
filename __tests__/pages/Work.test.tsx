import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Work from '@/components/pages/Work';

describe('page: Work', () => {
  test('renders page', () => {
    render(<Work />);
  });
});
