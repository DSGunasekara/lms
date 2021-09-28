import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getDiscussions, removeDiscussion } from '../../actions/discussion';
import { Table, Button, Tooltip, message, Space, Popconfirm, Skeleton } from 'antd';
import {DeleteFilled, EditFilled, PlusOutlined} from '@ant-design/icons';
import Card from './Card';
import DiscussImage from '../../Images/discuss.png';

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

    //style objects
    const headerDiv = {
        width: "100%",
        height: "20%",
        background: "#001529",
        color: "white",
        display: "flex",
    }

    const headerTitle = {
        color: "white",
        fontFamily: 'Besley',
    }

    const imageStyle = {
        height: 150,
        width: 175
    }

    const imageDiv = {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "end",
        width: '50%',
        marginTop: '20px',
        marginBottom: '20px',
        marginRight: '100px'
    } 

    const headerDescription = {
        width: "50%",
        marginTop: '35px',
        marginLeft: '75px'
    }

    const buttonStyle = {
        width: "200px",
        height: "50px",
        borderRadius: "10px",
        marginTop: "20px",
        marginBottom: "20px"
    }

    const cardDivMain = {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px"
    }

    const cardDiv = {
        width: "80%",  
    }
                       
    return (
        <div>
            <div style={headerDiv}>
                <div style={headerDescription}>
                    <h3 style={headerTitle}>Module Forum</h3>
                    <p>Please post your questions related to the module here</p>
                    <Button type="primary" style={buttonStyle} onClick={newDiscussion}>Create new discussion</Button>
                </div>
                <div style={imageDiv}>
                    <img src={DiscussImage} alt="DiscussImage" style={imageStyle} />
                </div>
            </div>
            <div style={cardDivMain}>
                {discussion?.map((discuss) => (
                    <div key={discuss._id} style={cardDiv}>
                        <Card discuss={discuss} deleteDis={deleteConfirm}  />
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default ViewForum;
