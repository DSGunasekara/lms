import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { getSingleDiscussion, updateSingleDiscussion, removeDiscussion } from '../../actions/discussion';
import { Button, Tooltip, Card, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import AddReply from './AddReply';
import { getUser } from '../../actions/Users';



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
        console.log(discussion)
    }

    const addReply = async(data) => {
        const res = await dispatch(updateSingleDiscussion({id: id, ...discussion, replies:[...discussion.replies, {text:data, postedBy: user?._id}]}))
        fetchDiscussion(id);
        setIsReply(false)
        console.log(res);
    }

    const handleDelete = async (e) => {
        console.log(e)
        // const res = await dispatch(removeDiscussion(e._id));
        const reply = discussion?.replies.filter(reply => reply._id !== e._id)
        // console.log(temp);
        const res = await dispatch(updateSingleDiscussion({id: id, ...discussion, replies:[...reply]}))
        fetchDiscussion(id);
    }

    return (
        <div>
            <Card>
                <div>
                    <p>{discussion.topic}</p>
                    <p>{discussion.question}</p>
                    <p>{moment(discussion.date).format('YYYY-MM-DD')}</p>
                    <p>{moment(discussion.date).format('HH:mm')}</p>
                    
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        size='large'
                        onClick={handleReply}
                    />         
                </div>
            </Card>

            <div>
                {isReply? <AddReply addReply={addReply} />: ''}
            </div>
            <div>
                {discussion.replies?.map((reply, index)=>(
                    <Card key={index}>
                        <p>{reply.text}</p>
                        <p>{reply?.postedBy?.name}</p>
                        <p>{moment(reply?.createdAt).format('YYYY-MM-DD')}</p>
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
