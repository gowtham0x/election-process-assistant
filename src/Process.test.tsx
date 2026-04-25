import { render, screen, fireEvent } from '@testing-library/react';
import { Process } from './pages/Process';

describe('Process Component', () => {
  it('renders the initial step correctly', () => {
    render(<Process />);
    expect(screen.getByText(/The Election Process/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Voter Registration/i)[0]).toBeInTheDocument();
  });

  it('can navigate to the next step', () => {
    render(<Process />);
    const nextButton = screen.getByRole('button', { name: /Next/i });
    
    // First step
    expect(screen.getByText(/Must be a U.S. citizen/i)).toBeInTheDocument();
    
    // Click Next
    fireEvent.click(nextButton);
    
    // Second step should now be visible
    expect(screen.getAllByText(/Primaries and Caucuses/i)[0]).toBeInTheDocument();
  });
});
