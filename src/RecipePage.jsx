// RecipePage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RecipePage = ({ meals }) => {
    const { idMeal } = useParams();
    const navigate = useNavigate();

    // Find the specific meal in the meals array
    const meal = meals.find(m => m.idMeal === idMeal);

    if (!meal) {
        return <p>Recipe not found</p>;
    }

    // Extract ingredients and measurements
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }

    // Split instructions into separate steps
    const instructions = meal.strInstructions.split('.').map(step => step.trim()).filter(step => step);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>{meal.strMeal}</h1>
            <img src={meal.strMealThumb} alt={meal.strMeal} style={{ maxWidth: '100%', height: 'auto' }} />
            <p><strong>Category:</strong> {meal.strCategory}</p>
            <p><strong>Cuisine:</strong> {meal.strArea}</p>

            <h2>Ingredients</h2>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            <h2>Instructions</h2>
            <ol style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
                {instructions.map((step, index) => (
                    <li key={index}>{step}.</li>
                ))}
            </ol>

            <button onClick={() => navigate(-1)} style={{ marginTop: '20px' }}>Back to Calendar</button>
        </div>
    );
};

export default RecipePage;


