import React, {useState} from 'react'

import { login as loginUser } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, message, } from 'antd';

function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(values) => {
    setLoading(true)
    const res = await dispatch(loginUser(values));
    if(res.status === 200){
      message.success('Logged in  Successfully');
    } else {
      message.error('Login Error');
    }
    setLoading(false);
  }

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
    <div style={{width:'400px', margin: 'auto'}}>
      <h2 style={{textAlign: 'center'}}>Login</h2>
      <Form
        layout="vertical"
        form={form}
        name="register"
        onFinish={handleSubmit}
        scrollToFirstError
      >
        <Form.Item name="email" label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
          <Form.Item name="password" label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
          <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
                Login
            </Button>
          </Form.Item>
        </Form>
    </div>
  );
}

export default Login
