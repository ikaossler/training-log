import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import type { Item } from '../types'
import { Link } from 'react-router'

function HomePage() {
  const [items, setItems] = useState<Item[]>([])
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchItems() {
      setIsLoading(true)
      setError('')
      try {
        let url = `${API_URL}/items`
        if (status !== '') {
          url = `${API_URL}/items?status=${status}`
        }
        const response = await fetch(url)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message)
        }

        setItems(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [status])

  return (
    <>
      {isLoading && <p>Loading items...</p>}
      {error && <p>{error}</p>}

      <div>
        <button onClick={() => setStatus('')}>All</button>
        <button onClick={() => setStatus('Want to try')}>Want to try</button>
        <button onClick={() => setStatus('Active')}>Active</button>
        <button onClick={() => setStatus('Paused')}>Paused</button>
        <button onClick={() => setStatus('Quit')}>Quit</button>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/items/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default HomePage