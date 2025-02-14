import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { Recipe, Ingredient } from '../../types';
import { createRecipe } from '../../services/recipeService';

interface RecipeFormProps {
  onClose: (open: boolean) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onClose }) => {
  const [newRecipeData, setNewRecipeData] = useState<Recipe>({
    recipeName: '',
    cookingTime: '0',
    difficultyLevel: '',
    preparationSteps: '',
    ingredients: [],
    numberOfServings: 0,
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    name: '',
    quantity: '',
  });

  const handleCreateRecipe = async () => {
    try {
      const createdRecipe = await createRecipe(newRecipeData);
      setSuccessMessage('Recipe submitted successfully!');
      setTimeout(() => {
        setSuccessMessage(null);
        onClose(false);
      }, 2000);
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewRecipeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleIngredientInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewIngredient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddIngredient = () => {
    if (newIngredient.name.trim() && newIngredient.quantity.trim()) {
      setNewRecipeData((prevState) => ({
        ...prevState,
        ingredients: [...prevState.ingredients, newIngredient],
      }));
      setNewIngredient({ name: '', quantity: '', numberOfCalories: 0 }); // Reset ingredient input
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setNewRecipeData((prevState) => ({
      ...prevState,
      ingredients: prevState.ingredients.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="create-recipe-form" style={styles.formContainer}>
      <h2 style={styles.title}>Create a New Recipe</h2>
      <form style={styles.form}>
        <input
          type="text"
          name="recipeName"
          placeholder="Recipe Name"
          value={newRecipeData.recipeName}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="difficultyLevel"
          placeholder="Difficulty Level"
          value={newRecipeData.difficultyLevel}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="cuisineType"
          placeholder="Cuisine Type"
          value={newRecipeData.cuisineType}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="number"
          name="numberOfServings"
          placeholder="Number of Servings"
          value={newRecipeData.numberOfServings}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="number"
          name="cookingTime"
          placeholder="Cooking Time (min)"
          value={newRecipeData.cookingTime}
          onChange={handleInputChange}
          style={styles.input}
        />
        <textarea
          name="preparationSteps"
          placeholder="Preparation Steps"
          value={newRecipeData.preparationSteps}
          onChange={handleInputChange}
          style={{ ...styles.input, ...styles.textarea }}
        />

        <h3>Ingredients</h3>
        <div>
          {newRecipeData.ingredients.map((ingredient, index) => (
            <div key={index} style={styles.ingredientItem}>
              <span>
                {ingredient.name} - {ingredient.quantity} -{' '}
                {ingredient.numberOfCalories}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div style={styles.ingredientForm}>
          <input
            type="text"
            name="name"
            placeholder="Ingredient Name"
            value={newIngredient.name}
            onChange={handleIngredientInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="quantity"
            placeholder="Quantity"
            value={newIngredient.quantity}
            onChange={handleIngredientInputChange}
            style={styles.input2}
          />
          <input
            type="text"
            name="numberOfCalories"
            placeholder="Number of calories"
            value={newIngredient.numberOfCalories}
            onChange={handleIngredientInputChange}
            style={styles.input3}
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            style={styles.addButton}
          >
            Add Ingredient
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={handleCreateRecipe}
            className="new-recipe-button"
            style={styles.submitButton}
          >
            Submit Recipe
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-recipe-button"
            style={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
      {/* Success Snackbar */}
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={2000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSuccessMessage(null)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

const styles = {
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  textarea: {
    resize: 'vertical',
    minHeight: '100px',
  },
  ingredientItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '5px 0',
  },
  removeButton: {
    padding: '5px 10px',
    fontSize: '14px',
    color: 'white',
    backgroundColor: '#ff6b6b',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  ingredientForm: {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: '10px',
  },
  addButton: {
    padding: '10px 15px',
    fontSize: '14px',
    color: 'white',
    backgroundColor: '#4caf50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#6c757d',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default RecipeForm;
