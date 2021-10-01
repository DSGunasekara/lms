import { message } from "antd";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewDiscussion } from "../../actions/discussion";
import { getModules } from "../../actions/Modules";

let option_module = [];

const CreateDiscussion = () => {
  const dispatch = useDispatch();

  const [discussionData, setDiscussionData] = useState({
    topic: "",
    question: "",
    modulename: undefined,
  });

  useEffect(() => {
    dispatch(getModules());
  }, [dispatch]);

  const moduleData = useSelector((state) => state.ModuleReducer.modules);

  option_module = moduleData?.map((mod) => ({
    value: mod._id,
    label: mod.name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passData = {
      topic: discussionData.topic,
      question: discussionData.question,
      modulename: discussionData.modulename,
    };
    const res = await dispatch(createNewDiscussion({ ...passData }));
    setDiscussionData({ topic: "", question: "", modulename: undefined });
    if (res.status === 200) {
      message.success("Discussion Created Successfully");
    } else {
      message.error("Oops! Something went wrong ");
    }
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
              value={discussionData.topic || ""}
              onChange={(e) =>
                setDiscussionData({ ...discussionData, topic: e.target.value })
              }
            />
          </div>
          <div className="mb-3 col">
            <label htmlFor="option_module" className="form-label">
              Module
            </label>
            <Select
              name="option_module"
              options={option_module}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e) =>
                setDiscussionData({ ...discussionData, modulename: e.value })
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
              value={discussionData.question || ""}
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
