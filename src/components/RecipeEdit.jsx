import React, { useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import RecipeAuthorEdit from "./RecipeAuthorEdit"
import { RecipeContext } from "./App";
import { v4 as uuidv4 } from "uuid";

export default function RecepieEdit({ recipe }) {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

  function handleChange(changes) {
    handleRecipeChange(recipe.id, { ...recipe, ...changes });
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...recipe.ingredients];
    const index = newIngredients.findIndex((i) => i.id === id);
    newIngredients[index] = ingredient;
    handleChange({ ingredients: newIngredients });
  }

  function handelIngredientAdd() {
    const newIngredient = {
      id: uuidv4(),
      name: "",
      amount: "",
    };
    handleChange({ ingredients: [...recipe.ingredients, newIngredient] });
  }

  function handelIngredientDelete(id) {
    handleChange({
      ingredients: recipe.ingredients.filter((i) => i.id !== id),
    });
  }

  function handleAuthorChange(id, author) {
    const newAuthors = [...recipe.authors];
    const index = newAuthors.findIndex((i) => i.id === id);
    newAuthors[index] = author;
    handleChange({ authors: newAuthors });
  }

  function handelAuthorAdd() {
    const newAuthor = {
      id: uuidv4(),
      firstName: "",
      lastName: "",
    };
    handleChange({ authors: [...recipe.authors, newAuthor] });
  }

  function handelAuthorDelete(id) {
    handleChange({
      authors: recipe.authors.filter((i) => i.id !== id),
    });
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button 
        className="btn recipe-edit__remove-button" 
        onClick={() => handleRecipeSelect(undefined)}>
          &times;
        </button>
      </div>
      <div className="recipe-edit__details-grid">
        <label htmlFor="name" className="recipe-edit__label">
          Name
        </label>
        <input 
        type="text" 
        name="name" 
        id="name" 
        value={recipe.name} 
        onChange={(e) => handleChange({ name: e.target.value })} 
        className="recipe-edit__input" />
        <label 
        htmlFor="cookTime" 
        className="recipe-edit__label">
          Cook Time
        </label>
        <input 
        type="text" 
        name="cookTime" 
        id="cookTime" 
        value={recipe.cookTime} 
        onChange={(e) => handleChange({ cookTime: e.target.value })} 
        className="recipe-edit__input" />
        <label 
        htmlFor="sevings" 
        className="recipe-edit__label">
          Sevings
        </label>
        <input type="number" 
        min="1" name="sevings" 
        id="sevings" 
        value={recipe.servings} 
        onChange={(e) => handleChange({ servings: parseInt(e.target.value) || "" })} 
        className="recipe-edit__input" />
        <label 
        htmlFor="instructions" 
        className="recipe-edit__label">
          Instructions
        </label>
        <textarea name="instructions" 
        id="instructions" 
        className="recipe-edit__input" 
        value={recipe.instructions} 
        onChange={(e) => handleChange({ instructions: e.target.value })} />
      </div>
      <br />
      
      
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map((ingredient) => (
          <RecipeIngredientEdit key={ingredient.id} 
          handleIngredientChange={handleIngredientChange} 
          ingredient={ingredient} 
          handelIngredientDelete={handelIngredientDelete} />
        ))}
      </div>
      <div className="recipe-edit_add-ingredient-btn-container">
        <button className="btn btn--primary" onClick={() => handelIngredientAdd()}>
          Add Ingredient
        </button>
      </div>
      
      
      <br />
      <label className="recipe-edit__label">Authors</label>
      <div className="recipe-edit__ingredient-grid">
        <div>First Name</div>
        <div>Last Name</div>
        <div></div>
        {recipe.authors.map((author) => (
          <RecipeAuthorEdit key={author.id} 
          handleAuthorChange={handleAuthorChange} 
          author={author} 
          handelAuthorDelete={handelAuthorDelete} />
        ))}
      </div>
      <div className="recipe-edit_add-ingredient-btn-container">
        <button className="btn btn--primary" onClick={() => handelAuthorAdd()}>
          Add Author
        </button>
      </div>

    </div>
  );
}
