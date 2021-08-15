import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import Login from './Components/Auth/Login'
import NavBar from './Components/Layout/navBar/NavBar';
import NotFound from './Components/Common/NotFound';
import modulePage from "./Pages/modulePage";
import Register from './Components/Auth/Register';
import CreateModuleForm from "./Components/module/CreateModuleForm";

import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function App() {

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
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                nav 1
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                nav 2
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                nav 3
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
                <Route path={'/register'} exact component={Register} />
                <Route path={'/login'} exact component={Login} />
                <Route path={'/modulePage'} exact component={modulePage}></Route>
                <Route path={'/createModule'} exact component={CreateModuleForm}></Route>
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
