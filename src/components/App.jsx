import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import "../css/app.css"
import { v4 as uuidv4 } from 'uuid';
import RecipeEdit from "./RecipeEdit";
import SearchBar from "./SearchBar";


export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

export default function App() {
  //active states
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const [searchedRecipes, setSearchedRecipes] = useState(recipes)
  const [searchQuery, setSearchQuery] = useState()
  //activly slected recipe
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
    function handleSearch(query) {
      if (query) {
        setSearchedRecipes(recipes.filter((recipe) => 
          recipe.name.toLowerCase().includes(query.toLowerCase())))  
      } else {
        setSearchedRecipes(recipes)
      }
    }
    handleSearch(searchQuery)
  }, [recipes, searchQuery])

  useEffect(() => {
    function handleSearch(query) {
      if (query) {
        setSearchedRecipes(recipes.filter((recipe) => 
          recipe.name.toLowerCase().includes(query.toLowerCase())))  
      } else {
        setSearchedRecipes(recipes)
      }
    }
    handleSearch(searchQuery)
  }, [searchQuery, recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
    handleQuery
  }

  function handleQuery(inputQuery) {
    setSearchQuery(inputQuery)
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [
        {id: uuidv4(), 
        name: "", 
        amount: "" }
      ],
      authors:[
        {
          id: 1,
          firstName: "Jhon",
          lastName: "Wick"
        }
      ]
      
    }
    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id){
      selectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
    <SearchBar/>
    <RecipeList recipes={searchedRecipes}/>
    {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  )
}


const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1:45",
    instructions: "1. Put salt on chicken\n2. Put chicken in oven\n3. Eat the chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds"
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Table Spoon"
      }
    ],
    authors:[
      {
        id: 1,
        firstName: "Jhon",
        lastName: "Lennon"
      }
    ]
  },
  {
    id: 2,
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:45",
    instructions: "1. Put paprika on pork\n2. Put pork in oven\n3. Eat the pork",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "3 Pounds"
      },
      {
        id: 2,
        name: "Paprika",
        amount: "2 Table Spoon"
      }
    ],
    authors:[
      {
        id: 1,
        firstName: "Jhon",
        lastName: "Wick"
      }
    ]
  }
]