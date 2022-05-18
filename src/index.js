import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './views/App'
import Product from './views/Product'
import store from './store'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from 'react-redux'
import './index.css'
import "../node_modules/bootstrap/scss/bootstrap.scss"

const root = ReactDOM.createRoot(document.getElementById('root'))

function Main() {

  const [loading, setLoading] = useState(false);

  store.subscribe(() => {
    setLoading(store.getState().database.loading)
  })

  return (
    <Provider store={store}>
      <h1 className="text-center mt-2">Fake Store</h1>
      {
        loading && <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '90vh'}}>
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
      {
        !loading && <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="product/:id" element={<Product />} />
           <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
        </BrowserRouter>
      }
    </Provider>
  )
}

root.render(<Main/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
