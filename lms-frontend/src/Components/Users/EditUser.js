import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { Form, Input, Button, message } from 'antd';

import { updateUser, getUser } from '../../actions/Users';

function EditUser({user, userUpdate}) {
    const dispatch = useDispatch();
    let { id } = useParams();

    const fetchUser = async(userId) => {
      const res = await dispatch(getUser(userId));
      form.setFieldsValue(res)
  }
    useEffect(() => {
      if(user) {
        form.setFieldsValue(user)
      } else {
        fetchUser(id)
      }
    }, [])

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

  const onFinish = async(values) => {
    const updatedUser = {id, ...values};
    const res = await dispatch(updateUser(updatedUser))
    if (res.status === 200) {
      userUpdate(updatedUser, user.role)
      message.success("Profile Updated Successfully")
    } else {
      message.error("An Error Occurred")
    }
  };

    return (
      <div style={{width:'400px', margin: 'auto'}}>
        <h2 style={{textAlign: 'center'}}>Update Profile</h2>
        <Form
          // {...formItemLayout}
          layout="vertical"
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input your Name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
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
    
          <Form.Item
            name="password"
            label="Password"
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
    
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
    
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item
            name="contactNo"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Update
            </Button>
          </Form.Item>
        </Form>
        </div>
      );
}

export default EditUser
