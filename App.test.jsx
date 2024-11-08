import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './src/App.jsx';

test('renders the App component', () => {
    render(<App />);
    expect(screen.getByText(/meal/i)).toBeInTheDocument();
});
