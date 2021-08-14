import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import Login from './Components/Auth/Login'
import NavBar from './Components/Layout/NavBar';
import NotFound from './Components/Common/NotFound';
import modulePage from "./Pages/modulePage";
import Register from './Components/Auth/Register';

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastProvider>
          <NavBar />
          <Switch>
            {/* <Route path={'/'} exact component={Home}></Route> */}
            <Route path={'/register'} exact component={Register} />
            <Route path={'/login'} exact component={Login} />
            <Route path="" component={NotFound} />
            <Route path={'/modulePage'} exact component={modulePage}></Route>
          </Switch>
          {/* <Footer/> */}
        </ToastProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
