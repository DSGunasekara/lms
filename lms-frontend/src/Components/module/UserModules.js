import React from "react";
import "antd/dist/antd.css";
import { Table, Space, Tooltip, Popconfirm } from "antd";
import { EyeFilled, UndoOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
function UserModules({ moduleFilter, unenroll }) {
  const history = useHistory();

  const SingleModuleLook = (e) => {
    history.push(`/viewModule/${e.key}`);
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
          <Tooltip placement="bottom" title="View Module">
            <EyeFilled onClick={() => SingleModuleLook(record)} />
          </Tooltip>
          <Popconfirm
            title="Are you sure to unenroll from this Module?"
            onConfirm={() => unenroll(record)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip placement="bottom" title="Unenroll From Module">
              <UndoOutlined />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
    fontFamily: "Besley",
    fontWeight: "bold",
    paddingTop: 25,
    paddingBottom: 15,
    fontSize: "20px",
  };

  return (
    <div style={{ marginLeft: "10px" }}>
      <h3 style={header}>Your Modules</h3>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default UserModules;
