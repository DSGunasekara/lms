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
                <Sider style={{height: '80vh'}} theme='light' width='500'>
                    <div style={{margin: 30}}>

                        <div style={{padding: 5}}>
                            <h4>Name:
                                 { module.name }
                            </h4>
                        </div>

                        <div style={{padding: 5}}>
                            <h4>Module Code:
                                { module.module_code }
                            </h4>
                        </div>
                        <div style={{padding: 5}}>
                            <CaretRightOutlined style={{marginRight: 10}} />{ module.lecture_in_charge?.name }
                        </div>
                        <div style={{padding: 5}}>
                            <CaretRightOutlined style={{marginRight: 10}} />{ module?.lab_assistant?.name }
                        </div>
                        <div style={{padding: 5}}>
                            <CaretRightOutlined style={{marginRight: 10}} />{ module.year }
                        </div>
                        <div style={{padding: 5}}>
                            <CaretRightOutlined style={{marginRight: 10}} />{ module.semester }
                        </div>
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