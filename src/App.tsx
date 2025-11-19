import { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProductsList from './features/components/ProductsList'
import ProductDetails from './features/components/ProductDetails'

// const ProductList = React.lazy(() =>
//   import('./features/products/ProductList').then(mod => ({ default: mod.ProductList }))
// )

// const ProductDetails = React.lazy(() =>
//   import('./features/products/ProductDetails').then(mod => ({ default: mod.ProductDetails }))
// )

function LoadingFallback() {
  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      Loading...
    </div>
  )
}

function NotFound() {
  return (
    <div style={{ padding: 24 }}>
      <h2>404 — Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </div>
  )
}

export default function App() {
  return (
    <div>
      {/* <header style={{ padding: 12, borderBottom: '1px solid #eee' }}>
        <nav>
          <Link to="/" aria-label="Home" style={{ textDecoration: 'none', fontWeight: 600 }}>
            Listings Manager
          </Link>
        </nav>
      </header> */}

      <main style={{ padding: 16 }}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
