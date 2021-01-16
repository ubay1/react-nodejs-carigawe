/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <div>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
