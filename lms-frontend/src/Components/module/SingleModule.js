import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import {getSingleModule} from "../../actions/Modules";

import { Row, Col, Layout, Avatar, Tag, Divider, Skeleton, Tooltip, Button, PageHeader } from 'antd';
import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    SettingOutlined,
    ReadOutlined,
    UngroupOutlined,
    CaretRightOutlined,
} from '@ant-design/icons';


const SingleModule = () =>{
    const { Sider, Content } = Layout;

    const dispatch = useDispatch();
    let { id } = useParams();

    const [module, setModule] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchModule = async (ModId) =>{
        setLoading(true)
        const res = await dispatch(getSingleModule(ModId));
        setModule(res);
        setLoading(false);
    }
    useEffect(() =>{
        if(id){
            fetchModule(id);
        }
    }, [id])

    const handleEditModule = () =>{

    }



    return(
<div>

    <Layout >
        {loading ?
            <>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
            </>
            :
            <>
                <Sider style={{height: '80vh'}} theme='light' width='500'>
                    <div className="container">
<<<<<<< HEAD
                        <label for="name">
                            <b>Name</b>
                        </label>
                        <p>
                            {
                                module.name
                            }
                        </p>
                        <label htmlFor="module_code">
                            <b>Module Code</b>
                        </label>
                        <p>
                            {
                                module.module_code
                            }
                        </p>
                        <label htmlFor="name">
                            <b>Lecturer in Charge</b>
                        </label>
                        <p>
                            {
                                module.lecture_in_charge?.name
                            }
                        </p>
                        <label htmlFor="lab_assistant">
                            <b>lab_assistant</b>
                        </label>
                        <p>
                            {
                                module.lab_assistant?.name
                            }
                        </p>
                        <label htmlFor="year">
                            <b>year</b>
                        </label>
                        <p>
                            {
                                module.year?.slice(0, 4)
                            }
                        </p>
                        <label htmlFor="semester">
                            <b>semester</b>
                        </label>
                        <p>
                            {
                                module.semester
                            }
                        </p>
=======
                        <label htmlFor="name"><b>Name</b></label>
                        <p>{module.name}</p>
                        <label htmlFor="module_code"><b>Module Code</b></label>
                        <p>{module.module_code}</p>
                        <label htmlFor="name"><b>Lecturer in Charge</b></label>
                        <p>{module.lecture_in_charge?.name}</p>
                        <label htmlFor="lab_assistant"><b>lab_assistant</b></label>
                        <p>{module.lab_assistant?.name}</p>
                        <label htmlFor="year"><b>year</b></label>
                        <p>{module.year?.slice(0, 4)}</p>
                        <label htmlFor="semester"><b>semester</b></label>
                        <p>{module.semester}</p>
>>>>>>> a246ad2a10164f27e6e8ee80d1c6b84ca49f7d5a
                    </div>
                    <Divider />
                    <div style={{margin: 15}}>
                        <div style={{padding: 5}}>
                            <Tooltip placement="right" title="Update Module">
                                <Button type="text" onClick={handleEditModule}>
                                    <SettingOutlined style={{marginRight: 10}} /> Settings
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                </Sider>
            </>
        }
    </Layout>
</div>
    )
}

export default SingleModule;