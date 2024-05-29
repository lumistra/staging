import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Contact from '@/components/pages/Contact';

describe('page: Contact', () => {
  test('renders page', () => {
    render(<Contact />);
  });
});
