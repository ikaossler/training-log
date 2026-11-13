import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import type { Item } from '../types'

function HomePage() {
    const [items, setItems] = useState<Item[]>([])
    const [status, setStatus] = useState('')

    useEffect(() => {
        async function fetchItems() {
            let url = `${API_URL}/items`
            if (status !=='') {
                url = `${API_URL}/items?status=${status}`
            }
            const response = await fetch(url)
            const data = await response.json()
            setItems(data)
        }

        fetchItems()
    }, [status])

      return (
        <>
        <div>
            <button onClick={() => setStatus('')}>All</button>
            <button onClick={() => setStatus('Want to try')}>Want to try</button>
            <button onClick={() => setStatus('Active')}>Active</button>
            <button onClick={() => setStatus('Paused')}>Paused</button>
            <button onClick={() => setStatus('Quit')}>Quit</button>
        </div>
        <ul>
            {items.map((item) => (
                <li key={item.id}>{item.title}</li>
            ))}
        </ul>
        </>
    )
}

export default HomePage