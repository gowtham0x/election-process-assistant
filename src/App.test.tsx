import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';

// Helper to render with Router
const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('Home Component', () => {
  it('renders the main heading', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/Navigate the Election Process/i)).toBeInTheDocument();
  });

  it('renders the features section', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/Everything You Need to Know/i)).toBeInTheDocument();
    expect(screen.getByText(/Step-by-Step Process/i)).toBeInTheDocument();
    expect(screen.getByText(/Interactive Timeline/i)).toBeInTheDocument();
    expect(screen.getByText(/Voter Resources/i)).toBeInTheDocument();
  });
});
