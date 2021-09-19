import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../actions/Users";
import {useHistory} from "react-router";

import './CardStyles.css';


let option_academic = [];

export const Show_all_users = () => {

    const dispatch = useDispatch();


    const [academic, setAcademic] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect (()=>{
        setLoading(true);
        dispatch(getUsers());
    }, [dispatch]);

    const academicData = useSelector((state) => state.UserReducer.users);
    option_academic = academicData?.filter(user => {
        return(
            user.role === "labInstructor"
            || user.role === "lecturer"
        )
    });

    //user.role === 'labInstructor'&& user.role === 'lecturer'
    console.log(option_academic);

    useEffect( ()=>{
        setAcademic(option_academic)
        if(option_academic){
            setLoading(false)
        }
    }, [academicData])
    

    return (
        <>
            {academic?.map((user) =>(
               <Card user={user} key={user._id}/> 
            ))}
        </>
    )
}


const Card = ({user}) =>{

    console.log(user);

    const history = useHistory();


    const singlePage = (e) =>{
        console.log(e);
        history.push(`academicStaff/${user._id}`)
    }

    return(
        <div className="card">
            <button onClick={singlePage}>
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                    <p className="card-text">{user.role}</p>
                </div>
            </button>
        </div>
        
    )
}


