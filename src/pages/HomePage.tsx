import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import type { Item } from '../types'

function HomePage() {
    const [items, setItems] = useState<Item[]>([])

    useEffect(() => {
        async function fetchItems() {
            const response = await fetch(`${API_URL}/items`)
            const data = await response.json()
            setItems(data)
        }

        fetchItems()
    }, [])

      return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>{item.title}</li>
            ))}
        </ul>
    )
}

export default HomePage