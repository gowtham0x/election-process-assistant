import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';

describe('Navbar Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  it('renders the application title', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText(/Election/i)).toBeInTheDocument();
    expect(screen.getByText(/Guide/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText(/The Process/i)).toBeInTheDocument();
    expect(screen.getByText(/Timeline/i)).toBeInTheDocument();
    expect(screen.getByText(/Resources/i)).toBeInTheDocument();
  });
});
