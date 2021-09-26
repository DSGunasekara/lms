import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSingleModule } from "../../actions/Modules";
import { getLectures } from "../../actions/lectures";

import {
  Row,
  Col,
  Layout,
  Avatar,
  Tag,
  Divider,
  Skeleton,
  Tooltip,
  Button,
  PageHeader,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  SettingOutlined,
  ReadOutlined,
  UngroupOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";

let lectureFilter = [];

const SingleModule = () => {
  const { Sider, Content } = Layout;

  const dispatch = useDispatch();
  let { id } = useParams();

  const [module, setModule] = useState("");
  const [loading, setLoading] = useState(false);

  const [lec, setLec] = useState([]);

  const [state, setState] = useState([]);

  const fetchModule = async (ModId) => {
    setLoading(true);
    const res = await dispatch(getSingleModule(ModId));
    setModule(res);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getLectures());
  }, [dispatch]);

  const lectureData = useSelector((state) => state.LectureReducer.lectures);

  lectureFilter = lectureData?.filter((lec) => {
    return lec.module_code === module.module_code;
  });

  useEffect(() => {
    setLec(
      lectureData?.filter((lec) => {
        return lec.module_code === module.module_code;
      })
    );
  }, [lectureData, module.module_code]);

  const manageLectures = (arr) => {
    const groupBy = (array, key) => {
      return array?.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, {});
    };
    let result = [];
    result = groupBy(arr, "week");

    let newData = [];
    if (result) {
      Object.keys(result).every((key) => newData.push(result[key]));
    }
    setState(newData);
  };

  useEffect(() => {
    manageLectures(lec);
  }, [lec]);

  useEffect(() => {
    if (id) {
      fetchModule(id);
    }
  }, [id]);

  const handleEditModule = () => {};

  return (
    <div>
      <Layout>
        {loading ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <>
            <Sider style={{ height: "80vh" }} theme="light" width="300">
              <div className="container">
                <label htmlFor="name">
                  <b>Name</b>
                </label>
                <p>{module.name}</p>
                <label htmlFor="module_code">
                  <b>Module Code</b>
                </label>
                <p>{module.module_code}</p>
                <label htmlFor="name">
                  <b>Lecturer in Charge</b>
                </label>
                <p>{module.lecture_in_charge?.name}</p>
                <label htmlFor="lab_assistant">
                  <b>lab_assistant</b>
                </label>
                <p>{module.lab_assistant?.name}</p>
                <label htmlFor="year">
                  <b>year</b>
                </label>
                <p>{module.year?.slice(0, 4)}</p>
                <label htmlFor="semester">
                  <b>semester</b>
                </label>
                <p>{module.semester}</p>
              </div>
              <Divider />
              <div style={{ margin: 15 }}>
                <div style={{ padding: 5 }}>
                  <Tooltip placement="right" title="Update Module">
                    <Button type="text" onClick={handleEditModule}>
                      <SettingOutlined style={{ marginRight: 10 }} /> Settings
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </Sider>
            <Content>
              <div className={"row container-lg mx-auto mt-5 px-0"}>
                <h1 className={"display-5 text-center mb-5"}>
                  Module Lectures
                </h1>
                {state?.map((week, index) => (
                  <Card data={week} key={index} index={index} />
                ))}
              </div>
            </Content>
          </>
        )}
      </Layout>
    </div>
  );
};

export default SingleModule;

const Card = ({ data, index }) => {
  console.log("card", data);
  return (
    <div>
      Week: {index + 1}
      {data?.map((lec) => (
        <h3>{lec?.title}</h3>
      ))}
      <hr></hr>
    </div>
  );
};

