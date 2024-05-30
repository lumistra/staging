import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Services from '@/components/pages/Services';

describe('page: Services', () => {
  test('renders page', () => {
    render(<Services />);
  });
});
