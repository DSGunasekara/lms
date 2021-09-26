import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import '../../../index.css';
import Logo from '../../../Images/logoooo.png'
import { Layout, Menu, Popconfirm, Tooltip } from 'antd';

import {
  UserOutlined,
  VideoCameraOutlined,
  ReadOutlined,
  NotificationOutlined,
  CoffeeOutlined,
  LineChartOutlined,
  LoginOutlined,
  LogoutOutlined,
  DashboardOutlined,
  CalendarOutlined
} from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/auth';
import { ROLES } from '../../../constants/constant';

const { Sider } = Layout;

function NavBar() {
    const history = useHistory();
    const dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))?.payload.user);
    
    const [navList, setNavList] = useState([]);

    history.listen(location => {
        setUser(JSON.parse(localStorage.getItem('profile'))?.payload.user)
    })
    
    useEffect(() => {
            if(user?.role === ROLES.ADMIN) {
                setNavList([
                    {
                        name: 'User Module',
                        icon: <UserOutlined/>,
                        to: '/users'
                    },
                    {
                        name: ' Course Module',
                        icon: <VideoCameraOutlined/>,
                        to: '/modulePage'
                    },
                    {
                        name: 'Lecture Module',
                        icon: <ReadOutlined/>,
                        to: '/lectures'
                    },
                    {
                        name: 'Notice Module',
                        icon: <NotificationOutlined/>,
                        to: '/noticeAdmin'
                    },
                    {
                        name: 'Event Module',
                        icon: <CoffeeOutlined/>,
                        to: '/eventAdmin'
                    },
                    {
                        name: 'Result Module',
                        icon: <LineChartOutlined/>,
                        to: '/results'
                    },
                    {
                        name: 'Timetable Module',
                        icon: <CalendarOutlined />,
                        to: '/timetables'
                    },
                ])
            } else if(user?.role === ROLES.STUDENT) {
              setNavList([
                {
                  name: 'Dashboard',
                  icon: <DashboardOutlined />,
                  to: '/dashboard'
                },
                {
                  name: 'Profile',
                  icon: <UserOutlined />,
                  to: `/profile/${user?._id}`
                },
                {
                  name: ' Course Module',
                  icon: <VideoCameraOutlined/>,
                  to: '/modulePage'
                },
                {
                  name: 'Timetables',
                  icon: <VideoCameraOutlined/>,
                  to: '/timetables'
                },
              ])
            } else {
                setNavList([])
            }
     
    }, [user])
  
    const logo = {
      width: 60,
      height: 45,
      marginTop: 10,
      marginBottom: 10
    }

  
    const logoDiv = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  
    }
  
    const logoutUser = () => {
      dispatch(logout())
      history.push('/')
    }

  return (
    <Sider
    style={{
      overflow: 'none',
      height: '100vh',
      position: 'fixed',
      left: 0,
    }}>
      <div className="logo" style={logoDiv}>
        <Link to="/">
          <img src={Logo} style={logo} alt="Logo" />
        </Link>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
          {navList?.map((nav, index) => (
              <Menu.Item key={index} icon={nav.icon}>
              <Link to={nav.to}></Link>
              {nav.name}
            </Menu.Item>
          ))}
          { user ? 
            <Popconfirm  title="Are you sure you want to logout?" onConfirm={() => logoutUser()} okText="Yes" cancelText="No">
                <Menu.Item key="99"  icon={<LogoutOutlined />}>
                 Logout
                </Menu.Item>
            </Popconfirm> 
            : 
            <Menu.Item key="100" icon={<LoginOutlined/>}>
                Login
                <Link to="/"/>
            </Menu.Item>
        }
      </Menu>
    </Sider>
  )
}

export default NavBar
