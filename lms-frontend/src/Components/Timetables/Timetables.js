import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/Users";
import { getTimetables, deleteTimetable } from "../../actions/timetables";
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
  PlusOutlined,
  DownloadOutlined,
  BulbFilled,
} from "@ant-design/icons";
import { useHistory } from "react-router";
import { ROLES } from "../../constants/constant";
import TimetableImage from "../../Images/timetable.png"

export default function Timetables() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState();
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getTimetables());
  }, [dispatch]);

  const timetableData = useSelector(
    (state) => state.TimetableReducer.timetables
  );

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile"))?.payload.user?._id);
  }, []);

  useEffect(() => {
    setTimetable(timetableData);
    if (timetableData) {
      setLoading(false);
    }
  }, [timetableData]);

  const deleteConfirm = async (e) => {
    const res = await dispatch(deleteTimetable(e.key));
    if (res?.status === 200) {
      setTimetable(timetable.filter((timetable) => timetable._id !== e.key));
      message.success("Timetable deleted successfully");
    } else {
      message.error("Delete Error");
    }
  };

  const editConfirm = (e) => {
    history.push(`timetables/edit/${e.key}`);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
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
          {user?.role === ROLES.ADMIN ? (
            <>
              <Popconfirm
                title="Are you sure to delete this timetable?"
                onConfirm={() => deleteConfirm(record)}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip placement="bottom" title="Delete Timetable">
                  <DeleteFilled />
                </Tooltip>
              </Popconfirm>
              <Tooltip placement="bottom" title="Edit Timetable">
                <EditFilled onClick={() => editConfirm(record)} />
              </Tooltip>
            </>
          ) : (
            ""
          )}
          <Tooltip placement="bottom" title="Download Timetable">
            <DownloadOutlined
              onClick={() =>
                window.open(`http://localhost:5000/${record.filePath}`)
              }
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data = timetable?.map((timetable) => ({
    key: timetable._id,
    title: timetable.title,
    year: timetable.year,
    semester: timetable.semester,
    filePath: timetable.filePath,
    description: timetable.description,
  }));

  const newTimetable = () => {
    history.push("/timetables/add");
  };

  const header = {
    paddingLeft: 10,
    fontWeight: "bold",
    paddingTop: 25,
    paddingBottom: 15,
    color: "#1890ff",
  };

  return (
    <div className="container-timetable">
      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          <h3 style={header}>Timetables</h3>
          <Table columns={columns} dataSource={data} />
          <Tooltip title="Add Timetable">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              size="large"
              className="fabBtn"
              style={{position: 'fixed'}}
              onClick={newTimetable}
            />
          </Tooltip>
        </>
      )}
    </div>
  );
}
