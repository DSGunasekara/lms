import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { Form, Input, Button, message, Skeleton, Switch } from 'antd';

import { updateUser, getUser, updatePassword } from '../../actions/Users';

function EditUser({user, userUpdate}) {
    const dispatch = useDispatch();
    let { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [ hidePass, setHidePass] = useState(false);

    const fetchUser = async(userId) => {
      const res = await dispatch(getUser(userId));
      form.setFieldsValue(res)
      setLoading(false);
  }
    useEffect(() => {
      if(user) {
        form.setFieldsValue(user)
      } else {
        setLoading(true);
        fetchUser(id)
      }
    }, [])

    function onPasswordChange(checked) {
      console.log(`switch to ${checked}`);
      setHidePass(checked);
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
  const [passForm] = Form.useForm();

  const onFinish = async(values) => {
    const updatedUser = {id, ...values};
    const res = await dispatch(updateUser(updatedUser))
    console.log(res);
    if (res.status === 200) {
      userUpdate(updatedUser, user.role)
      message.success("Profile Updated Successfully")
    } else if (res.status === 401) {
      message.error("Your Password is wrong")
    }else {
      message.error("An Error Occurred")
    }
  };

  const onPasswordUpdate = async(values) => {
    console.log(values);
    const updatePass = {id, ...values};
      const res = await dispatch(updatePassword(updatePass));
      if (res.status === 200) {
        message.success("Password Updated Successfully")
      } else {
        message.error(res.data)
      }
  }

    return (
      <>
      {loading ? 
        <>
            <Skeleton active /> 
            <Skeleton active /> 
            <Skeleton active /> 
            <Skeleton active /> 
        </>
        :
        <>
          <div style={{width:'400px', margin: 'auto'}}>
            <h2 style={{textAlign: 'center'}}>Update Profile</h2>
            <Form
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
                      Update Profile
                  </Button>
                </Form.Item>
              </Form>
              <Switch onChange={onPasswordChange}/> Update Password?
              { hidePass ? 
                <Form
                layout="vertical"
                form={passForm}
                name="passForm"
                onFinish={onPasswordUpdate}
                scrollToFirstError
              >
                <Form.Item
                name="oldPassword"
                label="Old Password"
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
                name="password"
                label="New Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please input your new password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                      Update Password
                  </Button>
                </Form.Item>
                
              </Form> : ''
              }
            </div>
          </>
      }
    </>
  );
}

export default EditUser
