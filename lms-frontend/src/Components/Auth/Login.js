import React, { useState } from "react";
import { useHistory } from "react-router";
import { login as loginUser } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { Form, Input, Button, message } from "antd";
import { ROLES } from "../../constants/constant";
import "../../index.css";
import LoginImage from "../../Images/draw2.png";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    const res = await dispatch(loginUser(values));
    if (res.status === 200) {
      message.success("Logged in  Successfully");
      if (res.data.payload.user.role === ROLES.STUDENT) {
        history.push("/dashboard");
      } else {
        history.push("/users");
      }
    } else {
      message.error("Login Error");
    }
    setLoading(false);
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [form] = Form.useForm();

  return (
    <div>
      <br />
      <br />
      <div
        style={{
          width: "1200px",
          margin: "auto",
          border: "2px solid #9fd1ff",
          borderRadius: "10px",
          padding: "30px flex",
          alignContent: "space-around",
        }}
      >
        <div>
          <div className="container-fluid">
            <div className="row" style={{ padding: "40px" }}>
              <div className="col-sm-6 px-2 d-none d-sm-block">
                <img
                  src={LoginImage}
                  alt="Login image"
                  className="w-100 vh-90"
                />
              </div>
              <div className="col-sm-6" style={{ padding: "30px 130px" }}>
                <h2 style={{ textAlign: "center", color: "#1d3ffa" }}>Login</h2>
                <Form
                  layout="vertical"
                  form={form}
                  name="register"
                  onFinish={handleSubmit}
                  scrollToFirstError
                >
                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <div className="center">
                      <Button
                        style={{ padding: "0 130px" }}
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                      >
                        Login
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
