import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import PrivacyPolicy from '@/components/pages/PrivacyPolicy';

describe('page: PrivacyPolicy', () => {
  test('renders page', () => {
    render(<PrivacyPolicy />);
  });
});
