import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MealCalendar from './MealCalendar';
import RecipePage from './RecipePage';

function App() {
    const [meals, setMeals] = useState([]);

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

console.log(meals)


    return (
        <Router>
            <Routes>
                <Route path="/" element={<MealCalendar meals={meals} />} />
                <Route path="/recipe/:idMeal" element={<RecipePage meals={meals} />} />
            </Routes>
        </Router>
    );
}

export default App;

