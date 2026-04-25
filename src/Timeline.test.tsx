import { render, screen } from '@testing-library/react';
import { Timeline } from './pages/Timeline';

describe('Timeline Component', () => {
  it('renders the timeline header', () => {
    render(<Timeline />);
    expect(screen.getByText(/Election Year Timeline/i)).toBeInTheDocument();
  });

  it('renders timeline events', () => {
    render(<Timeline />);
    expect(screen.getByText(/Candidates Announce/i)).toBeInTheDocument();
    expect(screen.getByText(/Inauguration Day/i)).toBeInTheDocument();
  });
});
