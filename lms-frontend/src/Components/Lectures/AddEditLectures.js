import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

import { Form, Input, Button, message, Upload, Select, Skeleton, Popconfirm, Tooltip } from 'antd';
import { InboxOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';

import { uploadLecture, getLecture, updateLecture } from '../../actions/lectures';
import { getModules } from '../../actions/Modules'


function AddEditLecture() {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if(id) {
      fetchLecture(id)
    }
    fetchModules();
  }, [])

  const fetchModules = async() => {
    setLoading(true);
    await dispatch(getModules())
    setLoading(false)
  }

  const fetchLecture = async(id) => {
    setLoading(true)
    const res = await dispatch(getLecture(id))
    form.setFieldsValue(res);
    setFilePath(res.filePath)
    setLoading(false)
  }

  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [filePath, setFilePath] = useState('')

  const data = useSelector((state) => state.ModuleReducer.modules);

  const { Option } = Select;
  const children = []
  for (const module in data) {
    children.push(<Option key={data[module].module_code}>{data[module].module_code}</Option>);
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
  const { TextArea } = Input;

  const onFinish = async(values) => {
    setLoadingBtn(true)
    if (!filePath) {
        message.warning('Please Upload a file')
    } else if (id) {
      const res = await dispatch(updateLecture({id, ...values, filePath}))
      if (res.status === 200) {
        message.success('Lecture Updated Successfully')
      } else {
        message.error(res.data)
      }
    } else {
        const res = await dispatch(uploadLecture({...values, filePath}))
        if (res.status === 201) {
          message.success('Lecture Created Successfully')
        } else {
          message.error(res.data)
        }
    }
    setLoadingBtn(false)
  }

  const { Dragger } = Upload;

  const props = {
      name: 'file',
      multiple: false,
      action: 'http://localhost:5000/api/file',
      maxCount: 1,
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            if (info.fileList.length > 0) {
              setFilePath(info.file.response)
          } else {
              setFilePath('')
          }
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    
  return (
    <>
    { loading ? 
      <>
      <Skeleton active /> 
      <Skeleton active /> 
      <Skeleton active /> 
      <Skeleton active /> 
    </>
    :
    <div>
      <br />
      <div style={{margin: 'auto', width:'700px', border: '2px solid #9fd1ff', borderRadius: '10px', padding: '30px flex', alignContent: 'space-around'}}>
      <br />
      <div className="center">
      <div style={{width:'400px', margin: 'auto' }}>
          <h2 style={{textAlign: 'center', color: '#1890ff'}}>{id ? 'Update' : 'Upload'} Lecture</h2>
          <Form
            layout="vertical"
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: 'Please input a Title!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="type"
              label="Type"
              rules={[
                 {
                  required: true,
                  message: 'Please select the Type',
                },
              ]}
            > 
               <Select style={{ width: '100%' }}>
                  <Option value='Lecture'>Lecture</Option>
                  <Option value='Labs'>Labs</Option>
                  <Option value='Tutorial'>Tutorial</Option>
               </Select>
            </Form.Item>
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
              <Select style={{ width: '100%' }}>
                {children}
              </Select>
            </Form.Item>
              <Form.Item
                name="week"
                label="Week"
                rules={[
                  {
                    required: true,
                    message: 'Please input a week!',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
              >
                <TextArea
                  rows={4}
                />
              </Form.Item>
              {(id && !filePath) || !id ?
                <Form.Item>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                        Support for a single uploads only.
                        </p>
                    </Dragger>
                </Form.Item>
              :
              <>
                <h6>{filePath.slice(8)}</h6>
                <Popconfirm
                title="Are you sure to delete this user?"
                onConfirm={() => setFilePath('')}
                okText="Yes"
                cancelText="No"
                >
                      <Tooltip placement="left" title="Delete Lecture File">
                        <Button icon={<DeleteOutlined />} style={{marginRight: '5px'}}/>
                      </Tooltip>
                  </Popconfirm>
                  <Tooltip placement="right" title="Download Lecture File">
                    <Button icon={<DownloadOutlined />} onClick={() => window.open(`http://localhost:5000/${filePath}`)}/>
                  </Tooltip>
                </>
              }

              <Form.Item {...tailFormItemLayout}>
                <div className="center">
                  <Button type="primary" htmlType="submit" loading={loadingBtn} style={{padding: '0 175px'}}>
                      Upload
                  </Button>
                </div>
              </Form.Item>
            </Form>   
            </div> 
      </div>
      </div> 
      <br /> 
      </div>
    }
    </>
  )
}

export default AddEditLecture
