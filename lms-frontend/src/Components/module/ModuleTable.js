import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getModules} from "../../actions/Modules";

const ModuleTable = () =>{

    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getModules());
    }, [dispatch])

    const moduleData = useSelector( (state) => state)

    return(
        <div>
            module table
        </div>
    )
}