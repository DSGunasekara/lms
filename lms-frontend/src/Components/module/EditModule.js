import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {DatePicker, Select} from "antd";
import 'antd/dist/antd.css';
import { Form, Input, Button, message } from 'antd';

import { updateSingleModule, getSingleModule } from '../../actions/Modules';

import {getUsers} from "../../actions/Users";
let option_lec = [], option_lab = [];

const EditSingleModule = ({module}) =>{


    const dispatch = useDispatch();
    let { id } = useParams();
    const { Option } = Select;

    const [loading, setLoading] = useState(false);

    //initial state of lec and lab
    const [moduleData, setModuleData] = useState({
        lecture_in_charge: undefined,
        lab_assistant: undefined,
    })

    //getting single modules data to the fetchUser function
    const fetchUser = async (modId) =>{
        const res = await dispatch(getSingleModule(modId));
        form.setFieldsValue(res);
        setModuleData(res);
        setLoading(false);
    }

    useEffect( ()=>{
        if(module){
            form.setFieldsValue(module)
        }else {
            fetchUser( id )

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

    //calling Users to the Component
    useEffect   (() =>{
        dispatch(getUsers());
    }, [dispatch]);
    const userData = useSelector((state) => state.UserReducer.users)

    //filter lecturer from the UserData
    option_lec = userData?.filter((user)=> user.role === "lecturer").map((lec) =>({
        value:lec._id, label: lec.name}))

    //filter labInstructor from the UserData
    option_lab = userData?.filter((user) => user.role === "labInstructor").map((lab) => ({
        value: lab._id, label: lab.name}))

    const [form] = Form.useForm();

    //updating data by passing the new added data
    const SubmitEdit = async (values) =>{
        const updateModule = {
            id,
            name: values.name,
            module_code: values.module_code,
            year: values.year,
            semester: values.semester,
            lecture_in_charge: moduleData.lecture_in_charge,
            lab_assistant:  moduleData.lab_assistant
        }
        console.log(updateModule)
       const res = await dispatch(updateSingleModule(updateModule))
        if(res.status === 200){
            message.success("Profile Updated Successfully")
        } else {
            message.error("An Error Occurred")
        }
    }


    return(
        <div>
            <div style={{width:'400px', margin: 'auto'}}>
                <h2 style={{textAlign: 'center'}}>Update Module</h2>
                <Form
                    // {...formItemLayout}
                    layout="vertical"
                    form={form}
                    name="register"
                    onFinish={SubmitEdit}
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
                        name="module_code"
                        label="Module Code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Module Code',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                        <div className="mb-3 col">
                            <label htmlFor="option_lec" className="form-label">
                                Lecture In Charge
                            </label>
                            <Select
                                value={moduleData.lecture_in_charge?.name}
                                name="option_lec"
                                options={option_lec}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={(e) => setModuleData({...moduleData, lecture_in_charge: e})}
                            />
                        </div>

                    <div className="mb-3 col">
                        <label htmlFor="option_lec" className="form-label">
                            Lab Assistant
                        </label>
                        <Select
                            value={moduleData.lab_assistant?.name}
                            name="option_lec"
                            options={option_lab}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={(e) => setModuleData({...moduleData, lab_assistant: e})}
                        />
                    </div>

                    <Form.Item
                        name="year"
                        label="Year"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Semester',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="semester"
                        label="Semester"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Semester',
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

export default EditSingleModule;