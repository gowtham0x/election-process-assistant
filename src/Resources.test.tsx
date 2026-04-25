import { render, screen } from '@testing-library/react';
import { Resources } from './pages/Resources';

describe('Resources Component', () => {
  it('renders the voter resources heading', () => {
    render(<Resources />);
    expect(screen.getByText(/Voter Resources/i)).toBeInTheDocument();
  });
  
  it('renders FAQ section', () => {
    render(<Resources />);
    expect(screen.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeInTheDocument();
  });
});
