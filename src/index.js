import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { createStore, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { controlsReducer, dataReducer } from './store/reducers'

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
const rootReducer = combineReducers({
  controls: controlsReducer,
  data: dataReducer
})
const store = createStore(rootReducer, composeEnhancers())

ReactDOM.render(
  <React.StrictMode>
    <Provider store = { store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)