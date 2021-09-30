import React, { useEffect, useState } from "react";
import { getUser } from "../../actions/Users";
import { useDispatch, useSelector } from "react-redux";
import { getLectures, deleteLecture } from "../../actions/lectures";
import "antd/dist/antd.css";
import {
  Table,
  Space,
  Button,
  Tooltip,
  message,
  Popconfirm,
  Skeleton,
  Collapse,
  Input,
  Row,
  Col,
  Select,
} from "antd";
import {
  DeleteFilled,
  EditFilled,
  PlusOutlined,
  DownloadOutlined,
  ClearOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";
import { ROLES } from "../../constants/constant";
import LectureImage from "../../Images/lecturess.png"

export default function Lectures() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { Option } = Select;
  const { Panel } = Collapse;

  const [lecture, setLecture] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [searchModule, setSearchModule] = useState("");
  const [searchType, setSearchType] = useState("");
  const [lectureTypeFilter, setLectureTypeFilter] = useState([]);
  const [open, setOpen] = useState(["0"]);

  useEffect(() => {
    setLoading(true);
    dispatch(getLectures());
  }, [dispatch]);

  const lectureData = useSelector((state) => state.LectureReducer.lectures);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile"))?.payload.user?._id);
  }, []);

  useEffect(() => {
    setLecture(lectureData);
    setLectureTypeFilter(lectureData);
    if (lectureData) {
      setLoading(false);
    }
  }, [lectureData]);

  const deleteConfirm = async (e) => {
    const res = await dispatch(deleteLecture(e.key));
    if (res?.status === 200) {
      setLecture(lecture.filter((lec) => lec._id !== e.key));
      message.success("Lecture deleted successfully");
    } else {
      message.error("Delete Error");
    }
  };

  const editConfirm = (e) => {
    history.push(`lecture/edit/${e.key}`);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Module Code",
      dataIndex: "module_code",
      key: "module_code",
    },
    {
      title: "Week",
      dataIndex: "week",
      key: "week",
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
                title="Are you sure to delete this lecture?"
                onConfirm={() => deleteConfirm(record)}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip placement="bottom" title="Delete Lecture">
                  <DeleteFilled />
                </Tooltip>
              </Popconfirm>
              <Tooltip placement="bottom" title="Edit Lecture">
                <EditFilled onClick={() => editConfirm(record)} />
              </Tooltip>
              <Tooltip placement="bottom" title="Download Lecture">
                <DownloadOutlined
                  onClick={() =>
                    window.open(`http://localhost:5000/${record.filePath}`)
                  }
                />
              </Tooltip>
            </>
          ) : (
            ""
          )}
        </Space>
      ),
    },
  ];

  const data = lectureTypeFilter?.map((lec) => ({
    key: lec._id,
    title: lec.title,
    type: lec.type,
    module_code: lec.module_code,
    week: lec.week,
    filePath: lec.filePath,
    description: lec.description,
  }));

  const newLecture = () => {
    history.push("/lecture/add");
  };

  const header = {
    paddingLeft: 10,
    fontWeight: "bold",
    paddingTop: 25,
    paddingBottom: 15,
    color: "#1890ff",
  };

  const search = () => {
    if (searchModule || searchType) {
      let query = {};

      if (searchModule) {
        query = {
          ...query,
          module_code: searchModule,
        };
      }
      let typeQuery = {};
      if (searchType) {
        typeQuery = {
          ...typeQuery,
          type: searchType,
        };
      }

      function searchFun(module) {
        return Object.keys(this).every((key) =>
          module[key].toLowerCase().includes(this[key].toLowerCase())
        );
      }

      function searchTypeFun(type) {
        return Object.keys(this).every(
          (key) => type[key].toLowerCase() === this[key].toLowerCase()
        );
      }

      let data = lecture?.filter(searchFun, query);
      data = data?.filter(searchTypeFun, typeQuery);

      setOpen([]);
      setLectureTypeFilter(data);
    } else {
      setOpen([]);
      setLectureTypeFilter(lecture);
    }
  };
  const clear = () => {
    setSearchModule("");
    setSearchType("");
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
                <h3 className={"headerTitle"}>Lectures</h3>
            </div>
            <div className={"imageDiv"}>
                <img className={"imageStyle"} src={LectureImage} alt="LecturesImage" />
            </div>
          </div>
          <Collapse
            style={{ marginBottom: 50 }}
            activeKey={open}
            onChange={() => setOpen(open === "" ? [] : ["0"])}
          >
            <Panel header="Search Lecture Materials">
              <Row>
                <Col span={6} style={{ margin: "10px" }}>
                  <Input
                    placeholder="Module Code"
                    value={searchModule}
                    onChange={(e) => setSearchModule(e.target.value)}
                  />
                </Col>
                <Col span={6} style={{ margin: "10px" }}>
                  <Select
                    value={searchType}
                    style={{ width: "100%" }}
                    onChange={(e) => setSearchType(e)}
                  >
                    <Option value="">All</Option>
                    <Option value="Lecture">Lectures</Option>
                    <Option value="Labs">Labs</Option>
                    <Option value="Tutorial">Tutorial</Option>
                  </Select>
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
          <Table columns={columns} dataSource={data} />
          <Tooltip title="Add Lecture">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              size="large"
              className="fabBtn"
              style={{position: 'fixed'}}
              onClick={newLecture}
            />
          </Tooltip>
        </>
      )}
    </div>
  );
}
