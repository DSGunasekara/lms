import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, message, DatePicker } from 'antd';
import { getSingleEvent, updateSingleEvent } from '../../actions/Events';
import moment from 'moment';

const EditEvent = ({event}) => {

    const dispatch = useDispatch();
    let { id } = useParams();

    const fetchEvent = async (modId) => {
        let res = await dispatch(getSingleEvent(modId));
        res = {...res, date: moment(res.date)}
        form.setFieldsValue(res);
    }

    useEffect( () => {
        if(event) {
            form.setFieldsValue(event);
        }else {
            fetchEvent( id )
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
        const updateEvent = {
            id,
            title: value.title,
            date: value.date,
            time: value.time,
            venue: value.venue,
            description: value.description
        }
        const res = await dispatch(updateSingleEvent(updateEvent));
        if(res.status === 200){
           message.success("Event Updated Successfully");
        } else {
            message.error("Oops!! Error")
        }
    }


    return (
        <div>
            <div style={{width:'400px', margin: 'auto'}}>
                <h2 style={{textAlign: 'center'}}>Update Event</h2>
                <Form
                    layout="vertical"
                    form={form}
                    name="eventUpdate"
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
                        name="date"
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

                    {/* <Form.Item
                        name="time"
                        label="Time"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Time!',
                            },
                        ]}
                    >
                        <Input type="time" />
                    </Form.Item> */}

                    <Form.Item
                        name="venue"
                        label="Venue"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Venue!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Description!',
                            },
                        ]}
                    >
                        <Input />
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

export default EditEvent;
