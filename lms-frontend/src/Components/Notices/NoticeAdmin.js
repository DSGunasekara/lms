import React from 'react';
import './NoticeAdmin.css';
import {DeleteFilled, EditFilled, PlusOutlined} from '@ant-design/icons';
import { Tooltip, Button } from 'antd';

const NoticeAdmin = () => {
    return (
        <div className="NoticeAdmin">
            <div className="noticeCard">
                <div className="noticeContent">
                    <p className="titleText">Title</p>
                    <p className="dateText">Date</p>
                    <p className="messageText">Message Message Message Message Message Message Message Message Message</p>
                    <p className="contactText">For inquiries</p>
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
