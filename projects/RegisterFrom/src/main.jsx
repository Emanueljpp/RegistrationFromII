import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RegistreForm } from './component/RegistreForm'
import "./style.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RegistreForm />
  </StrictMode>,
)
