import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Components/Auth/Login'
import NavBar from './Components/Layout/navBar/NavBar';
import NotFound from './Components/Common/NotFound';
import modulePage from "./Pages/modulePage";
import CreateModuleForm from "./Components/module/CreateModuleForm";

function App() {
  return (
    <div>
      <BrowserRouter>
          <NavBar />
          <Switch>
            {/* <Route path={'/'} exact component={Home}></Route> */}
            {/* <Route path={'/register'} exact component={Register} /> */}
            <Route path={'/login'} exact component={Login} />
            <Route path="/notFound" component={NotFound} />
            <Route path={'/modulePage'} exact component={modulePage}></Route>
            <Route path={'/createModule'} exact component={CreateModuleForm}></Route>
          </Switch>
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
