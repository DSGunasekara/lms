import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { getSingleDiscussion, updateSingleDiscussion, removeDiscussion } from '../../actions/discussion';
import { Button, Tooltip, Card, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import AddReply from './AddReply';
import { getUser } from '../../actions/Users';
import './ViewDiscussion.css'


const ViewDiscussion = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    let { id } = useParams();

    const [user, setUser] = useState([]);
    const [discussion, setDiscussion] = useState('');
    const [loading, setLoading] = useState(false);
    const [isReply, setIsReply] = useState(false);

    const fetchDiscussion = async (ModId) => {
        setLoading(true);
        const res = await dispatch(getSingleDiscussion(ModId));
        setDiscussion(res);
        setLoading(false);
    }
    
    const getUserData = async(id)=> {
        setLoading(true)
        const res = await dispatch(getUser(id))
        setUser(res);
        setLoading(false)
    }

    useEffect(() => {
        getUserData(JSON.parse(localStorage.getItem("profile"))?.payload.user?._id)
      }, [])

    useEffect(() => {
        if(id) {
            fetchDiscussion(id);
        }
    }, [id])

    const handleReply = () => {
        setIsReply(true);
    }

    const addReply = async(data) => {
        const res = await dispatch(updateSingleDiscussion({id: id, ...discussion, replies:[...discussion.replies, {text:data, postedBy: user?._id}]}))
        fetchDiscussion(id);
        setIsReply(false)
    }

    const handleDelete = async (e) => {
        const reply = discussion?.replies.filter(reply => reply._id !== e._id)
        const res = await dispatch(updateSingleDiscussion({id: id, ...discussion, replies:[...reply]}))
        fetchDiscussion(id);
    }

    return (
        <div>
            <div className={"CardBody"}>
                <div className={"MainCard"}>
                    <p className={"DiscussionTopic"}>{discussion.topic}</p>
                    <div className={"DateTime"}>
                        <p className={"Date"}>{moment(discussion.date).format('YYYY-MM-DD')}</p>
                        <p className={"Time"}>{moment(discussion.date).format('HH:mm')}</p>
                    </div>
                    <p className={"DiscussionQuestion"}>{discussion.question}</p>
                    
                    
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        size='large'
                        onClick={handleReply}
                    />         
                </div>
            </div>

            <div className={"ReplyBox"}>
                {isReply? <AddReply addReply={addReply} />: ''}
            </div>
            <div className={"ReplyDiv"}>
                {discussion.replies?.map((reply, index)=>(
                    <Card key={index} className={"ReplyBody"}>
                        <p className={"ReplyText"}>{reply.text}</p>
                        <div className={"ReplyContent"}>
                            <p className={"ReplyPerson"}>{reply?.postedBy?.name}</p>
                            <p className={"ReplyDate"}>{moment(reply?.createdAt).format('YYYY-MM-DD')}</p>
                        </div>
                        <Button
                            type="link"
                            icon={<DeleteOutlined />}
                            size='large'
                            onClick={() => handleDelete(reply)}
                        />
                    </Card>
                ))}
            </div>
            
            
        </div>
    )
}

export default ViewDiscussion;
