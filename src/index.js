import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { createStore, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { controlsReducer, dataReducer } from './store/reducers'
import './utils/i18n'

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
const rootReducer = combineReducers({
  controls: controlsReducer,
  data: dataReducer
})
const store = createStore(rootReducer, composeEnhancers())

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback = { <div>Loading...</div> }>
      <Provider store = { store }>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
)