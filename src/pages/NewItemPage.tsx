import { useState } from 'react'
import { API_URL } from '../config'
import { useNavigate } from 'react-router'

function NewItemPage() {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [rating, setRating] = useState(1)
  const [notes, setNotes] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSaving(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, subtitle, category, status, rating, notes }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      navigate(`/items/${data.id}`)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {isSaving && <p>Saving...</p>}
      {error && <p>{error}</p>}

      <label>
        Title
        <input value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>

      <label>
        Subtitle
        <input value={subtitle} onChange={(event) => setSubtitle(event.target.value)} />
      </label>

      <label>
        Category
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">Choose a category</option>
          <option value="Strength">Strength</option>
          <option value="Cardio">Cardio</option>
          <option value="Flexibility">Flexibility</option>
        </select>
      </label>

      <label>
        Status
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="">Choose a status</option>
          <option value="Want to try">Want to try</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Quit">Quit</option>
        </select>
      </label>

      <label>
        Rating
        <input type="number" value={rating} onChange={(event) => setRating(Number(event.target.value))} />
      </label>

      <label>
        Notes
        <input value={notes} onChange={(event) => setNotes(event.target.value)} />
      </label>

      <button type="submit">Add</button>
    </form>
  )
}

export default NewItemPage