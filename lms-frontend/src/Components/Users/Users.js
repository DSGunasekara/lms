import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { Table, Tag, Space, Button, Tooltip, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from '../../actions/Users';

function Users() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [users, setUsers] = useState([])
    useEffect(() => {
      dispatch(getUsers())
    }, []);

    let userData = useSelector((state) => state.UserReducer.users);

    useEffect(()=>{
      setUsers(userData)
    }, [userData])

    function confirm(e) {
      setUsers(users.filter((user) => user._id !== e.key))
      message.success('User Removed');
    }

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          // render: text => <a>{text}</a>,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Contact Number',
          dataIndex: 'contactNo',
          key: 'contactNo',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <Popconfirm
                title="Are you sure to delete this user?"
                onConfirm={() => confirm(record)}
                okText="Yes"
                cancelText="No"
              >
                <a href="#">Delete</a>
              </Popconfirm>
            </Space>
          ),
        },
      ];
      
      const data = users?.map((user) => ({
        key: user._id,
        name: user.name,
        email: user.email,
        contactNo: user.contactNo,
        role: user.role
      }))
      ;
      const handleCreateUser = ()=> {
        history.push('register')
      }

    return (
        <div>
            <Table columns={columns} dataSource={data} />
            <Tooltip title="Create New User">
                <Button type="primary" shape="circle" icon={<PlusOutlined />} size='large' className="fabBtn" onClick={handleCreateUser} />
            </Tooltip>
        </div>
    )
}

export default Users
