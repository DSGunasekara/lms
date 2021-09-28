import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "antd";
import Select from "react-select";
import "antd/dist/antd.css";
import { Form, Input, Button, message, Skeleton } from "antd";
import moment from "moment";

import { updateSingleModule, getSingleModule } from "../../actions/Modules";

import { getUsers } from "../../actions/Users";
let option_lec = [],
  option_lab = [];

const EditSingleModule = ({ module }) => {
  const dispatch = useDispatch();
  let { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  //initial state of lec and lab
  const [moduleData, setModuleData] = useState({
    lecture_in_charge: undefined,
    lab_assistant: undefined,
  });

  //getting single modules data to the fetchUser function
  const fetchUser = async (modId) => {
    const res = await dispatch(getSingleModule(modId));
    const mod = { ...res, year: moment(res.year) };
    form.setFieldsValue(mod);
    setModuleData({
      lecture_in_charge: {
        value: res?.lecture_in_charge?._id,
        label: res?.lecture_in_charge?.name,
      },
      lab_assistant: {
        value: res?.lab_assistant?._id,
        label: res?.lab_assistant?.name,
      },
    });
    setLoading(false);
  };

  useEffect(() => {
    if (module) {
      form.setFieldsValue(module);
    } else {
      setLoading(true);
      fetchUser(id);
    }
  }, []);

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  //calling Users to the Component
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const userData = useSelector((state) => state.UserReducer.users);

  //filter lecturer from the UserData
  option_lec = userData
    ?.filter((user) => user.role === "Lecturer")
    .map((lec) => ({
      value: lec._id,
      label: lec.name,
    }));

  //filter labInstructor from the UserData
  option_lab = userData
    ?.filter((user) => user.role === "Lab Instructor")
    .map((lab) => ({
      value: lab._id,
      label: lab.name,
    }));

  const [form] = Form.useForm();

  //updating data by passing the new added data
  const SubmitEdit = async (values) => {
    setLoadingBtn(true);
    const updateModule = {
      id,
      name: values.name,
      module_code: values.module_code,
      year: values.year,
      semester: values.semester,
      lecture_in_charge: moduleData.lecture_in_charge.value,
      lab_assistant: moduleData.lab_assistant.value,
      credit: values.credit,
    };
    const res = await dispatch(updateSingleModule(updateModule));
    if (res.status === 200) {
      message.success("Module Updated Successfully");
    } else {
      message.error("An Error Occurred");
    }
    setLoadingBtn(false);
  };

  return (
    <div>
      <div>
      <br />
      <div style={{margin: 'auto', width:'700px', border: '2px solid #9fd1ff', borderRadius: '10px', padding: '30px flex', alignContent: 'space-around'}}>
      <br />
      {!loading ? (
        <div style={{ width: "400px", margin: "auto" }}>
          <h2 style={{ textAlign: "center", color: '#1890ff' }}>Update Module</h2>
          <Form
            // {...formItemLayout}
            layout="vertical"
            form={form}
            name="register"
            onFinish={SubmitEdit}
            scrollToFirstError
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="module_code"
              label="Module Code"
              rules={[
                {
                  required: true,
                  message: "Please input your Module Code",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <div className="mb-3 col">
              <label htmlFor="option_lec" className="form-label">
                Lecture In Charge
              </label>
              <Select
                value={moduleData.lecture_in_charge}
                name="option_lec"
                options={option_lec}
                className="basic-multi-select"
                style={{ width: "100%" }}
                onChange={(e) =>
                  setModuleData({ ...moduleData, lecture_in_charge: e })
                }
              />
            </div>

            <div className="mb-3 col">
              <label htmlFor="option_lec" className="form-label">
                Lab Assistant
              </label>
              <Select
                value={moduleData.lab_assistant}
                name="option_lec"
                options={option_lab}
                className="basic-multi-select"
                style={{ width: "100%" }}
                onChange={(e) =>
                  setModuleData({ ...moduleData, lab_assistant: e })
                }
              />
            </div>

            <Form.Item
              name="year"
              label="Year"
              rules={[
                {
                  required: true,
                  message: "Please input your Semester",
                },
              ]}
            >
              <DatePicker picker="year" />
            </Form.Item>
            <Form.Item
              name="semester"
              label="Semester"
              rules={[
                {
                  required: true,
                  message: "Please input your Semester",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="credit"
              label="credit"
              rules={[
                {
                  required: true,
                  message: "Please input your credit!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <div className="center">
                <Button type="primary" htmlType="submit" loading={loadingBtn} style={{padding:'0 180px'}}>
                  Update
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      )}
      </div>
      <br />
    </div>
    </div>
  );
};

export default EditSingleModule;
