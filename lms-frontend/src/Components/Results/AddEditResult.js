import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'

import { Form, Input, Button, message, Skeleton, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { getUsers } from '../../actions/Users';
import { getModules } from '../../actions/Modules'
import { createResult, getResult, updateResult } from '../../actions/result'

function AddEditResult() {
    const dispatch = useDispatch();
    const [students, setStudents] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [modules, setModules] = useState('')
    const [selectedModule, setSelectedModule] = useState('')
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [result, setResult] = useState('')
    const [disableSearch, setDisableSearch] = useState(false)

    const { id } = useParams();

    const fetchResult = async(id) => {
        setLoading(true)
        const res = await dispatch(getResult(id))
        setResult(res)
        setLoading(false)
        form.setFieldsValue(res.module)
        setDisableSearch(true)
    }

    const fetchUsers = async() => {
        setLoading(true)
        const res = await dispatch(getUsers())
        setStudents(res.data.filter((student) => student.role === 'Student'));
        setLoading(false)
    }

    const fetchModules = async() => {
        setLoading(true)
        const res = await dispatch(getModules())
        setModules(res.data)
        setLoading(false)
    }

    const [form] = Form.useForm()
    const [userForm] = Form.useForm()

    const { Option } = Select;
    const children = []
    for (const module in modules) {
        children.push(<Option key={modules[module]._id}>{modules[module].module_code}</Option>);
    }

    useEffect(()=>{
        fetchUsers()
        fetchModules()
        if(id) {
            fetchResult(id)
        }
    },[])

    const onSearch = async(values) => {
        if(result) {
            values.module_code = result.module._id
        }
        console.log(values);
        setLoadingBtn(true)
        setSelectedModule(values.module_code)
        const st = []
        students.forEach((student) => {
           if(student.modules.filter((module)=> module.module === values.module_code).length >0){
               st.push(student)
           }
        });
        setStudentList(st);
        setLoadingBtn(false)
        setDisabledBtn(false)
        userForm.resetFields()
    }

    const onFinish = async(values) => {
        const students = []
        let passedAmount = 0;
        let failedAmount = 0;
        let holdAmount = 0;
        values.users.forEach(student => {
            const st = studentList.filter(s=> s.regNumber === student.regNumber)
            if (st.length === 1) {
                students.push({student: st[0]._id, grade: student.grade})
                if (student.grade === 'A' || student.grade === 'B' || student.grade === 'C') {
                    passedAmount ++;
                } else if (student.grade === 'H') {
                    holdAmount ++;
                } else {
                    failedAmount ++;
                }
            }
        })
        // console.log(students);
        const result = {
            module: selectedModule,
            passedAmount,
            failedAmount,
            holdAmount,
            students
        }
        // console.log(result);
        if (id) {
            const res = await dispatch(updateResult({id, ...result}))
            if (res.status === 200) {
                message.success('Result Uploaded Successfully')
            } else {
                message.error(res.data)
            }
        } else {
            const res = await dispatch(createResult(result))
            if (res.status === 200) {
                message.success('Result Uploaded Successfully')
            } else {
                message.error(res.data)
            }
        }
    };

    const handleAdd = (add)=> {
        if (result) {
            result.students.forEach((student) => {
                add({'regNumber': student.student.regNumber, 'name': student.student.name, 'grade': student.grade})
            })
        } else {
            studentList.forEach((student)=> {
                add({'regNumber': student.regNumber, 'name': student.name})
            })
        }
        setDisabledBtn(true)
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

    return (
        <div>
            { loading ? 
                <>
                <Skeleton active /> 
                <Skeleton active /> 
                <Skeleton active /> 
                <Skeleton active /> 
                </>
                :
            <div style={{width:'600px', margin: 'auto'}}>
            <h2 style={{textAlign: 'center'}}>Results</h2>
            <Form
            form={form}
            name="module"
            layout="inline"
            onFinish={onSearch}
            style={{marginBottom: '50px'}}
            scrollToFirstError>
                <Form.Item
                name="module_code"
                label="Module Code"
                rules={[
                    {
                    required: true,
                    message: 'Please select a Module',
                    },
                ]}
                >
                <Select style={{ minWidth: '300px' }} disabled={disableSearch}>
                    {children}
                </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loadingBtn}>
                        Search
                    </Button>
                </Form.Item>
            </Form>
            <p>Found<b> {studentList.length}</b> students</p>
            {studentList.length > 0 ?
            <Form name="dynamic_form_nest_item" onFinish={onFinish} layout="vertical" autoComplete="off" form={userForm}>
                <Form.List name="users">
                    {(fields, { add, remove }) => {
                        

                        return (
                            <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (

                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                {...restField}
                                name={[name, 'regNumber']}
                                label="Registration Number"
                                fieldKey={[fieldKey, 'regNumber']}
                                rules={[{ required: true, message: 'Missing Student Registration Number' }]}
                                >
                                    <Input placeholder="Student Registration Number" readOnly />
                                </Form.Item>
                                <Form.Item
                                {...restField}
                                name={[name, 'name']}
                                label="Student Name"
                                fieldKey={[fieldKey, 'name']}
                                rules={[{ required: true, message: 'Missing Student Name' }]}
                                >
                                    <Input placeholder="Student Name" readOnly />
                                </Form.Item>
                                <Form.Item
                                {...restField}
                                name={[name, 'grade']}
                                label="Grade"
                                fieldKey={[fieldKey, 'grade']}
                                rules={[{ required: true, message: 'Missing Student Grade' }]}
                                >
                                    <Select style={{width: '150px'}}>
                                        <Option key="A">A</Option>
                                        <Option key="B">B</Option>
                                        <Option key="C">C</Option>
                                        <Option key="D">D</Option>
                                        <Option key="E">E</Option>
                                        <Option key="H">H</Option>
                                    </Select>
                                </Form.Item>
                            </Space>
                        ))}
                        {disabledBtn ? '' :
                            <Form.Item>
                            <Button type="dashed" onClick={() => handleAdd(add)} block icon={<PlusOutlined />}>
                                Generate Student List
                            </Button>
                            </Form.Item>
                        }
                    </>
                        )
                    }}
                </Form.List>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={loadingBtn}>
                    Submit
                    </Button>
                </Form.Item>
            </Form>
            : ''}
            </div>
    }
        </div>
    )
}

export default AddEditResult
