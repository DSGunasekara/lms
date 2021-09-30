import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getSingleDiscussion } from "../../actions/discussion";
import { Button, Tooltip, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";

const ViewDiscussion = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  const [discussion, setDiscussion] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDiscussion = async (ModId) => {
    setLoading(true);
    const res = await dispatch(getSingleDiscussion(ModId));
    setDiscussion(res);
    setLoading(false);
  };
  console.log(discussion);

  useEffect(() => {
    if (id) {
      fetchDiscussion(id);
    }
  }, [id]);

  return (
    <div>
      <Card>
        <p>{discussion.topic}</p>
        <p>{discussion.question}</p>
        <p>{moment(discussion.date).format("YYYY-MM-DD")}</p>
        <p>{moment(discussion.date).format("HH:mm")}</p>
        <Tooltip title="Reply">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            size="large"
          />
        </Tooltip>
      </Card>
    </div>
  );
};

export default ViewDiscussion;
