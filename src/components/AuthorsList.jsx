import React from 'react'
import Author from './Author'

export default function AuthorsList({ authors }) {

    const AuthorsElement = authors.map(author => {
        return <Author key={author.id} {...author}/>
    })

  return (
    <div className='ingredient-grid'>
        {AuthorsElement}
    </div>
  )
}
