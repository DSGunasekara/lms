import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, removeEvent } from "../../actions/Events";
import "antd/dist/antd.css";
import {
  Table,
  Space,
  Button,
  Tooltip,
  message,
  Popconfirm,
  Skeleton,
} from "antd";
import {
  DeleteFilled,
  EditFilled,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";
import moment from "moment";
import EventImage from "../../Images/events.png";
import { report } from "../Reports/Report";

const EventAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getEvents());
  }, [dispatch]);

  const eventData = useSelector((state) => state.EventReducer.events);

  useEffect(() => {
    setEvent(eventData);
    if (eventData) {
      setLoading(false);
    }
  }, [eventData]);

  const editConfirm = (e) => {
    history.push(`editEvent/${e.key}`);
  };

  const deleteConfirm = async (e) => {
    const res = await dispatch(removeEvent(e.key));
    if (res?.status === 200) {
      setEvent(event.filter((mod) => mod._id !== e.key));
      message.success("Event Removed");
    } else {
      message.error("An Error Occurred");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Venue",
      dataIndex: "venue",
      key: "venue",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => deleteConfirm(record)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip placement="bottom" title="Delete Event">
              <DeleteFilled />
            </Tooltip>
          </Popconfirm>
          <Tooltip placement="bottom" title="Edit Event">
            <EditFilled onClick={() => editConfirm(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ];
  const data = event?.map((mod) => ({
    key: mod._id,
    title: mod.title,
    date: moment(mod.date).format("yyyy-MM-D"),
    venue: mod.venue,
    description: mod.description,
  }));

  const newEvent = () => {
    history.push("addEvent");
  };

  const headData = columns?.map((col) => col?.title);
  headData.pop();
  const bodyData = data?.map((col) => [
    col.title,
    col.date,
    col.venue,
    col.description,
  ]);

  const header = {
    paddingLeft: 10,
    fontWeight: "bold",
    paddingTop: 25,
    paddingBottom: 15,
    color: "#1890ff",
  };

  return (
    <div>
      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          <div className={"headerDiv"}>
            <div className={"headerDescription"}>
              <h3 className={"headerTitle"}>Events</h3>
            </div>
            <div className={"imageDiv"}>
              <img
                className={"imageStyle"}
                src={EventImage}
                alt="EventsImage"
              />
            </div>
          </div>
          <Button
            onClick={() => report(headData, bodyData, "Event Data")}
            style={{
              marginBottom: 10,
              marginRight: 5,
              display: "block",
              marginLeft: "auto",
            }}
          >
            <DownloadOutlined />
            Download Events Report
          </Button>
          <Table columns={columns} dataSource={data} />
          <Tooltip title="Create New Event">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              size="large"
              className="fabBtn"
              style={{ position: "fixed" }}
              onClick={newEvent}
            />
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default EventAdmin;
