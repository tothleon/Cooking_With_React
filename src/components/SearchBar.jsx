import React, { useContext } from 'react'
import { RecipeContext } from './App'


export default function SearchBar() {

    const { handleSearch } = useContext(RecipeContext)

  return (
    <div className='box'>
        <input onChange={e => handleSearch(e.target.value)} type="text" placeholder="Search for recipes" className='search_bar'></input>
    </div>
  )
}
