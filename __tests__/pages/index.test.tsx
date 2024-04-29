import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Page from '@/pages/[[...slug]]';

describe('page: [[...slug]]', () => {
  test('renders Page', () => {
    render(<Page story={{ content: { title: 'Title', description: 'Description' } } as any} />);
  });
});
