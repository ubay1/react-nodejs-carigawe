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
import CreateJob from './pages/recruiter/CreateJobs';
import Profil from './pages/profil/profil';

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
      {/* <div> */}
      <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/recruiter/create-job' component={CreateJob} />
          <Route exact path='/profil' component={Profil} />
      </Switch>
      {/* </div> */}
    </Router>
    </Provider>
  );
}

export default App;
