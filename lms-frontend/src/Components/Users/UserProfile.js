import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { Row, Col, Layout, Avatar, Tag, Divider, Skeleton, Tooltip, Button } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined,
     SettingOutlined, ReadOutlined, UngroupOutlined,
} from '@ant-design/icons';

import { getUser } from '../../actions/Users';
import EditUser from './EditUser';
import GPA from '../GPA/GPA';

function UserProfile() {
    const { Sider, Content } = Layout;

    const dispatch = useDispatch();
    let { id } = useParams();

    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const [isGPA, setIsGPA] = useState(false);
    const [isModule, setIsModule] = useState(false);
    
    const fetchUser = async(userId) => {
        setLoading(true)
        const res = await dispatch(getUser(userId));
        setUser(res);
        setLoading(false)
    }
    useEffect(() => {
        if (id) {
            fetchUser(id);
        }
    }, [id])

    const handleEdit = () => {
        setIsEdit(true);
        setIsGPA(false);
        setIsModule(false);
    }
    const handleGPA = () => {
        setIsEdit(false);
        setIsGPA(true);
        setIsModule(false);
    }
    const handleModule = () => {
        setIsEdit(false);
        setIsGPA(false);
        setIsModule(true);
    }

    const updateUser = (user) => {
        setUser(user)
    }
    return (
        <Layout>
            {loading ? 
            <>
                <Skeleton active /> 
                <Skeleton active /> 
                <Skeleton active /> 
                <Skeleton active /> 
            </>
            :
            <>
                <Sider style={{height: '80vh'}} theme='light' width='300'>
                    <div style={{margin: 15}}>
                        <div style={{textAlign: 'center'}}>
                            <Avatar size={64} icon={<UserOutlined />} />
                        </div>
                        <div style={{padding: 5}}>
                            <UserOutlined style={{marginRight: 10}} />{ user.name }
                        </div>
                        <div style={{padding: 5}}>
                            <MailOutlined style={{marginRight: 10}} />{ user.email }
                        </div>
                        <div style={{padding: 5}}>
                            <PhoneOutlined style={{marginRight: 10}} />{ user.contactNo }
                        </div>
                        <div style={{padding: 5}}>
                            <Tag color="green">{user.role}</Tag>
                        </div>
                    </div>
                    <Divider />
                    <div style={{margin: 15}}>
                        <div style={{padding: 5}}>
                            <Tooltip placement="right" title="Update Profile">
                            <Button type="text" onClick={handleEdit}>
                                <SettingOutlined style={{marginRight: 10}} /> Settings
                            </Button>
                            </Tooltip>
                        </div>
                        <div style={{padding: 5}}>
                            <Tooltip placement="right" title="View GPA">
                                <Button type="text" onClick={handleGPA}>
                                    <ReadOutlined style={{marginRight: 10}} />GPA
                                </Button>
                            </Tooltip>
                        </div>
                        <div style={{padding: 5}}>
                            <Tooltip placement="right" title="View User Modules">
                                <Button type="text" onClick={handleModule}>
                                    <UngroupOutlined style={{marginRight: 10}} /> Modules
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                </Sider>
                <Content>
                    {isEdit? <EditUser user={user} userUpdate={updateUser} />: isGPA ? <GPA/>: isModule ? 'user modules': ''}
                </Content>
            </>
            }
        </Layout>
    )
}

export default UserProfile
