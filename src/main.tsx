import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ProductsList } from './pages/ProductsList'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<ProductsList />} />
      </Routes>
    </Router>
    </Provider>
  </StrictMode>
)
