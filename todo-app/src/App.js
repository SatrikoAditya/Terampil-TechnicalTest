import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import store from './store/index'
import Home from './pages/Home'

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;