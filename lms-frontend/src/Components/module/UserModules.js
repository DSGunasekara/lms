import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Space, Tooltip } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import { useHistory } from 'react-router';
function UserModules({moduleFilter}) {

  const history = useHistory();
//   const [moduleFilter, setModuleFilter] = useState([]);



  const SingleModuleLook = (e) => {
    history.push(`viewModule/${e.key}`);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Module Code',
      dataIndex: 'module_code',
      key: 'module_code',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Semester',
      dataIndex: 'semester',
      key: 'semester',
    },
    {
      title: 'Credits',
      dataIndex: 'credit',
      key: 'credit',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip placement="bottom" title="View Module">
            <EyeFilled onClick={() => SingleModuleLook(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  console.log(moduleFilter);
  const data = moduleFilter?.map((mod) => ({
    key: mod.module._id,
    name: mod.module.name,
    module_code: mod.module.module_code,
    year: mod.module.year.slice(0, 4),
    semester: mod.module.semester,
    credit: mod.module.credit,
  }));

  const header = {
    paddingLeft: 10,
    fontFamily: 'Besley',
    fontWeight: 'bold',
    paddingTop: 25,
    paddingBottom: 15,
  };

  return (
    <div>
      <h3 style={header}>Modules</h3>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default UserModules;
