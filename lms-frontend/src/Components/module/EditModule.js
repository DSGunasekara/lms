import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {Select} from "antd";

import { Form, Input, Button, message } from 'antd';

import { updateSingleModule, getSingleModule } from '../../actions/Modules';

import {getUsers} from "../../actions/Users";
let option_lec = [], option_lab = [];

const EditSingleModule = ({module, moduleUpdate}) =>{


    const dispatch = useDispatch();
    let { id } = useParams();
    const { Option } = Select;

    const [module2, setModule] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchUser = async (modId) =>{
        const res = await dispatch(getSingleModule(modId));
        form.setFieldsValue(res);
        setModule(res);
        setLoading(false);
    }



    useEffect( ()=>{
        if(module){
            console.log("test")
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



    const [form, form2] = Form.useForm();

    const SubmitEdit = async (value) =>{
        const updateModule = {id, ...value}
        const res = await dispatch(updateSingleModule(updateModule))
        if(res.status === 200){
            moduleUpdate(updateModule, module.name)
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
                    <Form.Item
                        name="lecture_in_charge.name"
                        label="Lecture In charge"
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
                                placeholder={module2.lecture_in_charge?.name}
                                name="option_lec"
                                options={option_lec}
                                className="basic-multi-select"
                                classNamePrefix="select"

                            />
                        </div>

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