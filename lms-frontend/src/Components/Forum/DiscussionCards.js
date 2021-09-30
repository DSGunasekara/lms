import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getDiscussions } from "../../actions/discussion";

const DiscussionCards = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [discussion, setDiscussion] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getDiscussions());
  }, [dispatch]);

  const discussionData = useSelector(
    (state) => state.DiscussionReducer.discussions
  );

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

  return (
    <div className="DiscussionCards">
      <>
        <h3>Forum</h3>
      </>
    </div>
  );
};

export default DiscussionCards;
