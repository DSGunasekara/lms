import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { useHistory } from 'react-router';

import Login from './Components/Auth/Login'
import NotFound from './Components/Common/NotFound';
import modulePage from "./Pages/modulePage";
import Register from './Components/Auth/Register';
import CreateModuleForm from "./Components/module/CreateModuleForm";
import Users from './Components/Users/Users';
import UserProfile from './Components/Users/UserProfile'
import EditUser from './Components/Users/EditUser';
import SingleModule from "./Components/module/SingleModule";
import AddNotice from './Components/Notices/AddNotice';
import NoticeAdmin from './Components/Notices/NoticeAdmin';
import EditSingleModule from "./Components/module/EditModule";

import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function App() {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <BrowserRouter>
        <ToastProvider>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}
          style={{
            overflow: 'none',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}>
            <div className="logo">
              <Link to="/">
                LMS
              </Link>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/users"></Link>
                  User Module
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to="/modulePage"></Link>
                Course Module
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                nav 3
              </Menu.Item>
              <Menu.Item key="4" icon={<NotificationOutlined />}>
                Notices
                <Link to="/noticeAdmin"></Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout" style={{marginLeft: collapsed ? 75 : 200}}>
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <div className="row">
                <div className="col-1">
                  {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: toggle,
                  })}
                </div>
                <div className="col">
                  <h5 className="title">LMS</h5>
                </div>
              </div>
            </Header>
            <Content
              className="site-layout-background"
              style={{ margin: '24px 16px 0', overflow: 'initial' }}
            >
              <Switch>
                <Route path={'/'} exact component={Login}></Route>
                <Route path={'/users'} exact component={Users}></Route>
                <Route path={'/register'} exact component={Register} />
                <Route path={'/updateUser/:id'} component={EditUser} />
                <Route path={'/profile/:id'} component={UserProfile} />
                <Route path={'/login'} exact component={Login} />
                <Route path={'/modulePage'} exact component={modulePage}></Route>
                <Route path={'/createModule'} exact component={CreateModuleForm}></Route>
                <Route path={'/singleModulePage'} exact component={SingleModule}></Route>
                <Route path={'/addNoticeForm'} exact component={AddNotice}></Route>
                <Route path={'/noticeAdmin'} exact component={NoticeAdmin}></Route>


                <Route path={'/modulePage'} exact component={modulePage}/>
                <Route path={'/createModule'} exact component={CreateModuleForm}/>
                <Route path={'/viewModule/:id'}  component={SingleModule}/>
                <Route path={'/editModule/:id'}  component={EditSingleModule}/>


                <Route path="" component={NotFound} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
          {/* <Footer/> */}
        </ToastProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
