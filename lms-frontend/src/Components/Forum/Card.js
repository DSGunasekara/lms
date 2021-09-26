import React from 'react';
import { Button, Tooltip, Card } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import moment from 'moment';


const CardItem = ({ discuss }) => {

    const history = useHistory();

    const topicStyle = {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Besley',
        padding: 0,
        margin: 0
    }

    const cardStyle = {
        width: '75%',
        bordered: true,
        border: '1px solid #98d1d9'
    }

    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 15
    }

    const buttonStyle = {
        background: '#278ea5'
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

    const singleDiscussionView = (e) => {
        console.log(e);
        history.push(`viewDiscussion/${e._id}`)
    }


    return (
        <div style={divStyle}>
            <Card style={cardStyle}>
                <p style={topicStyle}>{discuss.topic}</p>
                <div style={dateDiv}>
                    <p style={dateStyle}>{moment(discuss.date).format('YYYY-MM-DD')}</p>
                    <p style={timeStyle}>{moment(discuss.date).format('HH:mm')}</p>
                </div>
                <p>{discuss.question}</p>
                
                <Tooltip title="View Discussion">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<FolderOpenOutlined />}
                            size='large'
                            style={buttonStyle}
                            onClick={() => singleDiscussionView(discuss)}
                        />
                </Tooltip>
            </Card>
        </div>
    )
}

export default CardItem;
