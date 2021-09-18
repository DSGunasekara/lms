import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

import { Form, Input, Button, message, Upload, Select, Skeleton, Popconfirm, Tooltip } from 'antd';
import { InboxOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';

import { uploadTimetable, getTimetable, getTimetables } from '../../actions/timetables';
//import { getModules } from '../../actions/Modules'

function AddEditTimetable() {
  const dispatch = useDispatch()

  const { id } = useParams();

  const fetchTimetable = async() => {
    setLoading(true);
    await dispatch(getTimetable())
    setLoading(false)
  }

  const fetchTimetable = async(id) => {
    setLoading(true)
    const res = await dispatch(getTimetable(id))
    form.setFieldsValue(res);
    setFilePath(res.filePath)
    setLoading(false)
  }

  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [filePath, setFilePath] = useState('')

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
      const res = await dispatch(updateTimetable({id, ...values, filePath}))
      if (res.status === 200) {
        message.success('Timetable Updated Successfully')
      } else {
        message.error(res.data)
      }
    } else {
        const res = await dispatch(uploadTimetable({...values, filePath}))
        if (res.status === 201) {
          message.success('Timetable Created Successfully')
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
      <div style={{width:'400px', margin: 'auto'}}>
          <h2 style={{textAlign: 'center'}}>{id ? 'Update' : 'Upload'} Timetable </h2>
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
                  message: 'Please enthe the Title!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="year"
              label="Year"
              rules={[
                {
                  required: true,
                  message: 'Please enter the year!',
                },
              ]}
            >
              <Select style={{ width: '100%' }}>
                {children}
              </Select>
            </Form.Item>
              <Form.Item
                name="semester"
                label="Semester"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the semester!',
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
                title="Are you sure to delete this uploaded timetable?"
                onConfirm={() => setFilePath('')}
                okText="Yes"
                cancelText="No"
                >
                      <Tooltip placement="left" title="Delete Timetable File">
                        <Button icon={<DeleteOutlined />} style={{marginRight: '5px'}}/>
                      </Tooltip>
                  </Popconfirm>
                  <Tooltip placement="right" title="Download Timetable File">
                    <Button icon={<DownloadOutlined />} onClick={() => window.open(`http://localhost:5000/${filePath}`)}/>
                  </Tooltip>
                </>
              }

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" loading={loadingBtn}>
                    Upload
                </Button>
              </Form.Item>
            </Form>    
      </div>
    }
    </>
  )
}

export default AddEditTimetable;
