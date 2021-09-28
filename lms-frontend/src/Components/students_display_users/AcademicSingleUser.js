import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getUser } from "../../actions/Users";

import "./CardStyles.css";

import {
  Row,
  Col,
  Layout,
  Avatar,
  Tag,
  Divider,
  Skeleton,
  Tooltip,
  Button,
  PageHeader,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  SettingOutlined,
  ReadOutlined,
  UngroupOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";

const AcademicSingleUser = () => {
  const { Sider, Content } = Layout;
  const dispatch = useDispatch();
  let { id } = useParams();

  const [singleUser, setSingleUser] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async (userId) => {
    setLoading(true);
    const res = await dispatch(getUser(userId));
    console.log(res);
    setSingleUser(res);
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id]);

  return (
    <div>
      <Layout>
        {loading ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <>
            <Sider style={{ height: "80vh" }} theme="light" width="300">
              <img
                style={{ height: "50vh" }}
                theme="light"
                width="300"
                alt="user"
                src={`http://localhost:5000/${singleUser.profile_photo}`}
              />
              <Divider />
            </Sider>
            <Content>
              <div className="container">
                <label htmlFor="name">
                  <b>Name</b>
                </label>
                <p>{singleUser.name}</p>
                <label htmlFor="module_code">
                  <b>Email</b>
                </label>
                <p>{singleUser.email}</p>
                <label htmlFor="semester">
                  <b>Role</b>
                </label>
                <p>{singleUser.role}</p>
              </div>
            </Content>
          </>
        )}
      </Layout>
    </div>
  );
};

export default AcademicSingleUser;
