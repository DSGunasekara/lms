import React, { useEffect, useState } from 'react'
import {useDispatch} from "react-redux";
import { Table, Skeleton, Descriptions } from 'antd';

import { getResults } from '../../actions/result'

function GPA({user}) {
    const dispatch = useDispatch()
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gpa, setGpa] = useState()

    const fetchResults = async() => {
        setLoading(true)
        const res = await dispatch(getResults())
        const results = []
        user.modules?.forEach((module) => {
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

    useEffect(() => {
        calculateGPA()
    }, [results])

    const calculateGPA = () => {
        let gradePoints = 0;
        let noOfCredit = 0;

        results.forEach(result => {
            noOfCredit += 4
            switch (result.result) {
                case 'A':
                    gradePoints += 4*4
                    break;
                case 'B':
                    gradePoints += 4*3
                    break;
                case 'C':
                    gradePoints += 4*2
                    break;
                case 'D':
                    gradePoints += 4*1
                    break;
                case 'E':
                    gradePoints += 0
                    break; 
                case 'H':
                    gradePoints += 0
                    break;
                default:
                    break;
            }
        })
        setGpa({
            gradePoints,
            noOfCredit
        })
    }

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
                <>
                    <h4>GPA Information</h4>
                    <Descriptions style={{backgroundColor: '#fff'}} bordered>
                        <Descriptions.Item label="Cumulative Grade Points"><b>{gpa?.gradePoints}</b></Descriptions.Item>
                        <Descriptions.Item label="Cumulative Credits"><b>{gpa?.noOfCredit}</b></Descriptions.Item>
                        <Descriptions.Item label="Cumulative GPA"><b>{gpa?.gradePoints/gpa?.noOfCredit}</b></Descriptions.Item>
                        {/* <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item> */}
                    </Descriptions>
                    <br /><br />
                    <Table columns={columns} dataSource={data}  pagination={false} />
                </>
            }
        </div>
    )
}

export default GPA
