import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Skeleton, Descriptions, Form, InputNumber, Button, Switch } from 'antd';

import { getResults } from '../../actions/result';

function GPA({ user }) {
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gpa, setGpa] = useState();
  const [avgGpa, setAvgGpa] = useState();
  const [impToggle, setImpToggle] = useState(false);

  const fetchResults = async () => {
    setLoading(true);
    const res = await dispatch(getResults());
    const results = [];
    user.modules?.forEach((module) => {
      const data = res.filter((result) => result.module._id === module.module._id && result.status);
      if (data[0]) {
        const userData = data[0].students.filter((studentResult) => studentResult.student._id === user._id);
        results.push({
          module: data[0].module,
          result: userData[0].grade,
        });
      }
    });
    setResults(results);
    setLoading(false);
  };
  useEffect(() => {
    fetchResults();
  }, []);

  useEffect(() => {
    calculateGPA();
  }, [results]);

  const calculateGPA = () => {
    let gradePoints = 0;
    let noOfCredit = 0;

    results.forEach((result) => {
      noOfCredit += result.module.credit;
      switch (result.result) {
        case 'A':
          gradePoints += result.module.credit * 4;
          break;
        case 'B':
          gradePoints += result.module.credit * 3;
          break;
        case 'C':
          gradePoints += result.module.credit * 2;
          break;
        case 'D':
          gradePoints += result.module.credit * 1;
          break;
        case 'E':
          gradePoints += 0;
          break;
        case 'H':
          gradePoints += 0;
          break;
        default:
          break;
      }
    });
    setGpa({
      gradePoints,
      noOfCredit,
    });
  };

  const columns = [
    {
      title: 'Module Code',
      dataIndex: 'module_code',
      key: 'module_code',
    },
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
    },
    {
      title: 'Credits',
      dataIndex: 'credit',
      key: 'credit',
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
    },
  ];

  const data = results?.map((result) => ({
    key: result._id,
    module_code: result.module.module_code,
    module: result.module.name,
    credit: result.module.credit,
    result: result.result,
  }));

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

  const [form] = Form.useForm();

  const onFinish = ({credits, reqGpa}) => {
    const cGPA = (reqGpa + (gpa?.gradePoints / gpa?.noOfCredit)) * (credits + gpa?.noOfCredit)
    const newGPA =  cGPA - gpa?.gradePoints
    setAvgGpa((newGPA/credits).toFixed(2))
  };

  const toggle = (checked) => {
    setImpToggle(checked);
    form.resetFields()
    setAvgGpa(0)
  };

  return (
    <div style={{ marginLeft: '10px' }}>
      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          <h4>GPA Information</h4>
          <Descriptions style={{ backgroundColor: '#fff' }} bordered>
            <Descriptions.Item label="Cumulative Grade Points">
              <b>{gpa?.gradePoints}</b>
            </Descriptions.Item>
            <Descriptions.Item label="Cumulative Credits">
              <b>{gpa?.noOfCredit}</b>
            </Descriptions.Item>
            <Descriptions.Item label="Cumulative GPA">
              <b>{gpa?.gradePoints / gpa?.noOfCredit ? gpa?.gradePoints / gpa?.noOfCredit : 0}</b>
            </Descriptions.Item>
          </Descriptions>
          <br />
          <br />
          <Table columns={columns} dataSource={data} pagination={false} />

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h5 className="mt-3" style={{ marginRight: 5 }}>
              Improve Your GPA
            </h5>
            <Switch onChange={toggle} />
          </div>
          {impToggle ? (
            <>
            <Form layout="inline" form={form} name="register" onFinish={onFinish} scrollToFirstError>
              <Form.Item
                name="credits"
                label="Number of Credits Remain"
                rules={[
                  {
                    required: true,
                    message: 'Please input credit amount',
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                name="reqGpa"
                label="Raise GPA by"
                rules={[
                  {
                    required: true,
                    message: 'Please input GPA value',
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <div className="center">
                  <Button type="primary" htmlType="submit" style={{ right: -50 }} disabled={gpa?.noOfCredit === 0}>
                    Calculate
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <h6 className="mt-3">Average GPA Required: {avgGpa? avgGpa : 0}</h6>
            </>
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
}

export default GPA;
