import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Space, Button, Tooltip, Popconfirm, message, Collapse, Input, Row, Col, Skeleton } from 'antd';
import { PlusOutlined, DeleteFilled, EditFilled, EyeFilled, SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers, deleteUser } from '../../actions/Users';
import { report } from '../Reports/Report';

function Users() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { Panel } = Collapse;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getUsers());
  }, []);

  let userData = useSelector((state) => state.UserReducer.users);
  useEffect(() => {
    setUsers(userData);
    if (userData) {
      setLoading(false);
    }
  }, [userData]);

  const removeUser = async (e) => {
    const res = await dispatch(deleteUser(e.key));
    if (res.status === 200) {
      setUsers(users.filter((user) => user._id !== e.key));
      message.success('User Removed');
    } else {
      message.error('An Error Occurred');
    }
  };

  const editUser = (e) => {
    history.push(`updateUser/${e.key}`);
  };

  const profile = (e) => {
    history.push(`profile/${e.key}`);
  };

  const columns = [
    {
      title: 'Registration No',
      dataIndex: 'regNumber',
      key: 'regNumber',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
          <Popconfirm title="Are you sure to delete this user?" onConfirm={() => removeUser(record)} okText="Yes" cancelText="No">
            <Tooltip placement="bottom" title="Delete User">
              <DeleteFilled />
            </Tooltip>
          </Popconfirm>
          <Tooltip placement="bottom" title="Edit User">
            <EditFilled onClick={() => editUser(record)} />
          </Tooltip>
          <Tooltip placement="bottom" title="View Profile">
            <EyeFilled onClick={() => profile(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data = users?.map((user) => ({
    key: user._id,
    regNumber: user.regNumber,
    name: user.name,
    email: user.email,
    contactNo: user.contactNo,
    role: user.role,
  }));
  const handleCreateUser = () => {
    history.push('register');
  };

  const header = {
    paddingLeft: 10,
    fontFamily: 'Besley',
    fontWeight: 'bold',
    paddingTop: 25,
    paddingBottom: 15,
  };

  const headData = columns?.map((col) => col?.title);
  const bodyData = data?.map((col) => [col.regNumber, col.name, col.email, col.contactNo, col.role]);

  return (
    <div>
      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          <h3 style={header}>Users</h3>
          <Collapse style={{ marginBottom: 50 }}>
            <Panel header="Search Users">
              <Row>
                <Col span={6} style={{ margin: '10px' }}>
                  <Input placeholder="Name" />
                </Col>
                <Col span={6} style={{ margin: '10px' }}>
                  <Input placeholder="Email" />
                </Col>
                <Col span={6} style={{ margin: '10px' }}>
                  <Input placeholder="Contact Number" />
                </Col>
                <Col span={6} style={{ margin: '10px' }}>
                  <Input placeholder="Role" />
                </Col>
              </Row>
              <Row>
                <Col span={17} style={{ margin: '10px' }}>
                  <Button type="secondary" icon={<ClearOutlined />}>
                    Clear All
                  </Button>
                </Col>
                <Col span={6} style={{ margin: '10px' }}>
                  <Button type="primary" icon={<SearchOutlined />}>
                    Search
                  </Button>
                </Col>
              </Row>
            </Panel>
          </Collapse>

          <Button onClick={() => report(headData, bodyData)}>Report</Button>
          <Table columns={columns} dataSource={data} />
          <Tooltip title="Create New User">
            <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" className="fabBtn" onClick={handleCreateUser} />
          </Tooltip>
        </>
      )}
    </div>
  );
}

export default Users;
