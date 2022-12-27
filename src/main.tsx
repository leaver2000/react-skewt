import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import SAMPLE_DATA from './data/KBLV.json' 

const data  = SAMPLE_DATA as TARP.Dataset


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App tarp={data}/>
  </React.StrictMode>,
)
