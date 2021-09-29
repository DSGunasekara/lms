import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewDiscussion } from "../../actions/discussion";

const CreateDiscussion = () => {
  const dispatch = useDispatch();

  const [discussionData, setDiscussionData] = useState({
    topic: "",
    question: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passData = {
      topic: discussionData.topic,
      question: discussionData.question,
    };

    const res = await dispatch(createNewDiscussion({ ...passData }));
    setDiscussionData({ topic: "", question: "" });
  };

  return (
    <div className={"container"}>
      <h1 className="display-5 text-center my-5" fw-bold text-white>
        Create Discussion
      </h1>
      <form className="rounded border p-5 bg-light w-75 d-flex flex-column mx-auto mb-4">
        <div>
          <div className="mb-3 col">
            <label htmlFor="topicLabel" className="form-label">
              Topic
            </label>
            <input
              type="text"
              className="form-control"
              id="topicLabel"
              value={discussionData.topic}
              onChange={(e) =>
                setDiscussionData({ ...discussionData, topic: e.target.value })
              }
            />
          </div>
          <div className="mb-3 col">
            <label htmlFor="questionLabel" className="form-label">
              Question
            </label>
            <input
              type="textArea"
              className="form-control"
              id="questionLabel"
              value={discussionData.question}
              onChange={(e) =>
                setDiscussionData({
                  ...discussionData,
                  question: e.target.value,
                })
              }
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Post to Forum
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDiscussion;
