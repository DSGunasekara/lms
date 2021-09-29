import React from 'react';
import { Button, Tooltip, Card, Popconfirm } from 'antd';
import { FolderOpenOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import "./Card.css";



const CardItem = ({ discuss , deleteDis }) => {

    const history = useHistory();
    const dispatch = useDispatch();
    
    const singleDiscussionView = (e) => {
        console.log(e);
        history.push(`viewDiscussion/${e._id}`)
    }

    const handleDelete = async (e) => {
        // console.log(e)
        // const res = await dispatch(removeDiscussion(e._id));
        deleteDis(e._id)
    }

    
    return (
        <>
            
            <div className={"cardContent"}>
                <div className={"cardTopic"}>
                    <p className={"topicStyle"}>{discuss.topic}</p>
                    <p>{discuss?.postedBy?.name}</p>
                    <div className={"dateDiv"}>
                        <p className={"dateStyle"}>{moment(discuss.date).format('YYYY-MM-DD')}</p>
                        <p className={"timeStyle"}>{moment(discuss.date).format('HH:mm')}</p>
                    </div>
                </div>
                <div className={"cardDescription"}>
                    <p>{discuss.question}</p>
                    <div className={"cardButtons"}>
                        <Tooltip title="View Discussion">
                            <Button
                                type="link"
                                icon={<FolderOpenOutlined />}
                                size='large'
                                onClick={() => singleDiscussionView(discuss)}
                            />
                        </Tooltip>
                        <Popconfirm
                            title="Do you want to delete this discussion?"
                            onConfirm={() => handleDelete(discuss)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Tooltip title="Delete">
                                <Button
                                    type="link"
                                    icon={<DeleteOutlined />}
                                    size='large'
                                />
                            </Tooltip>
                        </Popconfirm>
                    </div>  
                </div>
            </div>
        </>    
            
    )
}

export default CardItem;
