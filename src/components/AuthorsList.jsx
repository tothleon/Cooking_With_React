import React from 'react'
import Author from './Author'

export default function AuthorList({ authors }) {

  const authorsElement = authors.map(author => {
      return <Author key={author.id} {...author}/>
  })

  return (
    <div className='ingredient-grid'>
        {authorsElement}
    </div>
  )
}
