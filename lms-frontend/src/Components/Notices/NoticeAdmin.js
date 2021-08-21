import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import './NoticeAdmin.css';
import {Button, Tooltip, message } from 'antd';
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

    const noticeData = useSelector((state) => state);
    console.log(noticeData);

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


    return (
        <div className="NoticeAdmin">
            <div className="noticeCard">
                <div className="noticeContent">
                    <p className="titleText">title</p>
                    <p className="dateText">date</p>
                    <p className="messageText">messages</p>
                    <p className="contactText">inquiries</p>
                </div>
                <div className="buttonWrap">
                    
                    <button className="editBtn" type="submit">
                        Edit 
                        <EditFilled className="editIcon" />
                    </button>
                    <button className="deleteBtn" type="submit">
                        Delete
                        <DeleteFilled className="deleteIcon" />
                    </button>
                </div>
                
            </div>

            <a href="/addNoticeForm">
                <Tooltip title="Add New Notice">
                    <Button type="primary" shape="circle" icon={<PlusOutlined />} size='large' className="fabBtn" />
                </Tooltip>
            </a>
            
        </div>
    )
}

export default NoticeAdmin;
