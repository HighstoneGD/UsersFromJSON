import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { List } from './components'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const Header = styled.div`
  display: flex;
  justify-content: flex-end;

  & > * {
    margin: 10px
  }
`

export default function App() {
  const [t, i18n] = useTranslation()

  return (
    <div className="App">
      <Header>
        <select value = { i18n.language } onChange = { e => i18n.changeLanguage(e.target.value) }>
          <option value = "ru">Ru</option>
          <option value = "en">En</option>
        </select>
      </Header>
      <BrowserRouter>
        <Route path = "/" component = { List }/>
      </BrowserRouter>
    </div>
  )
}
