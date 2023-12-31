
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserProvider from './context/UserProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App />}/>
      </Routes>    
    </BrowserRouter>
  </UserProvider>
  // </React.StrictMode>,
)
