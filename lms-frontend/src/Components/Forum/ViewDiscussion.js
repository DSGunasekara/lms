import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { getSingleDiscussion, updateSingleDiscussion } from '../../actions/discussion';
import { Button, Tooltip, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import AddReply from './AddReply';


const ViewDiscussion = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    let { id } = useParams();

    const [discussion, setDiscussion] = useState('');
    const [loading, setLoading] = useState(false);
    const [isReply, setIsReply] = useState(false);

    const fetchDiscussion = async (ModId) => {
        setLoading(true);
        const res = await dispatch(getSingleDiscussion(ModId));
        setDiscussion(res);
        setLoading(false);
    }
    console.log(discussion);

    useEffect(() => {
        if(id) {
            fetchDiscussion(id);
        }
    }, [id])

    const newReply = () =>{
        history.push('/addReply')
    }

    const handleReply = () => {
        setIsReply(true);
    }

    const addReply = async(data) => {
        const res = await dispatch(updateSingleDiscussion({id: id, ...discussion, replies:[...discussion.replies, {text:data}]}))
        console.log(res);
    }

    return (
        <div>
            <Card>
                <p>{discussion.topic}</p>
                <p>{discussion.question}</p>
                <p>{moment(discussion.date).format('YYYY-MM-DD')}</p>
                <p>{moment(discussion.date).format('HH:mm')}</p>
                <Tooltip title="Reply">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            size='large'
                            onClick={handleReply}
                        />
                </Tooltip>
                <div>
                    {isReply? <AddReply addReply={addReply} />: ''}
                </div>

            </Card>
            
            
        </div>
    )
}

export default ViewDiscussion;
