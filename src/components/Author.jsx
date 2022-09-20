import React from 'react'

export default function Author({firstName, lastName}) {
  return (
    <>
        <span>{firstName}</span>
        <span>{lastName}</span>
    </>
  )
}
