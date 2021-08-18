import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getUser } from '../../actions/Users';

function EditUser() {
    const dispatch = useDispatch();
    let { id } = useParams();
    
    const fetchUser = async(userId) => {
        const res = await dispatch(getUser(userId));
    }
    useEffect(() => {
        if (id) {
            fetchUser(id);
        }
    }, [id])


    return (
        <div>
            Edit User
        </div>
    )
}

export default EditUser
