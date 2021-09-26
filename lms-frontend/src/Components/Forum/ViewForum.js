import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getDiscussions, removeDiscussion } from '../../actions/discussion';
import { Table, Button, Tooltip, message, Space, Popconfirm, Skeleton } from 'antd';
import {DeleteFilled, EditFilled, PlusOutlined} from '@ant-design/icons';
import Card from './Card';

const ViewForum = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [discussion, setDiscussion] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch (getDiscussions());
    }, [dispatch]);

    const discussionData = useSelector((state) => state.DiscussionReducer.discussions);
    console.log(discussionData);

    useEffect(() => {
        setDiscussion(discussionData);
        if(discussionData) {
            setLoading(false);
        }
    }, [discussionData]);

    const newDiscussion = () => {
        history.push('createDiscussion')
    }

    const deleteConfirm = async (id) =>{
        const res = await dispatch(removeDiscussion(id));
        if(res?.status === 200){
            setDiscussion(discussion.filter((mod) => mod._id !== id))
            message.success('Discussion Removed');
        }else {
            message.error('An Error Occurred');
        }
    }

    const editConfirm = (e) => {
        history.push(`editNotice/${e.key}`);
    }
                   
          
    return (
        <div>
            <div className="ViewForum">
                <button onClick={newDiscussion}>Add new</button>
                {discussion?.map((discuss) => (
                    <div key={discuss._id}>
                        <Card discuss={discuss} deleteDis={deleteConfirm} />
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default ViewForum;
