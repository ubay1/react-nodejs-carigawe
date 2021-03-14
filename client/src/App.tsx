/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/Home';
import Loading from './components/Loading';
import CreateJob from './pages/recruiter/CreateJobs';
import Profil from './pages/profil/profil';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";
import './styles/font.css';
import {store} from './store';
import { Provider } from 'react-redux';
import ROUTES, { RenderRoutes } from "./routes";

// import {io} from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:8000";
import socket from './utils/socket'
import { CobaContext } from "./components/CobaContext";

const App = () => {
  const [totalLike, setTotalLike] = useState(0)

  return (
    <Provider store={store}>
    <CobaContext.Provider value={{totalLike, setTotalLike}}>
      <Router>
        <Loading></Loading>
        {/* {displayRouteMenu(ROUTES)} */}
        <RenderRoutes routes={ROUTES}/>
        {/* <div> */}
        {/* <Switch>
            <Route exact path='/' />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/recruiter/create-job' component={CreateJob} />
            <Route exact path='/profil' component={Profil} />
        </Switch> */}
        {/* </div> */}
      </Router>
    </CobaContext.Provider>
    </Provider>
  );
}

//Render a nested hierarchy of route configs with unknown depth/breadth
function displayRouteMenu(routes: any) {
  // Render a single route as a list item link to the config's pathname
  // function singleRoute(route: any) {
  //   return (
  //     <li key={route.key} className=" p-2">
  //       <Link 
  //          to={route.path} 
  //          className="underline bg-blue-500 p-1 m-2 shadow-sm rounded-md
  //       ">
  //        goto {route.key} ({route.path})
  //       </Link>
  //     </li>
  //   );
  // }

  // looping array dari routes dan generated menjadi list
  return (
    <ul>
      {routes.map((route: any) => {
        // jika dia ada nested routes (route.routes), maka lempar ke function 
        // dicontoh ini displayRouteMenu(route.routes)
        if (route.routes) {
          return (
            <React.Fragment key={route.key}>
              {/* {singleRoute(route)} */}
              {displayRouteMenu(route.routes)}
            </React.Fragment>
          );
        }

        // jika tidak ada nested routes, maka langsung lempar ke singleRoute(route)
        // return singleRoute(route);
      })}
    </ul>
  );
}

export default App;
