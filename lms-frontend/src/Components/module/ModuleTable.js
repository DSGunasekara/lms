import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModules, removeModule } from "../../actions/Modules";
import { getUser, updateUser } from "../../actions/Users";
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
  Row,
  Col,
  Input,
  DatePicker,
} from "antd";
import {
  DeleteFilled,
  EditFilled,
  EyeFilled,
  PlusOutlined,
  ClearOutlined,
  SearchOutlined,
  ExportOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";
import moment from "moment";
import { ROLES } from "../../constants/constant";
import { report } from "../Reports/Report";
import ModulesImage from "../../Images/modules.png";

const ModuleTable = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [module, setModule] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [SearchModuleCode, setSearchModuleCode] = useState("");
  const [searchLec, setSearchLec] = useState("");
  const [searchAssist, setSearchAssist] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [open, setOpen] = useState(["0"]);
  const [moduleFilter, setModuleFilter] = useState([]);

  useEffect(() => {
    setLoading(true);
    dispatch(getModules());
  }, [dispatch]);

  const moduleData = useSelector((state) => state.ModuleReducer.modules);

  useEffect(() => {
    getUserData(JSON.parse(localStorage.getItem("profile"))?.payload.user?._id);
  }, []);

  const getUserData = async (id) => {
    setLoading(true);
    const res = await dispatch(getUser(id));
    setUser(res);
    setLoading(false);
  };

  useEffect(() => {
    if (user?.role === ROLES.STUDENT) {
      function search(module) {
        return Object.keys(this).every(
          (key) => module._id !== this[key].module._id
        );
      }
      const data = module?.filter(search, user?.modules);
      setModule(data);
      setModuleFilter(data);
    } else {
      setModule(moduleData);
      setModuleFilter(moduleData);
      if (moduleData) {
        setLoading(false);
      }
    }
  }, [moduleData, user]);

  const deleteConfirm = async (e) => {
    const res = await dispatch(removeModule(e.key));
    if (res?.status === 200) {
      setModule(module.filter((mod) => mod._id !== e.key));
      setModuleFilter(module.filter((mod) => mod._id !== e.key));
      message.success("module Removed");
    } else {
      message.error("An Error Occurred");
    }
  };

  const editConfirm = (e) => {
    history.push(`editModule/${e.key}`);
  };

  const SingleModuleLook = (e) => {
    history.push(`viewModule/${e.key}`);
  };

  const enroll = async (e) => {
    const res = await dispatch(
      updateUser({
        id: user?._id,
        ...user,
        modules: [...user?.modules, { module: e.key }],
      })
    );
    if (res.status === 200) {
      message.success("Enrolled Successfully");
      setModule(module.filter((mod) => mod._id !== e.key));
      setModuleFilter(module.filter((mod) => mod._id !== e.key));
    } else {
      message.error("An Error Occurred");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Module Code",
      dataIndex: "module_code",
      key: "module_code",
    },
    {
      title: "Lecture In Charge",
      dataIndex: "lecture_in_charge",
      key: "lecture_in_charge",
    },
    {
      title: "Lab Assistant",
      dataIndex: "lab_assistant",
      key: "lab_assistant",
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
      title: "Credits",
      dataIndex: "credit",
      key: "credit",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {user?.role === ROLES.ADMIN ? (
            <>
              <Popconfirm
                title="Are you sure to delete this Module?"
                onConfirm={() => deleteConfirm(record)}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip placement="bottom" title="Delete Module">
                  <DeleteFilled />
                </Tooltip>
              </Popconfirm>
              <Tooltip placement="bottom" title="Edit Module">
                <EditFilled onClick={() => editConfirm(record)} />
              </Tooltip>
              <Tooltip placement="bottom" title="View Module">
                <EyeFilled onClick={() => SingleModuleLook(record)} />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip placement="bottom" title="View Module">
                <EyeFilled onClick={() => SingleModuleLook(record)} />
              </Tooltip>
              <Popconfirm
                title="Are you sure to enroll to this Module?"
                onConfirm={() => enroll(record)}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip placement="bottom" title="Enroll">
                  <ExportOutlined />
                </Tooltip>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];
  const data = moduleFilter?.map((mod) => ({
    key: mod._id,
    name: mod.name,
    module_code: mod.module_code,
    lecture_in_charge: mod.lecture_in_charge?.name,
    lab_assistant: mod.lab_assistant?.name,
    year: mod.year.slice(0, 4),
    semester: mod.semester,
    credit: mod.credit,
  }));

  const newModule = () => {
    history.push("createModule");
  };

  const header = {
    paddingLeft: 10,
    fontWeight: "bold",
    paddingTop: 25,
    paddingBottom: 15,
    color: "#1890ff",
  };

  const { Panel } = Collapse;

  const headData = columns?.map((col) => col?.title);
  headData.pop();
  const bodyData = data?.map((col) => [
    col.name,
    col.module_code,
    col.lecture_in_charge,
    col.lab_assistant,
    col.year,
    col.semester,
    col.credit,
  ]);

  const search = () => {
    if (
      searchAssist ||
      searchLec ||
      searchName ||
      searchYear ||
      SearchModuleCode
    ) {
      let query = {};

      if (searchName) {
        query = {
          ...query,
          name: searchName,
        };
      }
      if (SearchModuleCode) {
        query = {
          ...query,
          module_code: SearchModuleCode,
        };
      }
      let nameFil = {};
      if (searchLec) {
        nameFil = {
          ...nameFil,
          lecture_in_charge: {
            name: searchLec,
          },
        };
      }
      if (searchAssist) {
        nameFil = {
          ...nameFil,
          lab_assistant: {
            name: searchAssist,
          },
        };
      }
      if (searchYear) {
        query = {
          ...query,
          year: moment(searchYear).year().toString(),
        };
      }
      function searchFun(module) {
        return Object.keys(this).every((key) =>
          module[key].toLowerCase().includes(this[key].toLowerCase())
        );
      }
      function nameSearchFun(module) {
        return Object.keys(this).every((key) =>
          module[key].name
            ?.toLowerCase()
            .includes(this[key].name?.toLowerCase())
        );
      }

      let result = module?.filter(searchFun, query);
      result = result?.filter(nameSearchFun, nameFil);
      setOpen([]);
      setModuleFilter(result);
    } else {
      setOpen([]);
      setModuleFilter(module);
    }
  };

  const clear = () => {
    setSearchAssist("");
    setSearchLec("");
    setSearchName("");
    setSearchModuleCode("");
    setSearchYear("");
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
              <h3 className={"headerTitle"}>Modules</h3>
            </div>
            <div className={"imageDiv"}>
              <img
                className={"imageStyle"}
                src={ModulesImage}
                alt="ModulesImage"
              />
            </div>
          </div>

          <Collapse
            style={{ marginBottom: 50 }}
            activeKey={open}
            onChange={() => setOpen(open === "" ? [] : ["0"])}
          >
            <Panel header="Search Modules">
              <Row>
                <Col span={6} style={{ margin: "10px" }}>
                  <Input
                    placeholder="Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </Col>
                <Col span={6} style={{ margin: "10px" }}>
                  <Input
                    placeholder="Module Code"
                    value={SearchModuleCode}
                    onChange={(e) => setSearchModuleCode(e.target.value)}
                  />
                </Col>
                <Col span={6} style={{ margin: "10px" }}>
                  <Input
                    placeholder="Lecture In Charge"
                    value={searchLec}
                    onChange={(e) => setSearchLec(e.target.value)}
                  />
                </Col>
                <Col span={6} style={{ margin: "10px" }}>
                  <Input
                    placeholder="Lab Assistant"
                    value={searchAssist}
                    onChange={(e) => setSearchAssist(e.target.value)}
                  />
                </Col>
                <Col span={6} style={{ margin: "10px" }}>
                  <DatePicker
                    style={{ width: "100%" }}
                    picker="year"
                    value={searchYear}
                    onChange={(e) => setSearchYear(e)}
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

          <Button
            onClick={() => report(headData, bodyData, "Module Data")}
            style={{
              marginBottom: 10,
              marginRight: 5,
              display: "block",
              marginLeft: "auto",
            }}
          >
            <DownloadOutlined />
            Download Module Report
          </Button>

          <Table columns={columns} dataSource={data} />
          {user?.role === ROLES.ADMIN ?
          
          <Tooltip title="Create New Module">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              size="large"
              className="fabBtn"
              style={{ position: "fixed" }}
              onClick={newModule}
            />
          </Tooltip>
          : ''}
        </>
      )}
    </div>
  );
};

export default ModuleTable;
