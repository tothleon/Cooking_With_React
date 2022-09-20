import React from 'react'

export default function RecipeAuthorEdit(props) {

    const {author,
        handleAuthorChange,
        handelAuthorDelete
    } = props

    function handleChange(changes) {
        handleAuthorChange(author.id, { ...author, ...changes})
    }

    return (
      <>
      <input 
      className='recipe-edit__input'
      type='text'
      onChange={(e) => handleChange({ firstName: e.target.value })}
      value={author.firstName}/>
      <input
      className='recipe-edit__input'
      type='text'
      onChange={(e) => handleChange({ lastName: e.target.value })}
      value={author.lastName}
      />
      <button
      className='btn--secondary btn'
      onClick={() => { handelAuthorDelete(author.id)}}
      >
      &times;
      </button>
      </>
    )
}
