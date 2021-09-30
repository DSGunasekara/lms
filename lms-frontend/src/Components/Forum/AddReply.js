import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createNewReply } from '../../actions/reply';

const AddReply = ({addReply}) => {
    // const dispatch = useDispatch();

    const [replyData, setReplyData] = useState()

    // const handleSubmit = async (e) => {
        
    //     e.preventDefault();

    //     const passData = {
    //         topic: replyData.topic,
    //         reply: replyData.reply
    //     }

    //     const res = await dispatch(createNewReply({...passData}));
    //     setReplyData({topic: '', reply: ''});

    // }

    return (
        <div>
            {/* <h1 className="display-5 text-center my-5" fw-bold text-white >ADD YOUR REPLY</h1> */}
            <form>
                <div>
                    {/* <div className="mb-3 col">
                        <label htmlFor="topicLabel" className="form-label">
                            Topic
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="topicLabel"
                            value={replyData.topic}
                            onChange={(e) => setReplyData({...replyData, topic: e.target.value})}
                        />
                    </div> */}
                    <div className="mb-3 col">
                        <label htmlFor="replyLabel" className="form-label">
                            Reply
                        </label>
                        <textarea
                            type="textArea"
                            className="form-control"
                            id="replyLabel"
                            value={replyData}
                            onChange={(e) =>setReplyData(e.target.value)}
                        />
                    </div>                    
                    <button className="btn btn-primary" onClick={(e)=>{
                        e.preventDefault()
                        addReply(replyData)}
                    }>
                        Post to Forum
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddReply;
