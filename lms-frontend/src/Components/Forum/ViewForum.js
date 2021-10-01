import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getDiscussions, removeDiscussion } from '../../actions/discussion';
import { Button, message, Row, Col, Input, Collapse } from 'antd';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import Card from './Card';
import './ViewForum.css';
import DiscussImage from '../../Images/discuss.png';

const ViewForum = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [discussion, setDiscussion] = useState([]);
  const [discussionFilter, setDiscussionFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(["0"]);
  const [searchModule, setSearchModule] = useState("");
  
  const { Panel } = Collapse;

  useEffect(() => {
    setLoading(true);
    dispatch(getDiscussions());
  }, [dispatch]);

  const discussionData = useSelector((state) => state.DiscussionReducer.discussions);
  
  useEffect(() => {
    setDiscussion(discussionData);
    setDiscussionFilter(discussionData);
    if (discussionData) {
      setLoading(false);
    }
  }, [discussionData]);

  const newDiscussion = () => {
    history.push("createDiscussion");
  };


  const deleteConfirm = async (id) =>{
      const res = await dispatch(removeDiscussion(id));
      if(res?.status === 200){
          setDiscussion(discussion.filter((mod) => mod._id !== id))
          setDiscussionFilter(discussion.filter((mod) => mod._id !== id))
          message.success('Discussion Removed');
      }else {
          message.error('An Error Occurred');
      }
  }

  const search = () => {
    if (searchModule) {
      let data = discussionFilter?.filter(dis => dis.modulename.name.includes(searchModule));
      setOpen([]);
      setDiscussionFilter(data);
    } else {
      setOpen([]);
      setDiscussionFilter(discussion);
    }
  };

  const clear = () => {
    setSearchModule("");
  };

                       
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
      <Collapse
            style={{ marginBottom: 50 }}
            activeKey={open}
            onChange={() => setOpen(open === "" ? [] : ["0"])}
          >
            <Panel header="Search Forums Materials">
              <Row>
                <Col span={6} style={{ margin: "10px" }}>
                  <Input
                    placeholder="Module Code"
                    value={searchModule}
                    onChange={(e) => setSearchModule(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  span={17}
                  style={{ margin: "10px" }}
                  onClick={() => clear()}
                >
                  <Button type="secondary" icon={<ClearOutlined />}>
                    Clear All
                  </Button>
                </Col>
                <Col span={6} style={{ margin: "10px" }}>
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={() => search()}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Panel>
          </Collapse>
      <div className={"cardDivMain"}>
        {discussionFilter?.map((discuss) => (
            <div key={discuss._id} className={"cardDiv"}>
                <Card discuss={discuss} deleteDis={deleteConfirm}  />
            </div>
        ))}
      </div>
    </div>
      
  )
}

export default ViewForum;
