import "./Notices.css";
import Lottie from 'react-lottie';
import noticeAnimation from './notice.json';

const AddNotice = () => {

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
                        <label className="Label">Title</label>
                        <input className="noticeTitle" type="text"></input>
                    </div>
                    <div className="fieldsDiv">
                        <label className="Label">Date</label>
                        <input className="date" type="date"></input>
                    </div>
                    <div className="fieldsDiv">
                        <label className="Label">Message</label>
                        <textarea className="message"></textarea>
                    </div>
                    <div className="fieldsDiv">
                        <label className="Label">For inquiries</label>
                        <input className="phone" type="tel"></input>
                    </div>
                    <div className="buttonDiv">
                        <button className="submitBtn">Submit</button>
                    </div> 
                
                </form>
            </div>
            
            
            
        </div>
        
    );
}

export default AddNotice;