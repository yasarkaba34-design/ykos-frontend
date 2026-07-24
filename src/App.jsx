// FILE: src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import YKOSAnadoluEvrenselPano from './mega/YKOSAnadoluEvrenselPano'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
        <Routes>
          <Route path="/" element={<YKOSAnadoluEvrenselPano />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
