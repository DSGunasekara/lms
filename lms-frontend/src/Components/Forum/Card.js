import React from 'react';
import { Button, Tooltip, Card, Popconfirm } from 'antd';
import { FolderOpenOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { removeDiscussion } from '../../actions/discussion';
import moment from 'moment';


const CardItem = ({ discuss , deleteDis }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const topicStyle = {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Besley',
        padding: 0,
        margin: 0
    }

    const cardStyle = {
        width: '100%',
        padding: 0,
    }

    const cardContent = {
        display: "flex",
        flexDirection: "row",
        padding: 0,
        margin : 0
    }

    const dateStyle = {
        fontSize: 10
    }

    const timeStyle = {
        fontSize: 10,
        paddingLeft: 5
    }

    const dateDiv = {
        display: 'flex',
    }

    const cardButtons = {
        display: "flex",
        
    }

    const cardTopic = {
        width: "30%",
        // background: "#4EA699"
        //background: "#3E5C76"
        background: "#278ea5",
        color: "white"
    }

    const cardDescription = {
        width: "70%",
        background: "white",
        bordered: true,
        border: '1px solid #98d1d9',
    }

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
        <div>
            <div style={cardStyle}>
                <div style={cardContent}>
                    <div style={cardTopic}>
                        <p style={topicStyle}>{discuss.topic}</p>
                        <div style={dateDiv}>
                            <p style={dateStyle}>{moment(discuss.date).format('YYYY-MM-DD')}</p>
                            <p style={timeStyle}>{moment(discuss.date).format('HH:mm')}</p>
                        </div>
                    </div>
                    <div style={cardDescription}>
                        <p>{discuss.question}</p>
                        <div style={cardButtons}>
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
            </div>
        </div>
    )
}

export default CardItem;
