import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Components/Auth/Login'
import NavBar from './Components/Layout/NavBar';
import NotFound from './Components/Common/NotFound'

function App() {
  return (
    <div>
      <BrowserRouter>
          <NavBar />
          <Switch>
            {/* <Route path={'/'} exact component={Home}></Route> */}
            {/* <Route path={'/register'} exact component={Register} /> */}
            <Route path={'/login'} exact component={Login} />
            <Route path="" component={NotFound} />
          </Switch>
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
