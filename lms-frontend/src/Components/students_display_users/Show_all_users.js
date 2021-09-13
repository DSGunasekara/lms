import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../actions/Users";
import {useHistory} from "react-router";

export const Show_all_users = () => {

    const disptach = useDispatch();
    const history = useHistory();


    const [academic, setAcademic] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect (()=>{
        setLoading(true);
        disptach(getUsers());
    }, [disptach]);

    const academicData = useSelector((state) => state.UserReducer.users)
    useEffect( ()=>{
        setAcademic(academicData)
        if(academicData){
            setLoading(false)
        }
    }, [academicData])
    
    console.log(academicData);
    return (
        <div>
            <h1> Hello </h1>
        </div>
    )
}


