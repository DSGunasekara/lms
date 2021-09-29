import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getResults, deleteResult, updateResult } from "../../actions/result";
import 'antd/dist/antd.css';
import {Table, Space, Button, Tooltip, message, Popconfirm, Skeleton, Collapse, Input, Row, Col, Select} from 'antd';
import {DeleteFilled, EditFilled, EyeFilled, PlusOutlined, CheckOutlined, CloseOutlined, SearchOutlined, ClearOutlined} from '@ant-design/icons';
import {useHistory} from "react-router";
import ResultImage from "../../Images/results.png";

const Results = () =>{

    const dispatch = useDispatch();
    const history = useHistory();
    const { Option } = Select;
    const { Panel } = Collapse;

    const [result, setResult] = useState([]);
    const [resultFilter, setResultFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchModule, setSearchModule] = useState('')
    const [searchStatus, setSearchStatus] = useState('')
    const [open, setOpen] = useState(["0"]);

    useEffect(() =>{
        setLoading(true)
        dispatch(getResults());
    }, [dispatch])

    const resultData = useSelector( (state) => state.ResultReducer.results);

    useEffect( ()=>{
        setResult(resultData)
        setResultFilter(resultData)
        if (resultData){
            setLoading(false)
        }
    }, [resultData])

   const deleteConfirm = async (e) =>{
      const res = await dispatch(deleteResult(e.key));
      if(res?.status === 200){
          setResult(result.filter((mod) => mod._id !== e.key))
          setResultFilter(result.filter((mod) => mod._id !== e.key))
          message.success('Result Removed');
      }else {
          message.error('An Error Occurred');
      }
   }

   const publishConfirm = async (e) =>{
    const updatedResult = result.filter(res => res._id === e.key)[0]
      const res = await dispatch(updateResult({id: e.key, ...updatedResult, status: true}));
      if(res?.status === 200){
          message.success('Result Published');
      }else {
          message.error('An Error Occurred');
      }
   }

   const unPublishConfirm = async (e) =>{
    const updatedResult = result.filter(res => res._id === e.key)[0]
      const res = await dispatch(updateResult({id: e.key, ...updatedResult, status: false}));
      if(res?.status === 200){
          message.success('Result UnPublished');
      }else {
          message.error('An Error Occurred');
      }
   }

    const editConfirm = (e) =>{
        history.push(`results/edit/${e.key}`)
    }

    const viewResult = (e) =>{
        history.push(`results/view/${e.key}`)
    }

    const columns = [
        {
            title: 'Module Code',
            dataIndex: 'module',
            key: 'module',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',

        },
        {
            title: 'Passed Amount',
            dataIndex: 'passedAmount',
            key: 'passedAmount',

        },
        {
            title: 'Failed Amount',
            dataIndex: 'failedAmount',
            key: 'failedAmount',

        },
        {
            title: 'Hold Amount',
            dataIndex: 'holdAmount',
            key: 'holdAmount',

        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    { record.status === 'Not Published' ?
                    <Popconfirm
                        title="Are you sure to publish this result?"
                        onConfirm={() => publishConfirm(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip placement="bottom" title="Publish Result">
                            <CheckOutlined />
                        </Tooltip>
                    </Popconfirm>
                    :
                    <Popconfirm
                        title="Are you sure to unpublish this result?"
                        onConfirm={() => unPublishConfirm(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip placement="bottom" title="UnPublish Result">
                            <CloseOutlined />
                        </Tooltip>
                    </Popconfirm>
                    }
                    <Popconfirm
                        title="Are you sure to delete this result?"
                        onConfirm={() => deleteConfirm(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip placement="bottom" title="Delete Result">
                            <DeleteFilled/>
                        </Tooltip>
                    </Popconfirm>
                    <Tooltip placement="bottom" title="Edit Result">
                        <EditFilled onClick={() => editConfirm(record)} />
                    </Tooltip>
                    <Tooltip placement="bottom" title="View Result">
                        <EyeFilled onClick={() => viewResult(record)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];
    const data = resultFilter?.map((res) =>({
        key: res._id,
        module: res.module.module_code,
        status: res.status? 'Published' : 'Not Published',
        passedAmount: res.passedAmount,
        failedAmount: res.failedAmount,
        holdAmount: res.holdAmount,
    }));

    const newResult = () =>{
        history.push('/results/add')
    }

    const header = {
        paddingLeft: 10,
        fontFamily: 'Besley',
        fontWeight: 'bold',
        paddingTop: 25,
        paddingBottom: 15
    }

    const search = () => {
        if (searchModule || searchStatus) {
          let query = {}
    
          if (searchModule) {
            query = {
              ...query,
              module: {
                module_code: searchModule
              } 
            }
          }
          let statusQuery = {}
          if (searchStatus) {
            statusQuery = {
              ...statusQuery,
              status: searchStatus === 'true'
            }
          }

          function searchFun(module){
            return Object.keys(this).every((key) => module[key].module_code.toLowerCase().includes(this[key].module_code.toLowerCase()));
          }
          
          function searchStatusFun(status){
            return Object.keys(this).every((key) => status[key] === this[key]);
          }

          let data = result?.filter(searchFun, query);
          data = data?.filter(searchStatusFun, statusQuery);
          setOpen([]);
          setResultFilter(data)
        } else {
          setOpen([]);
          setResultFilter(result)
        }
      }
    
      const clear = () => {
        setSearchModule('')
        setSearchStatus('')
      }

    return(
        <div>
            {loading ? 
                <>
                    <Skeleton active/>
                    <Skeleton active/>
                    <Skeleton active/>
                </>
            :
            <>
                <div className={"headerDiv"}>
                    <div className={"headerDescription"}>
                        <h3 className={"headerTitle"}>Results</h3>
                    </div>
                    <div className={"imageDiv"}>
                        <img className={"imageStyle"} src={ResultImage} alt="ResultImage" />
                    </div>
                </div>
                <Collapse style={{ marginBottom: 50 }} activeKey={open} onChange={() => setOpen(open === '' ? [] : ['0'])}>
                    <Panel header="Search Results" >
                    <Row>
                        <Col span={6} style={{ margin: '10px' }}>
                        <Input placeholder="Module Code"
                            value={searchModule}
                            onChange={(e) => setSearchModule(e.target.value)}
                        />
                        </Col>
                        <Col span={6} style={{ margin: '10px' }}>
                        <Select value={searchStatus} style={{ width: '100%' }} onChange={(e) => setSearchStatus(e)}>
                            <Option value="">All</Option>
                            <Option value="true">Published</Option>
                            <Option value="false">Not Published</Option>
                        </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={17} style={{ margin: '10px' }} onClick={() => clear()}>
                        <Button type="secondary" icon={<ClearOutlined />}>
                            Clear All
                        </Button>
                        </Col>
                        <Col span={6} style={{ margin: '10px' }}>
                        <Button type="primary" icon={<SearchOutlined />} onClick={() => search()}>
                            Search
                        </Button>
                        </Col>
                    </Row>
                    </Panel>
                </Collapse>
                <Table columns={columns} dataSource={data}/>
                <Tooltip title="Create New Result">
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<PlusOutlined />}
                        size='large'
                        className="fabBtn"
                        onClick={newResult}
                    />
                </Tooltip>
            </>
}
        </div>
    )
}

export default Results;