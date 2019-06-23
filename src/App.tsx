import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core'
import Layout from './components/Layout'
import theme from './styles/theme'
import store from 'src/redux/store'

const App = () => (
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <Layout />
      </MuiThemeProvider>
    </Router>
  </Provider>
)

export default App
