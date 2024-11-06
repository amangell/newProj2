import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

const MealCalendar = ({ meals, setMeals, searchQuery, handleSearchChange, suggestions }) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const navigate = useNavigate();

    const replaceMeal = async (index) => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const newMeal = data.meals[0];

        const updatedMeals = [...meals];
        updatedMeals[index] = newMeal;
        setMeals(updatedMeals);
    };

    const handleSuggestionClick = (idMeal) => {
        navigate(`/recipe/${idMeal}`);
    };

    return (
        <div className="calendar">
            <h1>Random Meal Planner</h1>
            <div className="search-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search for a recipe..."
                    className="search-bar"
                />
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion) => (
                            <li 
                                key={suggestion.idMeal} 
                                onClick={() => handleSuggestionClick(suggestion.idMeal)}
                                className="suggestion-item"
                            >
                                {suggestion.strMeal}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="meal-grid">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className={`meal-day ${day === "Sunday" ? "sunday" : ""}`}>
                        <h3>{day}</h3>
                        {meals[index] ? (
                            <>
                                <Link to={`/recipe/${meals[index].idMeal}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="meal-container">
                                        <img
                                            src={meals[index].strMealThumb}
                                            alt={meals[index].strMeal}
                                            className="meal-image"
                                        />
                                        <h4>{meals[index].strMeal}</h4>
                                    </div>
                                </Link>
                                <button onClick={() => replaceMeal(index)} className="replace-button">
                                    Replace Meal
                                </button>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MealCalendar;






