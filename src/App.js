import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { List } from './components'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path = "/" component = { List }/>
      </BrowserRouter>
    </div>
  )
}
