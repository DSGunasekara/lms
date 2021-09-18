import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import { getUser } from "../../actions/Users";

const AcademicSingleUser = () =>{

    const dispatch = useDispatch();
    let { id } = useParams();

    const [singleUser, setSingleUser] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchUser = async (userId) => {
        setLoading(true)
        const res = await dispatch(getUser(userId));
        console.log(res);
        setSingleUser(res);
        setLoading(false);
    }

    useEffect(() =>{
        if(id){
            fetchUser(id);
        }
    }, [id])

    return(
        <div>
            single user
        </div>
    )
}

export default AcademicSingleUser;