import React, { useEffect, useState } from 'react'
import {useDispatch} from "react-redux";
import { Table, Skeleton } from 'antd';

import { getResults } from '../../actions/result'

function GPA({user}) {
    const dispatch = useDispatch()
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchResults = async() => {
        setLoading(true)
        const res = await dispatch(getResults())
        const results = []
        user.modules.forEach((module) => {
            const data =  res.filter((result) => result.module._id === module.module && result.status)
            if(data[0]) {
                const userData = data[0].students.filter(studentResult => studentResult.student._id === user._id)
                results.push({
                    module: data[0].module,
                    result: userData[0].grade
                })
            }
        })
        setResults(results)
        setLoading(false)
        
    }
    useEffect(()=> {
        fetchResults()
    }, [])

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
        credit: 4,
        result: result.result,
      }))
      ;

    return (
        <div style={{marginLeft: '10px'}}>
            { loading ? 
                <>
                    <Skeleton active/>
                    <Skeleton active/>
                    <Skeleton active/>
                </>
                :
                <Table columns={columns} dataSource={data}  pagination={false} />
            }
        </div>
    )
}

export default GPA
