import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import {useDispatch } from 'react-redux';
import { Form, Input, Button, message, DatePicker } from 'antd';
import { getSingleNotice, updateSingleNotice } from '../../actions/Notices';
import moment from 'moment';

const EditNotice = ({notice}) => {

    const dispatch = useDispatch();
    let { id } = useParams();

    const fetchNotice = async (modId) => {
        let res = await dispatch(getSingleNotice(modId));
        res = {...res, createdOn: moment(res.createdOn)}
        form.setFieldsValue(res);
    }

    useEffect( () => {
        if(notice) {
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

    const { TextArea } = Input;

    const SubmitEdit = async (value) => {
        const updateNotice = {
            id,
            title: value.title,
            createdOn: value.createdOn,
            description: value.description
        }
        const res = await dispatch(updateSingleNotice(updateNotice));
        if(res.status === 200){
           message.success("Notice Updated Successfully");
        } else {
            message.error("Oops!! Error")
        }
    }


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
                        <Input />
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
                        <DatePicker style={{width: '100%'}} />

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
                        <TextArea rows={4} />
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
