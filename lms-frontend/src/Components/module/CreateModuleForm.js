import React, {useEffect, useState} from "react";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {createModules} from "../../actions/Modules";
import {getUsers} from "../../actions/Users";
import 'antd/dist/antd.css';
import {DatePicker, message} from 'antd';

let option_lec = [], option_lab = [];

const CreateModuleForm = () =>{

    const dispatch = useDispatch();

    const [loadingBtn, setLoadingBtn] = useState(false);
    //initial data in the Form
    const [moduleData, setModuleData] = useState({
        name: '',
        module_code: '',
        lecturer_in_charge: undefined,
        lab_assistant: undefined,
        year: '',
        semester:'',
        credit:''
    })

    //calling Users to the Component
    useEffect   (() =>{
        dispatch(getUsers());
    }, [dispatch]);
    const userData = useSelector((state) => state.UserReducer.users)

    //filter labInstructor from the UserData
    option_lab = userData?.filter((user) => user.role === "Lab Instructor").map((lab) => ({
        value: lab._id, label: lab.name}))

    //filter lecturer from the UserData
    option_lec = userData?.filter((user)=> user.role === "Lecturer").map((lec) =>({
        value:lec._id, label: lec.name}))


    //Passing Module Data to the Database
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoadingBtn(true)
        const passData ={
            name: moduleData.name,
            module_code:moduleData.module_code,
            lecture_in_charge:moduleData.lecturer_in_charge,
            lab_assistant:moduleData.lab_assistant,
            year:moduleData.year,
            semester:moduleData.semester,
            credit:moduleData.credit
        }
        const res = await dispatch(createModules({...passData}));
        setModuleData({name:'', module_code: '', lecturer_in_charge: '', lab_assistant: '',year: '', semester: '', credit: ''})
        if(res.status === 200){
            message.success("Module Created Successfully")
        } else {
            message.error("An Error in Creating a Module")
        }
        setLoadingBtn(false);

    }



    return(
        <div className={"container"}>
            <h1 className="display-5 text-center my-5" fw-bold text-white >Create Module</h1>
            <form className="rounded border p-5 bg-light w-75 d-flex flex-column mx-auto mb-4">
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="nameLabel" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="nameLabel"
                            value={moduleData.name}
                            onChange={(e) => setModuleData({...moduleData, name: e.target.value})}
                        />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="moduleCodeLabel" className="form-label">
                            Module Code
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="moduleCodeLabel"
                            value={moduleData.module_code}
                            onChange={(e) =>setModuleData({...moduleData, module_code: e.target.value})}
                        />
                    </div>
                    <div className="row">
                        <div className="mb-3 col">
                            <label htmlFor="option_lec" className="form-label">
                                Lecture In Charge
                            </label>
                            <Select
                                name="option_lec"
                                options={option_lec}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={(e) => setModuleData({...moduleData, lecturer_in_charge: e.value})}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col">
                            <label htmlFor="titleLabel" className="form-label">
                                Lab Assistant
                            </label>
                            <Select

                                name="options"
                                options={option_lab}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={(e) => setModuleData({...moduleData, lab_assistant: e.value})}
                            />
                        </div>
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="yearLabel" className="form-label">
                           Year
                        </label>
                        <DatePicker
                            picker="year"
                            value={moduleData.year}
                            onChange={(e) => setModuleData({...moduleData, year: e})}
                        />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="semesterLabel" className="form-label">
                            Semester
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="semesterLabel"
                            value={moduleData.semester}
                            onChange={(e) =>setModuleData({...moduleData, semester: e.target.value})}
                        />
                    </div>
                </div>
                <div className="mb-3 col">
                    <label htmlFor="creditLabel" className="form-label">
                        Credit
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="creditLabel"
                        value={moduleData.credit}
                        onChange={(e) =>setModuleData({...moduleData, credit: e.target.value})}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateModuleForm;
