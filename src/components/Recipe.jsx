import React, { useContext } from 'react'
import IngredientList from './IngredientList'
import { RecipeContext } from './App'

export default function Recipe(props) {

  const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext)

  const {
    id,
    name, 
    cookTime,    
    servings, 
    instructions,
    ingredients,
    } = props

  return (
    <div className='recipe'>
        <div className='recipe__header'>
            <h3 className='recipe__title'>{name}</h3>
            <div>
                <button
                    onClick={() => handleRecipeSelect(id)}
                    className='btn btn--primary mr-1'
                >
                Edit
                </button>
                <button
                    className='btn btn--secondary'
                    onClick={() => handleRecipeDelete(id)}
                >
                Delete</button>
            </div>
        </div>
        <div className='recipe__row'>
            <span className='recipe__lable'>Cook Time:</span>
            <span className='recipe__value'>{cookTime}</span>
        </div>
        <div className='recipe__row'>
            <span className='recipe__lable'>Servings:</span>
            <span className='recipe__value'>{servings}</span>
        </div>
        <div className='recipe__row'>
            <span className='recipe__lable'>Instructions:</span>
            <div className='recipe__value recipe__value--indented recipe__instructions'>{instructions}</div>
        </div>
        <div className='recipe__row'>
            <span className='recipe__lable'>Ingredients:</span>
            <div className='recipe__value recipe__value--indented'>
                <IngredientList ingredients={ingredients}/>
            </div>
        </div>
    </div>
  )
}
