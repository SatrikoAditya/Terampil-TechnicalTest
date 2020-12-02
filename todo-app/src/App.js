import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import store from './store/index'
import {Home, Add, Update} from './pages/'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/add">
            <Add />
          </Route>
          <Route path="/update/:id">
            <Update />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;