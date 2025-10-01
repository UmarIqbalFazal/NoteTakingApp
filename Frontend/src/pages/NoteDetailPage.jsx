import { useParams } from 'react-router-dom'

const NoteDetailPage = () => {
  const { id } = useParams()
  return (
    <div>
      <h1>Note Detail Page</h1>
      <p>Viewing note with ID: {id}</p>
    </div>
  )
}

export default NoteDetailPage


/* import React from 'react'

const NoteDetailPage = () => {
  return (
    <div>NoteDetailPage</div>
  )
}

export default NoteDetailPage
*/