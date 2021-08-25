import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLectures, deleteLecture, } from "../../actions/lectures";
import 'antd/dist/antd.css';
import {Table, Space, Button, Tooltip, message, Popconfirm, Skeleton} from 'antd';
import {DeleteFilled, EditFilled, PlusOutlined, DownloadOutlined} from '@ant-design/icons';
import {useHistory} from "react-router";

export default function Lectures(){

    const dispatch = useDispatch();
    const history = useHistory();

    const [lecture, setLecture] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        dispatch(getLectures());
    }, [dispatch])

    const lectureData = useSelector((state) => state.LectureReducer.lectures);

    useEffect(() => {
        setLecture(lectureData)
        if(lectureData){
            setLoading(false)
        }
    }, [lectureData])

    const deleteConfirm = async (e) =>{
        const res = await dispatch(deleteLecture(e.key));
        if(res?.status === 200){
            setLecture(lecture.filter((lec) => lec._id !== e.key))
            message.success('Lecture deleted successfully');
        }else {
            message.error('Delete Error');
        }
     }

    const editConfirm = (e) =>{
        history.push(`editLecture/${e.key}`)
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Module Code',
            dataIndex: 'module_code',
            key: 'module_code',

        },
        {
            title: 'Week',
            dataIndex: 'week',
            key: 'week',

        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',

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
                        <Tooltip placement="bottom" title="Delete Lecture">
                            <DeleteFilled/>
                        </Tooltip>
                    </Popconfirm>
                    <Tooltip placement="bottom" title="Edit Lecture">
                        <EditFilled onClick={() => editConfirm(record)} />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Download Lecture">
                        <DownloadOutlined onClick={() => window.open(`http://localhost:5000/${record.filePath}`)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];
    const data = lecture?.map((lec) =>({
        key: lec._id,
        title: lec.title,
        module_code: lec.module_code,
        week: lec.week,
        filePath:lec.filePath,
        description:lec.description
    }));

    const newLecture= () =>{
        history.push('/lecture/add')
    }

    const header = {
        paddingLeft: 10,
        fontFamily: 'Besley',
        fontWeight: 'bold',
        paddingTop: 25,
        paddingBottom: 15
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
                <h3 style={header}>Lectures</h3>
                <Table columns={columns} dataSource={data}/>
                <Tooltip title="Add Lecture">
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<PlusOutlined />}
                        size='large'
                        className="fabBtn"
                        onClick={newLecture}
                    />
                </Tooltip>
            </>
            }
        </div>
    )
}
