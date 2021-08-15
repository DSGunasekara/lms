import React, {useEffect, useState} from "react";
//import {useLocation} from "react-router-dom";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {createModules} from "../../actions/Modules";
import {getUsers} from "../../actions/Users";

let option_lec = [], option_lab = [];

const CreateModuleForm = () =>{

    // const location = useLocation();
    const dispatch = useDispatch();

    const [selectLec, setSelectLec] = useState([]);
    const [selectLab, setSelectLab] = useState([]);

    const [moduleData, setModuleData] = useState({
        name: '',
        module_code: '',
        lecture_in_charge: '',
        lab_assistant: '',
        year: '',
        semester:''
    })

    useEffect(() =>{
        dispatch(getUsers());
    }, []);
        const userData = useSelector((state) => state)
    console.log(userData)



    const handleSubmit = async (e) =>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', moduleData.name)
        formData.append('module_code', moduleData.module_code)
        formData.append('lecture_in_charge', moduleData.lecture_in_charge)
        formData.append('lab_assistant', moduleData.lab_assistant)
        formData.append('year', moduleData.year)
        formData.append('semester', moduleData.semester)

        const res = await dispatch(createModules(formData));
        setModuleData({name:'', module_code: '', lecture_in_charge: '', lab_assistant: '',year: '', semester: ''})
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
                                isMulti
                                name="option_lec"
                                options={option_lec}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={setSelectLec}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col">
                            <label htmlFor="titleLabel" className="form-label">
                                Lab Assistant
                            </label>
                            <Select
                                isMulti
                                name="options"
                                options={option_lab}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={setSelectLab}
                            />
                        </div>
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="yearLabel" className="form-label">
                           Year
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="yearLabel"
                            value={moduleData.year}
                            onChange={(e) =>setModuleData({...moduleData, year: e.target.value})}
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
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateModuleForm;
