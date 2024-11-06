// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import MealCalendar from './MealCalendar';
import RecipePage from './RecipePage';

function App() {
    const [meals, setMeals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (meals.length === 0) {
            const fetchMeals = async () => {
                const mealPromises = Array(7).fill().map(() =>
                    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                        .then(response => response.json())
                        .then(data => data.meals[0])
                );
                const mealData = await Promise.all(mealPromises);
                setMeals(mealData);
            };
            fetchMeals();
        }
    }, [meals]);

    // Handle search input and fetch suggestions
    const handleSearchChange = async (query) => {
        setSearchQuery(query);
        if (query.length >= 2) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();
            setSuggestions(data.meals || []);
        } else {
            setSuggestions([]);
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <MealCalendar 
                        meals={meals} 
                        setMeals={setMeals} 
                        searchQuery={searchQuery} 
                        handleSearchChange={handleSearchChange} 
                        suggestions={suggestions} 
                    />
                } />
                <Route path="/recipe/:idMeal" element={<RecipePage meals={meals} />} />
            </Routes>
        </Router>
    );
}

export default App;




