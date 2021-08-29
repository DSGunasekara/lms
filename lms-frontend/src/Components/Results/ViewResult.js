import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { getResult } from "../../actions/result";
import { useParams } from 'react-router-dom'
import 'antd/dist/antd.css';
import {Table, Skeleton} from 'antd';
import {useHistory} from "react-router";

function ViewResult() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams()

    const [result, setResult] = useState();
    const [loading, setLoading] = useState(false);

    const fetchResult = async(id) => {
        setLoading(true)
        const res = await dispatch(getResult(id))
        if(res.status === 500 || res.status === 404) {
            history.push('/notfound')
        } else {
            setResult(res)
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
    const data = result?.students?.map((res) =>({
        key: res._id,
        regNumber: res.student.regNumber,
        name: res.student.name,
        grade: res.grade,
        status: (res.grade === 'A') || (res.grade === 'B') || (res.grade === 'C')? 'Pass' 
            : (res.grade === 'H') ? 'Pending' : 'Fail',
    }));

    const header = {
        paddingLeft: 10,
        fontFamily: 'Besley',
        fontWeight: 'bold',
        paddingTop: 25,
        paddingBottom: 15
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
                <Table columns={columns} dataSource={data}/>
            </>
            }
        </div>
    )
}

export default ViewResult
