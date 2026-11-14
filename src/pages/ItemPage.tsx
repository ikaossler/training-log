import { useParams, Link, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import type { Item } from '../types'

function ItemPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState<Item | null>(null)

  useEffect(() => {
    async function fetchItem() {
      const response = await fetch(`${API_URL}/items/${id}`)
      const data = await response.json()
      setItem(data)
    }

    fetchItem()
  }, [id])

  const handleDelete = async () => {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      navigate('/')
    }
  }

  const handleEdit = async (changes: Partial<Item>) => {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes),
    })
    const data = await response.json()

    if (response.ok) {
      setItem(data)
    }
  }

  if (!item) {
    return <p>Loading...</p>
  }

  return (
    <article>
      <h2>{item.title}</h2>
      <p>{item.subtitle}</p>
      <p>Category: {item.category}</p>
      <p>Status: {item.status}</p>
      <p>Rating: {item.rating}</p>
      <p>{item.notes}</p>
      <Link to="/">← Back</Link>

      <button onClick={() => handleEdit({ status: 'Active' })}>Active</button>
      <button onClick={() => handleEdit({ status: 'Paused' })}>Paused</button>
      <button onClick={() => handleEdit({ status: 'Quit' })}>Quit</button>
      <button onClick={() => handleEdit({ status: 'Want to try' })}>Want to try</button>

      <button onClick={() => handleEdit({ rating: 1 })}>1</button>
      <button onClick={() => handleEdit({ rating: 2 })}>2</button>
      <button onClick={() => handleEdit({ rating: 3 })}>3</button>
      <button onClick={() => handleEdit({ rating: 4 })}>4</button>
      <button onClick={() => handleEdit({ rating: 5 })}>5</button>

      <button onClick={handleDelete}>Delete</button>
    </article>
  )
}

export default ItemPage