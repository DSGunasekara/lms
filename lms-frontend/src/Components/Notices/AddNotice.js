import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { createNotice } from "../../actions/Notices";
import "./Notices.css";
import Lottie from 'react-lottie';
import noticeAnimation from './notice.json';
import { DatePicker } from "antd";

const AddNotice = () => {

    const dispatch = useDispatch();

    const [noticeData, setNoticeData] = useState({
        title: '',
        createdOn: '',
        description: '',
        inquiries: ''
    })

    const handleSubmit = async (e) => {

        //deletes data in input fields 
        e.preventDefault();

        const passData = {
            title: noticeData.title,
            createdOn: noticeData.createdOn,
            description: noticeData.description,
            inquiries: noticeData.inquiries
        }
        const res = await dispatch(createNotice({...passData}));
        setNoticeData({title: '', createdOn: '', description: '', inquiries: ''});
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: noticeAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    return (
        <div className={"container"}>
            <h1 className="display-5 text-center my-5" fw-bold text-white >Create Notice</h1>
            <form className="rounded border p-5 bg-light w-75 d-flex flex-column mx-auto mb-4">
                <div>
                    <div className="mb-3 col">
                        <label htmlFor="titleLabel" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="titleLabel"
                            value={noticeData.title}
                            onChange={(e) => setNoticeData({...noticeData, title: e.target.value})}
                        />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="dateLabel" className="form-label">
                            Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="dateLabel"
                            value={noticeData.createdOn}
                            onChange={(e) =>setNoticeData({...noticeData, createdOn: e.target.value})}
                        />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="descriptionLabel" className="form-label">
                            Description
                        </label>
                        <input
                            type="textArea"
                            className="form-control"
                            id="descriptionLabel"
                            value={noticeData.description}
                            onChange={(e) =>setNoticeData({...noticeData, description: e.target.value})}
                        />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="inquiriesLabel" className="form-label">
                           Inquiries
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inquiriesLabel"
                            value={noticeData.inquiries}
                            onChange={(e) =>setNoticeData({...noticeData, inquiries: e.target.value})}
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
        
    );
}

export default AddNotice;