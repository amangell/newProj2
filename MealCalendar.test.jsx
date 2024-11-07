import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import MealCalendar from './src/MealCalendar.jsx';
import { mockMeals, mockSetMeals, mockHandleSearchChange, mockSuggestions } from './__mocks__/mocks1.js';

function renderWithRouter(component) {
    return render(<BrowserRouter>{component}</BrowserRouter>);
}

test('renders MealCalendar', () => {
    renderWithRouter(
        <MealCalendar
            meals={mockMeals}
            setMeals={mockSetMeals}
            searchQuery=""
            handleSearchChange={mockHandleSearchChange}
            suggestions={[]}
        />
    );

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    daysOfWeek.forEach(day => {
        expect(screen.getByText(day)).toBeInTheDocument();
    });

    mockMeals.forEach(meal => {
        expect(screen.getByText(meal.strMeal)).toBeInTheDocument();
    });
});

test('shows search input and can update value', () => {
    renderWithRouter(
        <MealCalendar
            meals={mockMeals}
            setMeals={mockSetMeals}
            searchQuery=""
            handleSearchChange={mockHandleSearchChange}
            suggestions={mockSuggestions}
        />
    );

    const searchInput = screen.getByPlaceholderText("Search for a recipe...");
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'Test' } });
    expect(mockHandleSearchChange).toHaveBeenCalledWith('Test');
});

test('displays suggestions and allows clicking', () => {
    renderWithRouter(
        <MealCalendar
            meals={mockMeals}
            setMeals={mockSetMeals}
            searchQuery=""
            handleSearchChange={mockHandleSearchChange}
            suggestions={mockSuggestions}
        />
    );

    mockSuggestions.forEach(suggestion => {
        expect(screen.getByText(suggestion.strMeal)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Suggestion 1'));
});

test('renders and handles "Replace Meal" button click', () => {
    renderWithRouter(
        <MealCalendar
            meals={mockMeals}
            setMeals={mockSetMeals}
            searchQuery=""
            handleSearchChange={mockHandleSearchChange}
            suggestions={[]}
        />
    );

    const replaceButtons = screen.getAllByText('Replace Meal');
    fireEvent.click(replaceButtons[0]);

    expect(mockSetMeals).not.toHaveBeenCalled(); // Would check more if replaceMeal is passed in as a prop
});
