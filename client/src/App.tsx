/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Loading from './components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import './styles/font.css';
import {store} from './store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Loading></Loading>
      <div>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
          </Switch>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
