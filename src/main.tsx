import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MyRouter from "./router/MyRouter.tsx";

import './index.css'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MyRouter />
    </StrictMode>,
);

