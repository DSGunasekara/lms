import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import { Form, Input, Button, message, DatePicker } from 'antd';
import { getSingleNotice, updateSingleNotice } from '../../actions/Notices';

const EditNotice = ({notice, noticeUpdate}) => {

    const dispatch = useDispatch();
    let { id } = useParams();
    
    const [loading, setLoading] = useState(false);

    const fetchNotice = async (modId) => {
        const res = await dispatch(getSingleNotice(modId));
        form.setFieldsValue(res);
    }

    useEffect( () => {
        if(notice) {
            console.log("test");
            form.setFieldsValue(notice);
        }else {
            fetchNotice( id )
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

    const SubmitEdit = async (value) => {
        const updateNotice = {id, ...value}
        console.log(updateNotice);
        const res = await dispatch(updateSingleNotice(updateNotice));
        if(res.status === 200){
            message.success("Notice Updated Successfully");
        } else {
            message.error("Oops!! Error")
        }
    }

    const [noticeData, setNoticeData] = useState({
        title: '',
        createdOn: '',
        description: '',
        inquiries: ''
    })

    return (
        <div>
            <div style={{width:'400px', margin: 'auto'}}>
                <h2 style={{textAlign: 'center'}}>Update Notice</h2>
                <Form
                    layout="vertical"
                    form={form}
                    name="noticeUpdate"
                    onFinish={SubmitEdit}
                    scrollToFirstError
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Title!',
                            },
                        ]}
                    >
                        <Input
                            className="noticeTitle" 
                            type="text"
                            id="noticeTitle"
                            value={noticeData.title}
                            onChange={(e) => setNoticeData({...noticeData, title: e.target.value})}
                        />
                    </Form.Item>
                    <Form.Item
                        name="createdOn"
                        label="Date"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Date!',
                            },
                        ]}
                    >
                        <input 
                            className="createdOn" 
                            type="date"
                            id="createdOn"
                            value={noticeData.createdOn}
                            onChange={(e) => setNoticeData({...noticeData, createdOn: e.target.value})}
                        />

                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Message"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Message!',
                            },
                        ]}
                    >
                        <textarea
                            className="description"
                            id="description"
                            value={noticeData.description}
                            onChange={(e) => setNoticeData({...noticeData, description: e.target.value})}
                        />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default EditNotice;
