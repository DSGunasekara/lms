import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import {
  Table,
  Space,
  Button,
  Tooltip,
  Popconfirm,
  message,
  Collapse,
  Input,
  Row,
  Col,
  Skeleton,
  Select,
} from "antd";
import {
  PlusOutlined,
  DeleteFilled,
  EditFilled,
  EyeFilled,
  SearchOutlined,
  ClearOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { getUsers, deleteUser } from "../../actions/Users";
import { report } from "../Reports/Report";

function Users() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { Option } = Select;

  const { Panel } = Collapse;

  const [users, setUsers] = useState([]);
  const [usersFilter, setUsersFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchReg, setSearchReg] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [open, setOpen] = useState(["0"]);

  useEffect(() => {
    setLoading(true);
    dispatch(getUsers());
  }, []);

  let userData = useSelector((state) => state.UserReducer.users);
  useEffect(() => {
    setUsers(userData);
    setUsersFilter(userData);
    if (userData) {
      setLoading(false);
    }
  }, [userData]);

  const removeUser = async (e) => {
    const res = await dispatch(deleteUser(e.key));
    if (res.status === 200) {
      setUsers(users.filter((user) => user._id !== e.key));
      setUsersFilter(users.filter((user) => user._id !== e.key));
      message.success("User Removed");
    } else {
      message.error("An Error Occurred");
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
      title: "Registration No",
      dataIndex: "regNumber",
      key: "regNumber",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => removeUser(record)}
            okText="Yes"
            cancelText="No"
          >
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

  const data = usersFilter?.map((user) => ({
    key: user._id,
    regNumber: user.regNumber,
    name: user.name,
    email: user.email,
    contactNo: user.contactNo,
    role: user.role,
  }));
  const handleCreateUser = () => {
    history.push("register");
  };

  const header = {
    paddingLeft: 10,
    fontWeight: "bold",
    paddingTop: 25,
    paddingBottom: 15,
    color: "#1890ff",
  };

  const headData = columns?.map((col) => col?.title);
  const bodyData = data?.map((col) => [
    col.regNumber,
    col.name,
    col.email,
    col.contactNo,
    col.role,
  ]);

  const search = () => {
    if (searchContact || searchEmail || searchName || searchRole || searchReg) {
      let query = {};

      if (searchName) {
        query = {
          ...query,
          name: searchName,
        };
      }
      if (searchReg) {
        query = {
          ...query,
          regNumber: searchReg,
        };
      }
      if (searchEmail) {
        query = {
          ...query,
          email: searchEmail,
        };
      }
      if (searchContact) {
        query = {
          ...query,
          contactNo: searchContact,
        };
      }
      if (searchRole) {
        query = {
          ...query,
          role: searchRole,
        };
      }
      function searchFun(user) {
        return Object.keys(this).every((key) =>
          user[key].toLowerCase().includes(this[key].toLowerCase())
        );
      }
      const result = users?.filter(searchFun, query);
      setOpen([]);
      setUsersFilter(result);
    } else {
      setOpen([]);
      setUsersFilter(users);
    }
  };

  const clear = () => {
    setSearchReg("");
    setSearchContact("");
    setSearchEmail("");
    setSearchName("");
    setSearchRole("");
  };

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
          <Collapse
            style={{ marginBottom: 50 }}
            activeKey={open}
            onChange={() => setOpen(open === "" ? [] : ["0"])}
          >
            <Panel header="Search Users">
              <Row>
                <Col span={6} style={{ margin: "10px" }}>
                  <Input
                    placeholder="Registration Number"
                    value={searchReg}
                    onChange={(e) => setSearchReg(e.target.value)}
                  />
                </Col>
                <Col span={6} style={{ margin: "10px" }}>
                  <Input
                    placeholder="Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </Col>
                <Col span={6} style={{ margin: "10px" }}>
                  <Input
                    placeholder="Email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                  />
                </Col>
                <Col span={6} style={{ margin: "10px" }}>
                  <Input
                    placeholder="Contact Number"
                    value={searchContact}
                    onChange={(e) => setSearchContact(e.target.value)}
                  />
                </Col>
                <Col span={6} style={{ margin: "10px" }}>
                  <Select
                    value={searchRole}
                    style={{ width: "100%" }}
                    onChange={(e) => setSearchRole(e)}
                  >
                    <Option value="">All</Option>
                    <Option value="Admin">Admin</Option>
                    <Option value="Lecturer">Lecturer</Option>
                    <Option value="Lab Instructor">Lab Instructor</Option>
                    <Option value="Student">Student</Option>
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col
                  span={17}
                  style={{ margin: "10px" }}
                  onClick={() => clear()}
                >
                  <Button type="secondary" icon={<ClearOutlined />}>
                    Clear All
                  </Button>
                </Col>
                <Col span={6} style={{ margin: "10px" }}>
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={() => search()}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Panel>
          </Collapse>

          <Button
            onClick={() => report(headData, bodyData)}
            style={{
              marginBottom: 10,
              marginRight: 5,
              display: "block",
              marginLeft: "auto",
            }}
          >
            <DownloadOutlined />
            Download user Report ss
          </Button>
          <Table columns={columns} dataSource={data} />
          <Tooltip title="Create New User">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              size="large"
              className="fabBtn"
              onClick={handleCreateUser}
              style={{position: 'fixed'}}
            />
          </Tooltip>
        </>
      )}
    </div>
  );
}

export default Users;
