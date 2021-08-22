import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getModules, removeModule} from "../../actions/Modules";
import 'antd/dist/antd.css';
import {Table, Space, Button, Tooltip, message, Popconfirm, Skeleton} from 'antd';
import {DeleteFilled, EditFilled, EyeFilled, PlusOutlined} from '@ant-design/icons';
import {useHistory} from "react-router";

const ModuleTable = () =>{

    const dispatch = useDispatch();
    const history = useHistory();

    const [module, setModule] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        setLoading(true)
        dispatch(getModules());
    }, [dispatch])

    const moduleData = useSelector( (state) => state.ModuleReducer.modules);

    useEffect( ()=>{
        setModule(moduleData)
        if (moduleData){
            setLoading(false)
        }
    }, [moduleData])

   const deleteConfirm = async (e) =>{
      const res = await dispatch(removeModule(e.key));
      if(res?.status === 200){
          setModule(module.filter((mod) => mod._id !== e.key))
          message.success('module Removed');
      }else {
          message.error('An Error Occurred');
      }
   }

    const editConfirm = (e) =>{
        history.push(`editModule/${e.key}`)
    }

    const SingleModuleLook = (e) =>{
        history.push(`viewModule/${e.key}`)
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
                        <Tooltip placement="bottom" title="Delete Module">
                            <DeleteFilled/>
                        </Tooltip>
                    </Popconfirm>
                    <Tooltip placement="bottom" title="Edit Module">
                        <EditFilled onClick={() => editConfirm(record)} />
                    </Tooltip>
                    <Tooltip placement="bottom" title="View Module">
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
        lab_assistant:mod.lab_assistant?.name,
        year:mod.year.slice(0, 4),
        semester:mod.semester
    }));

    const newModule = () =>{
        history.push('createModule')
    }

    return(
        <div>
            {loading ? 
                <>
                    <Skeleton active/>
                    <Skeleton active/>
                    <Skeleton active/>
                </>
            :
            <>
                <Table columns={columns} dataSource={data}/>
                <Tooltip title="Create New Module">
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<PlusOutlined />}
                        size='large'
                        className="fabBtn"
                        onClick={newModule}
                    />
                </Tooltip>
            </>
}
        </div>
    )
}

export default ModuleTable;