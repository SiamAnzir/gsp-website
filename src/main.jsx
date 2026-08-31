import React from 'react'
import ReactDOM from 'react-dom/client'

// Bootstrap must be imported BEFORE App, because App.jsx pulls in App.css and
// CSS is emitted in import order. With Bootstrap last, its `a { text-decoration:
// underline }` beat every reset in App.css — which is why links rendered
// underlined and why so many rules needed !important to fight back.
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
