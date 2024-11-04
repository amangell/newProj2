import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const MealCalendar = ({ meals }) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className="calendar">
            <h1>Weekly Meal Planner</h1>
            <div className="meal-grid">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className={`meal-day ${day === "Sunday" ? "sunday" : ""}`}>
                        <h3>{day}</h3>
                        {meals[index] ? (
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




