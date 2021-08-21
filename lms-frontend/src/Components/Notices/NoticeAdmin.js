import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Table, Button, Tooltip, message, Space, Popconfirm } from 'antd';
import {DeleteFilled, EditFilled, PlusOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router';
import { getNotices, removeNotice } from '../../actions/Notices';


const NoticeAdmin = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [notice, setNotice] = useState([]);

    useEffect(() => {
        dispatch(getNotices());
    },[dispatch]);

    const noticeData = useSelector((state) => state.NoticeReducer.notices);
    console.log(noticeData);
    //setNotice(noticeData)
    //const {id, title, date, messages, inquiries} = noticeData[0];

     useEffect( ()=>{
         setNotice(noticeData)
     }, [noticeData])

   const deleteConfirm = async (e) =>{
        const res = await dispatch(removeNotice(e.key));
        console.log(res)
        if(res?.status === 200){
            setNotice(notice.filter((mod) => mod._id !== e.key))
            message.success('Notice Removed');
        }else {
            message.error('An Error Occurred');
        }
   }

   const editConfirm = (e) => {
       history.push(`editNotice/${e.key}`);
   }

    const columns = [
       {
           title: 'Title',
           dataIndex: 'title',
           key: 'name',
       },
       {
           title: 'Date',
           dataIndex: 'createdOn',
           key: 'createdOn',
       },
       {
           title: 'Message',
           dataIndex: 'description',
           key: 'description',
       },
    //    {
    //        title: 'Inquiries',
    //        dataIndex: 'inquiries',
    //        key: 'inquiries',
    //    },
       {
           title: 'Action',
           key: 'action',
           render: (text, record) => (
               <Space size="middle">
                   <Popconfirm
                        title="Do you want to delete this notice?"
                        onConfirm={() => deleteConfirm(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip placement="bottom" title="Delete Notice">
                            <DeleteFilled/>
                        </Tooltip>
                    </Popconfirm>  
                    <Tooltip placement="bottom" title="Edit Notice">
                        <EditFilled onClick={() => editConfirm(record)} />
                    </Tooltip>
               </Space>
           ),
       },
   ];

    const data = notice?.map((mod) => ({
       key: mod._id,
       title: mod.title,
       createdOn: mod.createdOn,
       description: mod.description,
       //inquiries: mod.inquiries
   }));

   const newNotice = () => {
       history.push('addNoticeForm')
   }


    return (
        <div className="NoticeAdmin">
            <Table columns={columns} dataSource={data} /> 
            
            <Tooltip title="Create New Module">
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<PlusOutlined />}
                        size='large'
                        className="fabBtn"
                        onClick={newNotice}
                    />
            </Tooltip>
        </div>
    )
}

export default NoticeAdmin;
