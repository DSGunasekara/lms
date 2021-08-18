import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getModules, removeModule, updateSingleModule} from "../../actions/Modules";
import 'antd/dist/antd.css';
import {Table, Tag, Space, Button, Tooltip, message, Popconfirm} from 'antd';
import {DeleteFilled, EditFilled, EyeFilled, PlusOutlined} from '@ant-design/icons';

const ModuleTable = () =>{

    const dispatch = useDispatch();

    const [module, setModule] = useState([]);

    useEffect(() =>{
        dispatch(getModules());
    }, [dispatch])

    const moduleData = useSelector( (state) => state.ModuleReducer.modules);
    console.log(moduleData);

    useEffect( ()=>{
        setModule(moduleData)
    }, [moduleData])

   const deleteConfirm = async (e) =>{
      const res = await dispatch(removeModule(e.key));
      console.log(res)
      if(res?.status === 200){
          setModule(module.filter((mod) => mod._id !== e.key))
          message.success('module Removed');
      }else {
          message.error('An Error Occurred');
      }
   }

    const editConfirm = (e) =>{

    }

    const SingleModuleLook = (e) =>{

    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Module Code',
            dataIndex: 'module_code',
            key: 'module_code',

        },
        {
            title: 'Lecture In Charge',
            dataIndex: 'lecture_in_charge',
            key: 'lecture_in_charge',

        },
        {
            title: 'Lab Assistant',
            dataIndex: 'lab_assistant',
            key: 'lab_assistant',

        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',

        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            key: 'semester',

        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => deleteConfirm(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title="Delete User">
                            <DeleteFilled/>
                        </Tooltip>
                    </Popconfirm>
                    <Tooltip title="Edit User">
                        <EditFilled onClick={() => editConfirm(record)} />
                    </Tooltip>
                    <Tooltip title="View Profile">
                        <EyeFilled onClick={() => SingleModuleLook(record)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];
    const data = module?.map((mod) =>({
        key: mod._id,
        name: mod.name,
        module_code: mod.module_code,
        lecture_in_charge: mod.lecture_in_charge?.name,
        lab_assistant:mod.lab_assistant.name,
        year:mod.year,
        semester:mod.semester
    }));



    return(
        <div>
           <Table columns={columns} dataSource={data}/>

                <a href="/createModule">
                  <Tooltip title="Create New Module">
                    <Button type="primary" shape="circle" icon={<PlusOutlined />} size='large' className="fabBtn" />
                  </Tooltip>
                </a>
        </div>
    )
}

export default ModuleTable;