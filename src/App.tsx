import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ItemPage from './pages/ItemPage'
import NewItemPage from './pages/NewItemPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/items/:id" element={<ItemPage />} />
        <Route path="/new" element={<NewItemPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App