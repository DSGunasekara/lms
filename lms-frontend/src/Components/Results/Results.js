import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getResults, deleteResult } from "../../actions/result";
import 'antd/dist/antd.css';
import {Table, Space, Button, Tooltip, message, Popconfirm, Skeleton} from 'antd';
import {DeleteFilled, EditFilled, EyeFilled, PlusOutlined} from '@ant-design/icons';
import {useHistory} from "react-router";

const Results = () =>{

    const dispatch = useDispatch();
    const history = useHistory();

    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        setLoading(true)
        dispatch(getResults());
    }, [dispatch])

    const resultData = useSelector( (state) => state.ResultReducer.results);

    useEffect( ()=>{
        setResult(resultData)
        if (resultData){
            setLoading(false)
        }
    }, [resultData])

   const deleteConfirm = async (e) =>{
      const res = await dispatch(deleteResult(e.key));
      if(res?.status === 200){
          setResult(result.filter((mod) => mod._id !== e.key))
          message.success('Result Removed');
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
            title: 'Module',
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
    const data = result?.map((res) =>({
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
                <h3 style={header}>Results</h3>
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