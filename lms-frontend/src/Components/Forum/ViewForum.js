import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getDiscussions, removeDiscussion } from '../../actions/discussion';
import { Table, Button, Tooltip, message, Space, Popconfirm, Skeleton } from 'antd';
import {DeleteFilled, EditFilled, PlusOutlined} from '@ant-design/icons';
import Card from './Card';
import './ViewForum.css';
import DiscussImage from '../../Images/discuss.png';

const ViewForum = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [discussion, setDiscussion] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getDiscussions());
  }, [dispatch]);

  const discussionData = useSelector((state) => state.DiscussionReducer.discussions);
  
  useEffect(() => {
    setDiscussion(discussionData);
    if (discussionData) {
      setLoading(false);
    }
  }, [discussionData]);

  const data = discussion?.map((mod) => ({
    key: mod._id,
    topic: mod.topic,
    question: mod.question,
  }));

  const newDiscussion = () => {
    history.push("createDiscussion");
  };


  const deleteConfirm = async (id) =>{
      const res = await dispatch(removeDiscussion(id));
      if(res?.status === 200){
          setDiscussion(discussion.filter((mod) => mod._id !== id))
          message.success('Discussion Removed');
      }else {
          message.error('An Error Occurred');
      }
  }


                       
  return (
    <div>
      <div className={"headerDiv"}>
        <div className={"headerDescription"}>
            <h3 className={"headerTitle"}>Module Forum</h3>
            <p>Please post your questions related to the module here</p>
            <Button type="primary" className={"buttonStyle"} onClick={newDiscussion}>Create new discussion</Button>
        </div>
        <div className={"imageDiv"}>
            <img className={"imageStyle"} src={DiscussImage} alt="DiscussImage" />
        </div>
      </div>
      <div className={"cardDivMain"}>
        {discussion?.map((discuss) => (
            <div key={discuss._id} className={"cardDiv"}>
                <Card discuss={discuss} deleteDis={deleteConfirm}  />
            </div>
        ))}
      </div>
    </div>
      
  )
}

export default ViewForum;
