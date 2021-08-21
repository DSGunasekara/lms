import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { createNotice } from "../../actions/Notices";
import "./Notices.css";
import Lottie from 'react-lottie';
import noticeAnimation from './notice.json';

const AddNotice = () => {

    const dispatch = useDispatch();

    const [noticeData, setNoticeData] = useState({
        title: '',
        date: '',
        message: '',
        inquiries: ''
    })

    const handleSubmit = async (e) => {

        //deletes data in input fields 
        e.preventDefault();

        const passData = {
            title: noticeData.title,
            date: noticeData.date,
            message: noticeData.message,
            inquiries: noticeData.inquiries
        }
        console.log(passData);
        const res = await dispatch(createNotice({...passData}));
        setNoticeData({title: '', date: '', message: '', inquiries: ''});
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
        <div className="AddNotice">
            <div className="headingDiv">
                <h1 className="heading">Add your notices here</h1>
                <div className="animationDiv">
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            </div>
            
            <div className="formDiv">
                <form className="noticesForm">
                    <div className="fieldsDiv">
                        <label htmlFor="noticeTitle" className="Label">Title</label>
                        <input 
                            className="noticeTitle" 
                            type="text"
                            id="noticeTitle"
                            value={noticeData.title}
                            onChange={(e) => setNoticeData({...noticeData, title: e.target.value})}
                        />
                    </div>
                    <div className="fieldsDiv">
                        <label htmlFor="date" className="Label">Date</label>
                        <input 
                            className="date" 
                            type="date"
                            id="date"
                            value={noticeData.date}
                            onChange={(e) => setNoticeData({...noticeData, date: e.target.value})}
                        />
                    </div>
                    <div className="fieldsDiv">
                        <label htmlFor="message" className="Label">Message</label>
                        <textarea
                            className="message"
                            id="message"
                            value={noticeData.message}
                            onChange={(e) => setNoticeData({...noticeData, message: e.target.value})}
                        />
                    </div>
                    <div className="fieldsDiv">
                        <label htmlFor="inquiries" className="Label">For inquiries</label>
                        <input 
                            className="inquiries" 
                            type="tel"
                            id="inquiries"
                            value={noticeData.inquiries}
                            onChange={(e) => setNoticeData({...noticeData, inquiries: e.target.value})}
                        />
                    </div>
                    <div className="buttonDiv">
                        <button className="submitBtn" type="submit" onClick={handleSubmit}>Submit</button>
                    </div> 
                
                </form>
            </div>
            
            
            
        </div>
        
    );
}

export default AddNotice;