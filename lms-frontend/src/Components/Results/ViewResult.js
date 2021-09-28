import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { getResult } from "../../actions/result";
import { useParams } from 'react-router-dom'
import 'antd/dist/antd.css';
import {Table, Skeleton, Collapse, Input, Row, Col, Select, Button } from 'antd';
import {SearchOutlined, ClearOutlined} from '@ant-design/icons';
import {useHistory} from "react-router";

function ViewResult() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams()

    const { Option } = Select;
    const { Panel } = Collapse;

    const [result, setResult] = useState();
    const [resultFilter, setResultFilter] = useState();
    const [loading, setLoading] = useState(false);
    const [searchReg, setSearchReg] = useState('')
    const [searchGrade, setSearchGrade] = useState('')
    const [searchName, setSearchName] = useState('')
    const [searchStatus, setSearchStatus] = useState('')
    const [open, setOpen] = useState(["0"]);

    const fetchResult = async(id) => {
        setLoading(true)
        const res = await dispatch(getResult(id))
        if(res.status === 500 || res.status === 404) {
            history.push('/notfound')
        } else {
            setResult(res)
            setResultFilter(res)
            setLoading(false)
        }
    }

    useEffect(() =>{
        fetchResult(id)
    }, [])

    const columns = [
        {
            title: 'Registration Number',
            dataIndex: 'regNumber',
            key: 'regNumber',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];
    const data = resultFilter?.students?.map((res) =>({
        key: res._id,
        regNumber: res.student.regNumber,
        name: res.student.name,
        grade: res.grade,
        status: (res.grade === 'A') || (res.grade === 'B') || (res.grade === 'C')? 'Pass' 
            : (res.grade === 'H') ? 'Pending' : 'Fail',
    }));

    const header = {
        paddingLeft: 10,
        // fontFamily: 'Besley',
        fontWeight: 'bold',
        paddingTop: 25,
        paddingBottom: 15,
        color: '#1890ff',
    }

    const search = () => {
        if (searchGrade || searchName || searchReg || searchStatus) {
          let query = {}
    
          if (searchGrade) {
            query = {
              ...query,
              grade: searchGrade
            }
          }
          let nameQuery = {}
          if (searchName) {
            nameQuery = {
              ...nameQuery,
                name: searchName
            }
          }
          if (searchReg) {
            nameQuery = {
              ...nameQuery,
                regNumber: searchReg.toString()
            }
          }

          function searchFun(module){
            return Object.keys(this).every((key) => module[key] === this[key]);
          }

          function searchNameFun(module){
            return Object.keys(this).every((key) => module.student[key].toLowerCase().includes(this[key]));
          }
          
        let data = result?.students?.filter(searchFun, query);
        data = data?.filter(searchNameFun, nameQuery);
   
        setOpen([]);
        setResultFilter({...result, students: data})
        } else {
          setOpen([]);
          setResultFilter(result)
        }
      }
    
      const clear = () => {
        setSearchGrade('')
        setSearchName('')
        setSearchReg('')
        setSearchStatus('')
      }

    return (
        <div>
            {loading ? 
                <>
                    <Skeleton active/>
                    <Skeleton active/>
                    <Skeleton active/>
                </>
            :
            <>
                <h3 style={header}>Results of {result?.module.module_code}</h3>
                <Collapse style={{ marginBottom: 50 }} activeKey={open} onChange={() => setOpen(open === '' ? [] : ['0'])}>
                    <Panel header="Search Results" >
                    <Row>
                        <Col span={6} style={{ margin: '10px' }}>
                        <Input placeholder="Registration Number"
                            value={searchReg}
                            onChange={(e) => setSearchReg(e.target.value)}
                        />
                        </Col>
                        <Col span={6} style={{ margin: '10px' }}>
                        <Input placeholder="Name"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        </Col>
                        <Col span={6} style={{ margin: '10px' }}>
                            <Select value={searchStatus} style={{ width: '100%' }} onChange={(e) => setSearchStatus(e)}>
                                <Option value="">All</Option>
                                <Option value="true">Pass</Option>
                                <Option value="false">Fail</Option>
                                <Option value="hold">Hold</Option>
                            </Select>
                        </Col>
                        <Col span={6} style={{ margin: '10px' }}>
                            <Select value={searchGrade} style={{ width: '100%' }} onChange={(e) => setSearchGrade(e)}>
                                <Option value="">All</Option>
                                <Option value="A">A</Option>
                                <Option value="B">B</Option>
                                <Option value="C">C</Option>
                                <Option value="D">D</Option>
                                <Option value="E">E</Option>
                                <Option value="H">H</Option>
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
            </>
            }
        </div>
    )
}

export default ViewResult
