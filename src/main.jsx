import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import Navigator from './navigator';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navigator />
    </BrowserRouter>
  </StrictMode>,
)